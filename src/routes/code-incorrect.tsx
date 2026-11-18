import { createFileRoute, Link } from '@tanstack/react-router'
import { Phone, BackHeader } from '@/components/phone'
export const Route = createFileRoute('/code-incorrect')({ component: CodeIncorrect })
function CodeIncorrect() {
  return (
    <Phone>
      <BackHeader title="E-scoot" backTo="/inscription-code" />
      <h1 className="px-5 pt-1 text-[30px] font-bold leading-[36px] text-[#153D2C]">Code incorrect</h1>
      <p className="px-5 pt-2 text-[14px] text-[#52695C]">Le code saisi ne correspond pas. Réessaie ou demande un nouveau code.</p>
      <div className="mx-5 mt-4 rounded-[20px] border border-[#E5C07B] bg-[#FFF3C4] p-4"><p className="text-[14px] font-bold text-[#12211C]">Astuce démo : le code est 123456</p></div>
      <div className="px-5 pb-6 pt-4"><Link to="/inscription-code" className="flex h-[54px] items-center justify-center rounded-[18px] bg-[#1B4332] text-[15px] font-bold text-white">Réessayer</Link></div>
    </Phone>
  )
}
