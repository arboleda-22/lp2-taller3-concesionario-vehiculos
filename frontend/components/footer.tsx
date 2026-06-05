import Link from 'next/link'
import { Car, MapPin, Phone, Mail } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Car className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">
                Auto<span className="text-primary">Premium</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Tu concesionario de confianza en Cali. Vehículos nuevos, seminuevos y usados 
              certificados de las mejores marcas.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="text-xl">f</span>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="text-xl">i</span>
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="text-xl">t</span>
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Enlaces rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#inventory" className="text-muted-foreground hover:text-primary transition-colors">
                  Inventario
                </Link>
              </li>
              <li>
                <Link href="#financing" className="text-muted-foreground hover:text-primary transition-colors">
                  Financiamiento
                </Link>
              </li>
              <li>
                <Link href="#advisors" className="text-muted-foreground hover:text-primary transition-colors">
                  Asesores
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Sobre nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Brands */}
          <div className="space-y-4">
            <h3 className="font-semibold">Marcas</h3>
            <ul className="space-y-2 text-sm">
              {['Mazda', 'Toyota', 'BMW', 'Kia', 'Chevrolet', 'Hyundai'].map((brand) => (
                <li key={brand}>
                  <Link href="#inventory" className="text-muted-foreground hover:text-primary transition-colors">
                    {brand}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Av. 6N #23N-45, Cali, Valle del Cauca, Colombia</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                <a href="tel:+5726001234" className="hover:text-primary transition-colors">
                  +57 (2) 600 1234
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:info@autopremium.co" className="hover:text-primary transition-colors">
                  info@autopremium.co
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground md:flex-row">
          <p>&copy; {new Date().getFullYear()} AutoPremium. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-primary transition-colors">
              Términos y condiciones
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Política de privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
