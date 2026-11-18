import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Phone } from '@/components/phone'
import { BackHeader } from './acces'
import { normalizePhone } from '@/lib/escooter'

export const Route = createFileRoute('/inscription-telephone')({
  component: Tel,
})

function Tel() {
  const nav = useNavigate()
  const [num, setNum] = useState('77 000 00 00')
  const [err, setErr] = useState('')
  return (
    <Phone>
      <BackHeader title="E-scooter" onBack={() => nav({ to: '/acces' })} />
      <h1 className="px-5 pt-1 text-[32px] font-bold leading-[40px] text-[#12211C]">Créer un compte</h1>
      <p className="px-5 pt-3 text-[16px] text-[#63736B]">Commence avec ton numéro, puis choisis ton profil.</p>
      <div className="px-5 pt-8">
        <label className="text-[10px] font-bold tracking-wide text-[#63736B]">TÉLÉPHONE</label>
        <div className="mt-2 flex h-[52px] items-center gap-2 rounded-[20px] border border-[#E0E8E0] bg-white px-2">
          <span className="flex items-center gap-1 rounded-[12px] bg-[#DBF0E3] px-2 py-2 text-[12px] font-bold text-[#1B4332]">
            <svg width="24" height="16" viewBox="0 0 24 16"><rect width="8" height="16" fill="#00853F"/><rect x="8" width="8" height="16" fill="#FDEF42"/><rect x="16" width="8" height="16" fill="#E31B23"/><path d="M12 5l.9 1.9 2.1.3-1.5 1.5.35 2.1L12 9.8l-1.85 1 .35-2.1-1.5-1.5 2.1-.3z" fill="#00853F"/></svg>
            +221
          </span>
          <input value={num} onChange={(e) => setNum(e.target.value)} inputMode="tel" placeholder="77 000 00 00" className="w-full bg-transparent text-[14px] font-medium text-[#12211C] outline-none" />
        </div>
        {err ? <p className="pt-2 text-[13px] font-bold text-red-700">{err}</p> : <p className="pt-2 text-[12px] text-[#63736B]">Nous t’enverrons un code de vérification par SMS.</p>}
        <p className="pt-24 text-center text-[11px] text-[#63736B]">En continuant, tu acceptes les conditions d’utilisation et la politique de confidentialité.</p>
      </div>
      <div className="mt-auto px-5 pb-6 pt-6">
        <button
          onClick={() => {
            const p = normalizePhone(num)
            if (!/^\+221\d{9}$/.test(p)) { setErr('Numéro invalide : 9 chiffres après +221, ex. 77 000 00 00.'); return }
            localStorage.setItem('jef-phone', p)
            localStorage.setItem('jef-mode', 'inscription')
            nav({ to: '/inscription-code' })
          }}
          className="flex h-[54px] w-full items-center rounded-[18px] bg-[#1B4332] pl-4 text-[14px] font-bold text-white"
        >
          Continuer
        </button>
      </div>
    </Phone>
  )
}
