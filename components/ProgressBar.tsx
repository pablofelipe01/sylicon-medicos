'use client'

import React from 'react'

interface ProgressBarProps {
  value: number
  min?: number
  max?: number
  className?: string
}

export function ProgressBar({ 
  value, 
  min = 0, 
  max = 600, 
  className = '' 
}: ProgressBarProps) {
  // Asegurar que el valor esté dentro del rango
  const clampedValue = Math.max(min, Math.min(max, value))
  
  // Calcular el porcentaje
  const percentage = ((clampedValue - min) / (max - min)) * 100
  
  // Puntos de referencia
  const point100 = ((100 - min) / (max - min)) * 100
  const point200 = ((200 - min) / (max - min)) * 100
  const point300 = ((300 - min) / (max - min)) * 100
  const point400 = ((400 - min) / (max - min)) * 100
  const point500 = ((500 - min) / (max - min)) * 100
  
  return (
    <div className={`w-full ${className}`}>
      {/* Etiquetas superiores */}
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>0</span>
        <span>100</span>
        <span>200</span>
        <span>300</span>
        <span>400</span>
        <span>500</span>
        <span>600</span>
      </div>
      
      {/* Contenedor de la barra */}
      <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
        {/* Gradiente de fondo (rojo a verde) */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(to right, #ef4444 0%, #f59e0b 30%, #eab308 50%, #84cc16 70%, #22c55e 100%)'
          }}
        />
        
        {/* Overlay para ocultar la parte no llenada */}
        <div 
          className="absolute top-0 right-0 bottom-0 bg-gray-200 transition-all duration-500 ease-in-out rounded-r-full"
          style={{
            width: `${100 - percentage}%`
          }}
        />
        
        {/* Marcadores de puntos de referencia */}
        <div className="absolute inset-0">
          {/* Línea en 100 */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-white opacity-80"
            style={{ left: `${point100}%` }}
          />
          {/* Línea en 200 */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-white opacity-80"
            style={{ left: `${point200}%` }}
          />
          {/* Línea en 300 */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-white opacity-80"
            style={{ left: `${point300}%` }}
          />
          {/* Línea en 400 */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-white opacity-80"
            style={{ left: `${point400}%` }}
          />
          {/* Línea en 500 */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-white opacity-80"
            style={{ left: `${point500}%` }}
          />
        </div>
        
        {/* Indicador del valor actual */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg transition-all duration-500 ease-in-out rounded-full"
          style={{ left: `calc(${percentage}% - 2px)` }}
        />
      </div>
    </div>
  )
}