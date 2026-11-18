import { useEffect } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Phone, BottomTabs } from '@/components/phone'
import { Map } from '@/lib/monstarx/map'
import { FREE_SCOOTERS, STATIONS, formatDist, haversineKm, walkMinutes } from '@/lib/nearby'
import { readDrops } from '@/lib/drops'
import { useGeo } from '@/components/geo'

export const Route = createFileRoute('/aller-trottinette')({
  validateSearch: (s: Record<string, unknown>) => ({ code: typeof s.code === 'string' ? s.code : undefined }),
  component: AllerTrottinette,
})

const TROTT_IMG = 'https://files.monstarx.app/0svp0dutvg/public/images/trottinette-solaire-dakar.webp'

function AllerTrottinette() {
  const { code } = Route.useSearch()
  const nav = useNavigate()
  const { geo, enable } = useGeo()
  const drops = typeof localStorage !== 'undefined' ? readDrops().filter((d) => d.kind === 'trottinette') : []
  const all = [
    ...FREE_SCOOTERS.map((s) => ({ code: s.code, lat: s.lat, lon: s.lon, battery: s.battery, address: s.address, station: s.station })),
    ...drops.map((d) => ({ code: d.code, lat: d.lat, lon: d.lon, battery: d.battery, address: d.address, station: null as string | null })),
  ]
  const scoot = (code ? all.find((s) => s.code.toLowerCase() === code.toLowerCase()) : all[0]) ?? all[0]
  const hasUser = geo.status === 'granted'
  const distKm = hasUser ? haversineKm(geo.lat, geo.lon, scoot.lat, scoot.lon) : 0
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${scoot.lat},${scoot.lon}`
  const km = Math.max(1, Math.round((scoot.battery / 100) * 27))
  useEffect(() => {
    let alive = true
    let tries = 0
    const patch = () => {
      if (!alive) return
      document.querySelectorAll('.maplibregl-marker').forEach((el) => {
        const label = el.getAttribute('aria-label') ?? ''
        if ((el as HTMLElement).dataset.patched === label) return
        ;(el as HTMLElement).dataset.patched = label
        if (label.startsWith('Trottinette ')) {
          el.innerHTML = `<div style="width:38px;height:38px;border-radius:9999px;overflow:hidden;background:#fff;border:2px solid #1B4332;box-shadow:0 2px 8px rgba(0,0,0,.3)"><img src="${TROTT_IMG}" alt="" style="width:100%;height:100%;object-fit:cover" /></div>`
        } else if (label.startsWith('Station ')) {
          el.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:8px;background:#1B4332;color:#C5E84D;font-weight:800;font-size:14px;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.3)">S</div>`
        } else if (label === 'Toi') {
          el.innerHTML = `<div style="width:16px;height:16px;border-radius:9999px;background:#2563EB;border:3px solid #fff;box-shadow:0 1px 6px rgba(0,0,0,.4)"></div>`
        }
      })
      if (++tries < 25) window.setTimeout(patch, 400)
    }
    const t = window.setTimeout(patch, 500)
    return () => {
      alive = false
      window.clearTimeout(t)
    }
  }, [])

  const goScan = () => {
    try {
      // On mémorise la trottinette choisie sur la carte : le scan sur place
      // proposera ensuite Jour / Minutes + paiement.
      localStorage.setItem('jef-pickup-mode', 'free')
      localStorage.setItem('jef-free-code', scoot.code)
      localStorage.setItem('jef-free-address', scoot.address)
      localStorage.setItem('jef-free-battery', String(scoot.battery))
      localStorage.removeItem('jef-station')
    } catch { /* ignore */ }
    nav({ to: '/scanner-trottinette', search: { code: scoot.code } })
  }

  return (
    <Phone scroll tabbar={<BottomTabs active="trouver" />}>
      <div className="flex items-center gap-3 px-4 pb-2 pt-4">
        <button onClick={() => nav({ to: '/trouver', search: { type: 'tous' } })} aria-label="Retour" className="flex h-6 w-6 items-center justify-center text-[#1B4332]">‹</button>
        <span className="text-[16px] font-bold text-[#1B4332]">E-scoot</span>
      </div>
      <h1 className="px-5 pt-1 text-[26px] font-bold leading-[32px] text-[#153D2C]">Va à la trottinette {scoot.code}</h1>
      <p className="px-5 pt-2 text-[14px] leading-[21px] text-[#52695C]">
        {scoot.address} · Batterie {scoot.battery} % (~{km} km)
        {scoot.station ? ` · En station ${scoot.station}` : ' · Posée dehors, pas en station — va directement sur place.'}
        {hasUser ? ` · À ${formatDist(distKm * 1000)}, ~${walkMinutes(distKm)} min à pied.` : ''}
      </p>

      <div className="mx-5 mt-3 overflow-hidden rounded-[20px] border border-[#DDE5DF]">
        <Map
          center={hasUser ? { lat: (geo.lat + scoot.lat) / 2, lon: (geo.lon + scoot.lon) / 2 } : { lat: scoot.lat, lon: scoot.lon }}
          zoom={14}
          className="h-[220px] w-full"
          markers={[
            ...(hasUser ? [{ id: 'moi', lat: geo.lat, lon: geo.lon, label: 'Toi', color: '#1B4332' }] : []),
            { id: scoot.code, lat: scoot.lat, lon: scoot.lon, label: `Trottinette ${scoot.code} batterie ${scoot.battery} pourcent`, color: '#7a9b00' },
            ...STATIONS.map((st) => ({ id: `st-${st.id}`, lat: st.lat, lon: st.lon, label: `Station ${st.short}`, color: '#1B4332' })),
          ]}
        />
      </div>
      {!hasUser ? (
        <div className="mx-5 mt-2 rounded-[14px] bg-[#FFFBEB] p-3 text-[12px] text-[#4A3A00]">
          Active ta position pour voir la distance à pied en direct.{' '}
          <button onClick={enable} className="font-bold underline">Activer</button>
        </div>
      ) : null}

      <div className="mx-5 mt-3 rounded-[20px] border border-[#DFE7DE] bg-white p-4">
        <p className="text-[15px] font-bold text-[#153D2C]">Itinéraire à pied</p>
        <ol className="list-decimal pl-5 pt-2 text-[13px] leading-[19px] text-[#52695C]">
          <li>Suis la carte jusqu’à : {scoot.address}.</li>
          <li>Repère la trottinette {scoot.code} (numéro sur le guidon).</li>
          <li>Sur place : scanne le QR sur le guidon.</li>
          <li>Choisis <strong>Libre (200 F + 100 F/min)</strong> ou <strong>Journée (5 000 F)</strong>, puis paie — le déblocage suit.</li>
        </ol>
        <div className="mt-3 flex gap-2">
          <a href={mapsUrl} target="_blank" rel="noreferrer" className="flex h-[48px] flex-1 items-center justify-center rounded-[14px] bg-[#1B4332] text-[13px] font-bold text-white">Ouvrir dans Maps</a>
          <button onClick={goScan} className="flex h-[48px] flex-1 items-center justify-center rounded-[14px] border-2 border-[#1B4332] text-[13px] font-bold text-[#1B4332]">Je suis devant · Scanner</button>
        </div>
      </div>

      <div className="mx-5 mt-3 rounded-[16px] bg-[#EAF0E8] p-4 text-[13px] leading-[19px] text-[#153D2C]">
        <p className="font-bold">Pas de réservation à distance</p>
        <p className="pt-1 text-[#52695C]">La trottinette reste libre pour tout le monde jusqu'au scan. Premier arrivé sur place, premier servi : paie seulement quand tu es devant, puis ça déverrouille.</p>
      </div>
      <div className="px-5 pb-6 pt-3">
        <button onClick={goScan} className="flex h-[54px] w-full items-center justify-center rounded-[18px] bg-[#C5E84D] text-[15px] font-bold text-[#1B4332]">Aller scanner {scoot.code} sur place</button>
      </div>
    </Phone>
  )
}
