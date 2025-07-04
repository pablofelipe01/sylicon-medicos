import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromCookies } from '@/lib/auth'
import { db } from '@/lib/supabase'
import { createWallet } from '@/lib/thirdweb'
import type { ApiResponse, WalletCreationResponse } from '@/types'

export async function POST(request: NextRequest) {
  try {
    // Verify session
    const session = await getSessionFromCookies()
    if (!session) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'No autorizado',
      }, { status: 401 })
    }

    // Get session data from database
    const { data: sessionData, error: sessionError } = await db.getSession(session.sessionToken)
    if (sessionError || !sessionData) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Sesión inválida',
      }, { status: 401 })
    }

    const medico = sessionData.medicos

    // Check if médico already has a wallet
    if (medico.wallet_address) {
      return NextResponse.json<ApiResponse<WalletCreationResponse>>({
        success: true,
        data: {
          address: medico.wallet_address,
          success: true,
          message: 'Billetera ya existe',
        },
      })
    }

    // Create new wallet
    const walletResult = await createWallet()
    if (!walletResult.success) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Error al crear billetera',
      }, { status: 500 })
    }

    // Update médico with wallet address
    const { error: updateError } = await db.updateMedicoWallet(
      medico.id,
      walletResult.address!
    )

    if (updateError) {
      console.error('Error updating médico wallet:', updateError)
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Error al guardar billetera',
      }, { status: 500 })
    }

    return NextResponse.json<ApiResponse<WalletCreationResponse>>({
      success: true,
      data: {
        address: walletResult.address!,
        success: true,
        message: 'Billetera creada exitosamente',
      },
      message: 'Billetera creada y asignada exitosamente',
    })

  } catch (error) {
    console.error('Wallet creation error:', error)
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Error interno del servidor',
    }, { status: 500 })
  }
} 