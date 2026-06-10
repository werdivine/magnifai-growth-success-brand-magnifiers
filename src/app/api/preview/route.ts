import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // Enable draft mode
  const draft = await draftMode();
  draft.enable();

  // Redirect to the documentId path or home
  const url = request.nextUrl.searchParams.get("documentId");
  redirect(url || "/");
}
