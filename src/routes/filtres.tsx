import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Phone } from '@/components/phone'
import { BackHeader } from './acces'

export const Route = createFileRoute('/filtres')({
  component: Filtres,
})

function Filtres() {
  const nav = useNavigate()
  const [opts, setOpts] = useState({ autonomie: true, casque: true, solaire: true, zone: true, moto: true, trotti: true })
  const t = (k: keyof typeof opts) => setOpts((o) => ({ ...o, [k]: !o[k] }))
  const row = (k: keyof typeof opts, label: string) => (
    <button onClick={() => t(k)} className="flex w-full items-center gap-3 border-b border-[#DDE5DF] py-4 text-left">
      <span className={`flex h-5 w-5 items-center justify-center rounded-[5px] ${opts[k] ? 'bg-[#1B4332] text-white' : 'border border-[#9BAA9F] bg-white'}`}>{opts[k] ? '✓' : ''}</span>
      <span className="text-[13px] text-[#12211C]">{label}</span>
    </button>
  )
  return (
    <Phone scroll>
      <BackHeader title="E-scooter" onBack={() => nav({ to: '/trouver', search: { type: 'tous' } })} />
      <h1 className="px-5 pt-1 text-[30px] font-bold text-[#12211C]">Affiner la recherche</h1>
      <p className="px-5 text-[15px] text-[#63736B]">Choisis ce qui compte pour ta tournée.</p>
      <div className="px-5 pt-4">
        {row('autonomie', 'Autonomie disponible dans l’app')}
        {row('casque', 'Casque inclus')}
        {row('solaire', 'Recharge solaire en station')}
        {row('zone', 'Retrait dans une zone')}
        <p className="pt-4 text-[15px] font-bold text-[#14231C]">Moto ou trottinette</p>
        {row('moto', 'Moto')}
        {row('trotti', 'Trottinette')}
      </div>
      <div className="flex flex-1 flex-col justify-end px-5 pb-6">
        <Link to="/trouver" search={{ type: opts.moto && !opts.trotti ? 'moto' : !opts.moto && opts.trotti ? 'trottinette' : 'tous' }} className="flex h-[54px] items-center rounded-[18px] bg-[#1B4332] pl-4 text-[14px] font-bold text-white">Afficher les résultats</Link>
      </div>
    </Phone>
  )
}
