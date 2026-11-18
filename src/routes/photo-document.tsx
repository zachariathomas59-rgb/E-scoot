import { createFileRoute, Link } from '@tanstack/react-router'
import { Phone, BackHeader } from '@/components/phone'
export const Route = createFileRoute('/photo-document')({ component: PhotoDoc })
function PhotoDoc() {
  return (
    <Phone>
      <BackHeader title="E-scooter" backTo="/compte" />
      <h1 className="px-5 pt-1 text-[30px] font-bold leading-[36px] text-[#153D2C]">Photo du document</h1>
      <p className="px-5 pt-2 text-[14px] text-[#52695C]">Cadre ta pièce ou ton permis, bien éclairé, sans reflet.</p>
      <div className="mx-5 mt-4 flex h-[220px] flex-col items-center justify-center gap-2 rounded-[20px] border-2 border-dashed border-[#8EA77D] bg-white"><p className="text-[15px] font-bold text-[#1B4332]">Cadre de capture</p><p className="text-[12px] text-[#52695C]">La photo est vérifiée au comptoir</p></div>
      <div className="px-5 pb-6 pt-4"><Link to="/compte" className="flex h-[54px] items-center justify-center rounded-[18px] bg-[#1B4332] text-[15px] font-bold text-white">Valider la photo</Link></div>
    </Phone>
  )
}
