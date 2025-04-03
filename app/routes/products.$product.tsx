import { createFileRoute } from "@tanstack/react-router";
import { getProduct } from "@/lib/server";
import { preloadImageIds } from "@/lib/imagePreloader";

export const Route = createFileRoute("/products/$product")({
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
        </div>
      </div>
    </div>
  )
}
