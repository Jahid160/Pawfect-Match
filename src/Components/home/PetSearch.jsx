export default function PetSearch() {
  return (
    <section className="shadow-xl px-6 py-14 text-center mt-10">
      <h2 className="text-3xl font-bold mb-8">Find Your Pet</h2>

      <div className="flex flex-col md:flex-row gap-4 justify-center pb-2.5 px-6">
        <input className="p-3 rounded-lg w-64" placeholder="Pet type" />
        <input className="p-3 rounded-lg w-64" placeholder="Location" />
        <button className="bg-primary  px-6 rounded-lg bg-[#4cc9f0] hover:bg-[#12bef2]">Search</button>
      </div>
    </section>
  );
}
