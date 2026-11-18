import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Phone, TopBar } from '@/components/phone'

export const Route = createFileRoute('/incident')({
  component: Incident,
})

const OPTIONS = ['Panne ou batterie', 'Accident', 'Vol']

function Incident() {
  const nav = useNavigate()
  const [sel, setSel] = useState(OPTIONS[0])
  return (
    <Phone scroll>
      <div className="bg-[#F3F6F2] px-[22px] pt-[9px] pb-[8px] text-[11px] font-bold text-[#12211C]">9:41</div>
      <TopBar backTo="/aide" />
      <h1 className="px-5 pt-2 text-[30px] font-bold leading-[38px] tracking-[-0.6px] text-[#153D2C]">Que s’est-il passé ?</h1>
      <p className="px-5 pt-2 text-[14px] leading-[21px] text-[#52695C]">En danger immédiat, appelle les services d’urgence.</p>
      <div className="flex flex-col gap-4 px-5 pt-8">
        {OPTIONS.map((o) => {
          const active = sel === o
          return (
            <button
              key={o}
              onClick={() => setSel(o)}
              className={`flex h-[72px] items-center gap-4 rounded-[20px] border px-5 text-left shadow-[0px_3px_12px_0px_rgba(20,51,36,0.04)] ${active ? 'border-[#8EA77D] bg-[#E8F1DC]' : 'border-[#DFE7DE] bg-white'}`}
            >
              <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${active ? 'border-[#1B4332]' : 'border-[#1B4332]'}`}>
                {active && <span className="h-[10px] w-[10px] rounded-full bg-[#1B4332]" />}
              </span>
              <span className="text-[15px] font-medium leading-[22px] text-[#153D2C]">{o}</span>
            </button>
          )
        })}
      </div>
      <div className="flex flex-1 flex-col justify-end px-5 pb-6 pt-10">
        <button onClick={() => nav({ to: '/envoye' })} className="flex h-[54px] items-center justify-center rounded-[18px] bg-[#1B4332] text-[15px] font-bold text-white">
          Contacter l’assistance
        </button>
      </div>
    </Phone>
  )
}
