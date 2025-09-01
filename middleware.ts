// middleware.ts (optional)
import { NextResponse, NextRequest } from "next/server";
export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin/studio")) {
    const secret = req.cookies.get("studio_secret")?.value;
    if (secret !== process.env.STUDIO_SECRET) {
      const url = req.nextUrl.clone();
      url.pathname = "/404"; // TODO: add tiny login page
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}
