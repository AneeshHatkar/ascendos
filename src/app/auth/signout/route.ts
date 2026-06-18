import { signOut } from "@/lib/auth/actions";

export async function GET() {
  await signOut();
}
