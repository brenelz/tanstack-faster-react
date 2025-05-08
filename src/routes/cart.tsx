import { getCart, removeFromCart, type Cart } from "@/lib/server";
import {, useRouter } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Suspense } from "react";
import { Await } from "@tanstack/react-router";

interface CartLoaderData {
    cartPromise: Promise<Cart>;
}

export const Route = createFileRoute({
    component: CartPage,
    loader: async () => {
        const cartPromise = getCart();
        return {
            cartPromise
        } satisfies CartLoaderData;
    }
});

function CartPage() {
    const { cartPromise } = Route.useLoaderData();
    const router = useRouter();

    const calculateTotal = (cart: Cart) => {
        return cart.reduce((sum, item) => {
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
                <Await promise={cartPromise}>
                    {(cart: Cart) => {
                        if (!cart || cart.length === 0) {
                            return (
                                <div className="bg-white rounded-lg shadow">
                                    <div className="p-6">
                                        <p className="text-gray-600">Your cart is empty.</p>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div className="bg-white rounded-lg shadow">
                                <div className="p-6">
                                    <div className="space-y-4">
                                        {cart.map((item) => {
                                            if (!item.product) return null;

                                            return (
                                                <div key={item.id} className="flex items-center justify-between border-b pb-4">
                                                    <div className="flex items-center space-x-4">
                                                        <Link
                                                            to="/products/$product"
                                                            params={{ product: item.product.slug }}
                                                            className="hover:opacity-75"
                                                        >
                                                            <img
                                                                alt={`A picture of ${item.product.name}`}
                                                                width="64"
                                                                height="64"
                                                                className="h-16 w-16 border object-cover"
                                                                src={`https://picsum.photos/id/${item.product.id}/64`}
                                                            />
                                                        </Link>
                                                        <div>
                                                            <Link
                                                                to="/products/$product"
                                                                params={{ product: item.product.slug }}
                                                                className="text-lg font-medium text-[#FF6B00] hover:text-[#FFA366]"
                                                            >
                                                                {item.product.name}
                                                            </Link>
                                                            <p className="text-sm text-gray-600">${item.product.price}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-6">
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-gray-600">Qty:</span>
                                                            <span className="font-medium">{item.quantity}</span>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-lg font-medium text-[#FF6B00]">
                                                                ${(Number(item.product.price) * item.quantity).toFixed(2)}
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
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
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
                                            );
                                        })}
                                        <div className="flex justify-end pt-4">
                                            <div className="text-right">
                                                <p className="text-sm text-gray-600">Total</p>
                                                <p className="text-2xl font-bold text-[#FF6B00]">${calculateTotal(cart)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }}
                </Await>
            </Suspense>
        </div>
    );
} 