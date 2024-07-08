import { Session } from "next-auth";

export type BookingForm = {
  startDate: string;
  endDate: string;
  numNights: number;
  cabinPrice: number;
  cabinId: number;
};

export type Guest = {
  id: number;
  created_at: string;
  fullName: string;
  email: string;
  nationalID: string;
  nationality: string;
  countryFlag: string;
};

export type Booking = {
  id: number;
  created_at: string | Date;
  startDate: string | Date;
  endDate: string | Date;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  guestId: number;
  cabinId: number;
  cabins: {
    name: string;
    image: string;
  };
};

export type Cabin = {
  id: number;
  created_at: Date;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
};
