import { createFileRoute, Link } from '@tanstack/react-router'
import { Phone, BottomTabs } from '@/components/phone'

export const Route = createFileRoute('/trajet')({
  component: Trajet,
})

function Trajet() {
  const ref = typeof localStorage !== 'undefined' ? localStorage.getItem('jef-ref') ?? 'JEF-0427' : 'JEF-0427'
  const veh = typeof localStorage !== 'undefined' ? localStorage.getItem('jef-vehicle') ?? 'E-Rider Cargo' : 'E-Rider Cargo'
  return (
    <Phone scroll tabbar={<BottomTabs active="trajets" />}>
      <div className="px-5 pt-4">
        <span className="text-[16px] font-bold text-[#1B4332]">E-scooter</span>
        <h1 className="pt-1 text-[26px] font-bold text-[#12211C]">Location en cours</h1>
        <p className="text-[14px] text-[#63736B]">Réf. {ref} · {veh}</p>
        <div className="mt-4 rounded-[24px] bg-[#1B4332] p-5 text-white">
          <div className="flex justify-between text-[12px] text-white/70"><span>BATTERIE</span><span>78%</span></div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/20"><div className="h-full w-[78%] rounded-full bg-[#C5E84D]" /></div>
          <div className="mt-4 flex justify-between">
            <div><p className="text-[11px] text-white/60">TEMPS ÉCOULÉ</p><p className="text-[20px] font-extrabold">02:14</p></div>
            <div className="text-right"><p className="text-[11px] text-white/60">AUTONOMIE</p><p className="text-[20px] font-extrabold">42 km</p></div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link to="/zones" className="rounded-[18px] bg-white p-4 text-center text-[13px] font-bold text-[#1B4332]">Zones solaires</Link>
          <Link to="/aide" className="rounded-[18px] bg-white p-4 text-center text-[13px] font-bold text-[#1B4332]">Assistance</Link>
        </div>
        <Link to="/fin" className="mt-4 flex h-[54px] items-center rounded-[18px] bg-[#C5E84D] pl-4 text-[14px] font-bold text-[#1B4332]">Terminer la location →</Link>
        <div className="h-6" />
      </div>
    </Phone>
  )
}
