import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Phone } from '@/components/phone'
import { BackHeader } from './acces'
import { fmt, OFF_STATION_MOTO_FEE, ZONES } from '@/lib/escooter'
import { STATIONS } from '@/lib/nearby'
import { addDrop } from '@/lib/drops'

export const Route = createFileRoute('/fin')({
  component: Fin,
})

function Fin() {
  const nav = useNavigate()
  const [c, setC] = useState([false, false, false])
  const [mode, setMode] = useState<'station' | 'outside'>('station')
  const [stationId, setStationId] = useState(() => {
    try {
      return localStorage.getItem('jef-station-id') ?? 'sacre-coeur'
    } catch {
      return 'sacre-coeur'
    }
  })
  const [place, setPlace] = useState('')
  const [paying, setPaying] = useState(false)
  const items = ['Moto et clés rendues', 'Casque rendu', 'Aucun dégât constaté']
  const station = STATIONS.find((s) => s.id === stationId) ?? STATIONS[3]
  const okCheck = c.every(Boolean)
  const okPlace = place.trim().length >= 4

  const finishStation = () => {
    try {
      localStorage.setItem('jef-return-mode', 'station')
      localStorage.setItem('jef-station-id', station.id)
      localStorage.setItem('jef-station', station.name)
      localStorage.removeItem('jef-off-fee')
      localStorage.removeItem('jef-off-address')
    } catch { /* ignore */ }
    nav({ to: '/merci' })
  }

  const finishOutside = () => {
    if (!okPlace || paying) return
    setPaying(true)
    try {
      const ref = localStorage.getItem('jef-ref') ?? 'JEF-0427'
      const veh = localStorage.getItem('jef-vehicle') ?? 'E-Rider Cargo'
      localStorage.setItem('jef-return-mode', 'outside')
      localStorage.setItem('jef-off-fee', String(OFF_STATION_MOTO_FEE))
      localStorage.setItem('jef-off-address', place.trim())
      localStorage.setItem('jef-station', `Hors station · ${place.trim()}`)
      addDrop({
        id: `${ref}-moto-${Date.now()}`,
        code: ref,
        kind: 'moto',
        address: place.trim(),
        lat: 14.6937 + (Math.random() - 0.5) * 0.04,
        lon: -17.4441 + (Math.random() - 0.5) * 0.04,
        battery: 62,
        at: new Date().toISOString(),
      })
      localStorage.setItem('jef-last-vehicle-kind', 'moto')
      localStorage.setItem('jef-last-vehicle-name', veh)
    } catch { /* ignore */ }
    // Version démo : paiement Wave simulé comme payé
    setTimeout(() => nav({ to: '/merci' }), 600)
  }

  return (
    <Phone scroll>
      <BackHeader title="E-scooter" onBack={() => nav({ to: '/trajet' })} />
      <h1 className="px-5 pt-1 text-[26px] font-bold text-[#12211C]">Contrôle de fin</h1>
      <p className="px-5 text-[14px] text-[#63736B]">Tu rends en station : c'est gratuit. Tu la laisses où tu es : {fmt(OFF_STATION_MOTO_FEE)} de frais, et elle devient visible sur la carte.</p>

      <div className="grid grid-cols-2 gap-2 px-5 pt-4">
        <button
          onClick={() => setMode('station')}
          aria-pressed={mode === 'station'}
          className={`rounded-[16px] border p-3 text-left ${mode === 'station' ? 'border-[#1B4332] bg-[#EAF0E8]' : 'border-[#E0E8E0] bg-white'}`}
        >
          <span className="block text-[14px] font-bold text-[#12211C]">En station</span>
          <span className="block pt-0.5 text-[12px] text-[#63736B]">Gratuit · contrôle avec l'agent</span>
        </button>
        <button
          onClick={() => setMode('outside')}
          aria-pressed={mode === 'outside'}
          className={`rounded-[16px] border p-3 text-left ${mode === 'outside' ? 'border-[#1B4332] bg-[#FFF7E6]' : 'border-[#E0E8E0] bg-white'}`}
        >
          <span className="block text-[14px] font-bold text-[#12211C]">Ici, hors station</span>
          <span className="block pt-0.5 text-[12px] text-[#63736B]">+ {fmt(OFF_STATION_MOTO_FEE)} · visible sur la carte</span>
        </button>
      </div>

      {mode === 'station' ? (
        <>
          <p className="px-5 pt-4 text-[11px] font-bold text-[#63736B]">STATION DE RETOUR</p>
          <div className="space-y-2 px-5 pt-2">
            {STATIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setStationId(s.id)}
                className={`w-full rounded-[16px] border p-3 text-left text-[13px] font-bold ${stationId === s.id ? 'border-[#1B4332] bg-[#EAF0E8] text-[#1B4332]' : 'border-[#E0E8E0] bg-white text-[#12211C]'}`}
              >
                {s.name} <span className="block text-[12px] font-normal text-[#63736B]">{s.address}</span>
              </button>
            ))}
          </div>
          <div className="space-y-2 px-5 pt-4">
            {items.map((t, i) => (
              <button key={t} onClick={() => setC((v) => v.map((x, k) => (k === i ? !x : x)))} className="flex w-full items-center gap-3 rounded-[16px] bg-white p-4 text-left">
                <span className={`flex h-6 w-6 items-center justify-center rounded-[6px] ${c[i] ? 'bg-[#1B4332] text-white' : 'border border-[#9BAA9F]'}`}>{c[i] ? '✓' : ''}</span>
                <span className="text-[13px] font-bold">{t}</span>
              </button>
            ))}
          </div>
          {!okCheck ? <p className="px-5 pt-2 text-[12px] font-bold text-[#7A5B00]">Coche les 3 points avec l'agent pour valider.</p> : null}
          <div className="flex flex-1 flex-col justify-end px-5 pb-6 pt-4">
            <button
              disabled={!okCheck}
              onClick={finishStation}
              className="flex h-[54px] items-center rounded-[18px] bg-[#1B4332] pl-4 text-[14px] font-bold text-white disabled:opacity-50"
            >
              Valider le retour · {station.name}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="mx-5 mt-4 rounded-[20px] border border-[#E3C46B] bg-[#FFFBEB] p-4">
            <p className="text-[15px] font-bold text-[#12211C]">Tu la laisses où tu es</p>
            <p className="pt-1 text-[13px] leading-[19px] text-[#52695C]">
              Pratique si la station est loin. Tu paies {fmt(OFF_STATION_MOTO_FEE)} (récupération par l'équipe),
              tu marques la course terminée, et la moto apparaît sur la carte pour quelqu'un d'autre.
            </p>
            <div className="mt-3 rounded-[14px] bg-white p-3">
              <p className="text-[12px] font-bold text-[#12211C]">Frais hors station</p>
              <p className="flex justify-between pt-1 text-[13px]"><span>Retour hors station moto</span><span className="font-bold">{fmt(OFF_STATION_MOTO_FEE)}</span></p>
              <p className="pt-1 text-[11px] text-[#63736B]">Payé maintenant via Wave (démo, sans débit réel).</p>
            </div>
          </div>
          <div className="px-5 pt-3">
            <label htmlFor="off-place" className="text-[12px] font-bold text-[#12211C]">Où est la moto exactement ?</label>
            <input
              id="off-place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="Ex : Almadies, devant la pharmacie"
              className="mt-2 w-full rounded-[14px] border border-[#DDE5DF] bg-white p-3 text-[14px] text-[#12211C]"
            />
            <p className="pt-1 text-[11px] text-[#63736B]">Cette adresse sera montrée sur la carte aux autres utilisateurs.</p>
          </div>
          <div className="flex flex-1 flex-col justify-end px-5 pb-6 pt-4">
            <button
              onClick={finishOutside}
              disabled={!okPlace || paying}
              className="flex h-[54px] items-center justify-center rounded-[18px] bg-[#1B4332] text-[14px] font-bold text-white disabled:opacity-50"
            >
              {paying ? 'Paiement…' : `Payer ${fmt(OFF_STATION_MOTO_FEE)} et terminer ici`}
            </button>
            {!okPlace ? <p className="pt-2 text-center text-[12px] font-bold text-[#7A5B00]">Indique où tu la laisses (4 lettres minimum).</p> : null}
          </div>
        </>
      )}
      <p className="hidden">{ZONES.length}</p>
    </Phone>
  )
}
