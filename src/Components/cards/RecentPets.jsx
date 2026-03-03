import Link from 'next/link';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { getPets } from '@/action/server/pets';
import { PetCard } from './Petcarts'; // PetCard export kora thakte hobe

const RecentPets = async () => {
    let pets = [];
    try {
        const allPets = await getPets();
        // Replace line 10 with this:
        pets = Array.isArray(allPets) ? allPets.slice(0, 8) : [];
    } catch (error) {
        console.error("Recent pets fetch error:", error);
    }

    if (pets.length === 0) return null;

    return (
        <section className="bg-white py-24">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

                {/* Section Header */}
                <div className="flex md:flex-row flex-col justify-between items-start md:items-end gap-6 mb-16">
                    <div className="max-w-2xl">
                        <div className="inline-block bg-orange-100 mb-4 px-4 py-1.5 rounded-full font-bold text-orange-600 text-xs uppercase tracking-widest">
                            New Arrivals
                        </div>
                        <h2 className="font-black text-gray-900 text-5xl md:text-6xl leading-[1.1] tracking-tighter">
                            Recent <span className="text-orange-500">Friends</span> <br />
                            Waiting for Home
                        </h2>
                    </div>

                    <Link
                        href="/all-pets"
                        className="group flex items-center gap-3 bg-orange-600 hover:bg-gray-900 shadow-gray-200 shadow-xl px-8 py-4 rounded-2xl font-bold text-white transition-all duration-300"
                    >
                        View All Pets
                        <FaLongArrowAltRight className="transition-transform group-hover:translate-x-2" />
                    </Link>
                </div>

                {/* Grid Layout - 8 Cards */}
                <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {pets.map(pet => (
                        <PetCard key={pet._id?.toString() || pet.id} pet={pet} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecentPets;