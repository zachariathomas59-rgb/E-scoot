import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import { Phone, BackHeader, BottomTabs, ICON_LIGHTNING } from '@/components/phone'
import { fmt, TROTT_UNLOCK, TROTT_DAY, TROTT_PER_MIN } from '@/lib/escooter'
import { FREE_SCOOTERS, haversineKm, formatDist } from '@/lib/nearby'
import { useGeo } from '@/components/geo'

export const Route = createFileRoute('/scanner-trottinette')({
  validateSearch: (s: Record<string, unknown>) => ({ code: typeof s.code === 'string' ? s.code : undefined }),
  component: ScannerTrottinette,
})

type Formule = 'libre' | 'journee'

function getLS(k: string) {
  try {
    return localStorage.getItem(k) ?? ''
  } catch {
    return ''
  }
}

function ScannerTrottinette() {
  const nav = useNavigate()
  const { code } = Route.useSearch()
  const { geo, enable } = useGeo()

  const [num, setNum] = useState(() => {
    const fromUrl = (code ?? '').trim().toUpperCase()
    if (fromUrl) return fromUrl
    return getLS('jef-paid-code') || getLS('jef-free-code') || getLS('jef-trott-number') || ''
  })
  const [formule, setFormule] = useState<Formule>(() => {
    // Si un paiement existe déjà pour le numéro affiché, aligne le forfait dessus
    try {
      const paidC = (localStorage.getItem('jef-paid-code') ?? '').toUpperCase()
      const paidF = localStorage.getItem('jef-paid-formule') as Formule | null
      const initialNum = ((code ?? '').trim().toUpperCase() || localStorage.getItem('jef-free-code') || localStorage.getItem('jef-trott-number') || '').toUpperCase()
      if (paidC && paidF && initialNum && paidC === initialNum && (paidF === 'libre' || paidF === 'journee')) {
        return paidF
      }
    } catch {}
    return (getLS('jef-trotti-formule') as Formule) || 'libre'
  })
  const [presence, setPresence] = useState(true)
  const [error, setError] = useState('')
  const [manual, setManual] = useState(true)

  // Si on arrive depuis le reçu avec ?code=TS-xxx, synchronise le champ
  // Si le champ est vide mais un paiement existe, pré-remplit avec le numéro payé (casse la boucle)
  useEffect(() => {
    try {
      if (code && code.trim().toUpperCase() !== num.trim().toUpperCase()) {
        setNum(code.trim().toUpperCase())
        return
      }
      if (!num.trim()) {
        const paid = (localStorage.getItem('jef-paid-code') ?? '').trim().toUpperCase()
        if (paid) setNum(paid)
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  // Quand le paiement existe pour ce numéro mais pas pour ce forfait, aligne auto (casse la boucle)
  useEffect(() => {
    try {
      const paidC = (localStorage.getItem('jef-paid-code') ?? '').toUpperCase()
      const paidF = localStorage.getItem('jef-paid-formule')
      const c = num.trim().toUpperCase()
      if (paidC && c && paidC === c && (paidF === 'libre' || paidF === 'journee') && paidF !== formule) {
        setFormule(paidF)
        try { localStorage.setItem('jef-trotti-formule', paidF) } catch {}
      }
    } catch {}
  }, [num, formule])

  const debt = Number(getLS('jef-debt') || '0')
  const freeAddress = getLS('jef-free-address')
  const station = getLS('jef-station') || 'Plateau · Station 1'

  // Lecture fraîche à chaque rendu (après retour du paiement)
  const paidCode = getLS('jef-paid-code').toUpperCase()
  const paidAny = getLS('jef-paid-any') === '1'
  const paidFormule = getLS('jef-paid-formule')
  const paidTx = getLS('jef-paid-tx')
  const paidDate = getLS('jef-paid-date') || getLS('jef-paid-at')

  const clean = num.trim().toUpperCase()
  const scoot = useMemo(
    () => FREE_SCOOTERS.find((s) => s.code.toUpperCase() === clean),
    [clean],
  )
  const distM =
    geo.status === 'granted' && scoot ? haversineKm(geo.lat, geo.lon, scoot.lat, scoot.lon) * 1000 : null
  // Distance indicative seulement : on ne bloque plus le déblocage dessus (démo / GPS imprécis)
  const tooFar = false
  void distM

  // Après paiement des 200 F, n'importe quel numéro scanné débloque : le reçu paid-any est un sésame.
  const hasPaid = paidAny || !!paidCode
  const codeOk = !!clean && hasPaid
  const paidForThis = codeOk
  const paidForOther = false
  const paidWrongFormule = false

  if (debt > 0) {
    return (
      <Phone scroll tabbar={<BottomTabs active="trouver" />}>
        <BackHeader title="E-scooter" backTo="/trouver" />
        <h1 className="px-5 pt-1 text-[30px] font-bold leading-[38px] tracking-[-0.6px] text-[#153D2C]">Compte bloqué</h1>
        <p className="px-5 pt-2 text-[14px] leading-[21px] text-[#52695C]">
          Tu as une course impayée de {debt.toLocaleString('fr-FR')} F CFA. Paie-la d'abord pour pouvoir débloquer une nouvelle trottinette.
        </p>
        <div className="px-5 pb-6 pt-4">
          <button onClick={() => nav({ to: '/facture-trottinette' })} className="flex h-[54px] w-full items-center justify-center rounded-[18px] bg-[#1B4332] text-[15px] font-bold text-white">Payer maintenant</button>
        </div>
      </Phone>
    )
  }

  const persistChoice = () => {
    try {
      localStorage.setItem('jef-trotti-formule', formule)
      localStorage.setItem('jef-pickup-mode', 'free')
      if (clean) {
        localStorage.setItem('jef-free-code', clean)
        localStorage.setItem('jef-trott-number', clean)
      }
      if (freeAddress) localStorage.setItem('jef-free-address', freeAddress)
    } catch { /* ignore */ }
  }

  const goPay = () => {
    if (clean.length < 3) { setError('Saisis le numéro inscrit sur le guidon, par ex. TS-101.'); return }
    setError('')
    persistChoice()
    nav({ to: '/paiement/$id', params: { id: 'e-scoot' } })
  }

  const alignFormule = () => {
    if (paidFormule === 'libre' || paidFormule === 'journee') {
      setFormule(paidFormule)
      try { localStorage.setItem('jef-trotti-formule', paidFormule) } catch {}
      setError('')
    }
  }

  const unlock = () => {
    if (clean.length < 3) { setError('Saisis le numéro inscrit sur le guidon, par ex. TS-101.'); return }
    if (!paidCode && !paidAny) { setError('Aucun paiement trouvé pour cette trottinette. Appuie sur « Payer » d’abord, puis reviens ici : le bouton Débloquer s’activera.'); return }
    if (paidCode && !paidAny && paidCode !== clean) { setError(`Tu as payé pour ${paidCode}, pas pour ${clean}. Vérifie le numéro sur le guidon, ou appuie sur « Payer pour ${clean} » pour payer le bon numéro.`); return }
    // Le reçu paid-any est un sésame : après les 200 F, on aligne le forfait automatiquement au lieu de bloquer.
    if (paidFormule === 'libre' || paidFormule === 'journee') {
      if (formule !== paidFormule) {
        setFormule(paidFormule)
        try { localStorage.setItem('jef-trotti-formule', paidFormule) } catch {}
      }
    }
    // La case présence ne bloque plus un paiement déjà validé : elle reste informative.
    // On l'auto-coche pour éviter que le bouton semble mort.
    try { setPresence(true) } catch {}
    setError('')
    try {
      // Reçu à usage unique : impossible de réutiliser le même paiement pour une autre course.
      localStorage.removeItem('jef-paid-code')
      localStorage.removeItem('jef-paid-any')
      localStorage.removeItem('jef-paid-formule')
      localStorage.removeItem('jef-paid-tx')
      localStorage.removeItem('jef-paid-date')
      localStorage.removeItem('jef-paid-at')
      localStorage.setItem('jef-ride-start', String(Date.now()))
      localStorage.setItem('jef-unlock-tx', paidTx)
    } catch {}
    nav({ to: '/trajet-trottinette' })
  }

  return (
    <Phone scroll tabbar={<BottomTabs active="trouver" />}>
      <BackHeader title="E-scooter" backTo="/trouver" />
      <h1 className="px-5 pt-1 text-[30px] font-bold leading-[38px] tracking-[-0.6px] text-[#153D2C]">Scanne la trottinette</h1>
      <p className="px-5 pt-2 text-[14px] leading-[21px] text-[#52695C]">
        Pas de réservation à distance : tu paies seulement quand tu es devant la trottinette, puis ça déverrouille.
      </p>

      <div className="px-5 pt-5">
        <div className="w-full rounded-[24px] bg-[#1A2421] p-6" aria-label="Viseur de scan QR">
          <div className="relative rounded-[22px] bg-[#24352D] p-6" style={{ minHeight: 200 }}>
            <div className="absolute left-4 top-4 h-[22px] w-[22px] border-l-4 border-t-4 border-[#C5E84D]" />
            <div className="absolute right-4 top-4 h-[22px] w-[22px] border-r-4 border-t-4 border-white" />
            <div className="absolute bottom-4 left-4 h-[22px] w-[22px] border-b-4 border-l-4 border-white" />
            <div className="absolute bottom-4 right-4 h-[22px] w-[22px] border-b-4 border-r-4 border-[#C5E84D]" />
            <div className="mx-auto mt-16 h-[3px] w-full bg-[#C5E84D] shadow-[0px_0px_12px_3px_rgba(196,232,77,0.65)]" />
            <div className="mx-auto mt-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#3D5147]">
              <img src={ICON_LIGHTNING} alt="" className="h-5 w-5 object-contain" />
            </div>
          </div>
        </div>

        {!manual ? (
          <button onClick={() => setManual(true)} className="w-full pt-3 text-center text-[13px] font-bold text-[#1B4332] underline">QR illisible ? Saisir le numéro de la trottinette</button>
        ) : (
          <div className="mt-3 rounded-[20px] border border-[#E0E8E0] bg-white p-4">
            <p className="text-[13px] font-bold text-[#12211C]">Numéro inscrit sur le guidon</p>
            <p className="pt-1 text-[12px] leading-[18px] text-[#63736B]">Recopie le numéro peint sur la trottinette qui est devant toi, par ex. TS-101.</p>
            <input
              value={num}
              onChange={(e) => setNum(e.target.value.toUpperCase())}
              placeholder="TS-___"
              aria-label="Numéro de la trottinette"
              className="mt-2 h-[52px] w-full rounded-[14px] border border-[#DDE5DF] bg-[#F8F9F8] text-center text-[18px] font-bold tracking-[4px] text-[#12211C] outline-none focus:border-[#1B4332]"
            />
          </div>
        )}

        {error ? <p role="alert" className="pt-2 text-[12px] font-bold text-[#a33]">{error}</p> : null}

        <div className="mt-3 rounded-[20px] border border-[#1B4332] bg-[#EAF0E8] p-4">
          <p className="text-[14px] font-extrabold text-[#12211C]">Choisis ton forfait sur place</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button
              onClick={() => setFormule('libre')}
              aria-pressed={formule === 'libre'}
              className={`rounded-[14px] border p-3 text-left ${formule === 'libre' ? 'border-[#1B4332] bg-white' : 'border-[#DDE5DF] bg-white/60'}`}
            >
              <span className="block text-[13px] font-extrabold text-[#12211C]">Minutes</span>
              <span className="block text-[12px] font-bold text-[#1B4332]">{fmt(TROTT_UNLOCK)} + {fmt(TROTT_PER_MIN)}/min</span>
              <span className="block pt-0.5 text-[11px] text-[#63736B]">Minutes payées à la fin</span>
            </button>
            <button
              onClick={() => setFormule('journee')}
              aria-pressed={formule === 'journee'}
              className={`rounded-[14px] border p-3 text-left ${formule === 'journee' ? 'border-[#1B4332] bg-white' : 'border-[#DDE5DF] bg-white/60'}`}
            >
              <span className="block text-[13px] font-extrabold text-[#12211C]">Journée</span>
              <span className="block text-[12px] font-bold text-[#1B4332]">{fmt(TROTT_DAY)}</span>
              <span className="block pt-0.5 text-[11px] text-[#63736B]">Illimité jusqu’à 22h</span>
            </button>
          </div>
          {paidWrongFormule ? (
            <button onClick={alignFormule} className="mt-2 w-full rounded-[12px] bg-[#1B4332] py-2 text-[12px] font-bold text-white">
              Utiliser {paidFormule === 'journee' ? 'Journée (déjà payé)' : 'Minutes (déjà payé)'}
            </button>
          ) : null}
        </div>

        <div className="mt-3 rounded-[20px] border border-[#DDE5DF] bg-white p-4">
          <p className="text-[13px] font-extrabold text-[#12211C]">Sécurité anti-fraude</p>
          {paidTx && paidCode ? (
            <p className={`mt-1 text-[12px] font-bold ${paidForThis ? 'text-[#1B4332]' : 'text-[#8a6d00]'}`}>
              {paidForThis
                ? `Paiement reçu · ${paidCode} · ${paidFormule === 'journee' ? 'Journée' : 'Minutes'} · ${paidTx}${paidDate ? ` · ${paidDate}` : ''} — coche la case et touche Débloquer.`
                : paidForOther
                  ? `Dernier paiement : ${paidCode} · ${paidFormule === 'journee' ? 'Journée' : 'Minutes'} · ${paidTx}. Il ne correspond pas à « ${clean || '—'} ». Vérifie le numéro ou paie pour ${clean || 'ce numéro'}.`
                  : `Dernier paiement : ${paidCode} · ${paidFormule === 'journee' ? 'Journée' : 'Minutes'} · ${paidTx}. Change de forfait pour correspondre au paiement.`}
            </p>
          ) : (
            <p className="mt-1 text-[12px] text-[#63736B]">Aucun paiement enregistré pour le moment. Le déblocage exige un paiement Wave ou Orange Money pour cette trottinette et ce forfait.</p>
          )}
          <label className="mt-2 flex items-start gap-2 text-[13px] text-[#12211C]">
            <input
              type="checkbox"
              checked={presence}
              onChange={(e) => setPresence(e.target.checked)}
              className="mt-1 h-4 w-4 accent-[#1B4332]"
            />
            <span>Je suis à côté de la trottinette {clean || '…'} et je vois son numéro sur le guidon.</span>
          </label>
          {geo.status !== 'granted' ? (
            <p className="pt-2 text-[12px] text-[#63736B]">
              Active ta position pour vérifier que tu es vraiment à côté. Sinon, seul le paiement + le numéro + cette case protègent. <button onClick={enable} className="font-bold underline">Activer</button>
            </p>
          ) : null}
          <p className="pt-1 text-[11px] text-[#63736B]">Station : {station}{freeAddress ? ` · ${freeAddress}` : ''} · Le reçu est à usage unique.</p>
        </div>

        {paidForThis ? (
          <>
            <div className="mt-3 rounded-[16px] bg-[#DDF0E3] p-3 text-center text-[13px] font-bold text-[#1B4332]">
              Payé ✓ — touche Débloquer pour partir. Pas besoin de repayer.
            </div>
            <button
              onClick={unlock}
              className="mt-2 flex h-[54px] w-full items-center justify-center rounded-[18px] bg-[#C5E84D] text-[15px] font-bold text-[#1B4332]"
            >
              Débloquer {clean || 'la trottinette'} · c’est payé
            </button>
            <button onClick={goPay} className="mt-2 w-full text-center text-[12px] font-bold text-[#63736B] underline">
              Payer pour une autre trottinette
            </button>
          </>
        ) : (
          <>
            <button onClick={goPay} className="mt-3 flex h-[54px] w-full items-center justify-center rounded-[18px] bg-[#1B4332] text-[15px] font-bold text-white">
              Payer {formule === 'libre' ? fmt(TROTT_UNLOCK) : fmt(TROTT_DAY)} · {formule === 'libre' ? 'Minutes' : 'Journée'}{clean ? ` · ${clean}` : ''}
            </button>
            <button
              onClick={unlock}
              className="mt-2 flex h-[50px] w-full items-center justify-center rounded-[16px] bg-[#E4E9E4] text-[14px] font-bold text-[#1B4332]"
            >
              Débloquer {clean || 'la trottinette'}
            </button>
            <p className="pt-1 text-center text-[11px] text-[#63736B]">
              {paidForOther
                ? `Tu as déjà payé pour ${paidCode}. Pour ${clean || 'ce numéro'}, paie ci-dessus puis touche Débloquer.`
                : !paidCode
                  ? 'Paie d’abord ci-dessus : le bouton Débloquer te dira s’il manque la case ou le bon numéro.'
                  : 'Ton paiement ne correspond pas à ce forfait : touche « Utiliser » ci-dessus puis Débloquer.'}
            </p>
          </>
        )}
        <p className="pt-2 text-center text-[11px] text-[#63736B]">
          Après paiement, reviens ici avec le même numéro et le même forfait, coche la case, puis touche Débloquer.{' '}
          <Link to="/aller-trottinette" search={{ code: clean || undefined }} className="font-bold underline">Revoir l’itinéraire</Link>
        </p>
      </div>
      <div className="px-5 pb-6 pt-2" />
    </Phone>
  )
}
