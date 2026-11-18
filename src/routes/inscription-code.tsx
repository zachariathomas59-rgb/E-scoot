import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Phone } from '@/components/phone'
import { BackHeader } from './acces'
import { DEMO_CODE, prettyPhone } from '@/lib/escooter'

export const Route = createFileRoute('/inscription-code')({
  component: Code,
})

function Code() {
  const nav = useNavigate()
  const [digits, setDigits] = useState(['1', '2', '3', '4', '5', '6'])
  const [phone, setPhone] = useState('')
  const [err, setErr] = useState('')
  useEffect(() => { setPhone(localStorage.getItem('jef-phone') || '+221770000000') }, [])
  return (
    <Phone>
      <BackHeader title="E-scooter" onBack={() => nav({ to: '/inscription-telephone' })} />
      <h1 className="px-5 pt-1 text-[32px] font-bold leading-[40px] text-[#12211C]">Vérifie ton numéro</h1>
      <p className="px-5 pt-3 text-[16px] text-[#63736B]">Saisis le code à 6 chiffres envoyé au {prettyPhone(phone)}.</p>
      <div className="px-5 pt-6">
        <p className="text-[10px] font-bold text-[#63736B]">CODE À 6 CHIFFRES</p>
        <div className="flex gap-[10px] pt-2">
          {digits.map((d, i) => (
            <input
              key={i}
              value={d}
              maxLength={1}
              inputMode="numeric"
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, '').slice(-1)
                const next = [...digits]
                next[i] = v
                setDigits(next)
                if (v && i < 5) document.getElementById(`code-${i + 1}`)?.focus()
              }}
              id={`code-${i}`}
              className="flex h-[60px] w-[50px] items-center justify-center rounded-[14px] border-[1.5px] border-[#1B4332] bg-white text-center text-[24px] font-bold text-[#12211C] outline-none"
            />
          ))}
        </div>
        <p className="pt-4 text-[13px] font-bold text-[#63736B] underline">Renvoyer le code (0:45)</p>
        {err ? <p className="pt-2 text-[13px] font-bold text-red-700">{err}</p> : <p className="pt-4 text-center text-[12px] font-bold text-[#63736B]">Code de démo : 123456 · aucun SMS réel envoyé.</p>}
        <button onClick={() => nav({ to: '/inscription-telephone' })} className="pt-3 text-[13px] font-bold text-[#1B4332] underline">Modifier le numéro</button>
      </div>
      <div className="mt-auto px-5 pb-6 pt-6">
        <button
          onClick={() => {
            if (digits.join('') !== DEMO_CODE) { setErr('Code incorrect. Utilise le code démo 123456.'); return }
            nav({ to: '/inscription-profil' })
          }}
          className="flex h-[54px] w-full items-center rounded-[18px] bg-[#1B4332] pl-4 text-[14px] font-bold text-white"
        >
          Valider le code
        </button>
      </div>
    </Phone>
  )
}
