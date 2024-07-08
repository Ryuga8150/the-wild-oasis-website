import { auth } from "@/lib/auth";
import { Session } from "next-auth";
import React from "react";

type Props = {};

export const metadata = {
  title: "Guest area",
};

const page = async (props: Props) => {
  const session = await auth();

  if (!session?.user) throw new Error("Unauthorized. Please Login");

  const firstName = session.user.name;

  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {firstName}
    </h2>
  );
};

export default page;
