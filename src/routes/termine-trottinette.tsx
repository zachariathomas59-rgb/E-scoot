import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Phone, BackHeader } from '@/components/phone'
import { fmt, OFF_STATION_TROTT_FEE } from '@/lib/escooter'
import { addDrop, DAKAR_SPOTS } from '@/lib/drops'

export const Route = createFileRoute('/termine-trottinette')({ component: TermineTrottinette })

function TermineTrottinette() {
  const nav = useNavigate()
  const minutes = typeof localStorage !== 'undefined' ? Number(localStorage.getItem('jef-last-minutes') ?? '5') : 5
  const baseCost = typeof localStorage !== 'undefined' ? Number(localStorage.getItem('jef-last-minute-cost') ?? String(minutes * 100)) : minutes * 100
  const formule = typeof localStorage !== 'undefined' ? localStorage.getItem('jef-trotti-formule') ?? 'libre' : 'libre'
  const isJournee = formule === 'journee'
  const [place, setPlace] = useState<'station' | 'outside'>(() => {
    if (typeof localStorage === 'undefined') return 'station'
    return (localStorage.getItem('jef-trotti-return') as 'station' | 'outside' | null) ?? 'station'
  })
  const isOutside = place === 'outside'
  const offFee = isOutside ? OFF_STATION_TROTT_FEE : 0
  // Total dû : minutes (si libre) + frais hors station éventuel
  const total = (isJournee ? 0 : baseCost) + offFee
  const storedDebt = typeof localStorage !== 'undefined' ? Number(localStorage.getItem('jef-debt') ?? String(total)) : total
  const paid = storedDebt === 0 && (typeof localStorage !== 'undefined' ? localStorage.getItem('jef-last-paid') !== null : false)
  const hh = Math.floor(minutes / 60); const mm = minutes % 60
  const duree = hh > 0 ? `${hh} h ${mm} min` : `${mm} min`
  const trottCode = typeof localStorage !== 'undefined' ? localStorage.getItem('jef-free-code') ?? 'E-Scoot' : 'E-Scoot'

  const choose = (v: 'station' | 'outside') => {
    setPlace(v)
    try {
      localStorage.setItem('jef-trotti-return', v)
      localStorage.setItem('jef-off-fee', String(v === 'outside' ? OFF_STATION_TROTT_FEE : 0))
      // recalcule la dette : minutes + éventuel hors-station
      const newDebt = (isJournee ? 0 : baseCost) + (v === 'outside' ? OFF_STATION_TROTT_FEE : 0)
      localStorage.setItem('jef-debt', String(newDebt))
      if (v === 'outside') {
        localStorage.setItem('jef-off-address', DAKAR_SPOTS[Math.floor(Math.random() * DAKAR_SPOTS.length)])
      }
    } catch { /* ignore */ }
  }

  const finishOutside = () => {
    try {
      const at = new Date().toISOString()
      const addr = localStorage.getItem('jef-off-address') ?? 'Rue 10 · Médina (position GPS)'
      // rend la trottinette visible sur la carte
      addDrop({ id: `drop-${Date.now()}`, code: trottCode, kind: 'trottinette', address: addr, battery: 60 + Math.floor(Math.random() * 30), at, lat: 14.685 + Math.random() * 0.03, lon: -17.465 + Math.random() * 0.03 })
      localStorage.setItem('jef-trotti-return', 'outside')
      localStorage.setItem('jef-ride-finished', at)
    } catch { /* ignore */ }
    nav({ to: '/facture-trottinette' })
  }

  const finishStation = () => {
    try {
      localStorage.setItem('jef-trotti-return', 'station')
      localStorage.setItem('jef-off-fee', '0')
      localStorage.setItem('jef-debt', String(isJournee ? 0 : baseCost))
      localStorage.setItem('jef-ride-finished', new Date().toISOString())
    } catch { /* ignore */ }
    if (!isJournee && baseCost > 0 && !paid) nav({ to: '/facture-trottinette' })
    else nav({ to: '/impact' })
  }

  return (
    <Phone>
      <BackHeader title="E-scooter" backTo="/trajet-trottinette" />
      <h1 className="px-5 pt-1 text-[30px] font-bold text-[#153D2C]">Trajet terminé</h1>
      <p className="px-5 pt-2 text-[14px] text-[#52695C]">
        {isJournee ? `${duree} · forfait journée déjà payé` : `${duree} · ${fmt(baseCost)} de minutes`}
        <br />Déverrouillage inclus · caution : 0 F CFA
      </p>

      <div className="px-5 pt-4">
        <p className="text-[14px] font-bold text-[#12211C]">Où tu la laisses ?</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button onClick={() => choose('station')} aria-pressed={!isOutside} className={`rounded-[16px] border p-3 text-left ${!isOutside ? 'border-[#1B4332] bg-[#EAF0E8]' : 'border-[#E0E8E0] bg-white'}`}>
            <span className="block text-[14px] font-bold text-[#12211C]">En station</span>
            <span className="block pt-1 text-[12px] text-[#63736B]">Gratuit · recharge solaire</span>
          </button>
          <button onClick={() => choose('outside')} aria-pressed={isOutside} className={`rounded-[16px] border p-3 text-left ${isOutside ? 'border-[#1B4332] bg-[#EAF0E8]' : 'border-[#E0E8E0] bg-white'}`}>
            <span className="block text-[14px] font-bold text-[#12211C]">Ici, dehors</span>
            <span className="block pt-1 text-[12px] text-[#63736B]">+ {fmt(OFF_STATION_TROTT_FEE)} · visible sur la carte</span>
          </button>
        </div>
        {isOutside ? (
          <div className="mt-2 rounded-[16px] bg-[#FFFBEB] p-3 text-[12px] leading-[18px] text-[#4A3A00]">
            Tu laisses la {trottCode} où tu es. Tu paies {fmt(OFF_STATION_TROTT_FEE)} de frais hors station, et en marquant « course terminée » elle devient visible sur la carte pour quelqu'un d'autre.
          </div>
        ) : (
          <p className="pt-2 text-[12px] text-[#52695C]">Dépose-la en station : Mermoz, Plateau, Grand Dakar ou Sacré-Cœur. C'est gratuit.</p>
        )}
      </div>

      <div className="mx-5 mt-4 rounded-[20px] border border-[#DFE7DE] bg-white p-4">
        <p className="text-[15px] font-bold text-[#153D2C]">Trottinette verrouillée</p>
        <p className="pt-1 text-[13px] text-[#52695C]">{isOutside ? 'Verrouillée dehors · position GPS enregistrée.' : 'Verrouillée en zone autorisée · Sacré-Cœur.'} Réf. TRO-0215.</p>
        <div className="mt-3 rounded-[14px] bg-[#F3F6F2] p-3 text-[13px] text-[#12211C]">
          <div className="flex justify-between"><span>Tu as roulé</span><span className="font-bold">{duree}</span></div>
          {!isJournee ? <div className="flex justify-between pt-1"><span>Minutes ({minutes} × 100 F)</span><span className="font-bold">{fmt(baseCost)}</span></div> : <div className="flex justify-between pt-1"><span>Forfait journée</span><span className="font-bold">Déjà payé</span></div>}
          <div className="flex justify-between pt-1"><span>Frais hors station</span><span className="font-bold">{offFee === 0 ? '0 F' : fmt(offFee)}</span></div>
          <div className="mt-2 flex justify-between border-t border-[#DDE5DF] pt-2"><span>À payer maintenant</span><span className="font-bold">{paid ? '0 F · payé ✓' : fmt(total)}</span></div>
        </div>
        {!isJournee && !paid ? (
          <p className="pt-2 text-[12px] font-bold text-[#832E25]">Tant que tu ne paies pas, tu ne pourras plus débloquer de trottinette ni de moto.</p>
        ) : null}
      </div>

      <div className="space-y-2 px-5 pb-6 pt-4">
        {isOutside ? (
          <button onClick={finishOutside} className="flex h-[54px] w-full items-center justify-center rounded-[18px] bg-[#1B4332] text-[15px] font-bold text-white">
            Marquer course terminée · {fmt(total)}
          </button>
        ) : (
          <>
            {!isJournee && !paid && total > 0 ? (
              <button onClick={finishStation} className="flex h-[54px] w-full items-center justify-center rounded-[18px] bg-[#1B4332] text-[15px] font-bold text-white">Payer {fmt(total)} et terminer</button>
            ) : (
              <button onClick={finishStation} className="flex h-[54px] w-full items-center justify-center rounded-[18px] bg-[#1B4332] text-[15px] font-bold text-white">Marquer course terminée</button>
            )}
          </>
        )}
        <Link to="/impact" className="flex h-[48px] items-center justify-center rounded-[18px] border border-[#1B4332] text-[14px] font-bold text-[#1B4332]">Voir mon impact</Link>
        <p className="text-center text-[11px] text-[#63736B]">{isOutside ? 'En terminant, la trottinette apparaît sur la carte « Trottinettes laissées dehors ».' : 'En station, pas de frais supplémentaires.'}</p>
      </div>
    </Phone>
  )
}
