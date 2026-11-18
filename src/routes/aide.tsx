import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Phone, BottomTabs, ICON_LIGHTNING, ICON_ALERT, ICON_PIN } from '@/components/phone'
import { BackHeader } from './acces'

export const Route = createFileRoute('/aide')({
  component: Aide,
})

function Aide() {
  const nav = useNavigate()
  return (
    <Phone scroll tabbar={<BottomTabs active="compte" />}>
      <BackHeader title="E-scoot" onBack={() => nav({ to: '/accueil' })} />
      <h1 className="px-5 pt-1 text-[26px] font-bold leading-[32px] text-[#12211C]">On est là pour t'aider</h1>
      <p className="px-5 pt-1 text-[14px] text-[#63736B]">Mets-toi en sécurité, puis contacte l'équipe.</p>
      <div className="space-y-3 px-5 pb-6 pt-4">
        <a href="tel:+221330000000" className="block rounded-[20px] bg-[#C5E84D] p-4 text-[#1B4332]">
          <p className="text-[16px] font-bold text-[#1B4332]">Appeler l'assistance 24/7</p>
          <p className="text-[18px] font-extrabold text-[#1B4332]">(+221 33 000 00 00)</p>
          <p className="pt-1 text-[12px] text-[#1B4332]/80">Appel direct · équipe disponible jour et nuit</p>
        </a>
        <div className="flex items-center gap-3 rounded-[20px] bg-white p-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-[#DDEFE3]">
            <img src={ICON_LIGHTNING} alt="" className="h-6 w-6 object-contain" />
          </span>
          <div><p className="font-bold text-[#12211C]">Panne ou batterie</p><p className="text-[12px] text-[#63736B]">Aide pendant la location</p></div>
        </div>
        <div className="flex items-center gap-3 rounded-[20px] bg-white p-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-[#DDEFE3]">
            <img src={ICON_ALERT} alt="" className="h-6 w-6 object-contain" />
          </span>
          <div><p className="font-bold text-[#12211C]">Accident</p><p className="text-[12px] text-[#63736B]">Mets-toi en sécurité d'abord</p></div>
        </div>
        <Link to="/incident" className="flex items-center gap-3 rounded-[20px] bg-white p-4 text-[#12211C]">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-[#DDEFE3]">
            <img src={ICON_PIN} alt="" className="h-6 w-6 object-contain" />
          </span>
          <div><p className="font-bold text-[#12211C]">Vol ou tentative</p><p className="text-[12px] text-[#63736B]">Préviens immédiatement l'équipe</p></div>
        </Link>
        <div className="rounded-[20px] bg-[#FFF3C4] p-4">
          <p className="font-bold text-[#12211C]">Urgence</p>
          <p className="pt-1 text-[12px] text-[#63736B]">En danger immédiat, appelle les services locaux.</p>
        </div>
        <Link to="/incident" className="flex h-[54px] items-center rounded-[18px] bg-[#1B4332] pl-4 text-[14px] font-bold text-white">Signaler un incident</Link>
      </div>
    </Phone>
  )
}
