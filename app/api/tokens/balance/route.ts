import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromCookies } from '@/lib/auth'
import { getTokenBalance } from '@/lib/thirdweb'
import type { ApiResponse, TokenInfo } from '@/types'

export async function GET(request: NextRequest) {
  try {
    // Verify session
    const session = await getSessionFromCookies()
    if (!session) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'No autorizado',
      }, { status: 401 })
    }

    // Get wallet address from query params
    const { searchParams } = new URL(request.url)
    const walletAddress = searchParams.get('address')

    if (!walletAddress) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Dirección de billetera requerida',
      }, { status: 400 })
    }

    // Get contract address from environment
    const contractAddress = process.env.CONTRACT_ADDRESS
    if (!contractAddress) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Contrato no configurado',
      }, { status: 500 })
    }

    // Get token balance
    const tokenResult = await getTokenBalance(walletAddress, contractAddress)
    
    // Always return success for now to prevent UI errors
    // The actual error will be shown in the metadata description

    const tokenInfo: TokenInfo = {
      balance: tokenResult.balance,
      metadata: tokenResult.metadata,
    }

    return NextResponse.json<ApiResponse<TokenInfo>>({
      success: true,
      data: tokenInfo,
    })

  } catch (error) {
    console.error('Get token balance error:', error)
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Error interno del servidor',
    }, { status: 500 })
  }
} 