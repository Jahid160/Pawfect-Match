import { ArrowRight } from "lucide-react";

const steps = [
  "Find your pet",
  "Submit application",
  "Meet the pet",
  "Take home",
];

export default function AdoptionProcess() {
  return (
    <section className="text-center px-6 mt-16">
      <h2 className="text-3xl font-bold mb-12">How Adoption Works</h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-6">
            {/* Step Card */}
            <div className="p-16 w-52 shadow-lg rounded-xl bg-white">
              <p className="font-semibold">{step}</p>
            </div>

            {/* Arrow */}
            {i !== steps.length - 1 && (
              <ArrowRight className="hidden md:block text-[#4cc9f0]" size={32} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
