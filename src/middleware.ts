// import { NextRequest, NextResponse } from "next/server";

// export function middleware(request: NextRequest) {
//   console.log(request);

//   return NextResponse.redirect(new URL("/about"));
// }

import { auth } from "./lib/auth";
export const middleware = auth;

export const config = {
  matcher: ["/account", "/cabins"],
};
