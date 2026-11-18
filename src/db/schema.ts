export * from './auth-schema'

import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const profiles = sqliteTable('profiles', {
  id: text('id').primaryKey(),
  phone: text('phone').notNull().unique(),
  name: text('name').notNull().default(''),
  role: text('role').notNull().default(''),
  zone: text('zone').notNull().default(''),
  createdAt: text('created_at').notNull(),
})

export const vehicles = sqliteTable('vehicles', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  type: text('type').notNull(),
  usage: text('usage').notNull(),
  priceLabel: text('price_label').notNull(),
  pricePerDay: integer('price_per_day').notNull(),
  caution: integer('caution').notNull(),
  free: text('free').notNull().default(''),
  autonomy: text('autonomy').notNull().default(''),
  image: text('image').notNull().default(''),
  helmet: integer('helmet', { mode: 'boolean' }).notNull().default(false),
  solar: integer('solar', { mode: 'boolean' }).notNull().default(false),
  pickupZone: text('pickup_zone').notNull().default(''),
})

export const zones = sqliteTable('zones', {
  id: text('id').primaryKey(),
  num: text('num').notNull(),
  name: text('name').notNull(),
  detail: text('detail').notNull(),
})

export const bookings = sqliteTable('bookings', {
  id: text('id').primaryKey(),
  ref: text('ref').notNull(),
  phone: text('phone').notNull(),
  vehicleId: text('vehicle_id').notNull(),
  vehicleName: text('vehicle_name').notNull(),
  creneau: text('creneau').notNull(),
  zone: text('zone').notNull(),
  duration: text('duration').notNull(),
  days: integer('days').notNull(),
  total: integer('total').notNull(),
  caution: integer('caution').notNull(),
  status: text('status').notNull().default('reservee'),
  createdAt: text('created_at').notNull(),
})

export const reports = sqliteTable('reports', {
  id: text('id').primaryKey(),
  phone: text('phone').notNull(),
  kind: text('kind').notNull(),
  title: text('title').notNull(),
  detail: text('detail').notNull().default(''),
  ref: text('ref').notNull(),
  createdAt: text('created_at').notNull(),
})

export type Profile = typeof profiles.$inferSelect
export type Vehicle = typeof vehicles.$inferSelect
export type Zone = typeof zones.$inferSelect
export type Booking = typeof bookings.$inferSelect
