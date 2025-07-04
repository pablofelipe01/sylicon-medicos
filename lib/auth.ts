import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secretKey = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-here-change-in-production'
);

export interface CustomJWTPayload {
  medico_id: string;
  session_token: string;
  exp?: number;
}

// Create JWT token
export async function createToken(medicoId: string, sessionToken: string): Promise<string> {
  const payload = {
    medico_id: medicoId,
    session_token: sessionToken,
  };

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secretKey);
}

// Verify JWT token
export async function verifyToken(token: string): Promise<CustomJWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as unknown as CustomJWTPayload;
  } catch (error) {
    return null;
  }
}

// Get session from cookies
export async function getSessionFromCookies() {
  const cookieStore = cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) {
    return null;
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return null;
  }

  return {
    medicoId: payload.medico_id,
    sessionToken: payload.session_token,
  };
}

// Generate random session token
export function generateSessionToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Session expiration time (24 hours)
export function getSessionExpiration(): Date {
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 24);
  return expiration;
} 