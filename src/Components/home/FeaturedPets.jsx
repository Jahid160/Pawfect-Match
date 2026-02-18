import Image from "next/image";

const pets = [
  {
    id: 1,
    name: "Buddy",
    age: "2 Years",
    img: "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhdHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 2,
    name: "Milo",
    age: "1 Year",
    img: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0fGVufDB8fDB8fHww",
  },
  {
    id: 3,
    name: "Tom",
    age: "1.5 Year",
    img: "https://images.unsplash.com/photo-1503777119540-ce54b422baff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhdHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 4,
    name: "Nik",
    age: "4 Year",
    img: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGRvZ3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 5,
    name: "Jamy",
    age: "1 Year",
    img: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNhdHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 6,
    name: "Ultars",
    age: "2 Year",
    img: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmlyZHN8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 7,
    name: "Miku",
    age: "1 Year",
    img: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFiaXR8ZW58MHx8MHx8fDA%3D",
  },
];

export default function FeaturedPets() {
  return (
    <section className="px-6 mt-10">
      <h2 className="text-3xl font-bold text-center mb-10">Featured Pets</h2>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pets.map((pet) => (
          <div
            key={pet.id}
            className="bg-white shadow rounded-xl overflow-hidden hover:scale-105 transition"
          >
            <div className="relative w-full h-68">
              <Image
                src={pet.img}
                alt={pet.name}
                fill
                className="object-cover rounded-t-xl"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold">{pet.name}</h3>
              <p className="text-sm text-gray-500">{pet.age}</p>
              <button className="mt-3 bg-primary text-white px-4 py-2 rounded-lg">
                Adopt
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
