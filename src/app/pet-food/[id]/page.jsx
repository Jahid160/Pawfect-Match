import Image from "next/image";
import Link from "next/link";
import { getSingleFood } from "@/action/server/foods";
import {
  FaArrowLeft,
  FaLeaf,
  FaWeightHanging,
  FaBoxOpen,
  FaTag,
  FaCheckCircle,
  FaTimesCircle,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";

const PetFoodDetailsPage = async ({ params }) => {
  const { id } = await params;

  const food = await getSingleFood(id);

  if (!food?._id) {
    return (
      <div className="flex flex-col justify-center items-center px-4 min-h-screen bg-base-200 text-center">
        <div className="bg-red-100 mb-6 p-6 rounded-full">
          <FaTimesCircle className="text-red-500 text-4xl" />
        </div>
        <h2 className="font-black text-neutral text-3xl">Food not found</h2>
        <p className="mt-3 text-neutral/60">
          The product you are looking for does not exist or was removed.
        </p>
        <Link
          href="/petfoods"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 mt-6 px-6 py-3 rounded-2xl font-bold text-white transition"
        >
          <FaArrowLeft /> Back to Foods
        </Link>
      </div>
    );
  }

  const hasDiscount =
    food.discountPrice && Number(food.discountPrice) < Number(food.price);

  const isOutOfStock = food.inStock === false || food.stock <= 0;

  return (
    <main className="bg-base-200 px-4 sm:px-8 py-10 min-h-screen">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/pet-food"
          className="inline-flex items-center gap-2 mb-8 font-bold text-primary hover:underline"
        >
          <FaArrowLeft />
          Back to Pet Foods
        </Link>

        <div className="gap-10 grid grid-cols-1 lg:grid-cols-2 bg-base-100 shadow-xl p-6 md:p-10 border border-base-300 rounded-[2.5rem] overflow-hidden">
          <div className="relative flex justify-center items-center bg-secondary/30 rounded-[2rem] min-h-[420px] overflow-hidden">
            {hasDiscount && (
              <span className="top-6 left-6 z-10 absolute bg-error px-4 py-2 rounded-full font-black text-xs text-white uppercase tracking-widest">
                Sale
              </span>
            )}

            {food.featured && (
              <span className="top-6 right-6 z-10 absolute bg-primary px-4 py-2 rounded-full font-black text-xs text-white uppercase tracking-widest">
                Featured
              </span>
            )}

            <Image
              src={food.image || "https://placehold.co/700x700?text=Pet+Food"}
              alt={food.productName || "Pet Food"}
              width={700}
              height={700}
              className={`object-contain p-8 max-h-[500px] w-auto  ${
                isOutOfStock ? "grayscale opacity-70" : ""
              }`}
            />

            {isOutOfStock && (
              <div className="absolute inset-0 flex justify-center items-center bg-black/10 backdrop-blur-[2px]">
                <span className="bg-neutral/80 px-5 py-3 rounded-2xl font-black text-white text-sm uppercase tracking-widest">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-primary/10 px-4 py-2 rounded-full font-black text-primary text-xs uppercase tracking-widest">
                {food.brand}
              </span>
              <span className="bg-base-200 px-4 py-2 rounded-full font-black text-neutral/60 text-xs uppercase tracking-widest">
                {food.foodType}
              </span>
              <span className="bg-emerald-100 px-4 py-2 rounded-full font-black text-emerald-600 text-xs uppercase tracking-widest">
                {food.category}
              </span>
            </div>

            <h1 className="font-black text-neutral text-4xl md:text-5xl tracking-tighter leading-tight">
              {food.productName}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mt-5 text-sm">
              <div className="flex items-center gap-2 text-neutral/70">
                <FaWeightHanging className="text-primary" />
                <span className="font-bold">
                  {food.weight} {food.weightUnit}
                </span>
              </div>

              <div className="flex items-center gap-2 text-neutral/70">
                <FaBoxOpen className="text-primary" />
                <span className="font-bold">Stock: {food.stock ?? 0}</span>
              </div>

              <div className="flex items-center gap-2 text-neutral/70">
                {isOutOfStock ? (
                  <>
                    <FaTimesCircle className="text-red-500" />
                    <span className="font-bold text-red-500">Unavailable</span>
                  </>
                ) : (
                  <>
                    <FaCheckCircle className="text-emerald-500" />
                    <span className="font-bold text-emerald-600">In Stock</span>
                  </>
                )}
              </div>
            </div>

            <div className="mt-8">
              {hasDiscount ? (
                <div className="flex items-end gap-4">
                  <span className="font-black text-error text-4xl tracking-tighter">
                    ${food.discountPrice}
                  </span>
                  <span className="mb-1 font-bold text-neutral/30 text-lg line-through">
                    ${food.price}
                  </span>
                </div>
              ) : (
                <span className="font-black text-neutral text-4xl tracking-tighter">
                  ${food.price}
                </span>
              )}
            </div>

            {food.description && (
              <div className="mt-8">
                <h3 className="mb-3 font-black text-neutral text-xl">
                  Description
                </h3>
                <p className="text-neutral/70 leading-8">{food.description}</p>
              </div>
            )}

            {food.ingredients && (
              <div className="mt-8">
                <h3 className="mb-3 font-black text-neutral text-xl">
                  Ingredients
                </h3>
                <p className="text-neutral/70 leading-8">{food.ingredients}</p>
              </div>
            )}

            {Array.isArray(food.ageGroup) && food.ageGroup.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-3 font-black text-neutral text-xl">
                  Age Group
                </h3>
                <div className="flex flex-wrap gap-3">
                  {food.ageGroup.map((age, index) => (
                    <span
                      key={index}
                      className="bg-secondary px-4 py-2 rounded-full font-bold text-primary text-sm"
                    >
                      {age}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {Array.isArray(food.tags) && food.tags.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-3 font-black text-neutral text-xl">Tags</h3>
                <div className="flex flex-wrap gap-3">
                  {food.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 bg-base-200 px-4 py-2 rounded-full font-bold text-neutral/70 text-sm"
                    >
                      <FaTag className="text-primary" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 mt-10">
              <div className="bg-base-200 p-5 rounded-[1.8rem] text-center">
                <FaLeaf className="mx-auto mb-3 text-primary text-2xl" />
                <p className="font-black text-sm text-neutral uppercase tracking-widest">
                  Category
                </p>
                <p className="mt-1 font-bold text-neutral/70">{food.category}</p>
              </div>

              <div className="bg-base-200 p-5 rounded-[1.8rem] text-center">
                <FaWeightHanging className="mx-auto mb-3 text-primary text-2xl" />
                <p className="font-black text-sm text-neutral uppercase tracking-widest">
                  Weight
                </p>
                <p className="mt-1 font-bold text-neutral/70">
                  {food.weight} {food.weightUnit}
                </p>
              </div>

              <div className="bg-base-200 p-5 rounded-[1.8rem] text-center">
                <FaStar className="mx-auto mb-3 text-primary text-2xl" />
                <p className="font-black text-sm text-neutral uppercase tracking-widest">
                  Brand
                </p>
                <p className="mt-1 font-bold text-neutral/70">{food.brand}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-10">
              <button
                disabled={isOutOfStock}
                className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition active:scale-95 ${
                  isOutOfStock
                    ? "bg-gray-300 cursor-not-allowed text-gray-500"
                    : "bg-primary hover:bg-primary/90 text-white"
                }`}
              >
                <FaShoppingCart />
                {isOutOfStock ? "Unavailable" : "Add to Cart"}
              </button>

              <Link
                href="/pet-food"
                className="inline-flex items-center gap-3 bg-neutral hover:bg-neutral/90 px-8 py-4 rounded-2xl font-black text-white text-sm uppercase tracking-widest transition active:scale-95"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PetFoodDetailsPage;
