import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Phone } from '@/components/phone'
import { BackHeader } from './acces'
import { vehicleById } from '@/lib/escooter'

export const Route = createFileRoute('/documents/$id')({
  component: Docs,
})

function Docs() {
  const { id } = Route.useParams()
  const nav = useNavigate()
  const v = vehicleById(id)
  const [permis, setPermis] = useState(true)
  const [cni, setCni] = useState(true)
  return (
    <Phone scroll>
      <BackHeader title="E-scooter" onBack={() => nav({ to: '/reservation/$id', params: { id } })} />
      <h1 className="px-5 pt-1 text-[28px] font-bold text-[#12211C]">Tes documents</h1>
      <p className="px-5 text-[14px] text-[#63736B]">Pour {v.name} · permis requis pour les motos.</p>
      <div className="px-5 pt-4 space-y-3">
        <button onClick={() => setPermis(!permis)} className={`flex w-full items-center gap-3 rounded-[16px] border p-4 text-left ${permis ? 'border-[#1B4332] bg-[#EAF0E8]' : 'border-[#E0E8E0] bg-white'}`}>
          <span className={`flex h-6 w-6 items-center justify-center rounded-[6px] ${permis ? 'bg-[#1B4332] text-white' : 'border border-[#9BAA9F]'}`}>{permis ? '✓' : ''}</span>
          <span><span className="block text-[14px] font-bold">Permis de conduire</span><span className="text-[12px] text-[#63736B]">Photo lisible recto-verso</span></span>
        </button>
        <button onClick={() => setCni(!cni)} className={`flex w-full items-center gap-3 rounded-[16px] border p-4 text-left ${cni ? 'border-[#1B4332] bg-[#EAF0E8]' : 'border-[#E0E8E0] bg-white'}`}>
          <span className={`flex h-6 w-6 items-center justify-center rounded-[6px] ${cni ? 'bg-[#1B4332] text-white' : 'border border-[#9BAA9F]'}`}>{cni ? '✓' : ''}</span>
          <span><span className="block text-[14px] font-bold">Pièce d’identité</span><span className="text-[12px] text-[#63736B]">CNI ou passeport</span></span>
        </button>
        <p className="text-[12px] text-[#63736B]">Démo : aucune vérification réelle, coche pour continuer.</p>
      </div>
      <div className="flex flex-1 flex-col justify-end px-5 pb-6">
        <button onClick={() => nav({ to: '/paiement/$id', params: { id } })} className="flex h-[54px] items-center rounded-[18px] bg-[#1B4332] pl-4 text-[14px] font-bold text-white">Continuer vers le paiement</button>
      </div>
    </Phone>
  )
}
