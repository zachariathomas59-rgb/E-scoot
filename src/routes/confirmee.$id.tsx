import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Phone, WAVE_REAL, OM_REAL } from '@/components/phone'
import { vehicleById, fmt, TROTT_UNLOCK, TROTT_PER_MIN, TROTT_DAY } from '@/lib/escooter'
import { STATIONS } from '@/lib/nearby'

export const Route = createFileRoute('/confirmee/$id')({
  component: Done,
})

function getStore(k: string, fallback: string) {
  if (typeof localStorage === 'undefined') return fallback
  return localStorage.getItem(k) ?? fallback
}

function Done() {
  const { id } = Route.useParams()
  const v = vehicleById(id)
  const isTrott = id === 'e-scoot' || v.type === 'trottinette'
  const days = Number(getStore('jef-days', '1'))
  const slot = getStore('jef-slot', 'Aujourd’hui · 10:00')
  const station = getStore('jef-station', 'Plateau · Station 1')
  const pickupMode = getStore('jef-pickup-mode', 'station')
  const freeCode = getStore('jef-free-code', '')
  const paidScanCode = getStore('jef-paid-code', '')
  const trottNumCode = getStore('jef-trott-number', '')
  const effCode = freeCode || paidScanCode || trottNumCode
  const freeAddress = getStore('jef-free-address', '')
  const freeBattery = getStore('jef-free-battery', '80')
  const isFree = isTrott && pickupMode === 'free' && !!freeCode
  const method = getStore('jef-pay-method', 'wave')
  const stationIdStored = getStore('jef-station-id', '')
  const stationEntry = STATIONS.find((s) => s.id === stationIdStored || s.name === station) ?? STATIONS[1]
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${stationEntry.lat},${stationEntry.lon}`
  const formule = getStore('jef-trotti-formule', 'libre')
  const isJournee = isTrott && formule === 'journee'

  const [ref] = useState(() => {
    if (typeof localStorage === 'undefined') return 'JEF-2520'
    const cur = localStorage.getItem('jef-ref')
    if (cur) return cur
    const n = `JEF-${Math.floor(1000 + Math.random() * 9000)}`
    localStorage.setItem('jef-ref', n)
    localStorage.setItem('jef-vehicle', v.name)
    return n
  })
  const [tx] = useState(() => {
    if (typeof localStorage === 'undefined') return method === 'orange' ? 'OM-000000' : 'WV-000000'
    const cur = localStorage.getItem('jef-tx')
    if (cur) return cur
    const prefix = method === 'orange' ? 'OM' : method === 'especes' ? 'ESP' : 'WV'
    const n = `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`
    localStorage.setItem('jef-tx', n)
    localStorage.setItem('jef-pay-date', new Date().toLocaleString('fr-FR'))
    return n
  })
  const payDate = getStore('jef-pay-date', new Date().toLocaleString('fr-FR'))
  const total = isTrott ? (isJournee ? TROTT_DAY : TROTT_UNLOCK) : v.perDay * days

  const methodLabel = method === 'orange' ? 'Orange Money' : method === 'especes' ? 'Espèces au retrait' : 'Wave'
  const methodImg = method === 'orange' ? OM_REAL : method === 'especes' ? null : WAVE_REAL
  const methodColor = method === 'orange' ? '#FF7900' : method === 'especes' ? '#1B4332' : '#1B4DD8'
  const methodLetter = method === 'orange' ? 'OM' : method === 'especes' ? '₣' : 'W'

  if (isTrott) {
    return (
      <Phone scroll>
        <div className="flex min-h-full flex-col bg-[#1B4332] px-6 pb-6 pt-10 text-white">
          <div className="flex items-center gap-2">
            <img src="https://files.monstarx.app/0svp0dutvg/public/design/img-e027fcfad97ad412.jpg" alt="" className="h-8 w-6 object-cover" />
            <span className="text-[18px] font-bold">E-scooter</span>
          </div>
          <div className="mx-auto mt-8 flex h-[110px] w-[110px] items-center justify-center rounded-full bg-[#C5E84D] text-4xl text-[#1B4332]">✓</div>
          <h1 className="pt-6 text-center text-[28px] font-extrabold">{isJournee ? 'Forfait journée payé !' : 'Déverrouillage payé !'}</h1>
          <p className="pt-2 text-center text-[14px] text-white/85">
            {isFree
              ? (isJournee
                ? `Va directement à la trottinette ${freeCode} garée à ${freeAddress}. Pas besoin de passer en station : ouvre « Scanner » sur place et vise le QR sur le guidon. Forfait valable jusqu’à 22h.`
                : `Va directement à la trottinette ${freeCode} garée à ${freeAddress}. Pas besoin de passer en station : ouvre « Scanner » sur place et vise le QR sur le guidon. Le compteur démarre au déblocage.`)
              : (isJournee
              ? 'Va à la station, montre ce reçu, puis appuie sur « Scanner » et pointe la caméra vers le QR code collé sur le guidon. Forfait valable jusqu’à 22h.'
              : 'Va à la station, montre ce reçu, puis appuie sur « Scanner » et pointe la caméra vers le QR code collé sur le guidon. Le compteur démarre au déblocage.')}
          </p>
          <div className="mt-6 rounded-[20px] bg-white p-4 text-center">
            <p className="text-[11px] font-bold tracking-wide text-[#63736B]">{isFree ? 'CODE À SCANNER SUR PLACE' : 'RÉFÉRENCE À MONTRER À LA STATION'}</p>
            <p className="pt-1 text-[30px] font-extrabold tracking-[2px] text-[#12211C]">{isFree ? freeCode : ref}</p>
            <p className="text-[12px] text-[#63736B]">{isFree ? `${freeAddress} · Batterie ${freeBattery} % · ${isJournee ? 'Journée' : 'Libre'}` : `${station} · ${isJournee ? 'Journée' : 'Libre'}`}</p>
          </div>
          <div className="mt-3 rounded-[20px] bg-white p-4 text-[#12211C]">
            <div className="flex items-center gap-3">
              {methodImg ? (
                <img src={methodImg} alt={methodLabel} className="h-[44px] w-[44px] shrink-0 rounded-full border border-[#E3E9E3] bg-white object-contain" />
              ) : (
                <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[#1B4332] text-[18px] font-extrabold text-white">₣</span>
              )}
              <div>
                <p className="text-[14px] font-bold">Reçu {methodLabel}</p>
                <p className="text-[12px] text-[#63736B]">Transaction {tx} · {payDate}</p>
              </div>
              <span className="ml-auto rounded-full bg-[#DDF0E3] px-2 py-1 text-[11px] font-bold text-[#1B4332]">Payé</span>
            </div>
            <div className="mt-3 space-y-1 border-t border-[#E3E9E3] pt-3 text-[13px]">
              <div className="flex justify-between"><span className="text-[#63736B]">{isJournee ? 'Forfait journée payé' : 'Déverrouillage payé'}</span><span className="font-bold">{fmt(total)}</span></div>
              <div className="flex justify-between"><span className="text-[#63736B]">Ensuite</span><span className="font-bold">{isJournee ? 'Illimité jusqu’à 22h' : `${fmt(TROTT_PER_MIN)} / min à la fin`}</span></div>
            </div>
            <p className="mt-3 rounded-[12px] bg-[#F3F6F2] p-3 text-[12px] leading-[18px] text-[#26332E]">
              {isJournee
                ? `Garde ce reçu et ton SMS ${methodLabel} (ID ${tx}). À la station, ouvre cet écran et scanne le QR sur le guidon : pas de code à taper.`
                : `Garde ce reçu et ton SMS ${methodLabel} (ID ${tx}). À la station, scanne le QR sur le guidon. À la fin, termine le trajet dans l’app et paie les minutes tout de suite, sinon ton compte sera bloqué.`}
            </p>
          </div>
          <ol className="mt-3 space-y-1 text-[13px] text-white/85">
            {isFree ? (
              <>
                <li>1 · Va directement à la trottinette {freeCode} · {freeAddress}</li>
                <li>2 · Pas de station : le code {freeCode} suffit, + ta pièce d’identité</li>
                <li>3 · Appuie sur « Scanner » et vise le QR code sur le guidon</li>
              </>
            ) : (
              <>
                <li>1 · Va à la station {station}</li>
                <li>2 · Montre la référence {ref} + ta pièce d’identité</li>
                <li>3 · Appuie sur « Scanner » et vise le QR code sur le guidon</li>
              </>
            )}
          </ol>
          <div className="flex flex-1 flex-col justify-end gap-2 pt-4">
            {!isFree ? (
              <>
                <Link to="/itineraire/$zoneId" params={{ zoneId: stationEntry.id }} className="flex h-[54px] items-center justify-center gap-2 rounded-[18px] bg-white text-[15px] font-bold text-[#1B4332]">🧭 Itinéraire vers {station}</Link>
                <a href={mapsUrl} target="_blank" rel="noreferrer" className="flex h-[48px] items-center justify-center rounded-[18px] border border-white/40 text-[14px] font-bold text-white">Ouvrir dans Maps</a>
              </>
            ) : null}
            <Link to="/scanner-trottinette" search={{ code: effCode || undefined }} className="flex h-[54px] items-center justify-center rounded-[18px] bg-[#C5E84D] text-[15px] font-bold text-[#1B4332]">Je suis devant la trottinette · Scanner</Link>
            <Link to="/accueil" className="text-center text-[13px] font-bold text-white/80">Retour à l’accueil</Link>
          </div>
        </div>
      </Phone>
    )
  }
  return (
    <Phone scroll>
      <div className="flex min-h-full flex-col bg-[#1B4332] px-6 pb-6 pt-10 text-white">
        <div className="flex items-center gap-2">
          <img src="https://files.monstarx.app/0svp0dutvg/public/design/img-e027fcfad97ad412.jpg" alt="" className="h-8 w-6 object-cover" />
          <span className="text-[18px] font-bold">E-scooter</span>
        </div>
        <div className="mx-auto mt-8 flex h-[110px] w-[110px] items-center justify-center rounded-full bg-[#C5E84D] text-4xl text-[#1B4332]">✓</div>
        <h1 className="pt-6 text-center text-[28px] font-extrabold">Moto réservée !</h1>
        <p className="pt-2 text-center text-[14px] text-white/85">Présente-toi à la station avec ta pièce d’identité, ta référence et ton reçu {methodLabel}.</p>
        <div className="mt-6 rounded-[20px] bg-white/10 p-4 text-[13px]">
          <div className="flex justify-between"><span>Référence</span><span className="font-bold text-[#C5E84D]">{ref}</span></div>
          <div className="flex justify-between pt-1"><span>Véhicule</span><span className="font-bold">{v.name}</span></div>
          <div className="flex justify-between pt-1"><span>Retrait</span><span className="font-bold">{slot}</span></div>
          <div className="flex justify-between pt-1"><span>Total payé</span><span className="font-bold">{fmt(total)}</span></div>
        </div>
        <div className="mt-3 rounded-[20px] bg-white p-4 text-[#12211C]">
          <div className="flex items-center gap-3">
            <span className="flex h-[46px] w-[46px] items-center justify-center rounded-full text-[18px] font-extrabold text-white" style={{ background: methodColor }}>{methodLetter}</span>
            <div className="min-w-0">
              <p className="text-[14px] font-bold">Reçu {methodLabel}</p>
              <p className="truncate text-[12px] text-[#63736B]">Transaction {tx}</p>
            </div>
            <span className="ml-auto shrink-0 rounded-full bg-[#DDF0E3] px-2 py-1 text-[11px] font-bold text-[#1B4332]">{method === 'especes' ? 'À payer' : 'Payé'}</span>
          </div>
          <div className="mt-3 space-y-1 border-t border-[#E3E9E3] pt-3 text-[13px]">
            <div className="flex justify-between"><span className="text-[#63736B]">Montant</span><span className="font-bold">{fmt(total)}</span></div>
            <div className="flex justify-between"><span className="text-[#63736B]">Date</span><span className="font-bold">{payDate}</span></div>
            <div className="flex justify-between"><span className="text-[#63736B]">Référence</span><span className="font-bold">{ref}</span></div>
            <div className="flex justify-between"><span className="text-[#63736B]">Station</span><span className="font-bold">{station}</span></div>
          </div>
          <p className="mt-3 rounded-[12px] bg-[#FFF6E5] p-3 text-[12px] font-medium leading-[18px] text-[#5A3E00]">
            {method === 'especes'
              ? 'Paie en espèces à la station. Montre cette référence + ta pièce d’identité au gardien.'
              : `À la station, montre cet écran + ton SMS ${methodLabel} (ID ${tx}) + ta pièce d’identité. Sans le reçu, la moto ne peut pas être remise.`}
          </p>
        </div>
        <div className="flex flex-1 flex-col justify-end gap-2 pt-4">
          <Link to="/itineraire/$zoneId" params={{ zoneId: stationEntry.id }} className="flex h-[54px] items-center justify-center gap-2 rounded-[18px] bg-white text-[15px] font-bold text-[#1B4332]">🧭 Itinéraire vers {station}</Link>
          <a href={mapsUrl} target="_blank" rel="noreferrer" className="flex h-[48px] items-center justify-center rounded-[18px] border border-white/40 text-[14px] font-bold text-white">Ouvrir dans Maps</a>
          <Link to="/trajet" className="flex h-[54px] items-center justify-center rounded-[18px] bg-[#C5E84D] text-[15px] font-bold text-[#1B4332]">Voir ma location</Link>
          <Link to="/accueil" className="text-center text-[13px] font-bold text-white/80">Retour à l’accueil</Link>
        </div>
      </div>
    </Phone>
  )
}
