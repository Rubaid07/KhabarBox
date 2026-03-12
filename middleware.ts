import { NextRequest } from "next/server";
import { proxyLogic } from "./proxy"; 

export default function middleware(request: NextRequest) {
  return proxyLogic(request);
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/orders/:path*",
    "/cart/:path*",
    "/provider/dashboard/:path*",
    "/admin/dashboard/:path*",
  ],
};