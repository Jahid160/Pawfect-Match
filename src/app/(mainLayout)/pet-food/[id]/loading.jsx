import { FaArrowLeft } from "react-icons/fa";

const FoodDetailsSkeleton = () => {
  return (
    <div className="bg-base-200 min-h-screen px-6 py-10 animate-pulse">
      <div className="mx-auto max-w-7xl">
        {/* Back Button Skeleton */}
        <div className="flex items-center gap-2 mb-8 w-32 h-6 bg-gray-300 rounded-lg"></div>

        <div className="grid md:grid-cols-2 gap-10 bg-base-100 shadow p-8 rounded-3xl">
          {/* Image Skeleton */}
          <div className="bg-base-200 rounded-2xl min-h-[450px] flex items-center justify-center">
             <div className="w-3/4 h-3/4 bg-gray-300 rounded-xl"></div>
          </div>

          {/* Content Skeleton */}
          <div>
            <div className="flex gap-3 mb-3">
              <div className="h-6 w-20 bg-gray-300 rounded-full"></div>
              <div className="h-6 w-20 bg-gray-300 rounded-full"></div>
            </div>

            <div className="h-10 w-3/4 bg-gray-300 rounded-lg mb-4"></div>

            <div className="h-10 w-1/4 bg-gray-300 rounded-lg mb-6"></div>

            <div className="space-y-3 mb-6">
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
              <div className="h-4 w-28 bg-gray-300 rounded"></div>
            </div>

            {/* Description Skeleton */}
            <div className="mb-6">
              <div className="h-6 w-32 bg-gray-300 rounded mb-2"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Buttons Skeleton */}
            <div className="flex flex-wrap gap-4 mt-10">
              <div className="h-14 w-40 bg-gray-300 rounded-xl"></div>
              <div className="h-14 w-40 bg-gray-300 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailsSkeleton;