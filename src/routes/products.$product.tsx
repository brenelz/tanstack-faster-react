import {  useNavigate, useRouter } from "@tanstack/react-router";
import { addItemToCart, getProduct } from "@/lib/server";
import { preloadImageIds } from "@/lib/imagePreloader";
import { useState } from "react";

export const Route = createFileRoute({
  component: ProductPage,
  loader: async ({ params }) => {
    const product = await getProduct({ data: { product: params.product } });

    preloadImageIds([product.id], 400)

    return {
      product
    };
  },
  staleTime: 1000 * 60 * 5, // 5 minutes
});

function ProductPage() {
  const data = Route.useLoaderData();
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();
  const router = useRouter();

  const handleAddToCart = async () => {
    setIsAdding(true);
    await addItemToCart({ data: { product: data.product } });
    setIsAdding(false);
    router.invalidate();
    navigate({ to: '/cart' });
  };

  if (!data.product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="w-full space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            alt={`A picture of ${data.product.name}`}
            loading="eager"
            width="400"
            height="400"
            decoding="sync"
            className="h-[400px] w-[400px] border object-cover"
            src={`https://picsum.photos/id/${data.product.id}/400`}
          />
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-[#FF6B00]">
            {data.product.name}
          </h1>
          <p className="text-2xl font-semibold text-[#FF6B00]">
            {data.product.price}
          </p>
          <p className="text-gray-600">{data.product.description}</p>
          <button
            className="w-full bg-[#FF6B00] text-white py-2 px-4 rounded-md hover:bg-[#FFA366] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? "Adding..." : "Add to Cart"}
          </button>

        </div>
      </div>
    </div>
  )
}
