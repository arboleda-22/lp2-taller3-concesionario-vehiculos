'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import type { Filters } from '@/lib/types'
import { formatPrice } from '@/lib/api'
import { useState } from 'react'

interface VehicleFiltersProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
  categories: string[]
  cities: string[]
}

export function VehicleFilters({
  filters,
  onFiltersChange,
  categories,
  cities,
}: VehicleFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      category: '',
      condition: '',
      city: '',
      maxPrice: 300000000,
    })
  }

  const hasActiveFilters = 
    filters.search || 
    filters.category || 
    filters.condition || 
    filters.city || 
    filters.maxPrice < 300000000

  const FilterControls = () => (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="search" className="text-sm font-medium">
          Buscar
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Marca, modelo, ciudad..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category" className="text-sm font-medium">
          Categoría
        </Label>
        <Select
          value={filters.category}
          onValueChange={(value) => updateFilter('category', value === 'all' ? '' : value)}
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Todas las categorías" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Condition */}
      <div className="space-y-2">
        <Label htmlFor="condition" className="text-sm font-medium">
          Condición
        </Label>
        <Select
          value={filters.condition}
          onValueChange={(value) => updateFilter('condition', value === 'all' ? '' : value)}
        >
          <SelectTrigger id="condition">
            <SelectValue placeholder="Todas las condiciones" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las condiciones</SelectItem>
            <SelectItem value="new">Nuevo</SelectItem>
            <SelectItem value="semi-new">Seminuevo</SelectItem>
            <SelectItem value="used">Usado Certificado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* City */}
      <div className="space-y-2">
        <Label htmlFor="city" className="text-sm font-medium">
          Ciudad
        </Label>
        <Select
          value={filters.city}
          onValueChange={(value) => updateFilter('city', value === 'all' ? '' : value)}
        >
          <SelectTrigger id="city">
            <SelectValue placeholder="Todas las ciudades" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las ciudades</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Max Price */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Precio máximo</Label>
          <span className="text-sm font-medium text-primary">
            {formatPrice(filters.maxPrice)}
          </span>
        </div>
        <Slider
          value={[filters.maxPrice]}
          onValueChange={([value]) => updateFilter('maxPrice', value)}
          max={300000000}
          min={30000000}
          step={5000000}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatPrice(30000000)}</span>
          <span>{formatPrice(300000000)}</span>
        </div>
      </div>

      {/* Clear filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          className="w-full gap-2"
          onClick={clearFilters}
        >
          <X className="h-4 w-4" />
          Limpiar filtros
        </Button>
      )}
    </div>
  )

  return (
    <div className="mb-8">
      {/* Desktop filters */}
      <div className="hidden lg:block">
        <div className="rounded-xl border bg-card p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {/* Search */}
            <div className="lg:col-span-2">
              <Label htmlFor="search-desktop" className="sr-only">
                Buscar
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="search-desktop"
                  placeholder="Buscar por marca, modelo, ciudad..."
                  value={filters.search}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category */}
            <Select
              value={filters.category}
              onValueChange={(value) => updateFilter('category', value === 'all' ? '' : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Condition */}
            <Select
              value={filters.condition}
              onValueChange={(value) => updateFilter('condition', value === 'all' ? '' : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Condición" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las condiciones</SelectItem>
                <SelectItem value="new">Nuevo</SelectItem>
                <SelectItem value="semi-new">Seminuevo</SelectItem>
                <SelectItem value="used">Usado Certificado</SelectItem>
              </SelectContent>
            </Select>

            {/* City */}
            <Select
              value={filters.city}
              onValueChange={(value) => updateFilter('city', value === 'all' ? '' : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Ciudad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las ciudades</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price slider row */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Precio máximo</Label>
                <span className="text-sm font-medium text-primary">
                  {formatPrice(filters.maxPrice)}
                </span>
              </div>
              <Slider
                value={[filters.maxPrice]}
                onValueChange={([value]) => updateFilter('maxPrice', value)}
                max={300000000}
                min={30000000}
                step={5000000}
                className="w-full"
              />
            </div>

            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={clearFilters}
              >
                <X className="h-4 w-4" />
                Limpiar filtros
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filters */}
      <div className="lg:hidden">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar vehículos..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="pl-10"
            />
          </div>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <SlidersHorizontal className="h-4 w-4" />
                {hasActiveFilters && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterControls />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}
