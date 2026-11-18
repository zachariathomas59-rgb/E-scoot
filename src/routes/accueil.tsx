import { createFileRoute, Link } from '@tanstack/react-router'
import { Phone, BottomTabs, LOGO, ICON_LIGHTNING, ICON_PIN, ICON_HELP, ICON_ALERT, ICON_ROUTE_SM, ILLU_MOTO, ILLU_TROTTI, MAP_DAKAR } from '@/components/phone'
import { Map } from '@/lib/monstarx/map'
import { LocateFixed } from 'lucide-react'
import { FREE_SCOOTERS, STATIONS } from '@/lib/nearby'
import { useGeo, GeoPermissionSheet, NearestCard } from '@/components/geo'

export const Route = createFileRoute('/accueil')({
  component: Accueil,
})

function Accueil() {
  const first = typeof localStorage !== 'undefined' ? (localStorage.getItem('jef-name') ?? 'Mamadou').split(' ')[0] : 'Mamadou'
  const { geo, locating, enable, later } = useGeo()

  return (
    <Phone scroll tabbar={<BottomTabs active="accueil" />}>
      {geo.status === 'unknown' ? <GeoPermissionSheet onEnable={enable} onLater={later} locating={locating} /> : null}
      <div className="rounded-b-[28px] bg-[#1B4332] px-5 pb-5 pt-4">
        <div className="flex items-center gap-2">
          <img src={LOGO} alt="E-scoot" className="h-8 w-6 object-cover" />
          <span className="text-[20px] font-bold text-white">E-scoot</span>
        </div>
        <h1 className="pt-3 text-[26px] font-extrabold leading-[32px] text-white">Bonjour, {first || 'Mamadou'}</h1>
        <p className="text-[14px] text-white/90">La mobilité électrique, simplement.</p>
        <Link to="/trajet" className="mt-3 inline-block rounded-full bg-black/25 px-4 py-1.5 text-[13px] font-bold text-white">Aucune location en cours</Link>
      </div>
      <div className="px-5 pt-5">
        {geo.status === 'granted' ? (
          <NearestCard lat={geo.lat} lon={geo.lon} />
        ) : (
          <button
            type="button"
            onClick={enable}
            className="mt-1 flex w-full items-center gap-3 rounded-[20px] border border-dashed border-[#1B4332]/40 bg-white p-4 text-left text-[#12211C]"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1B4332]">
              <LocateFixed className="h-6 w-6 text-[#C5E84D]" />
            </span>
            <span className="flex-1">
              <span className="block text-[14px] font-extrabold text-[#12211C]">Trottinette libre la plus proche</span>
              <span className="block text-[12px] text-[#63736B]">Active ta position pour voir celle à côté de toi, même hors station.</span>
            </span>
            <span className="text-[20px] font-bold text-[#1B4332]">›</span>
          </button>
        )}

        <h2 className="pt-5 text-[18px] font-bold text-[#12211C]">Choisis ta moto ou ta trottinette</h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <Link to="/trouver" search={{ type: 'moto' }} className="overflow-hidden rounded-[20px] bg-[#EAF2E9] text-[#12211C]">
            <div className="h-[110px] overflow-hidden">
              <img src={ILLU_MOTO} alt="Moto électrique" className="h-full w-full object-cover" />
            </div>
            <div className="bg-white p-3">
              <p className="text-[14px] font-bold text-[#12211C]">Moto électrique</p>
              <p className="text-[12px] text-[#63736B]">Dès 8 000 F / jour</p>
              <p className="pt-1 text-[11px] font-bold text-[#1B4332]">Casque inclus</p>
            </div>
          </Link>
          <Link to="/trouver" search={{ type: 'trottinette' }} className="overflow-hidden rounded-[20px] bg-[#EAF2E9] text-[#12211C]">
            <div className="h-[110px] overflow-hidden">
              <img src={ILLU_TROTTI} alt="Trottinette solaire" className="h-full w-full object-cover" />
            </div>
            <div className="bg-white p-3">
              <p className="text-[14px] font-bold text-[#12211C]">Trottinette solaire</p>
              <p className="text-[12px] text-[#63736B]">200 F + 100 F / min</p>
              <p className="pt-1 text-[11px] font-bold text-[#1B4332]">Charge solaire</p>
            </div>
          </Link>
        </div>

        {geo.status === 'granted' ? (
          <div className="mt-4 overflow-hidden rounded-[20px] border border-[#DDE5DF] bg-white">
            <Map
              center={{ lat: geo.lat, lon: geo.lon }}
              zoom={14}
              className="h-[220px] w-full"
              markers={[
                { id: 'moi', lat: geo.lat, lon: geo.lon, label: 'Toi', color: '#1B4332' },
                ...STATIONS.map((st) => ({ id: `st-${st.id}`, lat: st.lat, lon: st.lon, label: `Station ${st.short} · ${st.scooters} trott.`, color: '#1B4332' })),
                ...FREE_SCOOTERS.map((s) => ({ id: s.code, lat: s.lat, lon: s.lon, label: `Trottinette ${s.code} · ${s.battery}%`, color: '#7a9b00' })),
              ]}
            />
            <p className="p-3 text-[11px] font-medium text-[#63736B]">Carte live · vert = trottinettes libres (même hors station) · vert foncé = stations Mermoz, Plateau, Grand Dakar, Sacré-Cœur</p>
          </div>
        ) : null}

        <Link to="/zones" className="mt-4 flex items-center gap-3 rounded-[24px] bg-[#1B4332] p-4 text-white">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#C5E84D]">
            <img src={ICON_LIGHTNING} alt="" className="h-6 w-6 object-contain" />
          </span>
          <span className="flex-1">
            <span className="block text-[15px] font-bold text-white">Recharge solaire en station</span>
            <span className="block text-[12px] text-white/80">Motos · branchement par l’équipe E-scoot</span>
            <span className="block pt-1 text-[12px] font-bold text-[#C5E84D]">Mermoz · Plateau · Grand Dakar · Sacré-Cœur</span>
          </span>
          <span className="text-[22px] font-bold text-[#C5E84D]">→</span>
        </Link>
        <Link to="/zones" className="relative mt-4 block overflow-hidden rounded-[20px] bg-[#E9F3EC] text-[#12211C]">
          <img src={MAP_DAKAR} alt="Carte Dakar" className="h-[150px] w-full object-cover" />
          <div className="absolute left-[22%] top-[28%] flex items-center gap-1 text-[12px] font-bold text-[#1B4332]">
            <img src={ICON_PIN} alt="" className="h-5 w-5" /> Plateau
          </div>
          <div className="absolute right-[12%] top-[18%] flex items-center gap-1 text-[12px] font-bold text-[#1B4332]">
            <img src={ICON_PIN} alt="" className="h-5 w-5" /> Mermoz
          </div>
          <div className="absolute bottom-[22%] right-[22%] flex items-center gap-1 text-[12px] font-bold text-[#1B4332]">
            <img src={ICON_PIN} alt="" className="h-5 w-5" /> Sacré-Cœur
          </div>
          <div className="absolute bottom-[30%] left-[12%] flex items-center gap-1 text-[12px] font-bold text-[#1B4332]">
            <img src={ICON_PIN} alt="" className="h-5 w-5" /> Grand Dakar
          </div>
          <p className="absolute bottom-2 left-3 text-[11px] font-medium text-[#1B4332]">Zones indicatives · voir les zones</p>
        </Link>
        <div className="flex justify-between px-2 pb-6 pt-5 text-center">
          <Link to="/trajet" className="flex flex-col items-center gap-1">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E5F0A8]">
              <img src={ICON_ROUTE_SM} alt="" className="h-6 w-6 object-contain" />
            </span>
            <span className="text-[13px] font-bold text-[#12211C]">Mes trajets</span>
          </Link>
          <Link to="/aide" className="flex flex-col items-center gap-1">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E5F0A8]">
              <img src={ICON_HELP} alt="" className="h-6 w-6 object-contain" />
            </span>
            <span className="text-[13px] font-bold text-[#12211C]">Aide</span>
          </Link>
          <Link to="/incident" className="flex flex-col items-center gap-1">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E5F0A8]">
              <img src={ICON_ALERT} alt="" className="h-6 w-6 object-contain" />
            </span>
            <span className="text-[13px] font-bold text-[#12211C]">Sécurité</span>
          </Link>
        </div>
      </div>
    </Phone>
  )
}
