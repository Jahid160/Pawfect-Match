import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto p-4 md:p-8 bg-base-200 min-h-screen mt-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-primary mb-10">
          About PawFect
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Story Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-10">
            <div>
              <img 
                src="https://i.ibb.co.com/WWjtVH7r/Gemini-Generated-Image-12c9i912c9i912c9.png" 
                alt="PawMart Team" 
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">Our Story</h2>
              <p className="text-gray-700 leading-relaxed">
                PawMart was founded with a simple mission: to connect pet lovers with quality products and services while 
                promoting responsible pet ownership. We believe that every pet deserves love, care, and the best possible 
                products to thrive.
              </p>
            </div>
          </div>

          {/* Mission, Vision, Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-base-100 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold text-primary mb-3">Our Mission</h3>
              <p className="text-gray-600">
                To create a safe and reliable platform for pet adoption and pet care products while fostering 
                responsible pet ownership.
              </p>
            </div>
            <div className="bg-base-100 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold text-primary mb-3">Our Vision</h3>
              <p className="text-gray-600">
                A world where every pet finds a loving home and receives the care they deserve through 
                quality products and services.
              </p>
            </div>
            <div className="bg-base-100 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold text-primary mb-3">Our Values</h3>
              <p className="text-gray-600">
                Compassion, Responsibility, Quality, and Community - these values guide everything we do at PawMart.
              </p>
            </div>
          </div>

          {/* Why Choose PawMart */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-primary mb-4">Why Choose PawMart?</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2">✓</span>
                <span>Verified sellers and authentic products</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2">✓</span>
                <span>Secure payment and delivery options</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2">✓</span>
                <span>Comprehensive adoption guidelines</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2">✓</span>
                <span>24/7 customer support</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2">✓</span>
                <span>Quality assurance for all products</span>
              </li>
            </ul>
          </div>

          {/* Meet Our Team */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Meet Our Team</h2>
            <p className="text-gray-700 mb-6">
              Our dedicated team of pet enthusiasts and professionals work tirelessly to ensure the best experience 
              for both pets and their owners.
            </p>
            <button className="btn btn-primary rounded-lg">
              Join Our Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
