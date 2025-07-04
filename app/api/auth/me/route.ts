import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromCookies } from '@/lib/auth'
import { db } from '@/lib/supabase'
import type { ApiResponse, DashboardData } from '@/types'

export async function GET(request: NextRequest) {
  try {
    // Get session from cookies
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

    return NextResponse.json<ApiResponse<DashboardData>>({
      success: true,
      data: {
        medico: {
          id: medico.id,
          codigo: medico.codigo,
          cedula: medico.cedula,
          nombre: medico.nombre,
          wallet_address: medico.wallet_address,
          created_at: medico.created_at,
          updated_at: medico.updated_at,
        },
      },
    })

  } catch (error) {
    console.error('Get user info error:', error)
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Error interno del servidor',
    }, { status: 500 })
  }
} 