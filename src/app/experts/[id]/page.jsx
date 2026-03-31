import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaArrowLeft,
  FaLinkedinIn,
  FaTwitter,
  FaEnvelope,
  FaUserMd,
  FaStethoscope,
  FaAward,
  FaHeart,
  FaCheckCircle,
  FaPhoneAlt,
} from "react-icons/fa";

const allExperts = [
  {
    id: 1,
    name: "Dr. Opu Dev Nath",
    role: "Senior Veterinarian",
    speciality: "Surgery & Care",
    image:
      "https://i.ibb.co.com/DfT6PcCX/Gemini-Generated-Image-lh4rxilh4rxilh4r.png",
    experience: "12+ Years",
    email: "opu@example.com",
    phone: "+1 234 567 890",
    bio: "Dr. Opu Dev Nath is a highly experienced senior veterinarian with strong expertise in pet surgery, treatment, and long-term care. He is dedicated to helping pets stay healthy and recover safely.",
  },
  {
    id: 2,
    name: "Dr. Emily Chen",
    role: "Pet Nutritionist",
    speciality: "Diet & Wellness",
    image:
      "https://i.ibb.co.com/5gmTdSk4/bermix-studio-ODM-Vs-TM2-QQ-unsplash.jpg",
    experience: "10+ Years",
    email: "emily@example.com",
    phone: "+1 234 567 891",
    bio: "Dr. Emily Chen specializes in pet nutrition and wellness. She helps pet owners build healthy diets and balanced care plans for their pets.",
  },
  {
    id: 3,
    name: "Mark Wilson",
    role: "Pet Behaviorist",
    speciality: "Training Expert",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=500",
    experience: "8+ Years",
    email: "mark@example.com",
    phone: "+1 234 567 892",
    bio: "Mark Wilson works with pets and owners to improve behavior, obedience, and communication. He focuses on trust and positive training methods.",
  },
  {
    id: 4,
    name: "James Anderson",
    role: "Rescue Coordinator",
    speciality: "Adoption Lead",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=500",
    experience: "9+ Years",
    email: "james@example.com",
    phone: "+1 234 567 893",
    bio: "James Anderson leads rescue and adoption efforts, helping pets find safe and loving homes. He is passionate about animal welfare and support.",
  },
  {
    id: 5,
    name: "Dr. Robert Fox",
    role: "Veterinary Surgeon",
    speciality: "Dental Care",
    image:
      "https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=500",
    experience: "14+ Years",
    email: "robert@example.com",
    phone: "+1 234 567 894",
    bio: "Dr. Robert Fox is a skilled veterinary surgeon with deep experience in dental care and advanced pet treatment procedures.",
  },
  {
    id: 6,
    name: "Linda Blair",
    role: "Animal Psychologist",
    speciality: "Trauma Recovery",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=500",
    experience: "11+ Years",
    email: "linda@example.com",
    phone: "+1 234 567 895",
    bio: "Linda Blair helps animals recover from fear, stress, and trauma. She works closely with rescued pets to rebuild confidence and emotional stability.",
  },
];

export default async function ExpertDetailsPage({ params }) {
  const resolvedParams = await params;
  const expertId = Number(resolvedParams.id);

  const expert = allExperts.find((item) => item.id === expertId);

  if (!expert) {
    notFound();
  }

  return (
    <div className="bg-[#fffaf5] min-h-screen">
      <div className="mx-auto px-4 sm:px-8 py-16 max-w-7xl">
        <Link
          href="/experts"
          className="inline-flex items-center gap-3 bg-white hover:bg-orange-500 shadow-md mb-10 px-6 py-3 rounded-full font-bold text-gray-800 hover:text-white transition-all"
        >
          <FaArrowLeft />
          Back to Experts
        </Link>

        <div className="gap-10 grid grid-cols-1 lg:grid-cols-2 items-center bg-white shadow-xl p-6 md:p-10 rounded-[2rem] overflow-hidden">
          <div className="relative rounded-[2rem] w-full h-[420px] md:h-[520px] overflow-hidden">
            <Image
              src={expert.image}
              alt={expert.name}
              fill
              className="object-cover"
            />
            <div className="top-5 left-5 absolute bg-white/90 px-4 py-2 rounded-full font-black text-[10px] text-orange-600 uppercase tracking-widest">
              Available
            </div>
          </div>

          <div>
            <p className="mb-3 font-black text-orange-500 text-xs uppercase tracking-[0.2em]">
              Expert Profile
            </p>

            <h1 className="mb-3 font-black text-gray-900 text-4xl md:text-6xl leading-tight">
              {expert.name}
            </h1>

            <p className="mb-2 font-bold text-orange-600 text-sm uppercase tracking-[0.15em]">
              {expert.role}
            </p>

            <p className="mb-6 text-gray-500 text-lg">
              Specialized in {expert.speciality}
            </p>

            <p className="mb-8 text-gray-600 leading-relaxed">{expert.bio}</p>

            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 mb-8">
              <div className="bg-orange-50 p-5 rounded-2xl">
                <div className="flex items-center gap-3 mb-2 text-orange-500">
                  <FaUserMd />
                  <span className="font-bold text-sm">Experience</span>
                </div>
                <p className="font-semibold text-gray-800">{expert.experience}</p>
              </div>

              <div className="bg-orange-50 p-5 rounded-2xl">
                <div className="flex items-center gap-3 mb-2 text-orange-500">
                  <FaStethoscope />
                  <span className="font-bold text-sm">Speciality</span>
                </div>
                <p className="font-semibold text-gray-800">{expert.speciality}</p>
              </div>

              <div className="bg-orange-50 p-5 rounded-2xl">
                <div className="flex items-center gap-3 mb-2 text-orange-500">
                  <FaEnvelope />
                  <span className="font-bold text-sm">Email</span>
                </div>
                <p className="font-semibold text-gray-800 break-all">
                  {expert.email}
                </p>
              </div>

              <div className="bg-orange-50 p-5 rounded-2xl">
                <div className="flex items-center gap-3 mb-2 text-orange-500">
                  <FaPhoneAlt />
                  <span className="font-bold text-sm">Phone</span>
                </div>
                <p className="font-semibold text-gray-800">{expert.phone}</p>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-gray-700">
                <FaCheckCircle className="text-orange-500" />
                Certified and trusted pet care expert
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <FaCheckCircle className="text-orange-500" />
                Personalized support for every pet
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <FaCheckCircle className="text-orange-500" />
                Strong experience in animal care and recovery
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="bg-gray-900 hover:bg-orange-500 p-4 rounded-full text-white transition-all">
                <FaLinkedinIn />
              </button>
              <button className="bg-gray-900 hover:bg-orange-500 p-4 rounded-full text-white transition-all">
                <FaTwitter />
              </button>
              <button className="bg-gray-900 hover:bg-orange-500 p-4 rounded-full text-white transition-all">
                <FaEnvelope />
              </button>
              <button className="bg-gray-900 hover:bg-orange-500 p-4 rounded-full text-white transition-all">
                <FaHeart />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
