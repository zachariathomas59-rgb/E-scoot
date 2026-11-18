import { createFileRoute, Link } from '@tanstack/react-router'
import { Phone } from '@/components/phone'

export const Route = createFileRoute('/envoye')({
  component: Envoye,
})

function Envoye() {
  return (
    <Phone>
      <div className="flex flex-1 flex-col items-center px-6 pb-6 pt-12">
        <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full bg-[#C5E84D] text-4xl">✓</div>
        <h1 className="pt-5 text-center text-[24px] font-bold">Assistance envoyée</h1>
        <p className="pt-1 text-center text-[13px] text-[#63736B]">Un agent te contacte dans ~10 min au +221 77 000 00 00.</p>
        <div className="flex w-full flex-1 flex-col justify-end gap-2">
          <Link to="/trajet" className="flex h-[54px] items-center rounded-[18px] bg-[#1B4332] pl-4 text-[14px] font-bold text-white">Retour à ma location</Link>
          <Link to="/accueil" className="flex h-[54px] items-center justify-center rounded-[18px] text-[14px] font-bold text-[#1B4332]">Accueil</Link>
        </div>
      </div>
    </Phone>
  )
}
