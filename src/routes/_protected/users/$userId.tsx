import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import userService from '@/services/user/user.service'
import { useBreadcrumbStore } from '@/store/breadcrumb'
import type { User } from '@/services/user/user.schema'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Mail, Phone, MapPin, Shield } from 'lucide-react'

export const Route = createFileRoute('/_protected/users/$userId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { userId } = Route.useParams()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const setBreadcrumbs = useBreadcrumbStore((state) => state.setBreadcrumbs)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        setError(null)
        const userData = await userService.get(userId)
        setUser(userData)
        // Establecer breadcrumbs con el nombre del usuario
        setBreadcrumbs([
          { label: 'Usuarios', path: '/users' },
          { label: userData.name, path: `/users/${userId}` }
        ])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar el usuario')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [userId, setBreadcrumbs])

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!user) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Usuario no encontrado</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6 items-center">
      <div>
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p className="text-muted-foreground">Detalles del usuario</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información Personal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>

          {user.phone && (
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Teléfono</p>
                <p className="font-medium">{user.phone}</p>
              </div>
            </div>
          )}

          {user.address && (
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Dirección</p>
                <p className="font-medium">{user.address}</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Rol</p>
              <p className="font-medium capitalize">{user.role}</p>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-sm text-muted-foreground">ID</p>
            <p className="font-mono text-xs text-muted-foreground">{user.id}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
