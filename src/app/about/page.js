export default function About() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-black dark:text-white">About Us</h1>
        <div className="bg-white dark:bg-zinc-900 rounded-lg p-8 shadow-lg">
          <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Welcome to Pawfect Match! We are dedicated to helping pets find their perfect forever homes. 
            Our platform connects loving families with adorable animals in need of care and companionship.
          </p>
        </div>
      </div>
    </div>
  );
}