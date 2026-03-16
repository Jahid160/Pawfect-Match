"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import {
  FaArrowLeft,
  FaWeightHanging,
  FaBoxOpen,
  FaTag,
  FaShoppingCart,
  FaTimesCircle,
  FaCheckCircle,
} from "react-icons/fa";
import { addToCart } from "@/action/server/cart";
import { useAuthModal } from "@/provider/AuthModalProvider";

const FoodDetails = ({ food }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { openLoginModal } = useAuthModal();
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  if (!food?._id) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <FaTimesCircle className="mb-4 text-red-500 text-4xl" />
        <h2 className="font-bold text-2xl">Food not found</h2>

        <Link
          href="/petfoods"
          className="bg-primary mt-6 px-6 py-3 rounded-xl text-white"
        >
          Back to Foods
        </Link>
      </div>
    );
  }

  const hasDiscount =
    food.discountPrice && Number(food.discountPrice) < Number(food.price);

  const isOutOfStock = food.inStock === false || food.stock <= 0;

  const finalPrice = hasDiscount ? food.discountPrice : food.price;

  const handleAddToCart = () => {
    if (!session?.user?.email) {
      openLoginModal();
      return;
    }

    setMessage("");

    startTransition(async () => {
      const result = await addToCart({
        userEmail: session.user.email,
        foodId: food._id,
        productName: food.productName,
        image: food.image,
        price: finalPrice,
        stock: food.stock,
        brand: food.brand,
        weight: food.weight,
        weightUnit: food.weightUnit,
        inStock: food.inStock,
      });

      setMessage(result?.message || "Something went wrong");
    });
  };

  const handleBuyNow = () => {
    if (!session?.user?.email) {
      openLoginModal();
      return;
    }

    router.push(`/checkout?foodId=${food._id}`);
  };

  return (
    <div className="bg-base-200 min-h-screen px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/petfoods"
          className="flex items-center gap-2 mb-8 font-bold text-primary"
        >
          <FaArrowLeft /> Back to foods
        </Link>

        <div className="grid md:grid-cols-2 gap-10 bg-base-100 shadow p-8 rounded-3xl">
          <div className="relative flex justify-center items-center bg-base-200 rounded-2xl min-h-[450px]">
            {hasDiscount && (
              <span className="top-5 left-5 absolute bg-red-500 px-4 py-1 rounded-full font-bold text-xs text-white">
                SALE
              </span>
            )}

            <Image
              src={food.image || "https://placehold.co/700x700"}
              alt={food.productName || "Pet Food"}
              width={600}
              height={600}
              className="object-contain max-h-[420px]"
            />
          </div>

          <div>
            <div className="flex gap-3 mb-3">
              <span className="bg-primary/10 px-4 py-1 rounded-full font-bold text-primary text-xs">
                {food.brand}
              </span>

              <span className="bg-base-200 px-4 py-1 rounded-full font-bold text-xs">
                {food.foodType}
              </span>
            </div>

            <h1 className="mb-4 font-black text-4xl">{food.productName}</h1>

            <div className="mb-6">
              {hasDiscount ? (
                <div className="flex items-center gap-4">
                  <span className="font-black text-4xl text-error">
                    ${food.discountPrice}
                  </span>

                  <span className="text-gray-400 text-lg line-through">
                    ${food.price}
                  </span>
                </div>
              ) : (
                <span className="font-black text-4xl">${food.price}</span>
              )}
            </div>

            <div className="space-y-3 text-sm mb-6">
              <p className="flex items-center gap-2">
                <FaWeightHanging /> {food.weight}
                {food.weightUnit}
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

            {food.description && (
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-2">Description</h3>
                <p className="text-gray-500">{food.description}</p>
              </div>
            )}

            {food.ingredients && (
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-2">Ingredients</h3>
                <p className="text-gray-500">{food.ingredients}</p>
              </div>
            )}

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

            <div className="flex flex-wrap gap-4 mt-10">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock || isPending}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition ${isOutOfStock || isPending
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90 text-white"
                  }`}
              >
                <FaShoppingCart />
                {isPending ? "Adding..." : "Add to Cart"}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className={`px-8 py-4 rounded-xl font-bold transition ${isOutOfStock
                  ? "bg-gray-300 cursor-not-allowed text-gray-500"
                  : "bg-gray-900 hover:bg-black text-white"
                  }`}
              >
                Buy Now
              </button>
            </div>

            {message && (
              <p className="mt-4 font-medium text-sm text-primary">{message}</p>
            )}

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
