import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect, notFound } from "next/navigation";
import SingleOrderClient from "@/Components/dashboardlayouts/UserDashboard/Pet-Foods-Accessories/SingleOrderClient";
import { getSingleOrder } from "@/action/server/order";

const SingleOrderPage = async ({ params }) => {
  const resolvedParams = await params; 

  const session = await getServerSession(authOptions);

  // not logged in
  if (!session?.user?.email) {
    redirect("/login");
  }

  // optional role check
  if (session.user.role !== "user") {
    redirect("/");
  }

  const order = await getSingleOrder(resolvedParams.id, session.user.email);

  if (!order) {
    notFound();
  }

  return <SingleOrderClient order={order} />;
};

export default SingleOrderPage;

