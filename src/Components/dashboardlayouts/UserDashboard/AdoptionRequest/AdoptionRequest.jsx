
import { getUserAdoptions } from "@/action/userServerDash/adoption";
import AdoptionListTable from "@/Components/dashboardlayouts/UserDashboard/AdoptionListTable";

const MyAdoptionsPage = async () => {
  const result = await getUserAdoptions();
  const adoptions = result.success ? result.data : [];

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">
          My <span className="text-orange-500">Adoption Requests</span>
        </h1>
        <p className="text-slate-500 font-medium">Track the status of your pet applications</p>
      </div>

      {adoptions.length > 0 ? (
        <AdoptionListTable adoptions={adoptions} />
      ) : (
        <div className="bg-white p-20 rounded-[2.5rem] border border-dashed border-slate-300 text-center">
          <p className="text-slate-400 font-bold">You haven't applied for any pets yet!</p>
        </div>
      )}
    </div>
  );
};

export default MyAdoptionsPage;