import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Phone, BackHeader } from '@/components/phone'
import { fmt } from '@/lib/escooter'

export const Route = createFileRoute('/facture-trottinette')({ component: Facture })

function Facture() {
  const nav = useNavigate()
  const minutes = typeof localStorage !== 'undefined' ? Number(localStorage.getItem('jef-debt-minutes') ?? localStorage.getItem('jef-last-minutes') ?? '5') : 5
  const amount = typeof localStorage !== 'undefined' ? Number(localStorage.getItem('jef-debt') ?? localStorage.getItem('jef-last-minute-cost') ?? '500') : 500
  const offFee = typeof localStorage !== 'undefined' ? Number(localStorage.getItem('jef-off-fee') ?? '0') : 0
  const minutePart = Math.max(0, amount - offFee)
  const returnMode = typeof localStorage !== 'undefined' ? localStorage.getItem('jef-trotti-return') ?? 'station' : 'station'
  const [method, setMethod] = useState<'wave' | 'orange'>('wave')

  const pay = () => {
    try {
      localStorage.setItem('jef-debt', '0')
      localStorage.setItem('jef-last-paid', String(amount))
      localStorage.setItem('jef-pay-method', method)
      localStorage.setItem('jef-tx', `${method === 'orange' ? 'OM' : 'WV'}-${Math.floor(100000 + Math.random() * 900000)}`)
      localStorage.setItem('jef-pay-date', new Date().toLocaleString('fr-FR'))
    } catch {}
    nav({ to: '/termine-trottinette' })
  }

  return (
    <Phone scroll>
      <BackHeader title="E-scooter" backTo="/termine-trottinette" />
      <h1 className="px-5 pt-1 text-[28px] font-bold leading-[34px] text-[#12211C]">Ta facture minutes</h1>
      <p className="px-5 pt-2 text-[14px] text-[#63736B]">Tu as roulé {minutes} min. Paie maintenant pour continuer à utiliser E-scooter.</p>
      <div className="mx-5 mt-4 rounded-[20px] bg-[#1B4332] p-5 text-white">
        <p className="text-[11px] font-bold text-[#C5E84D]">À PAYER MAINTENANT</p>
        <p className="pt-1 text-[36px] font-extrabold">{fmt(amount)}</p>
        <p className="pt-1 text-[13px] text-white/80">{minutes} min × 100 F CFA · déverrouillage déjà payé{offFee > 0 ? ` · dont ${fmt(offFee)} hors station` : ''}</p>
      </div>
      {offFee > 0 ? (
        <div className="mx-5 mt-3 rounded-[16px] bg-[#FFFBEB] p-3 text-[12px] leading-[18px] text-[#4A3A00]">
          <span className="font-bold">Laissée dehors (+ {fmt(offFee)}).</span> En payant, tu marques la course terminée et la trottinette devient visible sur la carte pour quelqu'un d'autre.
        </div>
      ) : null}
      <div className="mx-5 mt-3 rounded-[16px] bg-[#FDECEC] p-3 text-[12px] font-bold leading-[18px] text-[#832E25]">
        Si tu ne paies pas, ton compte reste bloqué : impossible de débloquer une trottinette ou de réserver une moto.
      </div>
      <div className="space-y-2 px-5 pt-4">
        {(['wave', 'orange'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMethod(m)}
            className={`flex w-full items-center gap-3 rounded-[16px] border p-4 text-left ${method === m ? 'border-[#1B4332] bg-[#EAF0E8]' : 'border-[#E0E8E0] bg-white'}`}
          >
            <span className={`flex h-5 w-5 items-center justify-center rounded-full border ${method === m ? 'border-[#1B4332]' : 'border-[#9BAA9F]'}`}>
              {method === m ? <span className="h-2.5 w-2.5 rounded-full bg-[#1B4332]" /> : null}
            </span>
            <span className={`flex h-[40px] w-[40px] items-center justify-center rounded-full text-[16px] font-extrabold text-white ${m === 'wave' ? 'bg-[#1DC8FF]' : 'bg-[#FF7900]'}`}>{m === 'wave' ? 'W' : 'OM'}</span>
            <span className="text-[14px] font-bold text-[#12211C]">{m === 'wave' ? 'Wave' : 'Orange Money'}</span>
          </button>
        ))}
      </div>
      <div className="px-5 pb-6 pt-4">
        <button onClick={pay} className="flex h-[54px] w-full items-center justify-center rounded-[18px] bg-[#1B4332] text-[15px] font-bold text-white">
          Payer {fmt(amount)} avec {method === 'wave' ? 'Wave' : 'Orange Money'}
        </button>
        <p className="pt-2 text-center text-[12px] text-[#63736B]">Version démo : aucun débit réel</p>
      </div>
    </Phone>
  )
}
