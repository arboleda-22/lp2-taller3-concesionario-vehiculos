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
import { Car, Calendar, Loader2, MessageSquare } from 'lucide-react'
import type { Vehicle } from '@/lib/types'
import { formatPrice, submitAppointment } from '@/lib/api'

interface TestDriveModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vehicle: Vehicle | null
}

export function TestDriveModal({ open, onOpenChange, vehicle }: TestDriveModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!vehicle) return

    setIsSubmitting(true)

    try {
      await submitAppointment({
        name: formData.name,
        phone: formData.phone,
        vehicleId: vehicle.id,
        date: formData.date,
        time: formData.time,
        message: formData.message || undefined,
      })
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        onOpenChange(false)
        setFormData({ name: '', phone: '', date: '', time: '', message: '' })
      }, 2000)
    } catch (error) {
      console.error('Error submitting appointment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  // Get minimum date (tomorrow)
  const minDate = new Date()
  minDate.setDate(minDate.getDate() + 1)
  const minDateStr = minDate.toISOString().split('T')[0]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Agendar Test Drive
          </DialogTitle>
          <DialogDescription>
            Agenda una prueba de manejo con uno de nuestros asesores
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold">Cita agendada</h3>
            <p className="mt-2 text-muted-foreground">
              Te confirmaremos tu cita pronto
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Fecha</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    min={minDateStr}
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Hora</Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    min="08:00"
                    max="18:00"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="flex items-center gap-2">
                  <MessageSquare className="h-3.5 w-3.5" />
                  Mensaje (opcional)
                </Label>
                <Input
                  id="message"
                  name="message"
                  placeholder="Alguna pregunta o comentario..."
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Agendando...
                </>
              ) : (
                'Agendar Test Drive'
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
