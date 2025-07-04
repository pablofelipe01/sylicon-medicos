import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format wallet address to short version (0x1234...5678)
export function formatWalletAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Validate Colombian cédula format
export function validateCedula(cedula: string): boolean {
  const cleanCedula = cedula.replace(/\D/g, '');
  return cleanCedula.length >= 6 && cleanCedula.length <= 12;
}

// Validate medical code format
export function validateCodigo(codigo: string): boolean {
  const cleanCodigo = codigo.replace(/\D/g, '');
  return cleanCodigo.length >= 6 && cleanCodigo.length <= 10;
}

// Format number with thousand separators
export function formatNumber(num: string | number): string {
  const numStr = typeof num === 'string' ? num : num.toString();
  return parseFloat(numStr).toLocaleString('es-CO');
}

// Copy text to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

// Generate a random ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Sleep utility
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
} 