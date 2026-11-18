import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Phone, MAP_DAKAR } from '@/components/phone'
import { BackHeader } from './acces'
import { vehicleById, fmt, ZONES } from '@/lib/escooter'
import { STATIONS } from '@/lib/nearby'

export const Route = createFileRoute('/reservation/$id')({
  component: Reservation,
})

function stored(k: string, fallback: string) {
  if (typeof localStorage === 'undefined') return fallback
  return localStorage.getItem(k) ?? fallback
}

function Reservation() {
  const { id } = Route.useParams()
  const nav = useNavigate()
  const v = vehicleById(id)
  const [days, setDays] = useState(1)
  const [slot, setSlot] = useState('Aujourd’hui · 10:00')
  const [stationId, setStationId] = useState(() => stored('jef-station-id', 'plateau'))
  const total = v.perDay * days
  const station = STATIONS.find((s) => s.id === stationId) ?? STATIONS[1]
  const zoneMeta = ZONES.find((z) => z.id === stationId)
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${station.lat},${station.lon}`

  const go = () => {
    try {
      localStorage.setItem('jef-days', String(days))
      localStorage.setItem('jef-slot', slot)
      localStorage.setItem('jef-station-id', station.id)
      localStorage.setItem('jef-station', station.name)
    } catch { /* ignore */ }
    nav({ to: '/documents/$id', params: { id } })
  }

  return (
    <Phone scroll>
      <BackHeader title="E-scooter" onBack={() => nav({ to: '/vehicule/$id', params: { id } })} />
      <h1 className="px-5 pt-1 text-[28px] font-bold text-[#12211C]">Réserver {v.name}</h1>
      <p className="px-5 text-[14px] text-[#63736B]">{v.price} · Caution {v.caution}</p>
      <div className="px-5 pt-4">
        <p className="text-[11px] font-bold text-[#63736B]">CRÉNEAU DE RETRAIT</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {['Aujourd’hui · 10:00', 'Aujourd’hui · 16:00', 'Demain · 09:00', 'Demain · 14:00'].map((s) => (
            <button key={s} onClick={() => setSlot(s)} className={`rounded-[14px] border p-3 text-left text-[12px] font-bold ${slot === s ? 'border-[#1B4332] bg-[#EAF0E8] text-[#1B4332]' : 'border-[#E0E8E0] bg-white text-[#12211C]'}`}>{s}</button>
          ))}
        </div>
        <p className="pt-4 text-[11px] font-bold text-[#63736B]">DURÉE</p>
        <div className="mt-2 flex items-center gap-3 rounded-[16px] border border-[#E0E8E0] bg-white p-3">
          <button onClick={() => setDays(Math.max(1, days - 1))} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F0F5F0] text-xl font-bold">−</button>
          <span className="flex-1 text-center text-[15px] font-bold">{days} jour{days > 1 ? 's' : ''}</span>
          <button onClick={() => setDays(Math.min(30, days + 1))} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1B4332] text-xl font-bold text-white">+</button>
        </div>

        <p className="pt-4 text-[11px] font-bold text-[#63736B]">STATION DE RETRAIT</p>
        <p className="pt-1 text-[12px] text-[#63736B]">Tu récupères la moto en station. Choisis où aller la chercher.</p>
        <div className="mt-2 space-y-2">
          {STATIONS.map((s) => (
            <button key={s.id} onClick={() => setStationId(s.id)} aria-pressed={stationId === s.id} className={`w-full rounded-[16px] border p-3 text-left ${stationId === s.id ? 'border-[#1B4332] bg-[#EAF0E8]' : 'border-[#E0E8E0] bg-white'}`}>
              <span className="flex items-center gap-3">
                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${stationId === s.id ? 'border-[#1B4332]' : 'border-[#9BAA9F]'}`}>{stationId === s.id ? <span className="h-2.5 w-2.5 rounded-full bg-[#1B4332]" /> : null}</span>
                <span className="min-w-0">
                  <span className="block text-[14px] font-bold text-[#12211C]">{s.name}</span>
                  <span className="block text-[12px] text-[#63736B]">{s.address} · {s.scooters} véhicules</span>
                </span>
              </span>
            </button>
          ))}
        </div>

        <div className="mt-3 overflow-hidden rounded-[20px] border border-[#DDE5DF] bg-white">
          <div className="relative">
            <img src={MAP_DAKAR} alt="Carte Dakar — station de retrait" className="h-[130px] w-full object-cover" />
            <span className="absolute left-3 top-3 rounded-full bg-[#1B4332] px-2 py-1 text-[11px] font-bold text-white">📍 {station.name}</span>
          </div>
          <div className="p-4">
            <p className="text-[14px] font-bold text-[#12211C]">Itinéraire pour récupérer ta moto</p>
            <p className="pt-1 text-[12px] leading-[18px] text-[#63736B]">{station.address}{zoneMeta ? ` · ${zoneMeta.desc}` : ''} · Retrait {slot}</p>
            <div className="mt-3 flex gap-2">
              <Link to="/itineraire/$zoneId" params={{ zoneId: station.id }} className="flex h-[48px] flex-1 items-center justify-center rounded-[14px] bg-[#1B4332] text-[13px] font-bold text-white">Voir l’itinéraire</Link>
              <a href={mapsUrl} target="_blank" rel="noreferrer" className="flex h-[48px] flex-1 items-center justify-center rounded-[14px] border border-[#1B4332] text-[13px] font-bold text-[#1B4332]">Ouvrir dans Maps</a>
            </div>
            <p className="pt-2 text-center text-[11px] text-[#63736B]">Montre ta référence + ta pièce d’identité à la station.</p>
          </div>
        </div>

        <div className="mt-3 rounded-[20px] bg-white p-4 text-[13px]">
          <div className="flex justify-between"><span>Location ({days} j)</span><span className="font-bold">{fmt(total)}</span></div>
          <div className="flex justify-between pt-1"><span>Caution (remboursable)</span><span className="font-bold">{v.caution}</span></div>
          <div className="mt-2 flex justify-between border-t border-[#DDE5DF] pt-2 text-[15px] font-bold"><span>Total à payer</span><span>{fmt(total)}</span></div>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-end px-5 pb-6 pt-4">
        <button onClick={go} className="flex h-[54px] items-center rounded-[18px] bg-[#1B4332] pl-4 text-[14px] font-bold text-white">Continuer · {fmt(total)}</button>
      </div>
    </Phone>
  )
}
