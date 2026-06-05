'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { VehicleInventory } from '@/components/vehicle-inventory'
import { FinancingSimulator, type SimulationData } from '@/components/financing-simulator'
import { AdvisorsSection } from '@/components/advisors-section'
import { Footer } from '@/components/footer'
import { QuoteModal } from '@/components/quote-modal'
import { TestDriveModal } from '@/components/test-drive-modal'
import { CompareDrawer } from '@/components/compare-drawer'
import type { Vehicle } from '@/lib/types'
import { mockVehicles } from '@/lib/api'

export default function Home() {
  // Modal states
  const [quoteModalOpen, setQuoteModalOpen] = useState(false)
  const [testDriveModalOpen, setTestDriveModalOpen] = useState(false)
  
  // Selected vehicle for modals
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  
  // Simulation data for quote modal
  const [simulationData, setSimulationData] = useState<SimulationData | null>(null)
  
  // Compare vehicles state
  const [compareVehicleIds, setCompareVehicleIds] = useState<string[]>([])

  // Get full vehicle objects for comparison
  const compareVehicles = useMemo(() => {
    return compareVehicleIds
      .map((id) => mockVehicles.find((v) => v.id === id))
      .filter((v): v is Vehicle => v !== undefined)
  }, [compareVehicleIds])

  // Handle quote request from vehicle card
  const handleQuote = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle)
    setSimulationData(null)
    setQuoteModalOpen(true)
  }

  // Handle quote request from financing simulator
  const handleSimulationQuote = (simulation: SimulationData) => {
    setSelectedVehicle(null)
    setSimulationData(simulation)
    setQuoteModalOpen(true)
  }

  // Handle test drive request
  const handleTestDrive = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle)
    setTestDriveModalOpen(true)
  }

  // Toggle compare vehicle
  const handleToggleCompare = (vehicleId: string) => {
    setCompareVehicleIds((prev) => {
      if (prev.includes(vehicleId)) {
        return prev.filter((id) => id !== vehicleId)
      }
      // Max 3 vehicles for comparison
      if (prev.length >= 3) {
        return prev
      }
      return [...prev, vehicleId]
    })
  }

  // Remove vehicle from comparison
  const handleRemoveFromCompare = (vehicleId: string) => {
    setCompareVehicleIds((prev) => prev.filter((id) => id !== vehicleId))
  }

  // Clear all comparisons
  const handleClearCompare = () => {
    setCompareVehicleIds([])
  }

  return (
    <main className="min-h-screen">
      {/* Header with navigation */}
      <Header />

      {/* Hero section */}
      <Hero />

      {/* Vehicle inventory with filters */}
      <VehicleInventory
        onQuote={handleQuote}
        onTestDrive={handleTestDrive}
        compareVehicles={compareVehicleIds}
        onToggleCompare={handleToggleCompare}
      />

      {/* Financing simulator */}
      <FinancingSimulator onRequestQuote={handleSimulationQuote} />

      {/* Advisors section */}
      <AdvisorsSection />

      {/* Footer */}
      <Footer />

      {/* Quote modal */}
      <QuoteModal
        open={quoteModalOpen}
        onOpenChange={setQuoteModalOpen}
        vehicle={selectedVehicle}
        simulation={simulationData}
      />

      {/* Test drive modal */}
      <TestDriveModal
        open={testDriveModalOpen}
        onOpenChange={setTestDriveModalOpen}
        vehicle={selectedVehicle}
      />

      {/* Compare drawer */}
      <CompareDrawer
        vehicles={compareVehicles}
        onRemove={handleRemoveFromCompare}
        onClear={handleClearCompare}
      />
    </main>
  )
}
