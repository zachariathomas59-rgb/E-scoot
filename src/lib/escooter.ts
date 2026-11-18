export type VehicleType = 'moto' | 'trottinette'

export interface Vehicle {
  id: string
  name: string
  type: VehicleType
  usage: string
  price: string
  perDay: number
  caution: string
  cautionAmount: number
  autonomy: string
  zone: string
  included: string[]
}

export const TROTT_UNLOCK = 200
export const TROTT_PER_MIN = 100
export const TROTT_DAY = 5000

// Frais quand le véhicule n'est pas rendu en station : il reste
// dehors et devient visible sur la carte pour le prochain utilisateur.
// L'équipe doit aller le récupérer, d'où le supplément.
export const OFF_STATION_TROTT_FEE = 1000
export const OFF_STATION_MOTO_FEE = 2500

export const VEHICLES: Vehicle[] = [
  {
    id: 'rider-cargo',
    name: 'E-Rider Cargo',
    type: 'moto',
    usage: 'Pour transporter',
    price: '15 000 F CFA / jour',
    perDay: 15000,
    caution: '25 000 F CFA',
    cautionAmount: 25000,
    autonomy: '90 km',
    zone: 'Dakar Plateau · Mermoz',
    included: ['Casque inclus', 'Top-case 45L', 'Assistance 7j/7'],
  },
  {
    id: 'e-city',
    name: 'E-City',
    type: 'moto',
    usage: 'Pour tes trajets',
    price: '8 000 F CFA / jour',
    perDay: 8000,
    caution: '15 000 F CFA',
    cautionAmount: 15000,
    autonomy: '70 km',
    zone: 'Plateau · Sacré-Cœur',
    included: ['Casque inclus', 'Charge rapide', 'Assistance 7j/7'],
  },
  {
    id: 'e-scoot',
    name: 'E-Scoot',
    type: 'trottinette',
    usage: 'Pour les courts trajets',
    price: 'Libre : 200 F + 100 F / min · Journée : 5 000 F',
    perDay: 5000,
    caution: '0 F CFA',
    cautionAmount: 0,
    autonomy: '35 km',
    zone: 'Grand Dakar · Sacré-Cœur',
    included: ['Sans permis', 'Échange en 2 min', 'Assistance 7j/7'],
  },
]

export interface Zone {
  id: string
  num: string
  name: string
  status: string
  desc: string
}

export const ZONES: Zone[] = [
  { id: 'mermoz', num: '1', name: 'Mermoz', status: 'Places libres', desc: 'Bornes solaires · gardiennage · 4 trottinettes' },
  { id: 'plateau', num: '2', name: 'Dakar Plateau', status: 'Places libres', desc: 'Bornes solaires · accès 24h · 5 trottinettes' },
  { id: 'grand-dakar', num: '3', name: 'Grand Dakar', status: 'Places libres', desc: 'Recharge rapide · gardiennage · 3 trottinettes' },
  { id: 'sacre-coeur', num: '4', name: 'Sacré-Cœur', status: 'Places libres', desc: 'Centre-ville · casques dispo · 4 trottinettes' },
]

export const DEMO_CODE = '123456'

export function normalizePhone(input: string): string {
  const digits = input.replace(/\D/g, '')
  let local = digits
  if (local.startsWith('221')) local = local.slice(3)
  local = local.slice(-9)
  return '+221' + local
}

export function prettyPhone(phone: string): string {
  const d = phone.replace(/\D/g, '')
  const local = d.startsWith('221') ? d.slice(3) : d
  if (local.length !== 9) return phone
  return `+221 ${local.slice(0, 2)} ${local.slice(2, 5)} ${local.slice(5, 7)} ${local.slice(7, 9)}`
}

export function vehicleById(id: string): Vehicle {
  return VEHICLES.find((v) => v.id === id) ?? VEHICLES[0]
}

export function zoneById(id: string): Zone {
  return ZONES.find((z) => z.id === id) ?? ZONES[0]
}

export function fmt(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F CFA'
}

export const formatCFA = fmt

export function firstName(full: string): string {
  const p = (full || '').trim().split(/\s+/)[0]
  return p || 'Mamadou'
}
