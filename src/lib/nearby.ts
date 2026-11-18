export interface FreeScooter {
  id: string
  code: string
  lat: number
  lon: number
  battery: number
  station: string | null
  address: string
}

export interface Station {
  id: string
  name: string
  short: string
  lat: number
  lon: number
  address: string
  slots: number
  scooters: number
}

export const DAKAR_CENTER = { lat: 14.6937, lon: -17.4441 }

// 4 stations officielles demandées
export const STATIONS: Station[] = [
  {
    id: 'mermoz',
    name: 'Mermoz',
    short: 'Mermoz',
    lat: 14.7001,
    lon: -17.4546,
    address: 'Mermoz · VDN, en face Canalis',
    slots: 10,
    scooters: 4,
  },
  {
    id: 'plateau',
    name: 'Dakar Plateau',
    short: 'Plateau',
    lat: 14.6712,
    lon: -17.4345,
    address: 'Av. Pompidou · Plateau',
    slots: 12,
    scooters: 5,
  },
  {
    id: 'grand-dakar',
    name: 'Grand Dakar',
    short: 'Grand Dakar',
    lat: 14.6868,
    lon: -17.4405,
    address: 'Grand Dakar · marché Tilène',
    slots: 8,
    scooters: 3,
  },
  {
    id: 'sacre-coeur',
    name: 'Sacré-Cœur',
    short: 'Sacré-Cœur',
    lat: 14.7089,
    lon: -17.4646,
    address: 'Sacré-Cœur · VDN',
    slots: 10,
    scooters: 4,
  },
]

// Positions réalistes autour de Dakar. En journée les trottinettes
// sont dispersées hors stations (free-floating) ; quand il n'y en a
// aucune dehors, on propose de passer en station pour récupérer.
export const FREE_SCOOTERS: FreeScooter[] = [
  { id: 'ts-101', code: 'TS-101', lat: 14.6712, lon: -17.4345, battery: 86, station: null, address: 'Av. Pompidou · Plateau' },
  { id: 'ts-102', code: 'TS-102', lat: 14.6698, lon: -17.4382, battery: 72, station: null, address: 'Rue M. Ndiaye · Plateau' },
  { id: 'ts-203', code: 'TS-203', lat: 14.7166, lon: -17.4672, battery: 91, station: null, address: 'Ouakam · hors station' },
  { id: 'ts-204', code: 'TS-204', lat: 14.7005, lon: -17.455, battery: 64, station: 'Mermoz', address: 'Station Mermoz · borne 2' },
  { id: 'ts-305', code: 'TS-305', lat: 14.7089, lon: -17.4546, battery: 78, station: null, address: 'Sacré-Cœur · VDN' },
  { id: 'ts-306', code: 'TS-306', lat: 14.7001, lon: -17.4478, battery: 58, station: null, address: 'Mermoz · en face Canalis' },
  { id: 'ts-407', code: 'TS-407', lat: 14.6852, lon: -17.4421, battery: 95, station: 'Grand Dakar', address: 'Station Grand Dakar · borne 1' },
  { id: 'ts-408', code: 'TS-408', lat: 14.6865, lon: -17.4415, battery: 49, station: null, address: 'Grand Dakar · Tilène' },
]

export function haversineKm(aLat: number, aLon: number, bLat: number, bLon: number): number {
  const R = 6371
  const dLat = ((bLat - aLat) * Math.PI) / 180
  const dLon = ((bLon - aLon) * Math.PI) / 180
  const s =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((aLat * Math.PI) / 180) * Math.cos((bLat * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  return 2 * R * Math.asin(Math.sqrt(s))
}

export function formatDistance(km: number): string {
  if (km < 1) return `${Math.max(30, Math.round((km * 1000) / 10) * 10)} m`
  return `${km.toFixed(1).replace('.', ',')} km`
}

export const formatDist = (meters: number): string => formatDistance(meters / 1000)

export type ScooterWithDistance = FreeScooter & { zone: string; horsStation: boolean; distM: number }

export function withDistance(userLat: number, userLon: number, limit = 8): ScooterWithDistance[] {
  return FREE_SCOOTERS.map((s) => ({
    ...s,
    zone: s.station ?? s.address,
    horsStation: s.station === null,
    distM: haversineKm(userLat, userLon, s.lat, s.lon) * 1000,
  }))
    .sort((a, b) => a.distM - b.distM)
    .slice(0, limit)
}

export function walkMinutes(km: number): number {
  return Math.max(1, Math.round((km / 4.5) * 60))
}

export interface NearbyScooter extends FreeScooter {
  km: number
}

export function nearestScooters(userLat: number, userLon: number, limit = 5): NearbyScooter[] {
  return FREE_SCOOTERS.map((s) => ({ ...s, km: haversineKm(userLat, userLon, s.lat, s.lon) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, limit)
}

export interface StationWithDistance extends Station {
  km: number
}

export function nearestStations(userLat: number, userLon: number, limit = 4): StationWithDistance[] {
  return STATIONS.map((s) => ({ ...s, km: haversineKm(userLat, userLon, s.lat, s.lon) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, limit)
}

export function outsideCount(list: { horsStation: boolean }[]): number {
  return list.filter((s) => s.horsStation).length
}
