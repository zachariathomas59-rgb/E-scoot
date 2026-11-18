import { createFileRoute, Link } from '@tanstack/react-router'
import { Phone, TopBar, BottomTabs, MAP_ZONES } from '@/components/phone'
import { ZONES } from '@/lib/escooter'

export const Route = createFileRoute('/zones')({
  component: Zones,
})

function Zones() {
  return (
    <Phone scroll tabbar={<BottomTabs active="trouver" />}>
      <StatusRow />
      <TopBar backTo="/accueil" />
      <h1 className="px-5 pt-2 text-[30px] font-bold leading-[38px] tracking-[-0.6px] text-[#153D2C]">Zones</h1>
      <p className="px-5 pt-2 text-[14px] leading-[21px] text-[#52695C]">
        Recharge solaire en station pour motos.
        <br />
        Parking et prise en charge des trottinettes.
      </p>
      <div className="mx-5 mt-4 overflow-hidden rounded-[24px]">
        <div className="relative">
          <img src={MAP_ZONES} alt="Dakar" className="h-[180px] w-full object-cover" />
          <span className="absolute left-[64px] top-[62px] flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-white bg-[#1B4332] text-[12px] font-bold text-white">1</span>
          <span className="absolute left-[245px] top-[30px] flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-white bg-[#1B4332] text-[12px] font-bold text-white">2</span>
          <span className="absolute left-[282px] top-[141px] flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-white bg-[#1B4332] text-[12px] font-bold text-white">3</span>
          <span className="absolute left-[155px] top-[144px] flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-white bg-[#C5E84D] text-[12px] font-bold text-[#1B4332]">4</span>
        </div>
      </div>
      <p className="px-5 pt-2 text-[11px] leading-[16px] text-[#52695C]">Carte indicative · pas de guidage en temps réel</p>
      <div className="space-y-2 px-5 pt-3">
        {ZONES.map((z, i) => {
          const num = `0${i + 1}`
          const selected = z.id === 'sacre-coeur'
          return (
            <Link
              key={z.id}
              to="/itineraire/$zoneId"
              params={{ zoneId: z.id }}
              className="flex items-center gap-3 rounded-[16px] border bg-white px-4 py-3 text-[#12211C]"
              style={{ borderColor: selected ? '#8EA77D' : '#DFE7DE', background: selected ? '#E8F1DC' : '#fff' }}
            >
              <span className="w-6 text-center text-[12px] font-bold leading-[18px] text-[#1B4332]">{num}</span>
              <span>
                <span className="block text-[15px] font-bold leading-[21px] text-[#153D2C]">{z.name}</span>
                <span className="block text-[11px] leading-[16px] text-[#52695C]">Recharge solaire moto · parking trottinette</span>
              </span>
            </Link>
          )
        })}
      </div>
      <p className="px-5 pt-3 text-[11px] leading-[16px] text-[#52695C]">
        1 000 F CFA / recharge complète · incluse au forfait.
        <br />
        Sinon, à la fin via Wave ou Orange Money.
      </p>
      <div className="px-5 pt-3 pb-2">
        <Link to="/itineraire/$zoneId" params={{ zoneId: 'sacre-coeur' }} className="flex h-[54px] items-center justify-center rounded-[18px] bg-[#1B4332] text-[15px] font-bold leading-[22px] text-white">
          Voir l’itinéraire · Sacré-Cœur
        </Link>
        <Link to="/aide" className="block pt-2 text-center text-[10px] font-bold leading-[13px] text-[#63736B]">
          Besoin d’aide dans la zone ? Voir l’aide
        </Link>
      </div>
    </Phone>
  )
}

function StatusRow() {
  return (
    <div className="flex items-center justify-between bg-[#F3F6F2] px-[22px] pt-[9px] pb-[8px]">
      <span className="text-[11px] font-bold text-[#12211C]">9:41</span>
      <span className="text-[11px] text-[#12211C]/60">● ● ●</span>
    </div>
  )
}
