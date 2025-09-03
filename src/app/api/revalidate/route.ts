// app/api/revalidate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import crypto from "crypto";

type TCustomRequest = NextRequest & { __BODY: string };

function verifyHmac(req: TCustomRequest, secret: string) {
  const signature = req.headers.get("x-sanity-signature"); // set in Sanity webhook (Advanced)
  if (!signature) return false;
  const body = req.__BODY ?? ""; // we’ll re-read below if empty
  const hmac = crypto.createHmac("sha256", secret).update(body).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(hmac));
}

export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret)
    return NextResponse.json(
      { ok: false, error: "No secret configured" },
      { status: 500 }
    );

  const url = new URL(req.url);
  const signature =
    req.headers.get("x-sanity-signature") ||
    req.headers.get("x-vercel-signature") ||
    url.searchParams.get("secret");

  if (signature !== secret) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Read raw JSON string for HMAC
  const bodyText = await req.text();
  (req as TCustomRequest).__BODY = bodyText;
  let parsed: Record<string, unknown> = {};
  try {
    parsed = JSON.parse(bodyText);
  } catch {}

  // Optional HMAC verification (enable in webhook)
  const hmacOk = verifyHmac(req as TCustomRequest, secret);
  if (!hmacOk) {
    return NextResponse.json(
      { ok: false, error: "Bad signature" },
      { status: 401 }
    );
  }

  // SCOPED revalidation
  // Sanity payload: check which types changed and revalidate only those tags
  const types = new Set<string>();
  if (typeof parsed?._type === "string") types.add(parsed._type as string); // single doc
  if (Array.isArray(parsed?.ids) && parsed?.transition) {
    // draft->publish
    // fallback to generic tags if needed
  }
  // Minimal mapping
  const map: Record<string, string[]> = {
    project: ["project", "tag"],
    tag: ["tag", "project"],
    about: ["about"],
    experience: ["experience"],
    themeSettings: ["themeSettings"],
    contactSettings: ["contactSettings"],
    resumeSettings: ["resumeSettings"],
  };

  if (types.size === 0) {
    // generic catch-all if payload doesn’t include _type
    [
      "project",
      "tag",
      "about",
      "experience",
      "themeSettings",
      "contactSettings",
      "resumeSettings",
    ].forEach(revalidateTag);
  } else {
    for (const t of types) (map[t] ?? [t]).forEach(revalidateTag);
  }

  return NextResponse.json({ ok: true });
}
