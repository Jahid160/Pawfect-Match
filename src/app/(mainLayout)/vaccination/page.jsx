import { connection } from "next/server";
import { getVaccines } from "@/action/server/vaccines";
import VaccinationList from "@/Components/VaccinationList/VaccinationList";

export default async function VaccinationPage() {
  await connection();
  const vaccines = await getVaccines();

  return (
    <div className="min-h-screen bg-base-200">
      <VaccinationList vaccines={vaccines} />
    </div>
  );
}
