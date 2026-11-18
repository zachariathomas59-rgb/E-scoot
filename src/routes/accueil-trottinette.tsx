import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Phone, BottomTabs, MAP_DAKAR, ICON_PIN } from '@/components/phone'
import { Map } from '@/lib/monstarx/map'
import { FREE_SCOOTERS, STATIONS } from '@/lib/nearby'
import { useGeo, GeoPermissionSheet, NearestCard } from '@/components/geo'

export const Route = createFileRoute('/accueil-trottinette')({ component: AccueilTrottinette })

const TROTT_IMG = 'https://files.monstarx.app/0svp0dutvg/public/images/trottinette-solaire-dakar.webp'

function AccueilTrottinette() {
  const { geo, locating, enable, later } = useGeo()
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
          el.innerHTML = `<div style="width:32px;height:32px;border-radius:9999px;overflow:hidden;background:#fff;border:2px solid #1B4332;box-shadow:0 2px 8px rgba(0,0,0,.3)"><img src="${TROTT_IMG}" alt="" style="width:100%;height:100%;object-fit:cover" /></div>`
        } else if (label.startsWith('Station ')) {
          el.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:8px;background:#1B4332;color:#C5E84D;font-weight:800;font-size:14px;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.3)">S</div>`
        } else if (label === 'Toi') {
          el.innerHTML = `<div style="width:16px;height:16px;border-radius:9999px;background:#2563EB;border:3px solid #fff;box-shadow:0 1px 6px rgba(0,0,0,.4)"></div>`
        }
      })
      if (++tries < 20) window.setTimeout(patch, 400)
    }
    const t = window.setTimeout(patch, 500)
    return () => {
      alive = false
      window.clearTimeout(t)
    }
  }, [geo.status])
  return (
    <Phone scroll tabbar={<BottomTabs active="accueil" />}>
      {geo.status === 'unknown' ? <GeoPermissionSheet onEnable={enable} onLater={later} locating={locating} /> : null}
      <div className="rounded-b-[28px] bg-[#1B4332] px-5 pb-5 pt-4">
        <div className="flex items-center gap-2">
          <span className="text-[20px] font-bold text-white">E-scoot</span>
        </div>
        <h1 className="pt-2 text-[28px] font-extrabold text-white">Bonjour, Aïssatou</h1>
        <p className="text-[14px] text-white/90">Ton campus, à portée de trottinette.</p>
        <span className="mt-3 inline-block rounded-full bg-white/15 px-4 py-1.5 text-[13px] font-bold text-white">Aucune location en cours</span>
      </div>

      <div className="px-5 pt-3">
        {geo.status === 'granted' ? (
          <NearestCard lat={geo.lat} lon={geo.lon} />
        ) : (
          <button
            type="button"
            onClick={enable}
            className="flex w-full items-center gap-3 rounded-[20px] bg-[#1B4332] p-4 text-left text-white"
          >
            <span className="flex-1 text-[14px] font-bold">{locating ? 'Localisation en cours…' : 'Trouver la trottinette libre la plus proche'}</span>
            <span aria-hidden>›</span>
          </button>
        )}
      </div>

      <div className="relative mx-5 mt-3 overflow-hidden rounded-[22px]">
        {geo.status === 'granted' ? (
          <Map
            center={{ lat: geo.lat, lon: geo.lon }}
            zoom={14}
            className="h-[190px] w-full"
            markers={[
              { id: 'moi', lat: geo.lat, lon: geo.lon, label: 'Toi', color: '#1B4332' },
              ...FREE_SCOOTERS.map((s) => ({ id: s.code, lat: s.lat, lon: s.lon, label: `Trottinette ${s.code} batterie ${s.battery} pourcent`, color: '#65A30D' })),
              ...STATIONS.map((st) => ({ id: `st-${st.id}`, lat: st.lat, lon: st.lon, label: `Station ${st.short}`, color: '#1B4332' })),
            ]}
          />
        ) : (
          <>
            <img src={MAP_DAKAR} alt="Carte Dakar" className="h-[170px] w-full object-cover" />
            <div className="absolute left-[18%] top-[28%] flex items-center gap-1 text-[12px] font-bold text-[#1B4332]"><img src={ICON_PIN} alt="" className="h-5 w-5" /> Plateau</div>
            <div className="absolute right-[10%] top-[15%] flex items-center gap-1 text-[12px] font-bold text-[#1B4332]"><img src={ICON_PIN} alt="" className="h-5 w-5" /> Mermoz</div>
            <div className="absolute bottom-[20%] right-[20%] flex items-center gap-1 text-[12px] font-bold text-[#1B4332]"><img src={ICON_PIN} alt="" className="h-5 w-5" /> Sacré-Cœur</div>
            <div className="absolute bottom-[32%] left-[8%] flex items-center gap-1 text-[12px] font-bold text-[#1B4332]"><img src={ICON_PIN} alt="" className="h-5 w-5" /> Grand Dakar</div>
          </>
        )}
      </div>
      <p className="flex items-center gap-2 px-5 pt-2 text-[12px] font-bold text-[#12211C]">
        {geo.status === 'granted' ? (
          <>
            <img src={TROTT_IMG} alt="" className="h-5 w-5 rounded-full border border-[#1B4332] object-cover" />
            <span>Libres dehors</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#1B4332] text-[11px] font-extrabold text-[#C5E84D]">S</span>
            <span>Stations</span>
          </>
        ) : (
          'Zones indicatives · places à confirmer'
        )}
      </p>
      <div className="mx-5 mt-3 rounded-[20px] border border-[#DFE7DE] bg-white p-4">
        <p className="text-[13px] text-[#52695C]">E-Scoot · trottinette solaire · sans permis · caution 0 F</p>
        <p className="pt-1 text-[17px] font-bold text-[#153D2C]">Libre : 200 F + 100 F/min · Journée : 5 000 F</p>
        <p className="pt-1 text-[13px] text-[#52695C]">Batterie : 88 % · 24 km. Libre = tu paies les minutes à la fin. Journée = illimité jusqu'à 22h.</p>
      </div>
      <p className="px-5 pt-2 text-[13px] text-[#52695C]">Sans permis · caution : 0 F CFA</p>
      <Link to="/zones" className="mx-5 mt-2 flex items-center gap-3 rounded-[20px] border border-[#DFE7DE] bg-white p-4 text-[#12211C]">
        <span className="flex-1 text-[15px] font-bold text-[#153D2C]">Où garer ta trottinette ?</span><span className="text-[20px] text-[#153D2C]">›</span>
      </Link>
      <p className="px-5 pt-1 text-[12px] text-[#52695C]">Mermoz · Dakar Plateau · Grand Dakar · Sacré-Cœur — s'il n'y a rien dehors, passe en station</p>
      <div className="px-5 pb-6 pt-3"><Link to="/reservation-trottinette" search={{ code: undefined }} className="flex h-[54px] items-center justify-center rounded-[18px] bg-[#1B4332] text-[15px] font-bold text-white">Réserver une trottinette</Link></div>
    </Phone>
  )
}
