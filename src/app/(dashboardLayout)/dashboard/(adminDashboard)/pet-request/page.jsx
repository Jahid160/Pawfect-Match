import { getPetRequests } from "@/action/server/pets";
import PetRequestTable from "@/Components/dashboardlayouts/AdminDashboard/PetRequest/PetRequestTable";


const PetRequestPage = async () => {
  // SSR: Fetching data from EntryReq collection
  const result = await getPetRequests();
  const requests = result.success ? result.data : [];

  console.log(requests);

  return (
    <div className="bg-[#F8FAFC] p-6 lg:p-10 min-h-screen">
      <div className="mb-10">
        <h1 className="font-black text-slate-900 text-4xl tracking-tight">
          Entry <span className="text-orange-500">Requests</span>
        </h1>
        <p className="mt-2 font-medium text-slate-500">
          Showing {requests.length} pets waiting for approval.
        </p>
      </div>

      <PetRequestTable initialRequests={requests} />
    </div>
  );
};

export default PetRequestPage;