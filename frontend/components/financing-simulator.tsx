'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Calculator, DollarSign, Percent, Calendar, TrendingUp } from 'lucide-react'
import { formatPrice } from '@/lib/api'

interface FinancingSimulatorProps {
  onRequestQuote: (simulation: SimulationData) => void
}

export interface SimulationData {
  vehicleValue: number
  initialFeePercentage: number
  months: number
  monthlyInterestRate: number
  monthlyPayment: number
  totalPayment: number
  totalInterest: number
}

export function FinancingSimulator({ onRequestQuote }: FinancingSimulatorProps) {
  const [vehicleValue, setVehicleValue] = useState(100000000)
  const [initialFeePercentage, setInitialFeePercentage] = useState(20)
  const [months, setMonths] = useState(48)
  const [monthlyInterestRate, setMonthlyInterestRate] = useState(1.2)

  // Calculate financing details
  const simulation = useMemo<SimulationData>(() => {
    const initialFee = vehicleValue * (initialFeePercentage / 100)
    const amountToFinance = vehicleValue - initialFee
    const rateDecimal = monthlyInterestRate / 100

    // Monthly payment using amortization formula
    // M = P * [r(1+r)^n] / [(1+r)^n - 1]
    let monthlyPayment = 0
    if (rateDecimal > 0 && months > 0) {
      const factor = Math.pow(1 + rateDecimal, months)
      monthlyPayment = amountToFinance * (rateDecimal * factor) / (factor - 1)
    } else if (months > 0) {
      monthlyPayment = amountToFinance / months
    }

    const totalPayment = monthlyPayment * months + initialFee
    const totalInterest = totalPayment - vehicleValue

    return {
      vehicleValue,
      initialFeePercentage,
      months,
      monthlyInterestRate,
      monthlyPayment,
      totalPayment,
      totalInterest,
    }
  }, [vehicleValue, initialFeePercentage, months, monthlyInterestRate])

  return (
    <section id="financing" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Simulador de <span className="text-primary">Financiamiento</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Calcula tu cuota mensual y planifica tu compra
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Sliders card */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Configura tu crédito
                </CardTitle>
                <CardDescription>
                  Ajusta los valores según tus necesidades
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Vehicle value */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      Valor del vehículo
                    </Label>
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(vehicleValue)}
                    </span>
                  </div>
                  <Slider
                    value={[vehicleValue]}
                    onValueChange={([value]) => setVehicleValue(value)}
                    min={30000000}
                    max={300000000}
                    step={5000000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{formatPrice(30000000)}</span>
                    <span>{formatPrice(300000000)}</span>
                  </div>
                </div>

                {/* Initial fee percentage */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <Percent className="h-4 w-4 text-muted-foreground" />
                      Cuota inicial
                    </Label>
                    <span className="text-lg font-bold text-primary">
                      {initialFeePercentage}% ({formatPrice(vehicleValue * initialFeePercentage / 100)})
                    </span>
                  </div>
                  <Slider
                    value={[initialFeePercentage]}
                    onValueChange={([value]) => setInitialFeePercentage(value)}
                    min={10}
                    max={50}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>10%</span>
                    <span>50%</span>
                  </div>
                </div>

                {/* Months */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      Plazo
                    </Label>
                    <span className="text-lg font-bold text-primary">
                      {months} meses
                    </span>
                  </div>
                  <Slider
                    value={[months]}
                    onValueChange={([value]) => setMonths(value)}
                    min={12}
                    max={84}
                    step={12}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>12 meses</span>
                    <span>84 meses</span>
                  </div>
                </div>

                {/* Interest rate */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      Tasa de interés mensual
                    </Label>
                    <span className="text-lg font-bold text-primary">
                      {monthlyInterestRate.toFixed(1)}%
                    </span>
                  </div>
                  <Slider
                    value={[monthlyInterestRate * 10]}
                    onValueChange={([value]) => setMonthlyInterestRate(value / 10)}
                    min={8}
                    max={25}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0.8%</span>
                    <span>2.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results card */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Resumen del crédito
                </CardTitle>
                <CardDescription>
                  Detalles de tu financiamiento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Monthly payment highlight */}
                <div className="rounded-xl bg-primary/10 p-6 text-center">
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Cuota mensual estimada
                  </p>
                  <p className="text-4xl font-bold text-primary">
                    {formatPrice(simulation.monthlyPayment)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Durante {months} meses
                  </p>
                </div>

                <Separator />

                {/* Details */}
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Valor del vehículo</span>
                    <span className="font-medium">{formatPrice(vehicleValue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cuota inicial ({initialFeePercentage}%)</span>
                    <span className="font-medium">{formatPrice(vehicleValue * initialFeePercentage / 100)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monto a financiar</span>
                    <span className="font-medium">{formatPrice(vehicleValue * (1 - initialFeePercentage / 100))}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total intereses</span>
                    <span className="font-medium text-primary">{formatPrice(simulation.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Total a pagar</span>
                    <span className="font-bold">{formatPrice(simulation.totalPayment)}</span>
                  </div>
                </div>

                <Separator />

                {/* CTA */}
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => onRequestQuote(simulation)}
                >
                  Solicitar cotización
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  * Este es un cálculo estimado. Las tasas y condiciones finales 
                  pueden variar según tu perfil crediticio.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
