const categories = ["Dogs", "Cats", "Birds", "Rabbits"];

export default function PetCategories() {
  return (
    <section className="text-center mt-10">
      <h2 className="text-3xl font-bold mb-10">Browse by Category</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 ">
        {categories.map((item) => (
          <div
            key={item}
            className="p-16 bg-white shadow-xl rounded-xl hover:scale-105 transition hover:text-[#4cc9f0]"
          >
            <p className="font-semibold">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
