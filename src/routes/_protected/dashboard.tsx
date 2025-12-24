import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/auth'

export const Route = createFileRoute('/_protected/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const logout = useAuthStore((state) => state.logout)

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button variant="outline" onClick={logout}>
          Cerrar sesión
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Proyectos</h2>
          <p className="text-muted-foreground">Gestiona tus proyectos</p>
        </div>
        <div className="border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Tareas</h2>
          <p className="text-muted-foreground">Visualiza tus tareas</p>
        </div>
        <div className="border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Equipo</h2>
          <p className="text-muted-foreground">Gestiona tu equipo</p>
        </div>
      </div>
    </div>
  )
}
