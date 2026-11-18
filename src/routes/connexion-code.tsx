import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Phone } from '@/components/phone'
import { BackHeader } from './acces'

export const Route = createFileRoute('/connexion-code')({
  component: Code,
})

export function CodeBoxes({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const boxes = [0, 1, 2, 3, 4, 5]
  return (
    <div className="flex gap-[10px]">
      {boxes.map((i) => (
        <input
          key={i}
          value={value[i] ?? ''}
          inputMode="numeric"
          maxLength={1}
          onChange={(e) => {
            const d = e.target.value.replace(/\D/g, '').slice(-1)
            const next = (value + '      ').split('').slice(0, 6)
            next[i] = d
            onChange(next.join(''))
            if (d) {
              const el = document.getElementById(`code-${i + 1}`)
              el?.focus()
            }
          }}
          id={`code-${i}`}
          className="h-[60px] w-[50px] rounded-[14px] border-[1.5px] border-[#1B4332] bg-white text-center text-[24px] font-bold text-[#12211C] outline-none"
        />
      ))}
    </div>
  )
}

function Code() {
  const nav = useNavigate()
  const [code, setCode] = useState('')
  const [err, setErr] = useState('')
  const phone = typeof localStorage !== 'undefined' ? localStorage.getItem('jef-phone') ?? '+221 77 000 00 00' : ''
  return (
    <Phone scroll>
      <BackHeader title="E-scooter" onBack={() => nav({ to: '/connexion' })} />
      <h1 className="px-5 pt-1 text-[32px] font-bold leading-[40px] text-[#12211C]">Confirme l’accès</h1>
      <p className="px-5 pt-3 text-[16px] text-[#63736B]">Code de démonstration · aucun SMS réel envoyé.</p>
      <p className="px-5 pt-8 text-[10px] font-bold text-[#63736B]">CODE À 6 CHIFFRES</p>
      <div className="px-5 pt-2"><CodeBoxes value={code} onChange={setCode} /></div>
      <p className="px-5 pt-3 text-[13px] font-bold text-[#1C4434] underline">Renvoyer le code (0:45)</p>
      <p className="px-5 pt-3 text-center text-[12px] font-bold text-[#63736B]">Code de démo : 123456.</p>
      {err && <p className="px-5 pt-2 text-[13px] font-bold text-red-700">{err}</p>}
      <div className="flex flex-1 flex-col justify-end px-5 pb-6">
        <button
          onClick={() => {
            if (code !== '123456') { setErr('Code incorrect — utilise 123456 pour la démo.'); return }
            nav({ to: '/accueil' })
          }}
          className="flex h-[54px] w-full items-center rounded-[18px] bg-[#1B4332] pl-4 text-[14px] font-bold text-white"
        >
          Continuer vers l’accueil
        </button>
      </div>
    </Phone>
  )
}
