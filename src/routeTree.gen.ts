/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import type { CreateFileRoute, FileRoutesByPath } from '@tanstack/react-router'
import type {
  CreateServerFileRoute,
  ServerFileRoutesByPath,
} from '@tanstack/react-start/server'

import { Route as rootRouteImport } from './routes/__root'
import { Route as CartRouteImport } from './routes/cart'
import { Route as IndexRouteImport } from './routes/index'
import { Route as ProductsProductRouteImport } from './routes/products.$product'
import { Route as CategoriesCategoryRouteImport } from './routes/categories.$category'

const CartRoute = CartRouteImport.update({
  id: '/cart',
  path: '/cart',
  getParentRoute: () => rootRouteImport,
} as any)
const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)
const ProductsProductRoute = ProductsProductRouteImport.update({
  id: '/products/$product',
  path: '/products/$product',
  getParentRoute: () => rootRouteImport,
} as any)
const CategoriesCategoryRoute = CategoriesCategoryRouteImport.update({
  id: '/categories/$category',
  path: '/categories/$category',
  getParentRoute: () => rootRouteImport,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/cart': typeof CartRoute
  '/categories/$category': typeof CategoriesCategoryRoute
  '/products/$product': typeof ProductsProductRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/cart': typeof CartRoute
  '/categories/$category': typeof CategoriesCategoryRoute
  '/products/$product': typeof ProductsProductRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/cart': typeof CartRoute
  '/categories/$category': typeof CategoriesCategoryRoute
  '/products/$product': typeof ProductsProductRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/cart' | '/categories/$category' | '/products/$product'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/cart' | '/categories/$category' | '/products/$product'
  id:
    | '__root__'
    | '/'
    | '/cart'
    | '/categories/$category'
    | '/products/$product'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CartRoute: typeof CartRoute
  CategoriesCategoryRoute: typeof CategoriesCategoryRoute
  ProductsProductRoute: typeof ProductsProductRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/cart': {
      id: '/cart'
      path: '/cart'
      fullPath: '/cart'
      preLoaderRoute: typeof CartRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/categories/$category': {
      id: '/categories/$category'
      path: '/categories/$category'
      fullPath: '/categories/$category'
      preLoaderRoute: typeof CategoriesCategoryRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/products/$product': {
      id: '/products/$product'
      path: '/products/$product'
      fullPath: '/products/$product'
      preLoaderRoute: typeof ProductsProductRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}

declare module './routes/index' {
  const createFileRoute: CreateFileRoute<
    '/',
    FileRoutesByPath['/']['parentRoute'],
    FileRoutesByPath['/']['id'],
    FileRoutesByPath['/']['path'],
    FileRoutesByPath['/']['fullPath']
  >

  const createServerFileRoute: CreateServerFileRoute<
    ServerFileRoutesByPath['/']['parentRoute'],
    ServerFileRoutesByPath['/']['id'],
    ServerFileRoutesByPath['/']['path'],
    ServerFileRoutesByPath['/']['fullPath'],
    unknown
  >
}
declare module './routes/cart' {
  const createFileRoute: CreateFileRoute<
    '/cart',
    FileRoutesByPath['/cart']['parentRoute'],
    FileRoutesByPath['/cart']['id'],
    FileRoutesByPath['/cart']['path'],
    FileRoutesByPath['/cart']['fullPath']
  >

  const createServerFileRoute: CreateServerFileRoute<
    ServerFileRoutesByPath['/cart']['parentRoute'],
    ServerFileRoutesByPath['/cart']['id'],
    ServerFileRoutesByPath['/cart']['path'],
    ServerFileRoutesByPath['/cart']['fullPath'],
    unknown
  >
}
declare module './routes/categories.$category' {
  const createFileRoute: CreateFileRoute<
    '/categories/$category',
    FileRoutesByPath['/categories/$category']['parentRoute'],
    FileRoutesByPath['/categories/$category']['id'],
    FileRoutesByPath['/categories/$category']['path'],
    FileRoutesByPath['/categories/$category']['fullPath']
  >

  const createServerFileRoute: CreateServerFileRoute<
    ServerFileRoutesByPath['/categories/$category']['parentRoute'],
    ServerFileRoutesByPath['/categories/$category']['id'],
    ServerFileRoutesByPath['/categories/$category']['path'],
    ServerFileRoutesByPath['/categories/$category']['fullPath'],
    unknown
  >
}
declare module './routes/products.$product' {
  const createFileRoute: CreateFileRoute<
    '/products/$product',
    FileRoutesByPath['/products/$product']['parentRoute'],
    FileRoutesByPath['/products/$product']['id'],
    FileRoutesByPath['/products/$product']['path'],
    FileRoutesByPath['/products/$product']['fullPath']
  >

  const createServerFileRoute: CreateServerFileRoute<
    ServerFileRoutesByPath['/products/$product']['parentRoute'],
    ServerFileRoutesByPath['/products/$product']['id'],
    ServerFileRoutesByPath['/products/$product']['path'],
    ServerFileRoutesByPath['/products/$product']['fullPath'],
    unknown
  >
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CartRoute: CartRoute,
  CategoriesCategoryRoute: CategoriesCategoryRoute,
  ProductsProductRoute: ProductsProductRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
