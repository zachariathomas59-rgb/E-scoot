import { createServerFn } from '@tanstack/react-start'
import { desc, eq } from 'drizzle-orm'
import { bookings, profiles, reports, vehicles, zones } from '@/db/schema'

function fmt(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F CFA'
}

export const listVehicles = createServerFn({ method: 'GET' }).handler(async () => {
  const { getDb } = await import('@/lib/db')
  const db = await getDb()
  return await db.select().from(vehicles)
})

export const getVehicle = createServerFn({ method: 'GET' })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    const { getDb } = await import('@/lib/db')
    const db = await getDb()
    const rows = await db.select().from(vehicles).where(eq(vehicles.id, data.id))
    return rows[0] ?? null
  })

export const listZones = createServerFn({ method: 'GET' }).handler(async () => {
  const { getDb } = await import('@/lib/db')
  const db = await getDb()
  return await db.select().from(zones)
})

export const getProfile = createServerFn({ method: 'GET' })
  .validator((d: { phone: string }) => d)
  .handler(async ({ data }) => {
    if (!data.phone) return null
    const { getDb } = await import('@/lib/db')
    const db = await getDb()
    const rows = await db.select().from(profiles).where(eq(profiles.phone, data.phone))
    return rows[0] ?? null
  })

export const saveProfile = createServerFn({ method: 'POST' })
  .validator((d: { phone: string; name: string; role: string; zone: string }) => d)
  .handler(async ({ data }) => {
    const { getDb } = await import('@/lib/db')
    const db = await getDb()
    const rows = await db.select().from(profiles).where(eq(profiles.phone, data.phone))
    const existing = rows[0]
    if (existing) {
      await db.update(profiles).set({ name: data.name, role: data.role, zone: data.zone }).where(eq(profiles.phone, data.phone))
      return { ok: true as const }
    }
    await db.insert(profiles).values({ id: crypto.randomUUID(), phone: data.phone, name: data.name, role: data.role, zone: data.zone, createdAt: new Date().toISOString() })
    return { ok: true as const }
  })

export const createProfile = createServerFn({ method: 'POST' })
  .validator((d: { phone: string; name: string; accountType: string; area: string }) => d)
  .handler(async ({ data }) => {
    const { getDb } = await import('@/lib/db')
    const db = await getDb()
    const rows = await db.select().from(profiles).where(eq(profiles.phone, data.phone))
    const existing = rows[0]
    if (existing) {
      await db.update(profiles).set({ name: data.name, role: data.accountType, zone: data.area }).where(eq(profiles.phone, data.phone))
      return { ok: true as const }
    }
    await db.insert(profiles).values({ id: crypto.randomUUID(), phone: data.phone, name: data.name, role: data.accountType, zone: data.area, createdAt: new Date().toISOString() })
    return { ok: true as const }
  })

export const createBooking = createServerFn({ method: 'POST' })
  .validator((d: { phone: string; vehicleId: string; creneau: string; zone: string; duration: string }) => d)
  .handler(async ({ data }) => {
    const { getDb } = await import('@/lib/db')
    const db = await getDb()
    const vrows = await db.select().from(vehicles).where(eq(vehicles.id, data.vehicleId))
    const v = vrows[0]
    if (!v) throw new Error('Véhicule introuvable')
    const days = data.duration.startsWith('3') ? 3 : data.duration.startsWith('7') ? 7 : 1
    const total = v.type === 'trottinette' && days === 1 ? 5000 : v.pricePerDay * days
    const ref = 'JEF-' + String(Math.floor(1000 + Math.random() * 9000))
    const id = crypto.randomUUID()
    await db.insert(bookings).values({
      id, ref, phone: data.phone, vehicleId: v.id, vehicleName: v.name,
      creneau: data.creneau, zone: data.zone, duration: data.duration,
      days, total, caution: v.caution, status: 'reservee', createdAt: new Date().toISOString(),
    })
    return { id, ref, total, caution: v.caution, totalLabel: fmt(total), cautionLabel: fmt(v.caution) }
  })

export const bookingById = createServerFn({ method: 'GET' })
  .validator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    const { getDb } = await import('@/lib/db')
    const db = await getDb()
    const rows = await db.select().from(bookings).where(eq(bookings.id, data.id))
    return rows[0] ?? null
  })

export const latestBooking = createServerFn({ method: 'GET' })
  .validator((d: { phone: string }) => d)
  .handler(async ({ data }) => {
    if (!data.phone) return null
    const { getDb } = await import('@/lib/db')
    const db = await getDb()
    const rows = await db.select().from(bookings).where(eq(bookings.phone, data.phone)).orderBy(desc(bookings.createdAt)).limit(1)
    return rows[0] ?? null
  })

export const setBookingStatus = createServerFn({ method: 'POST' })
  .validator((d: { id: string; status: string }) => d)
  .handler(async ({ data }) => {
    const { getDb } = await import('@/lib/db')
    const db = await getDb()
    await db.update(bookings).set({ status: data.status }).where(eq(bookings.id, data.id))
    return { ok: true as const }
  })

export const createReport = createServerFn({ method: 'POST' })
  .validator((d: { phone: string; kind: string; title: string; detail: string }) => d)
  .handler(async ({ data }) => {
    const { getDb } = await import('@/lib/db')
    const db = await getDb()
    const ref = 'AST-' + String(Math.floor(1000 + Math.random() * 9000))
    await db.insert(reports).values({ id: crypto.randomUUID(), phone: data.phone, kind: data.kind, title: data.title, detail: data.detail, ref, createdAt: new Date().toISOString() })
    return { ref }
  })
