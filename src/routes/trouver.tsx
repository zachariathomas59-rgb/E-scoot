import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import { Phone, BottomTabs, LOGO, ILLU_MOTO } from '@/components/phone'
import { Map } from '@/lib/monstarx/map'
import { FREE_SCOOTERS, STATIONS, withDistance, formatDist, haversineKm } from '@/lib/nearby'
import type { ScooterWithDistance } from '@/lib/nearby'
import { VEHICLES } from '@/lib/escooter'
import { readDrops } from '@/lib/drops'
import type { DroppedVehicle } from '@/lib/drops'
import { useGeo } from '@/components/geo'

export const Route = createFileRoute('/trouver')({
  validateSearch: (s: Record<string, unknown>) => ({ type: typeof s.type === 'string' ? s.type : 'tous' }),
  component: Trouver,
})

const TROTT_IMG = 'https://files.monstarx.app/0svp0dutvg/public/images/trottinette-solaire-dakar.webp'
const MOTO_IMG = 'https://files.monstarx.app/0svp0dutvg/public/images/moto-electrique-dakar.webp'

/** Pastilles carte : photo ronde pour chaque trottinette, carré S pour chaque station */
function usePhotoPins(deps: unknown[] = []) {
  useEffect(() => {
    let alive = true
    let tries = 0
    const patch = () => {
      if (!alive) return
      document.querySelectorAll('.maplibregl-marker').forEach((el) => {
        const label = el.getAttribute('aria-label') ?? ''
        const div = el as HTMLElement
        if (div.dataset.patched === label) return
        div.dataset.patched = label
        if (label.startsWith('Trottinette ')) {
          el.innerHTML = `<div style="width:36px;height:36px;border-radius:9999px;overflow:hidden;background:#fff;border:2px solid #1B4332;box-shadow:0 2px 8px rgba(0,0,0,.3)"><img src="${TROTT_IMG}" alt="" style="width:100%;height:100%;object-fit:cover" /></div>`
        } else if (label.startsWith('Station ')) {
          el.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:8px;background:#1B4332;color:#C5E84D;font-weight:800;font-size:13px;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.3)">S</div>`
        } else if (label === 'Toi') {
          el.innerHTML = `<div style="width:14px;height:14px;border-radius:9999px;background:#2563EB;border:3px solid #fff;box-shadow:0 1px 6px rgba(0,0,0,.4)"></div>`
        }
      })
      if (++tries < 25) window.setTimeout(patch, 400)
    }
    const t = window.setTimeout(patch, 500)
    return () => {
      alive = false
      window.clearTimeout(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

function Tabs({ active }: { active: string }) {
  const t = active === 'moto' ? 'moto' : active === 'trottinette' ? 'trottinette' : 'tous'
  const btn = (key: string, label: string, to: string) => {
    const on = t === key
    return (
      <Link
        key={key}
        to="/trouver"
        search={{ type: to }}
        className={`flex h-[38px] flex-1 items-center justify-center rounded-full text-[13px] font-bold ${on ? 'bg-[#1B4332] text-white' : 'bg-white text-[#1B4332] border border-[#DDE5DF]'}`}
      >
        {label}
      </Link>
    )
  }
  return (
    <div className="mx-5 mt-3 flex gap-2 rounded-full bg-[#F0F5F0] p-1">
      {btn('tous', 'Tous', 'tous')}
      {btn('moto', 'Motos', 'moto')}
      {btn('trottinette', 'Trottinettes', 'trottinette')}
    </div>
  )
}

function MotoList() {
  const motos = VEHICLES.filter((v) => v.type === 'moto')
  return (
    <div className="px-5 pt-3">
      <p className="py-1 text-[12px] font-bold text-[#63736B]">{motos.length} motos en station</p>
      {motos.map((v) => (
        <div key={v.id} className="mt-2 overflow-hidden rounded-[18px] border border-[#DDE5DF] bg-white">
          <img src={MOTO_IMG} alt="Moto électrique" className="h-[130px] w-full object-cover" />
          <div className="p-3">
            <p className="text-[15px] font-extrabold text-[#12211C]">{v.name}</p>
            <p className="text-[12px] text-[#63736B]">{v.price} · {v.autonomy} · {v.zone}</p>
            <div className="flex gap-2 pt-2">
              <Link to="/vehicule/$id" params={{ id: v.id }} className="flex h-[44px] flex-1 items-center justify-center rounded-[12px] border border-[#1B4332] text-[13px] font-extrabold text-[#1B4332]">
                Voir la moto
              </Link>
              <Link to="/reservation/$id" params={{ id: v.id }} className="flex h-[44px] flex-1 items-center justify-center rounded-[12px] bg-[#1B4332] text-[13px] font-extrabold text-white">
                Réserver
              </Link>
            </div>
          </div>
        </div>
      ))}
      <Link to="/zones" className="mt-3 flex items-center gap-3 rounded-[18px] bg-[#1B4332] p-4 text-white">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C5E84D] text-[14px] font-extrabold text-[#1B4332]">S</span>
        <span className="flex-1">
          <span className="block text-[14px] font-bold text-white">Retrait en station solaire</span>
          <span className="block text-[12px] text-white/80">Mermoz · Plateau · Grand Dakar · Sacré-Cœur</span>
        </span>
        <span className="text-[20px] font-bold text-[#C5E84D]">›</span>
      </Link>
    </div>
  )
}

function TrottSection({ compactMoto }: { compactMoto?: boolean }) {
  const { geo } = useGeo()
  const [drops, setDrops] = useState<DroppedVehicle[]>([])
  const [selectedCode, setSelectedCode] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)
  useEffect(() => {
    setDrops(readDrops())
  }, [])

  const base: ScooterWithDistance[] =
    geo.status === 'granted'
      ? withDistance(geo.lat, geo.lon)
      : FREE_SCOOTERS.map((s) => ({ ...s, zone: s.station ?? s.address, horsStation: s.station === null, distM: 0 }))

  const droppedScooters: ScooterWithDistance[] = drops
    .filter((d) => d.kind === 'trottinette')
    .map((d) => ({
      id: d.id,
      code: d.code,
      lat: d.lat,
      lon: d.lon,
      battery: d.battery,
      station: null,
      address: d.address,
      zone: d.address,
      horsStation: true,
      distM: geo.status === 'granted' ? haversineKm(geo.lat, geo.lon, d.lat, d.lon) * 1000 : 40,
    }))

  const sorted: ScooterWithDistance[] = useMemo(() => {
    return [...droppedScooters, ...base].sort((a, b) => a.distM - b.distM)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geo.status, drops.length])

  useEffect(() => {
    if (!selectedCode && sorted.length > 0) setSelectedCode(sorted[0]!.code)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorted.length])

  const selected = sorted.find((s) => s.code === selectedCode) ?? sorted[0]
  const others = sorted.filter((s) => s.code !== selected?.code)
  const list = showAll ? others : others.slice(0, 2)
  const mapCenter = selected
    ? { lat: selected.lat, lon: selected.lon }
    : geo.status === 'granted'
      ? { lat: geo.lat, lon: geo.lon }
      : { lat: 14.6937, lon: -17.4441 }

  usePhotoPins([sorted.length, selected?.code])

  return (
    <>
      {/* Carte : photo pour les trottinettes, S pour les stations */}
      <div className="relative mx-5 mt-3 overflow-hidden rounded-[20px] border border-[#DDE5DF] bg-white">
        <Map
          center={mapCenter}
          zoom={13}
          className="h-[260px] w-full"
          markers={[
            ...(geo.status === 'granted' ? [{ id: 'moi', lat: geo.lat, lon: geo.lon, label: 'Toi', color: '#2563EB' }] : []),
            ...sorted.slice(0, showAll ? 12 : 5).map((s) => ({
              id: s.code,
              lat: s.lat,
              lon: s.lon,
              label: `Trottinette ${s.code} batterie ${s.battery} pourcent`,
              color: '#65A30D',
            })),
            ...STATIONS.map((st) => ({ id: `st-${st.id}`, lat: st.lat, lon: st.lon, label: `Station ${st.short}`, color: '#1B4332' })),
          ]}
          onMarkerClick={(m) => {
            const f = sorted.find((s) => s.code === m.id)
            if (f) setSelectedCode(f.code)
          }}
        />
        <div className="absolute bottom-2 left-2 flex items-center gap-2 rounded-full bg-white/95 py-1 pl-1.5 pr-3 shadow">
          <img src={TROTT_IMG} alt="" className="h-5 w-5 rounded-full border border-[#1B4332] object-cover" />
          <span className="text-[11px] font-bold text-[#1B4332]">Trottinette</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#1B4332] text-[11px] font-extrabold text-[#C5E84D]">S</span>
          <span className="text-[11px] font-bold text-[#1B4332]">Station</span>
        </div>
      </div>

      {/* Fiche unique */}
      {selected ? (
        <div className="mx-5 mt-3 rounded-[18px] border border-[#DDE5DF] bg-white p-3">
          <div className="flex items-center gap-2.5">
            <img src={TROTT_IMG} alt="Trottinette électrique" className="h-14 w-14 shrink-0 rounded-[12px] object-cover" />
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-extrabold text-[#12211C]">Trottinette {selected.code} · {selected.battery}%</p>
              <p className="truncate text-[12px] text-[#63736B]">
                {geo.status === 'granted' ? `${formatDist(selected.distM)} · ` : ''}200 F + 100 F/min
              </p>
            </div>
          </div>
          <div className="flex gap-2 pt-2.5">
            <Link
              to="/aller-trottinette"
              search={{ code: selected.code }}
              className="flex h-[44px] flex-1 items-center justify-center rounded-[12px] bg-[#1B4332] text-[13px] font-extrabold text-white"
            >
              Y aller
            </Link>
            <Link
              to="/scanner-trottinette"
              search={{ code: selected.code }}
              className="flex h-[44px] flex-1 items-center justify-center rounded-[12px] bg-[#C5E84D] text-[13px] font-extrabold text-[#1B4332]"
            >
              Scanner sur place
            </Link>
          </div>
        </div>
      ) : null}

      {/* Liste courte */}
      <div className="px-5 pt-2">
        <p className="py-1 text-[12px] font-bold text-[#63736B]">À proximité</p>
        {list.map((s) => (
          <button
            key={s.code}
            onClick={() => setSelectedCode(s.code)}
            className="mt-1.5 flex w-full items-center gap-2.5 rounded-[14px] border border-[#DDE5DF] bg-white p-2.5 text-left"
          >
            <img src={TROTT_IMG} alt="" className="h-10 w-10 shrink-0 rounded-[10px] object-cover" />
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-bold text-[#12211C]">Trottinette {s.code} · {s.battery}%</span>
              <span className="block truncate text-[11px] text-[#63736B]">
                {geo.status === 'granted' ? `${formatDist(s.distM)}` : s.zone}
              </span>
            </span>
            <span className="shrink-0 font-extrabold text-[#1B4332]">›</span>
          </button>
        ))}
        {others.length > 2 ? (
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="mt-2 flex h-[42px] w-full items-center justify-center rounded-[14px] border border-[#DDE5DF] bg-white text-[13px] font-bold text-[#1B4332]"
          >
            {showAll ? 'Voir moins' : `Voir plus (${others.length - 2} autres)`}
          </button>
        ) : null}
        {compactMoto ? null : (
          <Link to="/zones" className="mt-2 block text-center text-[12px] font-bold text-[#1B4332] underline">
            Voir les {STATIONS.length} stations et zones solaires
          </Link>
        )}
      </div>
    </>
  )
}

function Trouver() {
  const search = Route.useSearch() as { type?: string }
  const raw = (search.type ?? 'tous').toLowerCase()
  const active = raw === 'moto' ? 'moto' : raw === 'trottinette' || raw === 'trotti' ? 'trottinette' : 'tous'

  return (
    <Phone scroll tabbar={<BottomTabs active="trouver" />}>
      <div className="flex items-center gap-2 px-4 pt-4">
        <Link to="/accueil" className="text-xl leading-none" aria-label="Retour">‹</Link>
        <img src={LOGO} alt="JËF" className="h-7 w-5 object-cover" />
        <span className="text-[15px] font-bold text-[#1B4332]">JËF</span>
        <Link to="/filtres" className="ml-auto rounded-full border border-[#DDE5DF] bg-white px-3 py-1.5 text-[12px] font-bold text-[#1B4332]">
          Filtres
        </Link>
      </div>
      <Tabs active={active} />

      {active === 'moto' ? (
        <>
          <h1 className="px-5 pt-2 text-[20px] font-extrabold text-[#12211C]">Trouver une moto</h1>
          <p className="px-5 pt-1 text-[12px] leading-[18px] text-[#63736B]">Réserve ta moto en station, récupère avec ta pièce et ton reçu. Casque inclus.</p>
          <div className="relative mx-5 mt-3 overflow-hidden rounded-[20px] border border-[#DDE5DF] bg-white">
            <Map
              center={{ lat: 14.6937, lon: -17.4441 }}
              zoom={12}
              className="h-[180px] w-full"
              markers={STATIONS.map((st) => ({ id: `st-${st.id}`, lat: st.lat, lon: st.lon, label: `Station ${st.short}`, color: '#1B4332' }))}
            />
            <div className="absolute bottom-2 left-2 flex items-center gap-2 rounded-full bg-white/95 py-1 pl-1.5 pr-3 shadow">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#1B4332] text-[11px] font-extrabold text-[#C5E84D]">S</span>
              <span className="text-[11px] font-bold text-[#1B4332]">Station de retrait</span>
            </div>
          </div>
          <MotoList />
        </>
      ) : active === 'trottinette' ? (
        <>
          <h1 className="px-5 pt-2 text-[20px] font-extrabold text-[#12211C]">Trouver une trottinette</h1>
          <p className="px-5 pt-1 text-[12px] leading-[18px] text-[#63736B]">Pas de réservation à distance : va sur place, premier arrivé premier servi. Tu paies devant la trottinette, puis ça déverrouille.</p>
          <TrottSection />
        </>
      ) : (
        <>
          <h1 className="px-5 pt-2 text-[20px] font-extrabold text-[#12211C]">Trouver un véhicule</h1>
          <p className="px-5 pt-1 text-[12px] leading-[18px] text-[#63736B]">Motos en station à réserver · trottinettes sur place, premier arrivé premier servi.</p>
          <MotoList />
          <div className="mx-5 mt-4 border-t border-[#DDE5DF] pt-3">
            <p className="text-[15px] font-extrabold text-[#12211C]">Trottinettes libres autour de toi</p>
            <p className="text-[12px] text-[#63736B]">Photo = trottinette libre · S = station</p>
          </div>
          <TrottSection compactMoto />
        </>
      )}

      <div className="h-4" />
    </Phone>
  )
}
