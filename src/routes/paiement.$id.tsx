import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Phone, WAVE_REAL, OM_REAL } from '@/components/phone'
import { BackHeader } from './acces'
import { vehicleById, fmt, TROTT_UNLOCK, TROTT_DAY } from '@/lib/escooter'

export const Route = createFileRoute('/paiement/$id')({
  component: Pay,
})

function WaveBadge() {
  return (
    <img src={WAVE_REAL} alt="Wave" className="h-[46px] w-[46px] shrink-0 rounded-full bg-white object-contain" />
  )
}

function OMbadge() {
  return (
    <img src={OM_REAL} alt="Orange Money" className="h-[46px] w-[46px] shrink-0 rounded-[14px] bg-white object-contain" />
  )
}

function CashBadge() {
  return (
    <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[#EAF0E8] text-[22px]">
      💵
    </span>
  )
}

const METHODS = [
  { k: 'wave', t: 'Wave', d: 'Paiement mobile instantané' },
  { k: 'orange', t: 'Orange Money', d: 'Paiement mobile instantané' },
  { k: 'especes', t: 'Espèces au retrait', d: 'Paie à la station Plateau' },
] as const

type Method = (typeof METHODS)[number]['k']

function Pay() {
  const { id } = Route.useParams()
  const nav = useNavigate()
  const v = vehicleById(id)
  const days = Number(typeof localStorage !== 'undefined' ? localStorage.getItem('jef-days') ?? '1' : '1')
  const [method, setMethod] = useState<Method>('wave')
  const isTrott = id === 'e-scoot'
  const formule = typeof localStorage !== 'undefined' ? localStorage.getItem('jef-trotti-formule') ?? 'libre' : 'libre'
  const isJournee = isTrott && formule === 'journee'
  const total = isTrott ? (isJournee ? TROTT_DAY : TROTT_UNLOCK) : v.perDay * days
  const safeMethod: Method = isTrott && method === 'especes' ? 'wave' : method
  const label = safeMethod === 'wave' ? 'Wave' : safeMethod === 'orange' ? 'Orange Money' : 'Espèces'
  const availableMethods = isTrott ? METHODS.filter((m) => m.k !== 'especes') : METHODS
  const pickupMode = typeof localStorage !== 'undefined' ? localStorage.getItem('jef-pickup-mode') : null
  const pickupFreeCode = typeof localStorage !== 'undefined' ? localStorage.getItem('jef-free-code') ?? '' : ''
  const pickupFreeAddr = typeof localStorage !== 'undefined' ? localStorage.getItem('jef-free-address') ?? '' : ''
  const pickupStation = typeof localStorage !== 'undefined' ? localStorage.getItem('jef-station') ?? 'Dakar Plateau' : 'Dakar Plateau'
  const pickupLine = isTrott ? (pickupMode === 'free' && pickupFreeCode ? ` · Retrait dehors : ${pickupFreeCode} · ${pickupFreeAddr} (pas de station)` : ` · Retrait station ${pickupStation}`) : ` · Retrait station ${pickupStation} · Voir l’itinéraire dans la confirmation`
  const sub = isTrott
    ? isJournee
      ? `E-Scoot · Forfait journée · Total ${fmt(total)}${pickupLine}`
      : `E-Scoot · Libre · ${fmt(total)} maintenant + 100 F CFA / min à la fin du trajet${pickupLine}`
    : `${v.name} · ${days} jour${days > 1 ? 's' : ''} · Total ${fmt(total)}`

  const go = () => {
    try {
      localStorage.setItem('jef-pay-method', safeMethod)
      if (safeMethod === 'especes') {
        const n = `ESP-${Math.floor(100000 + Math.random() * 900000)}`
        localStorage.setItem('jef-tx', n)
        localStorage.setItem('jef-pay-date', new Date().toLocaleString('fr-FR'))
      }
    } catch {}
    if (safeMethod === 'wave') nav({ to: '/wave/$id', params: { id } })
    else if (safeMethod === 'orange') nav({ to: '/orange-money/$id', params: { id } })
    else nav({ to: '/confirmee/$id', params: { id } })
  }

  return (
    <Phone scroll>
      <BackHeader title="E-scooter" onBack={() => (isTrott ? nav({ to: '/scanner-trottinette', search: { code: pickupFreeCode || undefined } }) : nav({ to: '/documents/$id', params: { id } }))} />
      <h1 className="px-5 pt-1 text-[28px] font-bold text-[#12211C]">Paiement</h1>
      <p className="px-5 text-[14px] text-[#63736B]">{sub}</p>
      {!isTrott ? (
        <div className="mx-5 mt-3 rounded-[14px] border border-[#DDE5DF] bg-[#F3F6F2] p-3">
          <p className="text-[12px] font-bold text-[#1B4332]">Retrait en station : {pickupStation}</p>
          <p className="pt-1 text-[12px] leading-[18px] text-[#52695C]">Après le paiement, suis l’itinéraire pour aller chercher ta moto à la station. Montre ta référence sur place.</p>
        </div>
      ) : null}
      {isTrott && !isJournee ? (
        <div className="mx-5 mt-3 rounded-[14px] bg-[#FFF6E5] p-3 text-[12px] leading-[18px] text-[#5a3d00]">
          Tu paies seulement le déverrouillage ({fmt(TROTT_UNLOCK)}) maintenant. Les minutes (100 F CFA / min) seront calculées quand tu termines le trajet dans l'app, et à payer tout de suite. Sans ce paiement, tu ne pourras plus débloquer de trottinette.
        </div>
      ) : null}
      <div className="space-y-3 px-5 pt-4">
        {availableMethods.map((m) => (
          <button
            key={m.k}
            onClick={() => setMethod(m.k)}
            aria-pressed={method === m.k}
            className={`flex w-full items-center gap-3 rounded-[16px] border p-4 text-left ${method === m.k ? 'border-[#1B4332] bg-[#EAF0E8]' : 'border-[#E0E8E0] bg-white'}`}
          >
            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${method === m.k ? 'border-[#1B4332]' : 'border-[#9BAA9F]'}`}>
              {method === m.k ? <span className="h-2.5 w-2.5 rounded-full bg-[#1B4332]" /> : null}
            </span>
            {m.k === 'wave' ? <WaveBadge /> : m.k === 'orange' ? <OMbadge /> : <CashBadge />}
            <span>
              <span className="block text-[14px] font-bold text-[#12211C]">{m.t}</span>
              <span className="text-[12px] text-[#63736B]">{m.d}</span>
            </span>
          </button>
        ))}
      </div>
      <div className="flex flex-1 flex-col justify-end px-5 pb-6 pt-6">
        <button onClick={go} className="flex h-[54px] items-center justify-center rounded-[18px] bg-[#1B4332] px-4 text-[14px] font-bold text-white">
          {safeMethod === 'especes' ? `Continuer · payer ${fmt(total)} sur place` : `Payer ${fmt(total)} avec ${label}`}
        </button>
        <p className="pt-3 text-center text-[12px] text-[#63736B]">
          {safeMethod === 'wave' ? 'Tu valideras dans Wave, puis tu recevras ta référence de réservation.' : safeMethod === 'orange' ? 'Tu valideras avec ton code Orange Money, puis tu recevras ta référence de réservation.' : 'Aucun débit en ligne. Présente ton code de réservation à la station.'}
        </p>
      </div>
    </Phone>
  )
}
