"use client";
import React, { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteBooking } from "@/lib/actions";
import { Booking } from "@/lib/types";

type Props = {
  bookings: Booking[];
};

const ReservationList = ({ bookings }: Props) => {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currBookings, bookingId) => {
      return currBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId: number) {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {/* {bookings.map((booking) => ( */}
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          onDelete={handleDelete}
          key={booking.id}
        />
      ))}
    </ul>
  );
};

export default ReservationList;
