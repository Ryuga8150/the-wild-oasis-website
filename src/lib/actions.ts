"use server";

import { Session } from "next-auth";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";
import { Booking } from "./types";

export async function updateGuest(formData: FormData) {
  // console.log(formData);

  const session = await auth();

  if (!session?.user) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID") as string;

  const [nationality, countryFlag] = (
    formData.get("nationality") as string
  ).split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a national ID");

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  // if only account specified
  // then all the below paths are revalidated
  revalidatePath("/account/profile");
}

export async function createBooking(
  bookingData: Partial<Booking> & { cabinPrice?: number },
  formData: FormData
) {
  // console.log(formData);
  const session = await auth();

  if (!session?.user) throw new Error("You must be logged in");
  // console.log(bookingData);
  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.slice(0, 1000) || "",
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };
  // console.log(newBooking);

  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    // so that the newly created object get returned
    .select()
    .single();

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}

export async function deleteBooking(bookingId: number) {
  const session = await auth();

  if (!session?.user) throw new Error("You must be logged in");

  // to prevent unatuthorized users from deleting using curl
  const guestBookings = await getBookings(session.user.guestId!);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData: FormData) {
  console.log(formData);
  // 1) Authentication
  const bookingId = Number(formData.get("bookingId"));
  const session = await auth();

  if (!session?.user) throw new Error("You must be logged in");

  // 2) Authorization
  // to prevent unatuthorized users from deleting using curl
  const guestBookings = await getBookings(session.user.guestId!);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking");

  // 3) Building Update Data
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")!.slice(0, 1000),
  };

  // 4) Mutation
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", Number(bookingId))
    .select()
    .single();

  // 5) Error
  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  // 6) Revalidating
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");
  // 7) Redirecting
  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
