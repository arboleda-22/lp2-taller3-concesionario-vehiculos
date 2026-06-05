'use client'

import Image from 'next/image'
import useSWR from 'swr'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Phone, MessageCircle, Clock, MapPin } from 'lucide-react'
import { getAdvisors, mockAdvisors } from '@/lib/api'
import type { Advisor } from '@/lib/types'

// SWR fetcher
const fetcher = async () => {
  const response = await getAdvisors()
  return response.data
}

export function AdvisorsSection() {
  const { data: advisors, isLoading } = useSWR<Advisor[]>('advisors', fetcher, {
    fallbackData: mockAdvisors,
    revalidateOnFocus: false,
  })

  return (
    <section id="advisors" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Nuestros <span className="text-primary">Asesores</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Expertos listos para ayudarte a encontrar tu vehículo ideal
          </p>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <AdvisorCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Advisors grid */}
        {!isLoading && advisors && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {advisors.map((advisor) => (
              <AdvisorCard key={advisor.id} advisor={advisor} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function AdvisorCard({ advisor }: { advisor: Advisor }) {
  const handleCall = () => {
    window.location.href = `tel:${advisor.phone.replace(/\s/g, '')}`
  }

  const handleChat = () => {
    // WhatsApp link
    const phone = advisor.phone.replace(/\s/g, '').replace('+', '')
    const message = encodeURIComponent('Hola, me gustaría información sobre vehículos.')
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
  }

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6">
        {/* Avatar */}
        <div className="relative mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full ring-4 ring-primary/10 group-hover:ring-primary/20 transition-all">
          <Image
            src={advisor.image}
            alt={advisor.name}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>

        {/* Info */}
        <div className="text-center mb-4">
          <h3 className="font-semibold text-lg">{advisor.name}</h3>
          <p className="text-sm text-muted-foreground">{advisor.role}</p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {advisor.responseTime}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {advisor.city}
          </Badge>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 gap-1" onClick={handleCall}>
            <Phone className="h-4 w-4" />
            Llamar
          </Button>
          <Button className="flex-1 gap-1" onClick={handleChat}>
            <MessageCircle className="h-4 w-4" />
            Chat
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function AdvisorCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <Skeleton className="mx-auto mb-4 h-24 w-24 rounded-full" />
        <div className="text-center space-y-2 mb-4">
          <Skeleton className="mx-auto h-5 w-32" />
          <Skeleton className="mx-auto h-4 w-40" />
        </div>
        <div className="flex justify-center gap-2 mb-4">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </CardContent>
    </Card>
  )
}
