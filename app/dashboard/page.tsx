'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { WalletInfo } from '@/components/WalletInfo'
import { TokenBalance } from '@/components/TokenBalance'
import { ProgressBar } from '@/components/ProgressBar'
import { User, LogOut, Wallet, AlertCircle } from 'lucide-react'
import type { Medico, TokenInfo, ApiResponse } from '@/types'

interface DashboardData {
  medico: Medico
  tokenInfo?: TokenInfo
}

export default function DashboardPage() {
  const router = useRouter()
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCreatingWallet, setIsCreatingWallet] = useState(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setIsLoading(true)
      setError('')

      // Get current user session (this would be done via middleware in real app)
      const response = await fetch('/api/auth/me')
      if (!response.ok) {
        router.push('/login')
        return
      }

      const userData: ApiResponse<DashboardData> = await response.json()
      if (!userData.success) {
        router.push('/login')
        return
      }

      setData(userData.data!)

      // If user has wallet, get token balance
      if (userData.data!.medico.wallet_address) {
        await loadTokenBalance(userData.data!.medico.wallet_address)
      }

    } catch (error) {
      console.error('Error loading dashboard:', error)
      setError('Error al cargar los datos')
    } finally {
      setIsLoading(false)
    }
  }

  const loadTokenBalance = async (walletAddress: string) => {
    try {
      const response = await fetch(`/api/tokens/balance?address=${walletAddress}`)
      if (response.ok) {
        const tokenData: ApiResponse<TokenInfo> = await response.json()
        if (tokenData.success && tokenData.data) {
          setData(prev => prev ? { ...prev, tokenInfo: tokenData.data } : null)
        }
      }
    } catch (error) {
      console.error('Error loading token balance:', error)
    }
  }

  const createWallet = async () => {
    try {
      setIsCreatingWallet(true)
      setError('')

      const response = await fetch('/api/wallet/create', {
        method: 'POST',
      })

      const result: ApiResponse = await response.json()
      if (result.success) {
        // Reload dashboard data to get new wallet
        await loadDashboardData()
      } else {
        setError(result.error || 'Error al crear billetera')
      }
    } catch (error) {
      setError('Error de conexión al crear billetera')
    } finally {
      setIsCreatingWallet(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/login')
    } catch (error) {
      // Redirect anyway
      router.push('/login')
    }
  }

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <p className="text-gray-600">Error al cargar los datos</p>
          <Button onClick={() => router.push('/login')} className="mt-4">
            Volver al login
          </Button>
        </div>
      </div>
    )
  }

  const { medico, tokenInfo } = data

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Bienvenido a tu patrimonio tokenizado</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* User Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-primary" />
              <span>Información Personal</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Nombre completo</p>
                <p className="font-medium">{medico.nombre}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Código de médico</p>
                <p className="font-medium">{medico.codigo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Cédula</p>
                <p className="font-medium">{medico.cedula}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Estado</p>
                <p className="font-medium text-green-600">Activo</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Section */}
        {medico.wallet_address ? (
          <WalletInfo address={medico.wallet_address} />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wallet className="h-5 w-5 text-primary" />
                <span>Billetera Digital</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <Wallet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No tienes una billetera asignada
                </h3>
                <p className="text-gray-600 mb-4">
                  Crea tu billetera digital para recibir tokens de patrimonio
                </p>
                <Button
                  onClick={createWallet}
                  isLoading={isCreatingWallet}
                  disabled={isCreatingWallet}
                >
                  {isCreatingWallet ? 'Creando billetera...' : 'Crear Billetera'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Token Balance */}
        {medico.wallet_address && tokenInfo && (
          <>
            <TokenBalance tokenInfo={tokenInfo} />
            {/* Progress Bar */}
            <Card>
              <CardHeader>
                <CardTitle>Estado del Patrimonio</CardTitle>
              </CardHeader>
              <CardContent>
                <ProgressBar 
                  value={Math.floor(parseFloat(tokenInfo.balance)) * 100} 
                  className="py-4" 
                />
                <div className="text-center mt-2">
                  <p className="text-sm text-gray-600">
                    Progreso del patrimonio tokenizado ({Math.floor(parseFloat(tokenInfo.balance))} tokens)
                  </p>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* No tokens message */}
        {medico.wallet_address && !tokenInfo && (
          <Card>
            <CardContent className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Sin tokens asignados
              </h3>
              <p className="text-gray-600">
                Los tokens se asignarán automáticamente cuando estén disponibles
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
} 