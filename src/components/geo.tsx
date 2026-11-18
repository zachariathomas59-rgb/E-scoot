import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { LocateFixed, Navigation, BatteryFull, MapPin, Store } from 'lucide-react'
import { DAKAR_CENTER, formatDistance, nearestScooters, nearestStations, walkMinutes } from '@/lib/nearby'

export type GeoState = { status: 'unknown' | 'granted' | 'denied'; lat: number; lon: number }

const KEY = 'jef-geo'

export function readGeo(): GeoState {
  if (typeof localStorage === 'undefined') return { status: 'unknown', ...DAKAR_CENTER }
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw) as GeoState
  } catch { /* ignore */ }
  return { status: 'unknown', ...DAKAR_CENTER }
}

export function useGeo() {
  const [geo, setGeo] = useState<GeoState>({ status: 'unknown', ...DAKAR_CENTER })
  const [locating, setLocating] = useState(false)

  useEffect(() => {
    setGeo(readGeo())
  }, [])

  const save = (g: GeoState) => {
    setGeo(g)
    try { localStorage.setItem(KEY, JSON.stringify(g)) } catch { /* ignore */ }
  }

  const enable = () => {
    setLocating(true)
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      save({ status: 'granted', ...DAKAR_CENTER })
      setLocating(false)
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        save({ status: 'granted', lat: pos.coords.latitude, lon: pos.coords.longitude })
        setLocating(false)
      },
      () => {
        save({ status: 'granted', ...DAKAR_CENTER })
        setLocating(false)
      },
      { timeout: 8000, maximumAge: 60000 },
    )
  }

  const later = () => save({ status: 'denied', lat: geo.lat, lon: geo.lon })
  const reset = () => save({ status: 'unknown', ...DAKAR_CENTER })

  return { geo, locating, enable, later, reset }
}

export function GeoPermissionSheet({ onEnable, onLater, locating }: { onEnable: () => void; onLater: () => void; locating: boolean }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/45" role="dialog" aria-modal="true" aria-label="Autoriser la localisation">
      <div className="w-full max-w-[480px] rounded-t-[28px] bg-white p-5 pb-8">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#DDE5DF]" />
        <div className="flex items-center gap-3">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#1B4332]">
            <LocateFixed className="h-7 w-7 text-[#C5E84D]" />
          </span>
          <div>
            <p className="text-[17px] font-extrabold leading-[22px] text-[#12211C]">Activer ta position ?</p>
            <p className="text-[13px] text-[#63736B]">Trouve la trottinette la plus proche</p>
          </div>
        </div>
        <p className="pt-3 text-[14px] leading-[20px] text-[#26332E]">
          En journée, les trottinettes ne sont pas toutes en station. Avec ta position, on te montre <strong>la trottinette libre la plus proche de toi</strong>, même hors station, avec la distance à pied.
        </p>
        <p className="pt-2 text-[13px] leading-[19px] text-[#52695C]">
          S’il n’y a aucune trottinette dehors, on te propose la station la plus proche : Mermoz, Dakar Plateau, Grand Dakar ou Sacré-Cœur.
        </p>
        <div className="flex items-center gap-2 rounded-2xl bg-[#F3F6F2] p-3 mt-3">
          <MapPin className="h-5 w-5 shrink-0 text-[#1B4332]" />
          <p className="text-[12px] leading-[16px] text-[#52695C]">Ta position sert uniquement à calculer la distance. Elle reste sur ton téléphone.</p>
        </div>
        <button
          type="button"
          onClick={onEnable}
          disabled={locating}
          className="mt-4 flex h-[54px] w-full items-center justify-center rounded-[18px] bg-[#1B4332] text-[15px] font-bold text-white disabled:opacity-60"
        >
          {locating ? 'Localisation…' : 'Activer la localisation'}
        </button>
        <button type="button" onClick={onLater} className="mt-2 flex h-[48px] w-full items-center justify-center rounded-[18px] border border-[#DDE5DF] text-[14px] font-bold text-[#1B4332]">
          Plus tard
        </button>
      </div>
    </div>
  )
}

