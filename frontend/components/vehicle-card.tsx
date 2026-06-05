'use client'

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { 
  Heart, 
  GitCompare, 
  Star, 
  Fuel, 
  Gauge, 
  Settings2,
  MapPin,
  Calendar
} from 'lucide-react'
import type { Vehicle } from '@/lib/types'
import { formatPrice, formatMileage, getConditionLabel, getFuelLabel, getTransmissionLabel } from '@/lib/api'

interface VehicleCardProps {
  vehicle: Vehicle
  isFavorite: boolean
  isComparing: boolean
  onToggleFavorite: (vehicleId: string) => void
  onToggleCompare: (vehicleId: string) => void
  onQuote: (vehicle: Vehicle) => void
  onTestDrive: (vehicle: Vehicle) => void
}

export function VehicleCard({
  vehicle,
  isFavorite,
  isComparing,
  onToggleFavorite,
  onToggleCompare,
  onQuote,
  onTestDrive,
}: VehicleCardProps) {
  const conditionColors = {
    new: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
    'semi-new': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    used: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  }

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card">
      {/* Image container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={vehicle.image}
          alt={`${vehicle.brand} ${vehicle.model}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Top actions */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <Badge variant="secondary" className={conditionColors[vehicle.condition]}>
            {getConditionLabel(vehicle.condition)}
          </Badge>
          
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className={`h-8 w-8 rounded-full backdrop-blur-sm transition-colors ${
                      isFavorite 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-background/80 hover:bg-background'
                    }`}
                    onClick={() => onToggleFavorite(vehicle.id)}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className={`h-8 w-8 rounded-full backdrop-blur-sm transition-colors ${
                      isComparing 
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                        : 'bg-background/80 hover:bg-background'
                    }`}
                    onClick={() => onToggleCompare(vehicle.id)}
                  >
                    <GitCompare className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isComparing ? 'Quitar de comparación' : 'Comparar'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Rating badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-background/90 backdrop-blur-sm px-2 py-1">
          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
          <span className="text-xs font-medium">{vehicle.rating}</span>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Brand and Model */}
        <div className="mb-2">
          <p className="text-xs font-medium text-primary uppercase tracking-wide">{vehicle.brand}</p>
          <h3 className="text-lg font-bold text-card-foreground">{vehicle.model}</h3>
        </div>

        {/* Year and Location */}
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {vehicle.year}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {vehicle.city}
          </span>
        </div>

        {/* Specs grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex flex-col items-center rounded-lg bg-muted/50 p-2">
            <Gauge className="h-4 w-4 text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground">{formatMileage(vehicle.mileage)}</span>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-muted/50 p-2">
            <Fuel className="h-4 w-4 text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground">{getFuelLabel(vehicle.fuel)}</span>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-muted/50 p-2">
            <Settings2 className="h-4 w-4 text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground">{getTransmissionLabel(vehicle.transmission)}</span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-2xl font-bold text-card-foreground">{formatPrice(vehicle.price)}</p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button 
            className="flex-1" 
            onClick={() => onQuote(vehicle)}
          >
            Cotizar
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => onTestDrive(vehicle)}
          >
            Test Drive
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
