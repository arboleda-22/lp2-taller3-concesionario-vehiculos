'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calculator, Sparkles } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Concesionario Premium en Cali</span>
          </div>

          {/* Main headline */}
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Encuentra tu{' '}
            <span className="text-primary">vehículo ideal</span>{' '}
            con nosotros
          </h1>

          {/* Supporting text */}
          <p className="mx-auto mb-10 max-w-2xl text-balance text-lg text-muted-foreground md:text-xl">
            Vehículos nuevos, seminuevos y usados certificados de las mejores marcas. 
            Financiamiento flexible y servicio personalizado.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto gap-2 text-base">
              <Link href="#inventory">
                Ver inventario
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto gap-2 text-base">
              <Link href="#financing">
                <Calculator className="h-4 w-4" />
                Simular crédito
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: '500+', label: 'Vehículos disponibles' },
              { value: '15+', label: 'Marcas premium' },
              { value: '98%', label: 'Clientes satisfechos' },
              { value: '10+', label: 'Años de experiencia' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary md:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
