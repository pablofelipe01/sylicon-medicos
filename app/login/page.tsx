'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { CreditCard, Key } from 'lucide-react'
import { validateCedula, validateCodigo } from '@/lib/utils'
import type { LoginCredentials, ApiResponse } from '@/types'

export default function LoginPage() {
  const router = useRouter()
  const [credentials, setCredentials] = useState<LoginCredentials>({
    cedula: '',
    codigo: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string>('')

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!credentials.cedula.trim()) {
      newErrors.cedula = 'La cédula es requerida'
    } else if (!validateCedula(credentials.cedula)) {
      newErrors.cedula = 'Formato de cédula inválido'
    }

    if (!credentials.codigo.trim()) {
      newErrors.codigo = 'El código es requerido'
    } else if (!validateCodigo(credentials.codigo)) {
      newErrors.codigo = 'Formato de código inválido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setApiError('')

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      const data: ApiResponse = await response.json()

      if (data.success) {
        router.push('/dashboard')
      } else {
        setApiError(data.error || 'Error al iniciar sesión')
      }
    } catch (error) {
      setApiError('Error de conexión. Intenta nuevamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof LoginCredentials) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCredentials(prev => ({
      ...prev,
      [field]: e.target.value,
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Acceso Médicos
          </h1>
          <p className="text-gray-600">
            Ingresa tus credenciales para acceder a tu patrimonio tokenizado
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Iniciar Sesión</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Número de Cédula"
                type="text"
                value={credentials.cedula}
                onChange={handleInputChange('cedula')}
                error={errors.cedula}
                icon={<CreditCard className="h-4 w-4" />}
                placeholder="Ej: 79454772"
                disabled={isLoading}
              />

              <Input
                label="Código de Médico"
                type="text"
                value={credentials.codigo}
                onChange={handleInputChange('codigo')}
                error={errors.codigo}
                icon={<Key className="h-4 w-4" />}
                placeholder="Ej: 02012107"
                disabled={isLoading}
              />

              {apiError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{apiError}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                isLoading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? 'Verificando...' : 'Ingresar'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500">
          <p>¿Problemas para acceder?</p>
          <p>Contacta al administrador del sistema</p>
        </div>
      </div>
    </div>
  )
} 