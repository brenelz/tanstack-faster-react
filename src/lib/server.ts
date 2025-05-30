import { createServerFn } from "@tanstack/react-start";
import { db } from "@/db";
import { desc, eq } from "drizzle-orm";
import {
  cartItems,
  categories as categoriesTable,
  Product,
  products as productsTable,
} from "@/db/schema";

export const getCategories = createServerFn().handler(async () => {
  const categories = await db.select().from(categoriesTable).limit(20);
  return categories;
});

export const getCategory = createServerFn()
  .validator((p: { slug: string }) => {
    return p;
  })
  .handler(async ({ data }) => {
    const category = await db
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.slug, data.slug))
      .limit(1);

    const products = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.category_slug, data.slug));

    return {
      ...category[0],
      products,
    };
  });

export const getProduct = createServerFn()
  .validator((p: { product: string }) => {
    return p;
  })
  .handler(async ({ data }) => {
    const product = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.slug, data.product))
      .limit(1);

    return product[0];
  });

export const getCart = createServerFn()
  .handler(async () => {
    const items = await db
      .select({
        id: cartItems.id,
        quantity: cartItems.quantity,
        product: {
          id: productsTable.id,
          name: productsTable.name,
          price: productsTable.price,
          description: productsTable.description,
          slug: productsTable.slug,
        },
      })
      .from(cartItems)
      .leftJoin(productsTable, eq(cartItems.product_id, productsTable.id))
      .orderBy(desc(cartItems.created_at));

    return items;
  });

export type Cart = Awaited<ReturnType<typeof getCart>>;

// actions
export const addItemToCart = createServerFn()
  .validator((p: { product: Product }) => {
    return p;
  })
  .handler(async ({ data }) => {
    const cartItem = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.product_id, data.product.id))
      .limit(1);

    if (cartItem.length > 0) {
      await db
        .update(cartItems)
        .set({
          quantity: cartItem[0].quantity + 1,
        })
        .where(eq(cartItems.product_id, data.product.id));
    } else {
      await db.insert(cartItems).values({
        product_id: data.product.id,
        quantity: 1,
      });
    }

    return {
      success: true,
    };
  });

export const removeFromCart = createServerFn()
  .validator((cartItem: { cartItemId: number }) => {
    return cartItem;
  })
  .handler(async ({ data }) => {
    await db
      .delete(cartItems)
      .where(eq(cartItems.id, data.cartItemId));

    return {
      success: true,
    };
  });
