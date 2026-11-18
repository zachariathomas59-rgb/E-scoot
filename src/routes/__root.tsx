import type { ReactNode } from 'react'
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { seoConfig, seoHead } from '@/lib/monstarx/seo'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: (ctx) => {
    const seo = seoHead(ctx)
    return {
      ...seo,
      links: [
        ...seo.links,
        { rel: 'stylesheet', href: appCss },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@500;700&family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap',
        },
      ],
    }
  },
  shellComponent: RootDocument,
  component: RootLayout,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang={seoConfig.locale || 'fr'}>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-white text-neutral-900 antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function RootLayout() {
  return <Outlet />
}

function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8 text-center">
      <div>
        <h1 className="text-3xl font-semibold">Page introuvable</h1>
        <p className="mt-2 text-neutral-500">La page demandée n'existe pas.</p>
      </div>
    </main>
  )
}
