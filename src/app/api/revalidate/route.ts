import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST() {
  // Next.js 16+ requires a second argument for cache expiration
  // Using { expire: 0 } for immediate cache invalidation from webhooks
  revalidateTag("prismic", { expire: 0 });

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
