import { getAllOrders } from "@/action/server/orders";
import DoctorManagement from "@/Components/dashboardlayouts/DoctorsProfiles";

export default async function Page() {
  const orders = await getAllOrders();
  return <DoctorManagement allOrders={orders} />;
}