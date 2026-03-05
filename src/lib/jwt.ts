/**
 * Utilidades para trabajar con JWT
 */

import Cookies from 'js-cookie'

interface JWTPayload {
  sub?: string
  email?: string
  role?: string
  exp?: number
  type?: string
  iat?: number
  [key: string]: any
}

/**
 * Obtiene el timestamp de expiración desde la cookie tokenExpiry
 * @returns Timestamp en milisegundos cuando caduca el token
 */
export function getTokenExpiryFromCookie(): number | null {
  const expiry = Cookies.get('tokenExpiry')
  if (!expiry) return null
  
  try {
    const expirySeconds = parseInt(expiry, 10)
    if (isNaN(expirySeconds)) return null
    return expirySeconds * 1000 // Convertir de segundos a milisegundos
  } catch (error) {
    console.error('Error parseando tokenExpiry:', error)
    return null
  }
}

/**
 * Decodifica un JWT sin verificar la firma
 * NOTA: Solo decodifica, no valida. La validación debe hacerse en el backend.
 */
export function decodeJWT(token: string): JWTPayload | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null

    const decoded = atob(parts[1])
    return JSON.parse(decoded)
  } catch (error) {
    console.error('Error decodificando JWT:', error)
    return null
  }
}

/**
 * Obtiene el tiempo de expiración desde un JWT
 * @returns Timestamp en milisegundos cuando caduca el token
 */
export function getTokenExpiration(token: string): number | null {
  const payload = decodeJWT(token)
  if (!payload?.exp) return null
  return payload.exp * 1000 // Convertir de segundos a milisegundos
}

/**
 * Verifica si un token ha expirado
 */
export function isTokenExpired(token: string): boolean {
  const expiration = getTokenExpiration(token)
  if (!expiration) return true
  return Date.now() > expiration
}

/**
 * Verifica si un token está próximo a expirar (usando cookie)
 * @param minutesThreshold - Minutos antes de la expiración para considerarlo próximo (default: 5)
 */
export function isTokenExpiringSoon(minutesThreshold: number = 5): boolean {
  const expiration = getTokenExpiryFromCookie()
  if (!expiration) return true
  
  const now = Date.now()
  const timeUntilExpiry = expiration - now
  const thresholdMs = minutesThreshold * 60 * 1000
  
  return timeUntilExpiry < thresholdMs
}

/**
 * Obtiene los minutos restantes antes de que expire el token
 */
export function getMinutesUntilExpiry(): number {
  const expiration = getTokenExpiryFromCookie()
  if (!expiration) return 0
  
  const timeUntilExpiry = expiration - Date.now()
  return Math.floor(timeUntilExpiry / (60 * 1000))
}

/**
 * Verifica si el token está expirado (usando cookie)
 */
export function isTokenExpiredFromCookie(): boolean {
  const expiration = getTokenExpiryFromCookie()
  if (!expiration) return true
  return Date.now() > expiration
}

