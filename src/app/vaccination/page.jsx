import { getVaccines } from "@/action/server/vaccines";
import { VaccinationCard } from "@/Components/cards/VaccinationCard";

export default async function Vaccination() {
  const vaccines = await getVaccines();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 mt-10 gap-6">
      {vaccines.map((v) => (
        <VaccinationCard key={v._id} vaccine={v} />
      ))}
    </div>
  );
}