export function NearestCard({ lat, lon }: { lat: number; lon: number }) {
  const [best] = nearestScooters(lat, lon, 1)
  if (!best) return <StationFallback lat={lat} lon={lon} empty />
  const isFree = best.station === null
  return (
    <div className="mt-4 overflow-hidden rounded-[20px] border border-[#DDE5DF] bg-white">
      <div className="flex items-center justify-between bg-[#1B4332] px-4 py-2.5">
        <span className="flex items-center gap-1.5 text-[12px] font-bold text-white">
          <span className="h-2 w-2 rounded-full bg-[#C5E84D]" />À {formatDistance(best.km)} · {walkMinutes(best.km)} min à pied
        </span>
        <span className="rounded-full bg-[#C5E84D] px-2 py-0.5 text-[11px] font-extrabold text-[#1B4332]">
          {best.station ? 'En station' : 'Hors station · libre'}
        </span>
      </div>
      <div className="flex items-center gap-3 p-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E5F0A8] text-[20px] font-extrabold text-[#1B4332]">T</span>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-extrabold text-[#12211C]">Trottinette {best.code}</p>
          <p className="truncate text-[12px] text-[#63736B]">{best.address}</p>
          <p className="flex items-center gap-1 pt-0.5 text-[12px] font-bold text-[#1B4332]">
            <BatteryFull className="h-4 w-4" /> {best.battery} % · 200 F + 100 F/min
          </p>
        </div>
      </div>
      <div className="flex gap-2 px-4 pb-4">
        <Link to="/reservation-trottinette" search={isFree ? { code: best.code } : { code: undefined }} className="flex h-[46px] flex-1 items-center justify-center rounded-[14px] bg-[#1B4332] text-[14px] font-bold text-white">
          {isFree ? 'Réserver cette libre' : 'Réserver'}
        </Link>
        <Link to="/aller-trottinette" search={{ code: best.code }} className="flex h-[46px] flex-1 items-center justify-center gap-1 rounded-[14px] border border-[#1B4332] text-[14px] font-bold text-[#1B4332]">
          <Navigation className="h-4 w-4" /> Y aller
        </Link>
      </div>
    </div>
  )
}

export function StationFallback({ lat, lon, empty = false }: { lat: number; lon: number; empty?: boolean }) {
  const stations = nearestStations(lat, lon)
  const first = stations[0]
  return (
    <div className="mt-4 overflow-hidden rounded-[20px] border border-[#E3C46B] bg-[#FFFBEB]">
      <div className="flex items-center gap-2 bg-[#7A5B00] px-4 py-2.5">
        <Store className="h-4 w-4 text-white" />
        <span className="text-[12px] font-bold text-white">
          {empty || first ? 'Aucune trottinette dehors · passe en station' : 'Stations E-scoot'}
        </span>
      </div>
      <div className="p-4">
        <p className="text-[14px] leading-[20px] text-[#4A3A00]">
          {empty
            ? 'Il n’y a aucune trottinette libre dehors en ce moment. Va à la station la plus proche pour en récupérer une :'
            : 'Aucune trottinette libre autour de toi. Les trottinettes sont en station :'}
        </p>
        {first ? (
          <div className="mt-3 rounded-[14px] bg-white p-3 border border-[#E3C46B]">
            <p className="text-[15px] font-extrabold text-[#12211C]">{first.name}</p>
            <p className="text-[12px] text-[#63736B]">
              À {formatDistance(first.km)} · {walkMinutes(first.km)} min à pied · {first.scooters} trottinettes · {first.address}
            </p>
            <div className="mt-2 flex gap-2">
              <Link to="/zones" className="flex h-[44px] flex-1 items-center justify-center rounded-[12px] bg-[#1B4332] text-[13px] font-bold text-white">
                Voir les 4 stations
              </Link>
              <Link to="/itineraire/$zoneId" params={{ zoneId: first.id }} className="flex h-[44px] flex-1 items-center justify-center gap-1 rounded-[12px] border border-[#1B4332] text-[13px] font-bold text-[#1B4332]">
                <Navigation className="h-4 w-4" /> Y aller
              </Link>
            </div>
          </div>
        ) : null}
        <div className="mt-2 space-y-1.5">
          {stations.slice(1).map((s) => (
            <div key={s.id} className="flex items-center justify-between text-[12px]">
              <span className="font-bold text-[#12211C]">{s.name} · {s.scooters} trott.</span>
              <span className="text-[#63736B]">{formatDistance(s.km)} · {walkMinutes(s.km)} min</span>
            </div>
          ))}
        </div>
        <p className="pt-2 text-[11px] text-[#7A5B00]">Mermoz · Dakar Plateau · Grand Dakar · Sacré-Cœur</p>
      </div>
    </div>
  )
}
