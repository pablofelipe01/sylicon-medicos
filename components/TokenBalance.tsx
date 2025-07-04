'use client'

import { Coins, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { formatNumber } from '@/lib/utils'
import type { TokenInfo } from '@/types'

interface TokenBalanceProps {
  tokenInfo: TokenInfo
  className?: string
}

export function TokenBalance({ tokenInfo, className }: TokenBalanceProps) {
  const { balance, metadata } = tokenInfo

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Coins className="h-5 w-5 text-secondary" />
          <span>Balance de Tokens</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {formatNumber(balance)}
            </div>
            <div className="text-sm text-gray-600">
              {metadata.symbol} - {metadata.name}
            </div>
          </div>
          
          {metadata.description && (
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 mb-2">Descripción:</p>
              <p className="text-sm">{metadata.description}</p>
            </div>
          )}
          
          <div className="flex items-center justify-center space-x-2 text-sm text-green-600 bg-green-50 p-3 rounded">
            <TrendingUp className="h-4 w-4" />
            <span>Patrimonio activo en blockchain</span>
          </div>
          
          <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
            <p className="font-medium mb-1">Información del token:</p>
            <ul className="space-y-1">
              <li>• Red: Polygon Mainnet</li>
              <li>• Estándar: ERC-1155</li>
              <li>• Estado: Activo</li>
              <li>• Actualizado en tiempo real</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 