
import { getAllOrders } from "@/action/server/order";
import DoctorManagement from "@/Components/dashboardlayouts/DoctorManagement.jsx";

export default async function Page() {
  const orders = await getAllOrders();
  return <DoctorManagement allOrders={orders} />;
}