import { cookies } from "next/headers";

export async function DELETE(req: any) {
  const cookieStore = await cookies();
  cookieStore.delete("token");

  return Response.json({}, { status: 200 });
}
