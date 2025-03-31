import { createServerFn } from "@tanstack/react-start";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import {
  categories as categoriesTable,
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
