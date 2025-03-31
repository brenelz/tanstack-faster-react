/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as ProductsProductImport } from './routes/products.$product'
import { Route as CategoriesCategoryImport } from './routes/categories.$category'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ProductsProductRoute = ProductsProductImport.update({
  id: '/products/$product',
  path: '/products/$product',
  getParentRoute: () => rootRoute,
} as any)

const CategoriesCategoryRoute = CategoriesCategoryImport.update({
  id: '/categories/$category',
  path: '/categories/$category',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/categories/$category': {
      id: '/categories/$category'
      path: '/categories/$category'
      fullPath: '/categories/$category'
      preLoaderRoute: typeof CategoriesCategoryImport
      parentRoute: typeof rootRoute
    }
    '/products/$product': {
      id: '/products/$product'
      path: '/products/$product'
      fullPath: '/products/$product'
      preLoaderRoute: typeof ProductsProductImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/categories/$category': typeof CategoriesCategoryRoute
  '/products/$product': typeof ProductsProductRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/categories/$category': typeof CategoriesCategoryRoute
  '/products/$product': typeof ProductsProductRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/categories/$category': typeof CategoriesCategoryRoute
  '/products/$product': typeof ProductsProductRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/categories/$category' | '/products/$product'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/categories/$category' | '/products/$product'
  id: '__root__' | '/' | '/categories/$category' | '/products/$product'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CategoriesCategoryRoute: typeof CategoriesCategoryRoute
  ProductsProductRoute: typeof ProductsProductRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CategoriesCategoryRoute: CategoriesCategoryRoute,
  ProductsProductRoute: ProductsProductRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/categories/$category",
        "/products/$product"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/categories/$category": {
      "filePath": "categories.$category.tsx"
    },
    "/products/$product": {
      "filePath": "products.$product.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
