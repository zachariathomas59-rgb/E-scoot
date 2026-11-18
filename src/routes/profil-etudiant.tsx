import { createFileRoute, Link } from '@tanstack/react-router'
import { Phone, BackHeader } from '@/components/phone'
export const Route = createFileRoute('/profil-etudiant')({ component: ProfilEtudiant })
function ProfilEtudiant() {
  return (
    <Phone>
      <BackHeader title="E-scooter" backTo="/inscription-profil" />
      <h1 className="px-5 pt-1 text-[30px] font-bold leading-[36px] text-[#153D2C]">Profil étudiant</h1>
      <p className="px-5 pt-2 text-[14px] text-[#52695C]">Étudiant · sans permis : trottinette recommandée, sans caution.</p>
      <div className="mx-5 mt-4 rounded-[20px] bg-[#E9F1E3] p-4"><p className="text-[14px] font-bold text-[#153D2C]">Sans permis · caution 0 F CFA</p><p className="text-[13px] text-[#52695C]">Trottinette E-Scoot · 200 F + 100 F / min</p></div>
      <div className="px-5 pb-6 pt-4 flex flex-col gap-2">
        <Link to="/accueil-trottinette" className="flex h-[54px] items-center justify-center rounded-[18px] bg-[#1B4332] text-[15px] font-bold text-white">Continuer en trottinette</Link>
        <Link to="/accueil" className="flex h-[54px] items-center justify-center rounded-[18px] border border-[#BACBBE] text-[15px] font-bold text-[#1B4332]">Voir les motos</Link>
      </div>
    </Phone>
  )
}
