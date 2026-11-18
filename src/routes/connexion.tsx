import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Phone } from '@/components/phone'
import { BackHeader } from './acces'

export const Route = createFileRoute('/connexion')({
  component: Connexion,
})

function Connexion() {
  const nav = useNavigate()
  const [phone, setPhone] = useState('')
  const [err, setErr] = useState('')
  return (
    <Phone scroll>
      <BackHeader title="E-scooter" onBack={() => nav({ to: '/acces' })} />
      <h1 className="px-5 pt-1 text-[32px] font-bold leading-[40px] text-[#12211C]">Se connecter</h1>
      <p className="px-5 pt-3 text-[16px] text-[#63736B]">Entre ton numéro pour recevoir un code de connexion.</p>
      <div className="px-5 pt-8">
        <label className="text-[10px] font-bold text-[#63736B]">TÉLÉPHONE</label>
        <div className="mt-2 flex h-[52px] items-center rounded-[20px] border border-[#E0E8E0] bg-white px-4">
          <span className="text-[14px] font-medium text-[#12211C]">+221&nbsp;</span>
          <input value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^\d ]/g, ''))} placeholder="77 XXX XX XX" className="w-full bg-transparent text-[14px] font-medium outline-none placeholder:text-[#12211C]" />
        </div>
      </div>
      {err && <p className="px-5 pt-3 text-[13px] font-bold text-red-700">{err}</p>}
      <div className="flex flex-1 flex-col justify-end px-5 pb-6">
        <button
          onClick={() => {
            const digits = phone.replace(/\D/g, '')
            if (digits.length < 9) { setErr('Entre un numéro valide à 9 chiffres.'); return }
            localStorage.setItem('jef-phone', '+221 ' + phone.trim())
            nav({ to: '/connexion-code' })
          }}
          className="flex h-[54px] w-full items-center rounded-[18px] bg-[#1B4332] pl-4 text-[14px] font-bold text-white"
        >
          Recevoir le code
        </button>
      </div>
    </Phone>
  )
}
