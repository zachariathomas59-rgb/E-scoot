import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Phone, BackHeader, BottomTabs, MAP_DAKAR, ICON_LIGHTNING, ICON_HELP, ICON_LOCK } from '@/components/phone'
import { fmt, TROTT_PER_MIN, TROTT_UNLOCK } from '@/lib/escooter'

export const Route = createFileRoute('/trajet-trottinette')({ component: TrajetTrottinette })

function pad(n: number) { return n < 10 ? `0${n}` : `${n}` }

function TrajetTrottinette() {
  const nav = useNavigate()
  const [now, setNow] = useState(() => Date.now())
  const start = typeof localStorage !== 'undefined' ? Number(localStorage.getItem('jef-ride-start') ?? String(Date.now())) : Date.now()
  const formule = typeof localStorage !== 'undefined' ? localStorage.getItem('jef-trotti-formule') ?? 'libre' : 'libre'
  const isJournee = formule === 'journee'

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  const secs = Math.max(0, Math.floor((now - start) / 1000))
  const hh = Math.floor(secs / 3600); const mm = Math.floor((secs % 3600) / 60); const ss = secs % 60
  const billedMin = Math.max(1, Math.ceil(secs / 60))
  const minuteCost = billedMin * TROTT_PER_MIN

  const endRide = () => {
    try {
      if (!isJournee) {
        localStorage.setItem('jef-last-minutes', String(billedMin))
        localStorage.setItem('jef-last-secs', String(secs))
        localStorage.setItem('jef-last-minute-cost', String(minuteCost))
        localStorage.setItem('jef-debt', String(minuteCost))
        localStorage.setItem('jef-debt-minutes', String(billedMin))
      } else {
        localStorage.setItem('jef-debt', '0')
        localStorage.setItem('jef-last-minutes', String(billedMin))
        localStorage.setItem('jef-last-minute-cost', '0')
      }
    } catch {}
    nav({ to: '/termine-trottinette' })
  }

  return (
    <Phone scroll tabbar={<BottomTabs active="trajets" />}>
      <BackHeader title="E-scooter" backTo="/accueil" />
      <h1 className="px-5 pt-1 text-[30px] font-bold text-[#153D2C]">Bon trajet !</h1>
      <p className="px-5 pt-2 text-[14px] text-[#52695C]">E-Scoot · {isJournee ? 'Forfait journée · illimité jusqu’à 22h' : 'Formule Libre · 100 F CFA / min'}</p>
      <div className="mx-5 mt-4 rounded-[24px] bg-[#1B4332] p-5">
        <p className="text-[11px] font-bold text-[#C5E84D]">TRAJET EN COURS</p>
        <p className="pt-1 text-[44px] font-bold leading-[55px] text-white">{pad(hh)}:{pad(mm)}:{pad(ss)}</p>
        <p className="pt-1 text-[15px] font-bold text-white">
          {isJournee ? 'Journée déjà payée · 0 F à la fin' : `Coût minutes · ${fmt(minuteCost)} (${billedMin} min)`}
        </p>
        {!isJournee ? <p className="pt-1 text-[12px] text-white/70">Déverrouillage {fmt(TROTT_UNLOCK)} déjà payé · à payer à la fin : {fmt(minuteCost)}</p> : null}
      </div>
      <div className="mx-5 mt-3 overflow-hidden rounded-[24px] border border-[#DDE5DF] bg-[#DBF0E3]">
        <div className="relative">
          <img src={MAP_DAKAR} alt="Dakar" className="h-[120px] w-full object-cover" />
          <p className="absolute bottom-2 left-3 rounded-full bg-white px-3 py-1 text-[10px] font-bold text-[#1B4332]">GPS · Sacré-Cœur · position simulée</p>
        </div>
      </div>
      <div className="mx-5 mt-3 rounded-[20px] border border-[#DFE7DE] bg-white p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#DBF0E3]"><img src={ICON_LIGHTNING} alt="" className="h-6 w-6 object-contain" /></span>
          <div><p className="text-[14px] font-bold text-[#153D2C]">Batterie · 80 % disponibles</p><p className="text-[12px] text-[#52695C]">Aucune recharge à faire : E-scooter s'en occupe.</p></div>
        </div>
      </div>
      <div className="mx-5 mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-[18px] border border-[#DDE5DF] bg-white p-3"><div className="flex items-center gap-2"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#DBF0E3]"><img src={ICON_LOCK} alt="" className="h-5 w-5 object-contain" /></span><p className="text-[13px] font-bold text-[#153D2C]">Verrouiller</p></div><p className="pt-1 text-[11px] text-[#52695C]">Véhicule déverrouillé</p></div>
        <Link to="/aide" className="rounded-[18px] border border-[#DDE5DF] bg-white p-3 text-[#12211C]"><div className="flex items-center gap-2"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#DBF0E3]"><img src={ICON_HELP} alt="" className="h-5 w-5 object-contain" /></span><p className="text-[13px] font-bold text-[#153D2C]">Aide</p></div><p className="pt-1 text-[11px] text-[#52695C]">Panne, accident</p></Link>
      </div>
      <p className="mx-5 pt-3 text-[12px] text-[#52695C]">Pour arrêter le compteur, gare-la dans une zone autorisée puis termine le trajet dans l'app. {isJournee ? '' : 'Tant que tu ne termines pas, les minutes continuent.'}</p>
      <div className="mx-5 flex gap-3 pb-6 pt-3">
        <button onClick={endRide} className="flex h-[48px] flex-1 items-center justify-center rounded-[18px] border border-[#BACBBE] text-[13px] font-bold text-[#1B4332]">Terminer le trajet dans l'app →</button>
        <Link to="/zones" className="flex h-[48px] flex-1 items-center justify-center rounded-[18px] bg-[#1B4332] text-[13px] font-bold text-white">Voir les parkings</Link>
      </div>
    </Phone>
  )
}
