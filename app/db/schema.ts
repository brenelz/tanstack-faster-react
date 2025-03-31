import { numeric, pgTable, serial, text } from "drizzle-orm/pg-core";

export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
});

export type Collection = typeof collections.$inferSelect;

export const categories = pgTable("categories", {
  slug: text("slug").notNull().primaryKey(),
  name: text("name").notNull(),
  image_url: text("image_url"),
});

export type Category = typeof categories.$inferSelect;

export const products = pgTable("products", {
  slug: text("slug").notNull().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: numeric("price").notNull(),
  category_slug: text("category_slug")
    .notNull()
    .references(() => categories.slug, { onDelete: "cascade" }),
  image_url: text("image_url"),
});

export type Product = typeof products.$inferSelect;
