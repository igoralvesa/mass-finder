import { createRouter, RouterProvider } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { routeTree } from '@/routeTree.gen'

function PendingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground">Carregando...</p>
    </div>
  )
}

const router = createRouter({
  routeTree,
  defaultPendingComponent: PendingFallback,
})

export function AppRouterProvider() {
  return (
    <>
      <RouterProvider router={router} />
      <TanStackRouterDevtools router={router} position="bottom-right" />
    </>
  )
}
