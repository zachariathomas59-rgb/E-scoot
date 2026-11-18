import { createFileRoute, Link } from '@tanstack/react-router'
import { Phone, ICON_LIGHTNING } from '@/components/phone'

export const Route = createFileRoute('/prete')({
  component: Prete,
})

function Prete() {
  return (
    <Phone>
      <div className="flex flex-1 flex-col items-center px-6 pb-6 pt-10">
        <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full bg-[#C5E84D]">
          <img src={ICON_LIGHTNING} alt="Recharge" className="h-12 w-12 object-contain" />
        </div>
        <h1 className="pt-5 text-center text-[26px] font-bold text-[#12211C]">Moto prête !</h1>
        <p className="pt-1 text-center text-[14px] text-[#63736B]">Recharge solaire lancée · borne Plateau-02</p>
        <div className="mt-5 w-full rounded-[20px] bg-white p-4 text-[13px]">
          <div className="flex justify-between"><span>Niveau actuel</span><span className="font-bold">78%</span></div>
          <div className="flex justify-between pt-1"><span>Fin estimée</span><span className="font-bold">45 min</span></div>
        </div>
        <div className="flex w-full flex-1 flex-col justify-end gap-2">
          <Link to="/trajet" className="flex h-[54px] items-center rounded-[18px] bg-[#1B4332] pl-4 text-[14px] font-bold text-white">Retour à ma location</Link>
        </div>
      </div>
    </Phone>
  )
}
