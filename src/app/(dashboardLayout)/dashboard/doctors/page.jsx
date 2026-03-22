import { getAllOrders } from "@/action/server/orders"; // পাথ ঠিক করুন
import DoctorManagement from "@/Components/dashboardlayouts/DoctorManagement.jsx";

// এটি পেজটিকে প্রতিবার ফ্রেশ ডাটা আনতে বাধ্য করবে
export const dynamic = "force-dynamic"; 

export default async function Page() {
  const orders = await getAllOrders();
  return <DoctorManagement allOrders={orders || []} />;
}