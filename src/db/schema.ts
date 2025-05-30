import { numeric, pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().primaryKey(),
  name: text("name").notNull(),
  image_url: text("image_url"),
});

export type Category = typeof categories.$inferSelect;

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
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

export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  product_id: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull().default(1),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export type CartItem = typeof cartItems.$inferSelect;