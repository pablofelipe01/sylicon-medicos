export interface Medico {
  id: string;
  codigo: string;
  cedula: string;
  nombre: string;
  wallet_address?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthSession {
  id: string;
  medico_id: string;
  session_token: string;
  expires_at: string;
  created_at: string;
}

export interface TokenInfo {
  balance: string;
  metadata: {
    name: string;
    symbol: string;
    description: string;
    image?: string;
  };
}

export interface LoginCredentials {
  cedula: string;
  codigo: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface WalletCreationResponse {
  address: string;
  success: boolean;
  message?: string;
}

export interface DashboardData {
  medico: Medico;
  tokenInfo?: TokenInfo;
}

export interface AuthResponse {
  medico: Medico;
  hasWallet: boolean;
} 