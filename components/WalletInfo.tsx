'use client'

import { useState } from 'react'
import { Copy, Check, Wallet } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatWalletAddress, copyToClipboard } from '@/lib/utils'

interface WalletInfoProps {
  address: string
  className?: string
}

export function WalletInfo({ address, className }: WalletInfoProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const success = await copyToClipboard(address)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Wallet className="h-5 w-5 text-primary" />
          <span>Billetera Digital</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Dirección de billetera:</p>
            <div className="flex items-center space-x-2">
              <code className="flex-1 px-3 py-2 bg-gray-100 rounded text-sm font-mono">
                {formatWalletAddress(address)}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="flex items-center space-x-1"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span>{copied ? 'Copiado' : 'Copiar'}</span>
              </Button>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded">
            <p className="font-medium mb-1">Información importante:</p>
            <ul className="space-y-1">
              <li>• Esta billetera se creó automáticamente en Polygon Network</li>
              <li>• Guarda esta dirección para futuras referencias</li>
              <li>• Los tokens se transfieren directamente a esta dirección</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 