import { getVaccines } from "@/action/server/vaccines";
import { VaccinationCard } from "@/Components/cards/VaccinationCard";

export default async function VaccinationPage() {
  const vaccines = await getVaccines();

  return (
    <div className="min-h-screen bg-[#FDF8F4] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {vaccines.map((item) => (
          // JSON.stringify নিশ্চিত করে যে সব ডাটা ঠিকমতো পাস হচ্ছে
          <VaccinationCard key={item._id} vaccine={JSON.parse(JSON.stringify(item))} />
        ))}
      </div>
    </div>
  );
}