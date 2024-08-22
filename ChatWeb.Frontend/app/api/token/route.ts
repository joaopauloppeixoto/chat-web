import { cookies } from "next/headers";

export async function DELETE(req: any) {
  cookies().delete("token");

  return Response.json({}, { status: 200 });
}
