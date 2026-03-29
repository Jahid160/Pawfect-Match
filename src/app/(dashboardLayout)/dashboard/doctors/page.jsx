import { getAllOrders, getDoctorOrders } from "@/action/server/orders";

import DoctorManagement from "@/Components/dashboardlayouts/DoctorManagement.jsx";


export const dynamic = "force-dynamic"; 

export default async function Page() {
  const orders = await getDoctorOrders();

  return <DoctorManagement allOrders={orders || []} />;
}