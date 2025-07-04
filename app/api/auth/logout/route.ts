import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getSessionFromCookies } from '@/lib/auth'
import { db } from '@/lib/supabase'
import type { ApiResponse } from '@/types'

export async function POST(request: NextRequest) {
  try {
    // Get session from cookies
    const session = await getSessionFromCookies()

    if (session) {
      // Delete session from database
      await db.deleteSession(session.sessionToken)
    }

    // Clear cookie
    const cookieStore = cookies()
    cookieStore.delete('session')

    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'Sesión cerrada exitosamente',
    })

  } catch (error) {
    console.error('Logout error:', error)
    
    // Clear cookie anyway
    const cookieStore = cookies()
    cookieStore.delete('session')

    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'Sesión cerrada',
    })
  }
} 