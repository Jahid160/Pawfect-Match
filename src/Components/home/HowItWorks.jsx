import React from 'react';
import { FaSearch, FaFileAlt, FaUserFriends, FaHome } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Find Your Match",
      description: "Browse through our gallery of adorable pets and use filters to find the one that fits your lifestyle perfectly.",
      icon: <FaSearch className="text-3xl" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      title: "Apply for Adoption",
      description: "Submit a simple adoption form with your details. Our team will review it to ensure a safe and happy home.",
      icon: <FaFileAlt className="text-3xl" />,
      color: "bg-orange-100 text-orange-600",
    },
    {
      id: 3,
      title: "Meet Your Friend",
      description: "Schedule a meet-and-greet session to build a connection with your future companion before making it official.",
      icon: <FaUserFriends className="text-3xl" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 4,
      title: "Bring Them Home",
      description: "Complete the final paperwork and welcome your new family member to their forever home!",
      icon: <FaHome className="text-3xl" />,
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-3 font-bold text-orange-500 text-sm uppercase tracking-widest">
            Simple Process
          </h2>
          <h3 className="font-black text-gray-900 text-4xl md:text-5xl leading-tight">
            How It <span className="text-orange-500">Works</span>
          </h3>
          <div className="bg-orange-500 mx-auto mt-4 rounded-full w-24 h-1.5"></div>
        </div>

        {/* Steps Grid */}
        <div className="relative gap-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Connector Line (Desktop Only) */}
          <div className="hidden lg:block top-1/4 left-0 -z-10 absolute bg-gray-100 w-full h-0.5"></div>

          {steps.map((step, index) => (
            <div key={step.id} className="group flex flex-col items-center text-center">
              
              {/* Icon Circle */}
              <div className={`w-20 h-20 ${step.color} rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 relative border-4 border-white`}>
                {step.icon}
                {/* Step Number Badge */}
                <div className="-top-2 -right-2 absolute flex justify-center items-center bg-gray-900 rounded-full w-8 h-8 font-bold text-white text-xs">
                  {step.id}
                </div>
              </div>

              {/* Text Content */}
              <h4 className="mb-3 font-bold text-gray-800 group-hover:text-orange-500 text-xl transition-colors">
                {step.title}
              </h4>
              <p className="px-4 text-gray-500 leading-relaxed">
                {step.description}
              </p>

              {/* Decorative arrow for mobile/tablet flow (optional) */}
              {index !== steps.length - 1 && (
                <div className="lg:hidden mt-8 text-gray-200">
                   <div className="bg-gray-100 mx-auto w-0.5 h-12"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="mb-6 font-medium text-gray-600">Ready to start your journey?</p>
          <button className="bg-orange-500 hover:bg-orange-600 shadow-orange-200 shadow-xl px-10 py-4 rounded-2xl font-black text-white uppercase tracking-wider transition-all hover:-translate-y-1 transform">
             Get Started Now
          </button>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;