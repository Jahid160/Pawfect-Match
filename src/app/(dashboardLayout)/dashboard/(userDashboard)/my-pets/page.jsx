
import { getUserApprovedPets } from "@/action/userServerDash/myPets";
import MyPetsList from "./MyPetsList";

const MyPetsPage = async () => {
  const result = await getUserApprovedPets();
  const pets = result.success ? result.data : [];

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900">
          My <span className="text-orange-500">Pets</span>
        </h1>
        <p className="text-slate-500 font-medium">
          These are the pets approved for you.
        </p>
      </div>

      {pets.length > 0 ? (
        <MyPetsList pets={pets} />
      ) : (
        <div className="bg-white p-20 rounded-[2.5rem] border border-dashed border-slate-300 text-center">
          <p className="text-slate-400 font-bold">
            No approved pets yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyPetsPage;
