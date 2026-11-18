import { createFileRoute, Link } from '@tanstack/react-router'
import { Phone, TopBar, BottomTabs, MAP_APERCU, ICON_PIN_RESULT } from '@/components/phone'
import { zoneById } from '@/lib/escooter'
import { STATIONS } from '@/lib/nearby'

export const Route = createFileRoute('/itineraire/$zoneId')({
  component: Iti,
})

function Iti() {
  const { zoneId } = Route.useParams()
  const z = zoneById(zoneId)
  const station = STATIONS.find((s) => s.id === zoneId)
  const name = station?.name ?? z.name ?? 'Sacré-Cœur'
  const address = station?.address ?? ''
  const mapsUrl = station ? `https://www.google.com/maps/search/?api=1&query=${station.lat},${station.lon}` : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' Dakar')}`
  const ref = typeof localStorage !== 'undefined' ? localStorage.getItem('jef-ref') ?? '' : ''
  const slot = typeof localStorage !== 'undefined' ? localStorage.getItem('jef-slot') ?? '' : ''

  return (
    <Phone scroll tabbar={<BottomTabs active="trouver" />}>
      <div className="bg-[#F3F6F2] px-[22px] pt-[9px] pb-[8px] text-[11px] font-bold text-[#12211C]">9:41</div>
      <TopBar backTo="/zones" />
      <h1 className="px-5 pt-2 text-[30px] font-bold leading-[38px] tracking-[-0.6px] text-[#153D2C]">Vers {name}</h1>
      <p className="px-5 pt-2 text-[14px] leading-[21px] text-[#52695C]">
        Va récupérer ton véhicule en station. {address ? `${address}.` : 'Rejoins l’équipe de la zone.'}
      </p>
      <div className="mx-[18px] mt-4 overflow-hidden rounded-[16px]">
        <div className="relative">
          <img src={MAP_APERCU} alt="Dakar — aperçu" className="h-[200px] w-full object-cover" />
          <span className="absolute left-[77px] top-[89px] text-[11px] font-bold text-[#1B4332]">Départ indicatif</span>
          <img src={ICON_PIN_RESULT} alt="Pin" className="absolute left-[195px] top-[130px] h-6 w-6" />
          <span className="absolute left-[223px] top-[133px] text-[11px] font-bold text-[#1B4332]">{name}</span>
        </div>
      </div>
      <p className="px-7 pt-2 text-[10px] font-bold leading-[13px] text-[#1B4332]">Trajet schématique · carte indicative, pas de guidage temps réel</p>

      <div className="mx-5 mt-4 rounded-[20px] border border-[#DFE7DE] bg-white p-4 shadow-[0px_3px_12px_0px_rgba(20,51,36,0.04)]">
        <p className="text-[15px] font-bold leading-[22px] text-[#153D2C]">Itinéraire de récupération</p>
        <ol className="list-decimal pl-5 pt-2 text-[13px] leading-[19px] text-[#52695C]">
          <li>Rejoins la station {name}{address ? ` (${address})` : ''}.</li>
          <li>Présente {ref ? `ta référence ${ref}` : 'ta référence de réservation'} + ta pièce d’identité au gardien.</li>
          <li>{slot ? `Retrait prévu : ${slot}. ` : ''}L’équipe te remet le véhicule chargé + casque.</li>
        </ol>
        <div className="mt-3 flex gap-2">
          <a href={mapsUrl} target="_blank" rel="noreferrer" className="flex h-[48px] flex-1 items-center justify-center rounded-[14px] bg-[#1B4332] text-[13px] font-bold text-white">Ouvrir dans Maps</a>
          <Link to="/zones" className="flex h-[48px] flex-1 items-center justify-center rounded-[14px] border border-[#1B4332] text-[13px] font-bold text-[#1B4332]">Voir les stations</Link>
        </div>
      </div>

      <div className="mx-5 mt-3 rounded-[20px] border border-[#DFE7DE] bg-white p-4 shadow-[0px_3px_12px_0px_rgba(20,51,36,0.04)]">
        <p className="text-[15px] font-bold leading-[22px] text-[#153D2C]">Avant le dépôt</p>
        <p className="pt-2 text-[13px] leading-[19px] text-[#52695C]">Gare ta moto dans la zone indiquée. L’équipe peut t’aider.</p>
      </div>
      <div className="px-5 pt-6 pb-4">
        <Link to="/depot" className="flex h-[54px] items-center justify-center rounded-[18px] bg-[#1B4332] text-[15px] font-bold text-white">
          Voir les consignes de remise
        </Link>
      </div>
    </Phone>
  )
}
