import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { createStripeCheckoutFromCart } from "@/action/server/stripe";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await createStripeCheckoutFromCart(session.user.email);

  return Response.json(result);
}