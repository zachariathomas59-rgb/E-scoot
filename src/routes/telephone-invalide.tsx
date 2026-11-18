import { createFileRoute, Link } from '@tanstack/react-router'
import { Phone, BackHeader } from '@/components/phone'
export const Route = createFileRoute('/telephone-invalide')({ component: TelInvalide })
function TelInvalide() {
  return (
    <Phone>
      <BackHeader title="E-scooter" backTo="/acces" />
      <h1 className="px-5 pt-1 text-[30px] font-bold leading-[36px] text-[#153D2C]">Numéro invalide</h1>
      <p className="px-5 pt-2 text-[14px] text-[#52695C]">Vérifie ton numéro +221 : 9 chiffres après l'indicatif.</p>
      <div className="mx-5 mt-4 rounded-[20px] border border-[#E5C07B] bg-[#FFF3C4] p-4"><p className="text-[14px] font-bold text-[#12211C]">Exemple : +221 77 000 00 00</p></div>
      <div className="px-5 pb-6 pt-4"><Link to="/inscription-telephone" className="flex h-[54px] items-center justify-center rounded-[18px] bg-[#1B4332] text-[15px] font-bold text-white">Corriger le numéro</Link></div>
    </Phone>
  )
}
