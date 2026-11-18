import { createFileRoute, Link } from '@tanstack/react-router'
import { Phone, BottomTabs } from '@/components/phone'

export const Route = createFileRoute('/impact')({
  component: Impact,
})

function Impact() {
  const days = Number(typeof localStorage !== 'undefined' ? localStorage.getItem('jef-days') ?? '2' : '2')
  return (
    <Phone scroll tabbar={<BottomTabs active="accueil" />}>
      <div className="px-5 pt-6">
        <span className="text-[16px] font-bold text-[#1B4332]">E-scooter</span>
        <h1 className="pt-1 text-[28px] font-bold text-[#12211C]">Ton impact</h1>
        <p className="text-[14px] text-[#63736B]">{days} jours en électrique · Dakar</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-[20px] bg-[#1B4332] p-4 text-white"><p className="text-[22px] font-extrabold text-[#C5E84D]">{(days * 4.2).toFixed(1)} kg</p><p className="text-[12px]">CO₂ évité</p></div>
          <div className="rounded-[20px] bg-white p-4"><p className="text-[22px] font-extrabold text-[#1B4332]">{(days * 3500).toLocaleString('fr-FR')} F</p><p className="text-[12px] text-[#63736B]">Carburant économisé</p></div>
        </div>
        <div className="mt-3 rounded-[20px] bg-white p-4">
          <p className="text-[14px] font-bold">Équivalent 🌳 {(days * 0.4).toFixed(1)} arbres plantés</p>
          <p className="pt-1 text-[12px] text-[#63736B]">Recharge 100% solaire en station.</p>
        </div>
        <Link to="/accueil" className="mt-4 flex h-[54px] items-center rounded-[18px] bg-[#1B4332] pl-4 text-[14px] font-bold text-white">Louer à nouveau</Link>
        <div className="h-6" />
      </div>
    </Phone>
  )
}
