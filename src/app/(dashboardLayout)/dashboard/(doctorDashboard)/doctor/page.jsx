// import DoctorDashboardHome from '@/Components/dashboardlayouts/DoctorDashboard/DoctorDashboardHome';
// import { getAppointmentsOrders, getCompletedOrdersHistory } from "@/action/doctorServerDash/vaccin";

// export const dynamic = "force-dynamic"; 

// const DoctorPage = async () => {
//   const pendingData = await getAppointmentsOrders() || [];
//   const completedData = await getCompletedOrdersHistory() || [];

//   const now = new Date();
//   const overdueData = pendingData.filter(apt => {
//     return apt.deadlineDate && new Date(apt.deadlineDate) < now;
//   });

//   const stats = {
//     pending: pendingData.length,
//     completed: completedData.length,
//     overdue: overdueData.length
//   };

//   return (
//     <main>
//       <DoctorDashboardHome stats={stats} />
//     </main>
//   );
// };

// export default DoctorPage;