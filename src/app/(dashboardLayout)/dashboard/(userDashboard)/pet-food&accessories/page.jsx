
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import MyOrdersClient from "@/Components/dashboardlayouts/UserDashboard/Pet-Foods-Accessories/MyOrdersClient";
import { getOrdersByEmail } from "@/action/server/order";

const PetFoodAccessoriesPage = async () => {
  const session = await getServerSession(authOptions);

  // not logged in
  if (!session?.user?.email) {
    redirect("/login");
  }

  // optional: role check
  if (session.user.role !== "user") {
    redirect("/");
  }

  const orders = await getOrdersByEmail(session.user.email);

  return <MyOrdersClient orders={orders} />;
};

export default PetFoodAccessoriesPage;

