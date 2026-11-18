import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Phone, TopBar, WAVE_REAL } from '@/components/phone'
import { fmt, TROTT_UNLOCK, TROTT_DAY } from '@/lib/escooter'

export const Route = createFileRoute('/wave/$id')({
  component: Wave,
})

function Wave() {
  const { id } = Route.useParams()
  const nav = useNavigate()
  const days = Number(typeof localStorage !== 'undefined' ? localStorage.getItem('jef-days') ?? '1' : '1')
  const isTrott = id === 'e-scoot'
  const formule = typeof localStorage !== 'undefined' ? localStorage.getItem('jef-trotti-formule') ?? 'libre' : 'libre'
  const isJournee = isTrott && formule === 'journee'
  const total = isTrott ? (isJournee ? TROTT_DAY : TROTT_UNLOCK) : 20000 * days
  const ref = typeof localStorage !== 'undefined' ? localStorage.getItem('jef-ref') ?? 'JEF-0427' : 'JEF-0427'
  const [ok, setOk] = useState(true)
  return (
    <Phone scroll>
      <div className="bg-[#F8F9F8] px-[22px] pt-[9px] pb-[8px] text-[11px] font-bold leading-[14px] text-[#12211C]">9:41</div>
      <TopBar backTo={id ? `/paiement/${id}` : '/trouver'} />
      <h1 className="px-5 pt-2 text-[32px] font-bold leading-[40px] text-[#12211C]">Confirme ton moyen de paiement</h1>
      <p className="px-5 pt-3 text-[16px] leading-[20px] text-[#63736B]">
        Paiement mobile avec Wave (version démo : aucun débit réel).<br />
        {isTrott && !isJournee ? `Tu paies ${fmt(TROTT_UNLOCK)} (déverrouillage). Les minutes seront payées à la fin du trajet.` : 'Tu seras redirigé vers la confirmation.'}
      </p>
      <div className="flex items-center gap-3 px-5 pt-6">
        <span className="flex h-[46px] w-[46px] items-center justify-center overflow-hidden rounded-full bg-white border border-[#E3E9E3]">
          <img src={WAVE_REAL} alt="Wave" className="h-[42px] w-[42px] rounded-full object-contain" />
        </span>
        <span>
          <span className="block text-[14px] font-bold leading-[18px] text-[#12211C]">Wave</span>
          <span className="block pt-1 text-[14px] font-medium leading-[18px] text-[#12211C]">+221 77 000 00 00</span>
        </span>
      </div>
      <div className="mx-5 mt-8 flex items-center justify-between border-b border-[#E3E9E3] pb-5">
        <span className="text-[14px] font-medium text-[#12211C]">Montant</span>
        <span className="text-[14px] font-bold text-[#12211C]">{fmt(total)}</span>
      </div>
      <div className="mx-5 mt-5 flex items-center justify-between border-b border-[#E3E9E3] pb-5">
        <span className="text-[14px] font-medium text-[#12211C]">Référence</span>
        <span className="text-[14px] font-bold text-[#12211C]">{ref}</span>
      </div>
      <div className="mx-5 mt-5 flex items-center justify-between border-b border-[#E3E9E3] pb-5">
        <span className="text-[14px] font-medium text-[#12211C]">Version démo</span>
        <span className="text-[14px] font-bold text-[#12211C]">Aucun débit réel</span>
      </div>
      <div className="flex flex-1 flex-col justify-end px-5 pb-6 pt-10">
        <button
          onClick={() => {
            if (ok) {
              try {
                localStorage.setItem('jef-pay-method', 'wave')
                const tx = `WAVE-${ref.replace(/\D/g, '').slice(-4) || '2520'}-${Math.floor(1000 + Math.random() * 9000)}`
                const d = new Date().toLocaleString('fr-FR')
                localStorage.setItem('jef-tx', tx)
                localStorage.setItem('jef-pay-date', d)
                if (isTrott) {
                  const rawFree = (localStorage.getItem('jef-free-code') ?? '').trim().toUpperCase()
                  const rawNum = (localStorage.getItem('jef-trott-number') ?? '').trim().toUpperCase()
                  const paidCode = rawFree || rawNum || 'TS-101'
                  // Reçu à usage unique : on garde TOUJOURS une preuve de paiement.
                  // paid-any = sésame qui accepte n'importe quel numéro scanné après.
                  // On mémorise aussi le numéro pour pré-remplir le scanner (casse la boucle).
                  localStorage.setItem('jef-paid-any', '1')
                  localStorage.setItem('jef-paid-code', paidCode)
                  localStorage.setItem('jef-free-code', paidCode)
                  localStorage.setItem('jef-trott-number', paidCode)
                  localStorage.setItem('jef-paid-formule', formule)
                  localStorage.setItem('jef-trotti-formule', formule)
                  localStorage.setItem('jef-paid-tx', tx)
                  localStorage.setItem('jef-paid-date', d)
                  localStorage.setItem('jef-paid-at', String(Date.now()))
                }
              } catch {}
              nav({ to: '/confirmee/$id', params: { id } })
            } else nav({ to: '/paiement-echec' })
          }}
          className="flex h-[54px] items-center justify-center rounded-[18px] bg-[#1B4332] text-[14px] font-bold text-white"
        >
          Payer avec Wave (démo)
        </button>
        <button onClick={() => setOk(!ok)} className="pt-3 text-center text-[12px] font-bold text-[#63736B]">
          {ok ? 'Voir le cas « paiement échoué » ?' : 'Revenir au cas « paiement réussi » ?'}
        </button>
      </div>
    </Phone>
  )
}
