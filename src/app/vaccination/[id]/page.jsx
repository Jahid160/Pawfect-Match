import { getVaccineById } from "@/action/server/vaccines"; // ✅ MUST IMPORT
import { notFound } from "next/navigation";

export default async function VaccineDetails({ params }) {
  const id = params.id; // ✅ FIXED (NOT resolvedParams)

  const vaccine = await getVaccineById(id);

  if (!vaccine) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-10">

      <img
        src={vaccine.image}
        alt={vaccine.vaccineName}
        className="w-full h-80 object-cover rounded-2xl mb-6"
      />

      <h1 className="text-3xl font-bold">{vaccine.vaccineName}</h1>
      <p className="text-gray-500 mt-2">{vaccine.forPet}</p>

      <div className="mt-4 space-y-2">
        <p><strong>Price:</strong> ${vaccine.price}</p>
        <p><strong>Stock:</strong> {vaccine.stock}</p>
        <p><strong>Manufacturer:</strong> {vaccine.manufacturer}</p>
        <p><strong>Batch:</strong> {vaccine.batchNumber}</p>
        <p><strong>Expiry:</strong> {vaccine.expiryDate}</p>
      </div>

      <p className="mt-6">{vaccine.description}</p>
    </div>
  );
}