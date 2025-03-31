import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { getCategory } from "@/lib/server";
import { Product } from "@/db/schema";

export const Route = createFileRoute("/categories/$category")({
  component: CategoryPage,
  loader: async ({ params }) => {
    return {
      category: await getCategory({ data: { slug: params.category } }),
    };
  },
  staleTime: 1000 * 60 * 5, // 5 minutes
});

function CategoryPage() {
  const data = Route.useLoaderData();

  if (!data.category) {
    return <div>Category not found</div>
  }

  return (
    <div className="w-full space-y-8">
      <h1 className="text-2xl font-bold text-[#FF6B00]">{data.category.name}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data.category.products.map(product => (
          <Link
            to="/products/$product"
            params={{
              product: product.slug,
            }}
            className="flex w-[125px] flex-col items-center text-center"
          >
            <img
              alt={`A small picture of ${product.name}`}
              loading="eager"
              width="48"
              height="48"
              decoding="sync"
              className="mb-2 h-14 w-14 border hover:bg-accent2 object-cover"
              src={product.image_url}
            />
            <span className="text-xs">{product.name}</span>
            <span className="text-xs text-[#FF6B00]">{product.price}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
