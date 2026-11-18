import { createFileRoute, Link } from '@tanstack/react-router'
import { Phone, BackHeader, MAP_DAKAR, ICON_PIN } from '@/components/phone'
export const Route = createFileRoute('/profil-incomplet')({ component: ProfilIncomplet })
function ProfilIncomplet() {
  return (
    <Phone>
      <BackHeader title="E-scooter" backTo="/documents" />
      <h1 className="px-5 pt-1 text-[30px] font-bold leading-[36px] text-[#153D2C]">Il manque un document</h1>
      <p className="px-5 pt-3 text-[14px] leading-[21px] text-[#52695C]">Ajoute les documents requis avant le retrait.</p>
      <div className="px-5 pt-6">
        <div className="relative overflow-hidden rounded-[20px] border border-[#DFE7DE] bg-white">
          <img src={MAP_DAKAR} alt="Carte Dakar" className="h-[150px] w-full object-cover" />
          <div className="absolute left-[18%] top-[30%] flex items-center gap-1 text-[12px] font-bold text-[#1B4332]">
            <img src={ICON_PIN} alt="" className="h-5 w-5" /> Plateau
          </div>
        </div>
        <div className="mt-3 rounded-[20px] border border-[#DFE7DE] bg-white p-4">
          <p className="text-[16px] font-bold text-[#12211C]">Documents manquants</p>
          <p className="pt-1 text-[14px] text-[#52695C]">Il te manque : permis ou pièce d'identité. Ajoute-les avant le retrait.</p>
        </div>
      </div>
      <div className="px-5 pb-6 pt-8">
        <Link to="/photo-document" className="flex h-[54px] items-center justify-center rounded-[18px] bg-[#1B4332] text-[15px] font-bold text-white">Voir les documents</Link>
      </div>
    </Phone>
  )
}
