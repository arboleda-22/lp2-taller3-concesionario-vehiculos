'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { FileText, Car, Loader2 } from 'lucide-react'
import type { Vehicle } from '@/lib/types'
import type { SimulationData } from '@/components/financing-simulator'
import { formatPrice, submitQuote } from '@/lib/api'

interface QuoteModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vehicle?: Vehicle | null
  simulation?: SimulationData | null
}

export function QuoteModal({ open, onOpenChange, vehicle, simulation }: QuoteModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await submitQuote({
        ...formData,
        vehicleId: vehicle?.id,
        vehicleSummary: vehicle ? `${vehicle.brand} ${vehicle.model} ${vehicle.year}` : undefined,
        simulationSummary: simulation || undefined,
      })
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        onOpenChange(false)
        setFormData({ name: '', email: '', phone: '' })
      }, 2000)
    } catch (error) {
      console.error('Error submitting quote:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Solicitar Cotización
          </DialogTitle>
          <DialogDescription>
            Completa tus datos y te contactaremos pronto
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
              <FileText className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold">Solicitud enviada</h3>
            <p className="mt-2 text-muted-foreground">
              Un asesor te contactará pronto
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Vehicle summary */}
            {vehicle && (
              <>
                <div className="rounded-lg bg-muted/50 p-4">
                  <div className="flex items-center gap-3">
                    <Car className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">
                        {vehicle.brand} {vehicle.model}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {vehicle.year} • {vehicle.city} • {formatPrice(vehicle.price)}
                      </p>
                    </div>
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Simulation summary */}
            {simulation && !vehicle && (
              <>
                <div className="rounded-lg bg-muted/50 p-4 space-y-2">
                  <p className="font-medium text-sm">Resumen de simulación</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Valor:</span>{' '}
                      <span className="font-medium">{formatPrice(simulation.vehicleValue)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cuota inicial:</span>{' '}
                      <span className="font-medium">{simulation.initialFeePercentage}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Plazo:</span>{' '}
                      <span className="font-medium">{simulation.months} meses</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cuota mensual:</span>{' '}
                      <span className="font-medium text-primary">{formatPrice(simulation.monthlyPayment)}</span>
                    </div>
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Form fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+57 300 123 4567"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Enviar solicitud'
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
