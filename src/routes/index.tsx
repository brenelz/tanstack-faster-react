import { Await, getRouteApi } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute({
  component: Home,
});

function Home() {
  const data = getRouteApi("__root__").useLoaderData();

  return (
    <div className="w-full space-y-12">
      <div className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {data.categories.map(category => (
            <Link
              key={category.id}
              to="/categories/$category"
              params={{
                category: category.slug,
              }}
              className="flex w-[125px] flex-col items-center text-center"
            >
              <img
                alt={`A small picture of ${category.name}`}
                loading="eager"
                width="48"
                height="48"
                decoding="sync"
                className="mb-2 h-14 w-14 border hover:bg-accent2 object-cover"
                src={`https://picsum.photos/id/${category.id}/48`}
              />
              <span className="text-xs">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
