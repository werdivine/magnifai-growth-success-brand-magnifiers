import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST() {
  // @ts-ignore - Next.js 16 changed revalidateTag signature to require 2 arguments in types
  revalidateTag("prismic");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
