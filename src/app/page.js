import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6 text-black dark:text-white">
            Find Your Perfect Pet Companion
          </h1>
          <p className="text-xl text-zinc-700 dark:text-zinc-300 mb-10 max-w-2xl mx-auto">
            Connecting loving families with adorable pets in need of forever homes. 
            Start your journey to pet parenthood today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/services"
              className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              Browse Pets
            </a>
            <a
              href="/about"
              className="border-2 border-black dark:border-white text-black dark:text-white px-8 py-3 rounded-lg font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
