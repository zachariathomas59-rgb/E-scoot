import { createFileRoute, Link } from '@tanstack/react-router'
import { Phone, BackHeader, MAP_DAKAR, ICON_PIN } from '@/components/phone'

export const Route = createFileRoute('/aucune-moto')({
  component: AucuneMoto,
})

function AucuneMoto() {
  return (
    <Phone>
      <BackHeader title="E-scoot" backTo="/trouver" />
      <h1 className="px-5 pt-1 text-[30px] font-bold leading-[36px] text-[#153D2C]">Aucune moto ou trottinette disponible</h1>
      <p className="px-5 pt-3 text-[14px] leading-[21px] text-[#52695C]">Les disponibilités sont indicatives. Essaie une autre zone ou un autre créneau.</p>
      <div className="px-5 pt-6">
        <div className="relative overflow-hidden rounded-[20px] border border-[#DFE7DE] bg-white">
          <img src={MAP_DAKAR} alt="Carte Dakar" className="h-[150px] w-full object-cover" />
          <div className="absolute left-[18%] top-[30%] flex items-center gap-1 text-[12px] font-bold text-[#1B4332]">
            <img src={ICON_PIN} alt="" className="h-5 w-5" /> Plateau
          </div>
        </div>
        <div className="mt-3 rounded-[20px] border border-[#DFE7DE] bg-white p-4">
          <p className="text-[15px] font-bold text-[#12211C]">Une autre option ?</p>
          <p className="pt-1 text-[13px] text-[#52695C]">Les emplacements exacts et disponibilités restent à confirmer.</p>
        </div>
      </div>
      <div className="px-5 pb-6 pt-8">
        <Link to="/filtres" className="flex h-[54px] items-center justify-center rounded-[18px] bg-[#1B4332] text-[15px] font-bold text-white">Changer les filtres</Link>
      </div>
    </Phone>
  )
}
