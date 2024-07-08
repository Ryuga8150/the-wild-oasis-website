"use client";
import { useState } from "react";
import SelectCountry from "@/components/SelectCountry";
import Image from "next/image";
import { updateGuest } from "@/lib/actions";
import { useFormStatus } from "react-dom";
import SubmitButton from "./SubmitButton";

type Props = {
  children: React.ReactNode;
  guest: {
    fullName: string;
    email: string;
    nationality: string;
    nationalID: string;
    countryFlag: string;
  };
};

const UpdateProfileForm = ({ guest, children }: Props) => {
  const [count, setCount] = useState();

  const { fullName, email, nationalID, nationality, countryFlag } = guest;

  return (
    <form
      action={updateGuest}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          defaultValue={fullName}
          name="fullName"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          defaultValue={email}
          name="email"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <img
            src={countryFlag}
            alt="Country flag"
            className="h-5 rounded-sm"
          />
        </div>
        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          defaultValue={nationalID}
          name="nationalID"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton pendingLabel="Updating...">
          Update Profile Form
        </SubmitButton>
      </div>
    </form>
  );
};

export default UpdateProfileForm;