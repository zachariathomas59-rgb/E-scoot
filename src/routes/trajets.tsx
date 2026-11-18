import { createFileRoute, Link } from '@tanstack/react-router'
import { Phone, TopBar, BottomTabs } from '@/components/phone'

export const Route = createFileRoute('/trajets')({
  component: Trajets,
})

function Trajets() {
  const ref = typeof localStorage !== 'undefined' ? localStorage.getItem('jef-ref') ?? 'JEF-0427' : 'JEF-0427'
  const veh = typeof localStorage !== 'undefined' ? localStorage.getItem('jef-vehicle') ?? 'E-Rider Cargo' : 'E-Rider Cargo'
  return (
    <Phone scroll tabbar={<BottomTabs active="trajets" />}>
      <div className="bg-[#F3F6F2] px-[22px] pt-[9px] pb-[8px] text-[11px] font-bold text-[#12211C]">9:41</div>
      <TopBar />
      <h1 className="px-5 pt-2 text-[30px] font-bold tracking-[-0.6px] text-[#153D2C]">Mes locations</h1>
      <p className="px-5 pt-1 text-[14px] text-[#52695C]">Retrouve tes réservations et tes reçus.</p>
      <div className="px-5 pt-6">
        <div className="rounded-[20px] border border-[#DFE7DE] bg-white p-4 shadow-[0px_3px_12px_0px_rgba(20,51,36,0.04)]">
          <p className="text-[15px] font-bold text-[#12211C]">Aujourd’hui · 08:00</p>
          <p className="pt-1 text-[13px] text-[#52695C]">{veh} · {veh === 'E-Scoot' ? '200 F CFA + 100 F CFA / min' : '15 000 F CFA / jour'} · en cours</p>
          <p className="pt-1 text-[12px] font-bold text-[#1B4332]">Réf. {ref}</p>
        </div>
        <div className="mt-4 rounded-[20px] border border-[#DFE7DE] bg-white p-4 shadow-[0px_3px_12px_0px_rgba(20,51,36,0.04)]">
          <p className="text-[15px] font-bold text-[#12211C]">12 nov. · 08:00</p>
          <p className="pt-1 text-[13px] text-[#52695C]">Reçu de location disponible</p>
        </div>
        <Link to="/trouver" search={{ type: 'tous' }} className="mt-8 flex h-[54px] items-center rounded-[18px] bg-[#1B4332] pl-4 text-[15px] font-bold text-white">Réserver une moto</Link>
        <div className="h-6" />
      </div>
    </Phone>
  )
}
