'use client'

import Image from 'next/image'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { GitCompare, X, Star, Fuel, Gauge, Settings2, MapPin, Calendar } from 'lucide-react'
import type { Vehicle } from '@/lib/types'
import { formatPrice, formatMileage, getConditionLabel, getFuelLabel, getTransmissionLabel } from '@/lib/api'

interface CompareDrawerProps {
  vehicles: Vehicle[]
  onRemove: (vehicleId: string) => void
  onClear: () => void
}

export function CompareDrawer({ vehicles, onRemove, onClear }: CompareDrawerProps) {
  if (vehicles.length === 0) return null

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 z-50 gap-2 shadow-lg"
          size="lg"
        >
          <GitCompare className="h-5 w-5" />
          Comparar ({vehicles.length})
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85vh] sm:h-[70vh]">
        <SheetHeader className="pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <GitCompare className="h-5 w-5 text-primary" />
              Comparar Vehículos
            </SheetTitle>
            <Button variant="ghost" size="sm" onClick={onClear}>
              Limpiar comparación
            </Button>
          </div>
        </SheetHeader>

        <ScrollArea className="h-full pb-8">
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${vehicles.length}, minmax(280px, 1fr))` }}>
            {vehicles.map((vehicle) => (
              <CompareCard key={vehicle.id} vehicle={vehicle} onRemove={onRemove} />
            ))}
          </div>

          {/* Comparison table */}
          {vehicles.length > 1 && (
            <>
              <Separator className="my-6" />
              <ComparisonTable vehicles={vehicles} />
            </>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

function CompareCard({ vehicle, onRemove }: { vehicle: Vehicle; onRemove: (id: string) => void }) {
  return (
    <div className="relative rounded-xl border bg-card p-4">
      {/* Remove button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-8 w-8"
        onClick={() => onRemove(vehicle.id)}
      >
        <X className="h-4 w-4" />
      </Button>

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
        <Image
          src={vehicle.image}
          alt={`${vehicle.brand} ${vehicle.model}`}
          fill
          className="object-cover"
          sizes="280px"
        />
        <Badge className="absolute bottom-2 left-2">
          {getConditionLabel(vehicle.condition)}
        </Badge>
      </div>

      {/* Info */}
      <div className="space-y-2">
        <div>
          <p className="text-xs font-medium text-primary uppercase">{vehicle.brand}</p>
          <h3 className="text-lg font-bold">{vehicle.model}</h3>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          {vehicle.year}
          <MapPin className="h-3.5 w-3.5 ml-2" />
          {vehicle.city}
        </div>

        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-primary text-primary" />
          <span className="text-sm font-medium">{vehicle.rating}</span>
        </div>

        <p className="text-xl font-bold text-primary">{formatPrice(vehicle.price)}</p>
      </div>
    </div>
  )
}

function ComparisonTable({ vehicles }: { vehicles: Vehicle[] }) {
  const specs = [
    { 
      label: 'Kilometraje', 
      icon: Gauge,
      getValue: (v: Vehicle) => formatMileage(v.mileage) 
    },
    { 
      label: 'Combustible', 
      icon: Fuel,
      getValue: (v: Vehicle) => getFuelLabel(v.fuel) 
    },
    { 
      label: 'Transmisión', 
      icon: Settings2,
      getValue: (v: Vehicle) => getTransmissionLabel(v.transmission) 
    },
    { 
      label: 'Categoría', 
      icon: GitCompare,
      getValue: (v: Vehicle) => v.category 
    },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Especificación</th>
            {vehicles.map((v) => (
              <th key={v.id} className="text-left py-3 px-4 font-medium">
                {v.brand} {v.model}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {specs.map((spec) => (
            <tr key={spec.label} className="border-b">
              <td className="py-3 px-4">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <spec.icon className="h-4 w-4" />
                  {spec.label}
                </span>
              </td>
              {vehicles.map((v) => (
                <td key={v.id} className="py-3 px-4 font-medium">
                  {spec.getValue(v)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
