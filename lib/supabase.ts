import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

console.log('Supabase config:', { 
  url: supabaseUrl, 
  keyLength: supabaseAnonKey?.length 
})

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions for database operations
export const db = {
  // Get médico by cédula and código
  async getMedico(cedula: string, codigo: string) {
    console.log('getMedico called with:', { cedula, codigo })
    
    const { data, error } = await supabase
      .from('medicos')
      .select('*')
      .eq('cedula', cedula)
      .eq('codigo', codigo)
      .single()
    
    console.log('getMedico result:', { data, error })
    
    return { data, error }
  },

  // Update médico with wallet address
  async updateMedicoWallet(id: string, walletAddress: string) {
    const { data, error } = await supabase
      .from('medicos')
      .update({ 
        wallet_address: walletAddress, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single()
    
    return { data, error }
  },

  // Create auth session
  async createSession(medicoId: string, sessionToken: string, expiresAt: Date) {
    const { data, error } = await supabase
      .from('auth_sessions')
      .insert({
        medico_id: medicoId,
        session_token: sessionToken,
        expires_at: expiresAt.toISOString(),
      })
      .select()
      .single()
    
    return { data, error }
  },

  // Get session by token
  async getSession(sessionToken: string) {
    const { data, error } = await supabase
      .from('auth_sessions')
      .select(`
        *,
        medicos (*)
      `)
      .eq('session_token', sessionToken)
      .gte('expires_at', new Date().toISOString())
      .single()
    
    return { data, error }
  },

  // Delete session
  async deleteSession(sessionToken: string) {
    const { error } = await supabase
      .from('auth_sessions')
      .delete()
      .eq('session_token', sessionToken)
    
    return { error }
  },

  // Clean expired sessions
  async cleanExpiredSessions() {
    const { error } = await supabase
      .from('auth_sessions')
      .delete()
      .lt('expires_at', new Date().toISOString())
    
    return { error }
  }
} 