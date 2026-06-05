'use client'

import { useState, useEffect, useMemo } from 'react'
import useSWR from 'swr'
import { VehicleCard } from '@/components/vehicle-card'
import { VehicleFilters } from '@/components/vehicle-filters'
import { Skeleton } from '@/components/ui/skeleton'
import { getVehicles, mockVehicles } from '@/lib/api'
import type { Vehicle, Filters } from '@/lib/types'
import { Car } from 'lucide-react'

// SWR fetcher
const fetcher = async () => {
  const response = await getVehicles()
  return response.data
}

interface VehicleInventoryProps {
  onQuote: (vehicle: Vehicle) => void
  onTestDrive: (vehicle: Vehicle) => void
  compareVehicles: string[]
  onToggleCompare: (vehicleId: string) => void
}

export function VehicleInventory({
  onQuote,
  onTestDrive,
  compareVehicles,
  onToggleCompare,
}: VehicleInventoryProps) {
  // Fetch vehicles with SWR for caching and revalidation
  const { data: vehicles, isLoading, error } = useSWR<Vehicle[]>('vehicles', fetcher, {
    fallbackData: mockVehicles,
    revalidateOnFocus: false,
  })

  // Filters state
  const [filters, setFilters] = useState<Filters>({
    search: '',
    category: '',
    condition: '',
    city: '',
    maxPrice: 300000000,
  })

  // Favorites state (persisted in localStorage)
  const [favorites, setFavorites] = useState<string[]>([])

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('vehicleFavorites')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  // Toggle favorite and persist to localStorage
  const handleToggleFavorite = (vehicleId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(vehicleId)
        ? prev.filter((id) => id !== vehicleId)
        : [...prev, vehicleId]
      localStorage.setItem('vehicleFavorites', JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  // Filter vehicles based on current filters
  const filteredVehicles = useMemo(() => {
    if (!vehicles) return []
    
    return vehicles.filter((vehicle) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch = 
          vehicle.brand.toLowerCase().includes(searchLower) ||
          vehicle.model.toLowerCase().includes(searchLower) ||
          vehicle.city.toLowerCase().includes(searchLower) ||
          vehicle.category.toLowerCase().includes(searchLower)
        if (!matchesSearch) return false
      }

      // Category filter
      if (filters.category && vehicle.category !== filters.category) {
        return false
      }

      // Condition filter
      if (filters.condition && vehicle.condition !== filters.condition) {
        return false
      }

      // City filter
      if (filters.city && vehicle.city !== filters.city) {
        return false
      }

      // Max price filter
      if (vehicle.price > filters.maxPrice) {
        return false
      }

      return true
    })
  }, [vehicles, filters])

  // Extract unique values for filter options
  const filterOptions = useMemo(() => {
    if (!vehicles) return { categories: [], cities: [] }
    return {
      categories: [...new Set(vehicles.map((v) => v.category))],
      cities: [...new Set(vehicles.map((v) => v.city))],
    }
  }, [vehicles])

  return (
    <section id="inventory" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Nuestro <span className="text-primary">Inventario</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explora nuestra selección de vehículos premium
          </p>
        </div>

        {/* Filters */}
        <VehicleFilters
          filters={filters}
          onFiltersChange={setFilters}
          categories={filterOptions.categories}
          cities={filterOptions.cities}
        />

        {/* Loading state */}
        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <VehicleCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-8 text-center">
            <p className="text-destructive">Error al cargar los vehículos. Por favor, intenta de nuevo.</p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && filteredVehicles.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16">
            <Car className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">No se encontraron vehículos</h3>
            <p className="mt-2 text-sm text-muted-foreground/70">
              Intenta ajustar los filtros de búsqueda
            </p>
          </div>
        )}

        {/* Vehicle grid */}
        {!isLoading && !error && filteredVehicles.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                isFavorite={favorites.includes(vehicle.id)}
                isComparing={compareVehicles.includes(vehicle.id)}
                onToggleFavorite={handleToggleFavorite}
                onToggleCompare={onToggleCompare}
                onQuote={onQuote}
                onTestDrive={onTestDrive}
              />
            ))}
          </div>
        )}

        {/* Results count */}
        {!isLoading && !error && filteredVehicles.length > 0 && (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Mostrando {filteredVehicles.length} de {vehicles?.length || 0} vehículos
          </p>
        )}
      </div>
    </section>
  )
}

// Skeleton component for loading state
function VehicleCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-6 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Skeleton className="h-12 rounded-lg" />
          <Skeleton className="h-12 rounded-lg" />
          <Skeleton className="h-12 rounded-lg" />
        </div>
        <Skeleton className="h-8 w-40" />
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </div>
    </div>
  )
}
