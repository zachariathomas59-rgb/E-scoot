import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Phone, TopBar, ICON_TORCH } from '@/components/phone'

export const Route = createFileRoute('/associer')({
  component: Associer,
})

function Associer() {
  const nav = useNavigate()
  return (
    <Phone scroll>
      <div className="bg-[#F3F6F2] px-[22px] pt-[9px] pb-[8px] text-[11px] font-bold text-[#12211C]">9:41</div>
      <TopBar backTo="/depot" />
      <h1 className="px-5 pt-2 text-[30px] font-bold leading-[38px] tracking-[-0.6px] text-[#153D2C]">Associer la zone</h1>
      <p className="px-5 pt-2 text-[14px] leading-[21px] text-[#52695C]">Pointe la caméra vers le QR code affiché sur la station</p>
      <div className="mx-auto mt-6 h-[290px] w-[290px] rounded-[24px] bg-[#1A2421] p-[29px]">
        <div className="relative h-full w-full rounded-[22px] bg-[#24352D]">
          <span className="absolute left-[12px] top-[12px] h-[22px] w-[4px] bg-[#C5E84D]" />
          <span className="absolute left-[12px] top-[12px] h-[4px] w-[22px] bg-[#C5E84D]" />
          <span className="absolute right-[12px] top-[12px] h-[22px] w-[4px] bg-white" />
          <span className="absolute right-[12px] top-[12px] h-[4px] w-[22px] bg-white" />
          <span className="absolute bottom-[12px] left-[12px] h-[22px] w-[4px] bg-white" />
          <span className="absolute bottom-[12px] left-[12px] h-[4px] w-[22px] bg-white" />
          <span className="absolute bottom-[12px] right-[12px] h-[22px] w-[4px] bg-[#C5E84D]" />
          <span className="absolute bottom-[12px] right-[12px] h-[4px] w-[22px] bg-[#C5E84D]" />
          <span className="absolute left-[13px] right-[13px] top-[113px] h-[3px] bg-[#C5E84D] shadow-[0px_0px_12px_3px_rgba(196,232,77,0.65)]" />
          <span className="absolute bottom-[9px] left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-[#3D5147]">
            <img src={ICON_TORCH} alt="" className="h-[22px] w-[22px]" />
          </span>
        </div>
      </div>
      <div className="mx-5 mt-6 rounded-[20px] border border-[#D4E0CC] bg-[#E9F1E3] p-4 shadow-[0px_3px_12px_0px_rgba(20,51,36,0.04)]">
        <p className="text-[15px] font-bold leading-[22px] text-[#153D2C]">Recharge solaire en station</p>
        <p className="pt-2 text-[13px] leading-[19px] text-[#52695C]">Après le scan, l’équipe E-scoot branche et recharge ta moto électrique.</p>
      </div>
      <div className="flex flex-1 flex-col justify-end px-5 pb-6 pt-8">
        <button onClick={() => nav({ to: '/prete' })} className="flex h-[54px] items-center justify-center rounded-[18px] bg-[#1B4332] text-[15px] font-bold text-white">Confirmer la station</button>
      </div>
    </Phone>
  )
}
