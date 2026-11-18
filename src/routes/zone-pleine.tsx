import { createFileRoute, Link } from '@tanstack/react-router'
import { Phone, BackHeader } from '@/components/phone'
export const Route = createFileRoute('/zone-pleine')({ component: ZonePleine })
function ZonePleine() {
  return (
    <Phone>
      <BackHeader title="E-scooter" backTo="/zones" />
      <h1 className="px-5 pt-1 text-[30px] font-bold leading-[36px] text-[#153D2C]">Zone indisponible</h1>
      <p className="px-5 pt-3 text-[14px] leading-[21px] text-[#52695C]">Aucune place disponible dans cette zone pour le moment (simulation).</p>
      <div className="px-5 pt-8">
        <div className="rounded-[24px] bg-[#FFF3C4] p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#1B4332] text-[20px] font-bold text-[#1B4332]">!</div>
          <p className="pt-3 text-[18px] font-bold text-[#12211C]">Choisis une autre zone</p>
        </div>
        <div className="mt-4 rounded-[20px] border border-[#DFE7DE] bg-white p-4">
          <p className="text-[16px] font-bold text-[#12211C]">Que faire ?</p>
          <p className="pt-1 text-[14px] text-[#52695C]">Essaie une autre zone ou contacte l'équipe de la zone.</p>
        </div>
      </div>
      <div className="px-5 pb-6 pt-8">
        <Link to="/zones" className="flex h-[54px] items-center justify-center rounded-[18px] bg-[#1B4332] text-[15px] font-bold text-white">Voir une autre zone</Link>
        <Link to="/aide" className="mt-3 flex h-[54px] items-center justify-center rounded-[18px] border border-[#BACBBE] text-[15px] font-bold text-[#1B4332]">Contacter l'assistance</Link>
      </div>
    </Phone>
  )
}
