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
        <h2 className="font-black text-3xl">Food not found</h2>
        <Link href="/petfoods" className="mt-4 btn btn-primary">
          Back to Foods
        </Link>
      </div>
    );
  }

  const hasDiscount =
    food.discountPrice && Number(food.discountPrice) < Number(food.price);

  const isOutOfStock = food.inStock === false || food.stock <= 0;

  return (
    <main className="bg-base-200 px-4 py-12 min-h-screen">
      <div className="mx-auto max-w-7xl">

        {/* Back Button */}
        <Link
          href="/pet-food"
          className="inline-flex items-center gap-2 mb-8 font-semibold text-primary hover:underline"
        >
          <FaArrowLeft /> Back to Pet Foods
        </Link>

        <div className="gap-10 grid grid-cols-1 lg:grid-cols-2">

          {/* Product Image */}
          <div className="bg-white shadow-lg p-8 border rounded-3xl">
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
          </div>

          {/* Product Info */}
          <div className="flex flex-col">

            {/* Brand */}
            <span className="mb-2 font-semibold text-primary text-sm uppercase tracking-wider">
              {food.brand}
            </span>

            {/* Title */}
            <h1 className="font-bold text-4xl leading-tight">
              {food.productName}
            </h1>

            {/* Rating */}
            {/* <div className="flex items-center gap-2 mt-3 text-yellow-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar className="text-gray-300" />
              <span className="ml-2 text-gray-500 text-sm">(120 Reviews)</span>
            </div> */}

            {/* Price */}
            <div className="mt-6">

              {hasDiscount ? (
                <div className="flex items-end gap-3">
                  <span className="font-bold text-red-500 text-4xl">
                    ${food.discountPrice}
                  </span>
                  <span className="text-gray-400 text-lg line-through">
                    ${food.price}
                  </span>
                </div>
              ) : (
                <span className="font-bold text-4xl">${food.price}</span>
              )}

            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 mt-3 text-sm">

              {isOutOfStock ? (
                <>
                  <FaTimesCircle className="text-red-500" />
                  <span className="font-semibold text-red-500">
                    Out of Stock
                  </span>
                </>
              ) : (
                <>
                  <FaCheckCircle className="text-green-500" />
                  <span className="font-semibold text-green-600">
                    In Stock ({food.stock})
                  </span>
                </>
              )}

            </div>

            {/* Description */}
            {food.description && (
              <p className="mt-6 text-gray-600 leading-7">
                {food.description}
              </p>
            )}

            {/* Info Grid */}
            <div className="gap-4 grid grid-cols-3 mt-8">

              <div className="bg-base-100 p-4 border rounded-xl text-center">
                <FaLeaf className="mx-auto mb-2 text-primary text-xl" />
                <p className="font-semibold text-sm">Category</p>
                <p className="text-gray-500 text-sm">{food.category}</p>
              </div>

              <div className="bg-base-100 p-4 border rounded-xl text-center">
                <FaWeightHanging className="mx-auto mb-2 text-primary text-xl" />
                <p className="font-semibold text-sm">Weight</p>
                <p className="text-gray-500 text-sm">
                  {food.weight} {food.weightUnit}
                </p>
              </div>

              <div className="bg-base-100 p-4 border rounded-xl text-center">
                <FaBoxOpen className="mx-auto mb-2 text-primary text-xl" />
                <p className="font-semibold text-sm">Brand</p>
                <p className="text-gray-500 text-sm">{food.brand}</p>
              </div>

            </div>

            {/* Add To Cart */}
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
    </main>
  );
};

export default PetFoodDetailsPage;