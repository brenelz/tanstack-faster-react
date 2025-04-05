import { Cart } from "@/lib/server";

export default function QtyBadge(props: { cart?: Cart }) {
    const cartQuantity = () => {
        if (!props.cart) return 0;
        return props.cart.reduce((total, item) => total + item.quantity, 0);
    };

    if (cartQuantity() === 0) {
        return null;
    }

    return (
        <div className="absolute -top-2 -right-2 bg-[#FF6B00] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartQuantity()}
        </div>
    )
}