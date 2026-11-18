import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Phone, BottomTabs, ILLU_MOTO, ILLU_TROTTI, MAP_DAKAR, ICON_PIN, ICON_ROUTE_SM, ICON_LIGHTNING } from '@/components/phone'
import { vehicleById } from '@/lib/escooter'

export const Route = createFileRoute('/vehicule/$id')({
  component: Detail,
})

const TROTT_SPOTS = [
  { station: 'Mermoz', dist: '300 m', battery: '88 %', km: '24 km', code: 'TR-Mermoz-04' },
  { station: 'Dakar Plateau', dist: '250 m', battery: '88 %', km: '24 km', code: 'TR-Plateau-04' },
  { station: 'Grand Dakar', dist: '600 m', battery: '76 %', km: '19 km', code: 'TR-GrandDakar-02' },
  { station: 'Sacré-Cœur', dist: '900 m', battery: '92 %', km: '26 km', code: 'TR-Sacre-07' },
]

function Detail() {
  const { id } = Route.useParams()
  const nav = useNavigate()
  const v = vehicleById(id)
  const isTrott = v.type === 'trottinette' || id === 'e-scoot'

  if (isTrott) {
    return (
      <Phone scroll tabbar={<BottomTabs active="trouver" />}>
        <div className="flex items-center gap-3 px-4 pt-4">
          <button onClick={() => nav({ to: '/trouver', search: { type: 'tous' } })} className="text-xl text-[#12211C]">‹</button>
          <span className="text-[16px] font-bold text-[#1B4332]">E-scooter</span>
          <span className="ml-auto rounded-full bg-[#C5E84D] px-3 py-1 text-[11px] font-bold text-[#1B4332]">Sans permis</span>
        </div>
        <div className="px-5 pt-2">
          <h1 className="text-[24px] font-bold text-[#12211C]">{v.name}</h1>
          <p className="text-[14px] text-[#63736B]">2 formules · tu choisis sur l'écran suivant</p>
        </div>
        <div className="mx-5 mt-3 h-[190px] overflow-hidden rounded-[24px] bg-[#DDEFE3]">
          <img src={ILLU_TROTTI} alt={v.name} className="h-full w-full object-cover" />
        </div>

        <div className="mx-5 mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-[16px] border-2 border-[#1B4332] bg-[#EAF0E8] p-3">
            <p className="text-[12px] font-bold text-[#1B4332]">LIBRE · à la minute</p>
            <p className="pt-1 text-[18px] font-extrabold text-[#12211C]">200 F + 100 F/min</p>
            <p className="pt-1 text-[11px] leading-[16px] text-[#52695C]">Tu paies 200 F pour débloquer. Tu roules, tu termines dans l'app, tu paies les minutes.</p>
          </div>
          <div className="rounded-[16px] border border-[#E0E8E0] bg-white p-3">
            <p className="text-[12px] font-bold text-[#1B4332]">JOURNÉE</p>
            <p className="pt-1 text-[18px] font-extrabold text-[#12211C]">5 000 F</p>
            <p className="pt-1 text-[11px] leading-[16px] text-[#52695C]">Tu paies 5 000 F une fois. Roulage illimité jusqu'à 22h, pas de compteur.</p>
          </div>
        </div>

        <div className="mx-5 mt-3 overflow-hidden rounded-[20px] border border-[#DDE5DF] bg-white">
          <div className="relative">
            <img src={MAP_DAKAR} alt="Carte Dakar — trottinettes à proximité" className="h-[150px] w-full object-cover" />
            <div className="absolute left-[18%] top-[30%] flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[11px] font-bold text-[#1B4332] shadow"><img src={ICON_PIN} alt="" className="h-4 w-4" /> Plateau · 250 m</div>
            <div className="absolute bottom-[20%] right-[18%] flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[11px] font-bold text-[#1B4332] shadow"><img src={ICON_PIN} alt="" className="h-4 w-4" /> Grand Dakar · 600 m</div>
            <div className="absolute right-[8%] top-[12%] flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[11px] font-bold text-[#1B4332] shadow"><img src={ICON_PIN} alt="" className="h-4 w-4" /> Sacré-Cœur</div>
          </div>
          <p className="p-3 text-[11px] font-medium text-[#63736B]">Positions en temps réel · va sur place pour débloquer. Pas de réservation à distance.</p>
        </div>

        <div className="px-5 pt-4">
          <p className="text-[14px] font-bold text-[#12211C]">4 trottinettes à proximité</p>
          {TROTT_SPOTS.map((s) => (
            <div key={s.code} className="mt-2 flex items-center gap-3 rounded-[16px] border border-[#E0E8E0] bg-white p-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#DBF0E3]"><img src={ICON_LIGHTNING} alt="" className="h-6 w-6 object-contain" /></span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-bold text-[#12211C]">{s.station}</p>
                <p className="text-[12px] text-[#63736B]">Batterie {s.battery} · {s.km} · {s.dist}</p>
              </div>
              <span className="rounded-full bg-[#EAF0E8] px-2 py-1 text-[11px] font-bold text-[#1B4332]">{s.battery}</span>
            </div>
          ))}
          <div className="mt-3 rounded-[16px] bg-[#FFF6E5] p-3 text-[12px] leading-[18px] text-[#5a3d00]">
            Comment ça marche : choisis ta formule, paie le départ (200 F en Libre, 5 000 F en Journée), va sur place, puis <b>scanne le QR collé sur le guidon</b>. Si le QR est illisible, saisis le numéro peint sur la trottinette (par ex. TR-214). En Libre, termine le trajet dans l'app et paie les minutes tout de suite.
          </div>
          <Link to="/reservation-trottinette" search={{ code: undefined }} className="mb-6 mt-4 flex h-[54px] items-center justify-center rounded-[18px] bg-[#1B4332] text-[15px] font-bold text-white">Choisir ma formule →</Link>
        </div>
      </Phone>
    )
  }

  return (
    <Phone scroll tabbar={<BottomTabs active="trouver" />}>
      <div className="flex items-center gap-3 px-4 pt-4">
        <button onClick={() => nav({ to: '/trouver', search: { type: 'tous' } })} className="text-xl">‹</button>
        <span className="text-[16px] font-bold text-[#1B4332]">E-scooter</span>
        <span className="ml-auto rounded-full bg-[#1B4332] px-3 py-1 text-[11px] font-bold text-white">Moto</span>
      </div>
      <div className="px-5 pt-2">
        <h1 className="text-[24px] font-bold text-[#12211C]">{v.name}</h1>
        <p className="text-[14px] text-[#63736B]">{v.usage}</p>
      </div>
      <div className="mx-5 mt-3 h-[190px] overflow-hidden rounded-[24px] bg-[#DDEFE3]">
        <img src={ILLU_MOTO} alt={v.name} className="h-full w-full object-cover" />
      </div>
      <div className="px-5 pt-4">
        <div className="flex items-center gap-3 border-b border-[#DDE5DF] py-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-[#DDEFE3]">
            <img src={ICON_ROUTE_SM} alt="" className="h-6 w-6 object-contain" />
          </span>
          <div>
            <p className="text-[15px] font-bold text-[#12211C]">Charge de ta moto</p>
            <p className="text-[13px] text-[#63736B]">Niveau de batterie et autonomie dans l'app</p>
          </div>
        </div>
        <div className="flex items-center gap-3 border-b border-[#DDE5DF] py-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-[#DDEFE3]">
            <img src={ICON_LIGHTNING} alt="" className="h-6 w-6 object-contain" />
          </span>
          <div>
            <p className="text-[15px] font-bold text-[#12211C]">Recharge solaire en station</p>
            <p className="text-[13px] text-[#63736B]">L'équipe E-scooter branche la moto. 1 000 F CFA la recharge complète, incluse au forfait journalier.</p>
          </div>
        </div>
        <div className="border-b border-[#DDE5DF] py-4">
          <p className="text-[18px] font-bold text-[#12211C]">{v.price}</p>
          <p className="text-[13px] text-[#63736B]">Caution : {v.caution} · remboursable</p>
          <p className="pt-2 text-[12px] font-bold text-[#1B4332]">{v.autonomy} · Casque inclus · {v.zone}</p>
        </div>
        <div className="mt-3 rounded-[20px] bg-white p-4 text-[13px] text-[#52695C]">
          <p className="font-bold text-[#153D2C]">Inclus</p>
          <p className="whitespace-pre-line pt-1">• {v.included.join('\n• ')}</p>
        </div>
        <Link to="/reservation/$id" params={{ id: v.id }} className="mb-6 mt-4 flex h-[54px] items-center rounded-[18px] bg-[#1B4332] pl-4 text-[15px] font-bold text-white">Réserver pour la journée</Link>
      </div>
    </Phone>
  )
}
