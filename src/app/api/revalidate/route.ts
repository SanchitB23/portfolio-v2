// app/api/revalidate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const url = new URL(req.url);
  const signature =
    req.headers.get("x-sanity-signature") ||
    req.headers.get("x-vercel-signature") ||
    url.searchParams.get("secret");

  // Simple shared secret check (configure this in the Sanity webhook URL as ?secret=...)
  if (!secret || signature !== secret) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Revalidate by type
  try {
    // Basic: always revalidate project + tag + singletons commonly used on home
    revalidateTag("project");
    revalidateTag("tag");
    revalidateTag("about");
    revalidateTag("experience");
    revalidateTag("themeSettings");
    revalidateTag("contactSettings");

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
