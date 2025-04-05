import { getCart, removeFromCart } from "@/lib/server";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/cart")({
    component: CartPage,
    loader: async () => {
        const cartPromise = getCart();
        return {
            cartPromise
        };
    }
});

function CartPage() {
    const data = Route.useLoaderData();
    const router = useRouter();

    const total = () => {
        return cart()?.reduce((sum, item) => {
            if (!item.product) return sum;
            return sum + (Number(item.product.price) * item.quantity);
        }, 0).toFixed(2);
    };

    const handleRemove = async (itemId: number) => {
        await removeFromCart({ data: { cartItemId: itemId } });
        router.invalidate();
    };

    return (
        <div className="w-full space-y-8">
            <h1 className="text-3xl font-bold text-[#FF6B00]">Shopping Cart</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <Show
                    when={cart() && cart()!.length > 0}
                    fallback={
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6">
                                <p className="text-gray-600">Your cart is empty.</p>
                            </div>
                        </div>
                    }
                >
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6">
                            <div className="space-y-4">
                                <For each={cart()}>
                                    {(item) => (
                                        <Show when={item.product} fallback={null}>
                                            {(product) => (
                                                <div className="flex items-center justify-between border-b pb-4">
                                                    <div className="flex items-center space-x-4">
                                                        <Link
                                                            to="/products/$product"
                                                            params={{ product: product().slug }}
                                                            className="hover:opacity-75"
                                                        >
                                                            <img
                                                                alt={`A picture of ${product().name}`}
                                                                width="64"
                                                                height="64"
                                                                className="h-16 w-16 border object-cover"
                                                                src={`https://picsum.photos/id/${product().id}/64`}
                                                            />
                                                        </Link>
                                                        <div>
                                                            <Link
                                                                to="/products/$product"
                                                                params={{ product: product().slug }}
                                                                className="text-lg font-medium text-[#FF6B00] hover:text-[#FFA366]"
                                                            >
                                                                {product().name}
                                                            </Link>
                                                            <p className="text-sm text-gray-600">${product().price}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-6">
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-gray-600">Qty:</span>
                                                            <span className="font-medium">{item.quantity}</span>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-lg font-medium text-[#FF6B00]">
                                                                ${(Number(product().price) * item.quantity).toFixed(2)}
                                                            </p>
                                                        </div>
                                                        <button
                                                            onClick={() => handleRemove(item.id)}
                                                            className="text-gray-500 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                                            title="Remove item"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="20"
                                                                height="20"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                className="h-5 w-5"
                                                            >
                                                                <path d="M3 6h18" />
                                                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                                                <line x1="10" y1="11" x2="10" y2="17" />
                                                                <line x1="14" y1="11" x2="14" y2="17" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </Show>
                                    )}
                                </For>
                                <div className="flex justify-end pt-4">
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">Total</p>
                                        <p className="text-2xl font-bold text-[#FF6B00]">${total()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Show>
            </Suspense>
        </div>
    );
} 