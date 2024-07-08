import React from "react";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "@/lib/data-service";
import { auth } from "@/lib/auth";
import LoginMessage from "./LoginMessage";
import { Cabin } from "@/lib/types";

type Props = {
  cabin: Cabin;
};

const Reservation = async ({ cabin }: Props) => {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  const session = await auth();
  if (!session) throw new Error("Unauthorized. Please Login again");
  // console.log(session);
  // console.log("BookedDates", bookedDates);
  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user!} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
};

export default Reservation;
