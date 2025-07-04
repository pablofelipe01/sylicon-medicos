import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { db } from '@/lib/supabase'
import { createToken, generateSessionToken, getSessionExpiration } from '@/lib/auth'
import type { LoginCredentials, ApiResponse } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body: LoginCredentials = await request.json()
    const { cedula, codigo } = body

    // Validate input
    if (!cedula || !codigo) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Cédula y código son requeridos',
      }, { status: 400 })
    }

    // Clean inputs
    const cleanCedula = cedula.replace(/\D/g, '')
    const cleanCodigo = codigo.replace(/\D/g, '')

    console.log('Login attempt:', { cleanCedula, cleanCodigo })

    // Get médico from database
    const { data: medico, error: medicoError } = await db.getMedico(cleanCedula, cleanCodigo)

    console.log('Database query result:', { medico, medicoError })

    if (medicoError || !medico) {
      console.log('Login failed - invalid credentials')
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Credenciales inválidas',
      }, { status: 401 })
    }

    // Generate session
    const sessionToken = generateSessionToken()
    const expiresAt = getSessionExpiration()

    // Create session in database
    const { error: sessionError } = await db.createSession(
      medico.id,
      sessionToken,
      expiresAt
    )

    if (sessionError) {
      console.error('Error creating session:', sessionError)
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Error interno del servidor',
      }, { status: 500 })
    }

    // Create JWT token
    const jwtToken = await createToken(medico.id, sessionToken)

    // Set cookie
    const cookieStore = cookies()
    cookieStore.set('session', jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    })

    // If médico doesn't have wallet, we'll create it in the dashboard
    return NextResponse.json<ApiResponse>({
      success: true,
      data: {
        medico: {
          id: medico.id,
          nombre: medico.nombre,
          codigo: medico.codigo,
          cedula: medico.cedula,
          wallet_address: medico.wallet_address,
        },
        hasWallet: !!medico.wallet_address,
      },
      message: medico.wallet_address ? 'Sesión iniciada' : 'Sesión iniciada - Se creará billetera',
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Error interno del servidor',
    }, { status: 500 })
  }
} 