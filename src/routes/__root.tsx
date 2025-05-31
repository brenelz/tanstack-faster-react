import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {
  Await,
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from '@tanstack/react-router'
import appCss from '@/styles/app.css?url'
import * as React from 'react'
import { getCart, getCategories } from '@/lib/server'
import Header from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStackFaster",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  loader: async () => {
    const categories = await getCategories();

    // don't block loading the page
    const cartPromise = getCart();

    return {
      cartPromise,
      categories,
    };
  },
  component: RootComponent,
  staleTime: 1000 * 60 * 5, // 5 minutes
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const data = Route.useLoaderData();

  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div>
          <Header cartPromise={data.cartPromise} />
          <div className="pt-[85px] sm:pt-[70px]">
            <div className="flex flex-grow font-mono">
              <aside className="fixed left-0 hidden w-64 min-w-64 max-w-64 overflow-y-auto border-r p-4 md:block">
                <Sidebar categories={data.categories} />
              </aside>
              <main className="min-h-[calc(100vh-113px)] flex-1 overflow-y-auto p-4 pt-0 md:pl-64">
                <div className="w-full p-4">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </div>
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}