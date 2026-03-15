import { getVaccines } from "@/action/server/vaccines";
import { VaccinationCard } from "@/Components/cards/VaccinationCard";

export default async function Vaccination() {
  const vaccines = await getVaccines();

  return (
    <div className="bg-base-200 grid grid-cols-1 md:grid-cols-4 mt-10 gap-6 p-5">
      {vaccines.map((v) => (
        <VaccinationCard key={v._id} vaccine={v} />
      ))}
    </div>
  );
}