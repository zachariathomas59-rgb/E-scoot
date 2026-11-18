import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Phone } from '@/components/phone'
import { BackHeader } from './acces'
import { createProfile } from '@/server/escooter'
import { Check } from 'lucide-react'
import { useAction } from '@/lib/actions'

export const Route = createFileRoute('/inscription-profil')({
  component: Profil,
})

const ROLES = [
  { id: 'livreur', t: 'Livreur', d: 'Louer une moto pour mes livraisons' },
  { id: 'etudiant', t: 'Étudiant', d: 'Rouler en trottinette, sans permis' },
  { id: 'travailleur', t: 'Travailleur', d: 'Louer une moto pour aller au travail' },
]

function Profil() {
  const nav = useNavigate()
  const [role, setRole] = useState('livreur')
  const [name, setName] = useState('Mamadou Diop')
  const [zone, setZone] = useState('Dakar et sa banlieue')
  const save = useAction(
    async () => {
      const nm = name.trim()
      if (nm.length < 2) throw new Error('Indique ton nom complet.')
      const phone = typeof localStorage !== 'undefined' ? (localStorage.getItem('jef-phone') || '') : ''
      return await createProfile({ data: { phone, name: nm, accountType: role, area: zone.trim() } })
    },
    {
      refresh: false,
      onSuccess: () => {
        try { localStorage.setItem('jef-name', name.trim()) } catch { /* stockage indisponible */ }
        nav({ to: '/accueil' })
      },
    },
  )
  return (
    <Phone scroll>
      <BackHeader title="E-scooter" onBack={() => nav({ to: '/inscription-code' })} />
      <h1 className="px-5 pt-1 text-[32px] font-bold leading-[40px] text-[#12211C]">Ton profil</h1>
      <p className="px-5 pt-3 text-[16px] text-[#63736B]">Une expérience adaptée à tes déplacements.</p>
      <p className="px-5 pt-6 text-[11px] font-bold text-[#53685D]">JE SUIS…</p>
      <div className="space-y-3 px-5 pt-2">
        {ROLES.map((r) => {
          const active = role === r.id
          return (
            <button key={r.id} onClick={() => setRole(r.id)} className={`w-full rounded-[16px] p-4 text-left ${active ? 'border-[1.5px] border-[#1B4332] bg-[#EAF0E8]' : ''}`}>
              <span className="flex items-start justify-between gap-3">
                <span>
                  <span className="block text-[15px] font-bold text-[#1B4332]">{r.t}</span>
                  <span className="block pt-1 text-[12px] font-medium text-[#53685D]">{r.d}</span>
                </span>
                {active ? <Check size={24} className="text-[#1B4332]" /> : <span className="mt-1 h-[18px] w-[18px] rounded-full border border-[#9BAA9F]" />}
              </span>
            </button>
          )
        })}
      </div>
      <div className="px-5 pt-5">
        <label className="text-[10px] font-bold text-[#63736B]">NOM COMPLET</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 h-[52px] w-full rounded-[20px] border border-[#E0E8E0] bg-white px-4 text-[14px] font-medium outline-none" />
      </div>
      <div className="px-5 pt-4">
        <label className="text-[10px] font-bold text-[#63736B]">ZONE DE DÉPLACEMENT</label>
        <input value={zone} onChange={(e) => setZone(e.target.value)} className="mt-2 h-[52px] w-full rounded-[20px] border border-[#E0E8E0] bg-white px-4 text-[14px] font-medium outline-none" />
      </div>
      <p className="px-5 pt-4 text-[12px] font-medium text-[#53685D]">Tu peux modifier ton profil dans Compte.</p>
      {save.error && <p className="px-5 pt-2 text-[13px] font-bold text-red-700">{save.error}</p>}
      <div className="px-5 pb-6 pt-6">
        <button
          onClick={() => save.run()}
          className="flex h-[54px] w-full items-center rounded-[18px] bg-[#1B4332] pl-4 text-[14px] font-bold text-white"
        >
          {save.pending ? 'Création…' : 'Créer mon profil'}
        </button>
      </div>
    </Phone>
  )
}
