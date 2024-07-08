import React, { Suspense } from "react";
import CabinList from "../../components/CabinList";
import Spinner from "@/components/Spinner";
import Filter from "../../components/Filter";
import ReservationReminder from "@/components/ReservationReminder";

type Props = {
  searchParams: {
    [param: string]: string;
  };
};

// 1hr for ISR
export const revalidate = 3600;

export const metadata = {
  title: "Cabins",
};

const page = async ({ searchParams }: Props) => {
  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      {/* key is requried as next js page transition prevents running of fallback in suspense */}
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
};

export default page;