export interface DroppedVehicle {
  id: string
  code: string
  kind: 'moto' | 'trottinette'
  address: string
  lat: number
  lon: number
  battery: number
  at: string
}

const KEY = 'jef-drops'

export function readDrops(): DroppedVehicle[] {
  if (typeof localStorage === 'undefined') return []
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const arr = JSON.parse(raw) as DroppedVehicle[]
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

export function addDrop(drop: DroppedVehicle) {
  try {
    const list = readDrops()
    if (list.some((d) => d.id === drop.id)) return list
    const next = [drop, ...list].slice(0, 20)
    localStorage.setItem(KEY, JSON.stringify(next))
    return next
  } catch {
    return [drop]
  }
}

export function clearDrops() {
  try {
    localStorage.removeItem(KEY)
  } catch { /* ignore */ }
}

export const DAKAR_SPOTS = [
  'Rue 10 · Médina (position GPS)',
  'Av. Pompidou · Plateau (position GPS)',
  'Sacré-Cœur · VDN (position GPS)',
  'Mermoz · en face Canalis (position GPS)',
  'Grand Dakar · Tilène (position GPS)',
]
