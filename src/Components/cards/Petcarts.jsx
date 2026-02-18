import React from 'react';
// react-icons install thakle eygulo kaj korbe
import { FaHeart, FaMapMarkerAlt, FaPaw, FaLongArrowAltRight } from 'react-icons/fa';

const PetCard = ({ pet }) => {
  return (
    <div 
      onClick={() => window.location.href = `/product/${pet.id}`}
      className="group relative flex flex-col bg-white shadow-md hover:shadow-2xl border border-gray-100 rounded-3xl overflow-hidden transition-all hover:-translate-y-2 duration-500"
    >
      {/* Image Section */}
      <div className="relative w-full h-72 overflow-hidden">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
        
        {/* Category Badge */}
        <div className="top-4 left-4 absolute flex items-center gap-2 bg-white/90 shadow-sm backdrop-blur-md px-4 py-1.5 rounded-full font-bold text-[11px] text-orange-600 uppercase tracking-wider">
          <FaPaw size={12} />
          {pet.category}
        </div>

        {/* Wishlist Icon */}
        <button 
          onClick={(e) => { e.stopPropagation(); alert("Added to Favorites!"); }}
          className="top-4 right-4 absolute bg-white/80 hover:bg-red-50 shadow-md backdrop-blur-md p-2.5 rounded-full text-gray-400 hover:text-red-500 transition-all"
        >
          <FaHeart size={18} />
        </button>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-800 group-hover:text-orange-600 text-2xl transition-colors">
            {pet.name}
          </h3>
          <span className="font-black text-orange-500 text-xl">{pet.price}</span>
        </div>

        <div className="flex flex-wrap gap-4 mb-6 text-sm">
          <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full">
            <span className="font-medium text-gray-500">Age:</span>
            <span className="font-bold text-gray-700">{pet.age}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <FaMapMarkerAlt className="text-orange-400" />
            <span className="font-semibold">{pet.location}</span>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex justify-between items-center mt-auto pt-5 border-gray-100 border-t">
          <span className="font-black text-gray-400 group-hover:text-orange-500 text-xs uppercase tracking-[2px] transition-all">
            View Profile
          </span>
          <div className="flex justify-center items-center bg-orange-100 group-hover:bg-orange-500 rounded-full w-10 h-10 text-orange-600 group-hover:text-white transition-all group-hover:translate-x-1 duration-300">
            <FaLongArrowAltRight size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Petcarts = () => {
  // 8 Unique Fake Data for Grid Testing
  const pets = [
    { id: 1, name: "Buddy", age: "2 Months", location: "Dhaka", price: "$250", category: "Dog", image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=500" },
    { id: 2, name: "Luna", age: "3 Months", location: "Sylhet", price: "$180", category: "Cat", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=500" },
    { id: 3, name: "Max", age: "1 Month", location: "Chittagong", price: "$400", category: "Dog", image: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=500" },
    { id: 4, name: "Snowy", age: "4 Months", location: "Khulna", price: "$50", category: "Rabbit", image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?q=80&w=500" },
    { id: 5, name: "Charlie", age: "5 Months", location: "Rajshahi", price: "$320", category: "Dog", image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=500" },
    { id: 6, name: "Bella", age: "2 Months", location: "Barishal", price: "$210", category: "Cat", image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=500" },
    { id: 7, name: "Rocky", age: "6 Months", location: "Comilla", price: "$450", category: "Dog", image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=500" },
    { id: 8, name: "Mimi", age: "3 Months", location: "Rangpur", price: "$120", category: "Bird", image: "https://images.unsplash.com/photo-1522926193341-e9fed19c7df4?q=80&w=500" },
  ];

  return (
    <div className="bg-gray-50 px-4 sm:px-8 py-16 min-h-screen">
      {/* Header Container */}
      <div className="flex md:flex-row flex-col justify-between md:items-end gap-4 mx-auto mb-16 max-w-7xl">
        <div>
          <h2 className="font-black text-gray-900 text-4xl leading-tight">
            Find Your <span className="text-orange-500">PawFact</span><br />
            Companion Today
          </h2>
          <div className="bg-orange-500 mt-4 rounded-full w-20 h-1.5"></div>
        </div>
        <p className="max-w-md font-medium text-gray-500">
          Browse through our list of adorable pets looking for a new home. 
          Every pet deserves a family that loves them.
        </p>
      </div>

      {/* Grid: 1 col (Mobile), 2 col (Tablet), 3 col (Desktop), 4 col (Large Screens) */}
      <div className="gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto max-w-7xl">
        {pets.map(pet => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
};

export default Petcarts;