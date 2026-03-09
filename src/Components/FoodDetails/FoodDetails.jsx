"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaArrowLeft,
  FaLeaf,
  FaWeightHanging,
  FaBoxOpen,
  FaTag,
  FaShoppingCart,
  FaTimesCircle,
  FaCheckCircle,
} from "react-icons/fa";

const FoodDetails = ({ food }) => {
  if (!food?._id) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <FaTimesCircle className="text-red-500 text-4xl mb-4" />
        <h2 className="text-2xl font-bold">Food not found</h2>

        <Link
          href="/petfoods"
          className="mt-6 bg-primary text-white px-6 py-3 rounded-xl"
        >
          Back to Foods
        </Link>
      </div>
    );
  }

  const hasDiscount =
    food.discountPrice && food.discountPrice < food.price;

  const isOutOfStock =
    food.inStock === false || food.stock <= 0;

  return (
    <div className="bg-base-200 min-h-screen px-6 py-10">
      <div className="max-w-7xl mx-auto">

        <Link
          href="/petfoods"
          className="flex items-center gap-2 mb-8 text-primary font-bold"
        >
          <FaArrowLeft /> Back to foods
        </Link>

        <div className="grid md:grid-cols-2 gap-10 bg-base-100 p-8 rounded-3xl shadow">

          {/* IMAGE */}
          <div className="relative flex justify-center items-center bg-base-200 rounded-2xl min-h-[450px]">

              {hasDiscount && (
                <span className="top-5 left-5 absolute bg-red-500 px-4 py-1 rounded-full font-bold text-xs text-white">
                  SALE
                </span>
              )}

              <Image
                src={food.image || "https://placehold.co/700x700"}
                alt={food.productName}
                width={600}
                height={600}
                className="object-contain max-h-[420px]"
              />
            </div>

          {/* DETAILS */}
          <div>

            <div className="flex gap-3 mb-3">
              <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-bold">
                {food.brand}
              </span>

              <span className="bg-base-200 px-4 py-1 rounded-full text-xs font-bold">
                {food.foodType}
              </span>
            </div>

            <h1 className="text-4xl font-black mb-4">
              {food.productName}
            </h1>

            {/* Price */}
            <div className="mb-6">
              {hasDiscount ? (
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-black text-error">
                    ${food.discountPrice}
                  </span>

                  <span className="line-through text-gray-400 text-lg">
                    ${food.price}
                  </span>
                </div>
              ) : (
                <span className="text-4xl font-black">
                  ${food.price}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="space-y-3 text-sm mb-6">

              <p className="flex items-center gap-2">
                <FaWeightHanging /> {food.weight}{food.weightUnit}
              </p>

              <p className="flex items-center gap-2">
                <FaBoxOpen /> Stock: {food.stock}
              </p>

              <p className="flex items-center gap-2">
                {isOutOfStock ? (
                  <>
                    <FaTimesCircle className="text-red-500" />
                    Out of stock
                  </>
                ) : (
                  <>
                    <FaCheckCircle className="text-green-500" />
                    Available
                  </>
                )}
              </p>

            </div>

            {/* Description */}
            {food.description && (
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-2">
                  Description
                </h3>

                <p className="text-gray-500">
                  {food.description}
                </p>
              </div>
            )}

            {/* Ingredients */}
            {food.ingredients && (
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-2">
                  Ingredients
                </h3>

                <p className="text-gray-500">
                  {food.ingredients}
                </p>
              </div>
            )}

            {/* Tags */}
            {food.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {food.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-2 bg-base-200 px-3 py-1 rounded-full text-sm"
                  >
                    <FaTag /> {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Add to Cart */}
            <div className="flex gap-4 mt-10">

              <button
                disabled={isOutOfStock}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition ${
                  isOutOfStock
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-primary hover:bg-primary/90 text-white"
                }`}
              >
                <FaShoppingCart />
                Add to Cart
              </button>

              <Link
                href="/pet-food"
                className="bg-gray-900 hover:bg-black px-8 py-4 rounded-xl font-bold text-white"
              >
                Continue Shopping
              </Link>

            </div>

            {/* Trust badges */}
            <div className="flex gap-6 mt-8 text-gray-500 text-sm">
              <span>✔ Secure Payment</span>
              <span>✔ Fast Delivery</span>
              <span>✔ Quality Guarantee</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
