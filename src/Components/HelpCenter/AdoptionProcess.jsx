import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Handshake, Heart } from 'lucide-react';

const AdoptionProcess = () => {
  const steps = [
    {
      title: 'Find Your Pet',
      icon: Search,
      description: 'Search our detailed profiles of adoptable pets, filters include breed, age, and location.',
    },
    {
      title: 'Submit Application',
      icon: Handshake,
      description: 'Fill out an application to tell us more about your home and why you\'re a great fit for a new companion.',
    },
    {
      title: 'Meet and Greet',
      icon: MapPin,
      description: 'Schedule a visit to meet your potential new pet and ensure it\'s the perfect match for your family.',
    },
    {
      title: 'Welcome Home',
      icon: Heart,
      description: 'Once approved, complete the adoption agreement and bring your new furry family member home.',
    },
  ];

  const articles = [
    'Preparing Your Home',
    'Pet Care Basics',
    'Training and Socialization',
    'Post-Adoption Support',
  ];

  const resources = [
    'Adoption Handbook (PDF)',
    'Pet Insurance Guide (PDF)',
    'New Pet Checklist (PDF)',
    'Resource Downloads',
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-[#D2A68C]">Paws &amp; Homes</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md font-medium">Navigation</a>
                <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md font-medium">Helpers</a>
                <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md font-medium">Shelters</a>
                <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md font-medium">Resources</a>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md font-medium">Log in</a>
              <a href="#" className="bg-[#D2A68C] text-white px-4 py-2 rounded-md font-medium hover:bg-[#C2967C]">Sign Up</a>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center text-sm text-gray-500 space-x-1 mb-8">
          <span>Home</span>
          <span>&gt;</span>
          <span className="font-medium text-gray-700">Adoption Process</span>
        </div>

        <h1 className="text-4xl font-extrabold text-[#D2A68C] mb-12">Adoption Process</h1>

        <div className="grid md:grid-cols-4 gap-8 mb-12 relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#D2A68C] transform -translate-y-1/2 hidden md:block"></div>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col items-center relative z-10"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center mb-4">
                <span className="text-xl font-bold text-[#D2A68C] mr-2">
                  Step {index + 1}:
                </span>
                <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
              </div>
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-[#FAF8F5] border-2 border-[#D2A68C] flex items-center justify-center">
                  <step.icon className="w-12 h-12 text-[#D2A68C]" />
                </div>
              </div>
              <p className="text-gray-600 text-center mb-6 leading-relaxed flex-grow">
                {step.description}
              </p>
              <button className="bg-[#D2A68C] text-white px-6 py-2 rounded-md font-medium hover:bg-[#C2967C] w-full mt-auto">
                Read More
              </button>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-[#FAF8F5] border border-[#EBEBEB] rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Related Articles</h3>
            <ul className="space-y-4">
              {articles.map((article, index) => (
                <li key={index} className="flex items-center text-gray-700 text-base font-medium">
                  <Search className="w-5 h-5 text-[#D2A68C] mr-3" />
                  {article}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#FAF8F5] border border-[#EBEBEB] rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Resource Downloads</h3>
            <ul className="space-y-4">
              {resources.map((resource, index) => (
                <li key={index} className="flex items-center text-gray-700 text-base font-medium">
                  <Handshake className="w-5 h-5 text-[#D2A68C] mr-3" />
                  {resource}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 text-center py-6">
        <p className="text-gray-600 text-sm">Copyright © 2023. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdoptionProcess;