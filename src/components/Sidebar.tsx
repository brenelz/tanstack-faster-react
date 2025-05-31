import { Link } from "@tanstack/react-router";
import { Category } from "@/db/schema";

type SidebarProps = {
  categories: Category[];
};

export function Sidebar(props: SidebarProps) {
  return (
    <div className="flex flex-col h-full">
      <h2 className="border-b border-[#FFA366] text-sm font-semibold text-[#FF6B00] mb-4">
        Choose a Category
      </h2>
      <ul className="flex flex-col items-start justify-center">
        {props.categories.map(category => (
          <li className="w-full" key={category.id}>
            <Link
              className="block w-full py-1 text-xs text-gray-800 hover:bg-accent2 hover:underline"
              to={`/categories/$category`}
              params={{ category: category.slug }}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
