import { createFileRoute, Link } from '@tanstack/react-router'
import { Phone } from '@/components/phone'
import { fmt } from '@/lib/escooter'

export const Route = createFileRoute('/merci')({
  component: Merci,
})

function Merci() {
  const ref = typeof localStorage !== 'undefined' ? localStorage.getItem('jef-ref') ?? 'JEF-0427' : 'JEF-0427'
  const name = typeof localStorage !== 'undefined' ? (localStorage.getItem('jef-name') ?? 'Mamadou').split(' ')[0] : 'Mamadou'
  const returnMode = typeof localStorage !== 'undefined' ? localStorage.getItem('jef-return-mode') ?? 'station' : 'station'
  const offFee = typeof localStorage !== 'undefined' ? Number(localStorage.getItem('jef-off-fee') ?? '0') : 0
  const offAddress = typeof localStorage !== 'undefined' ? localStorage.getItem('jef-off-address') ?? '' : ''
  const station = typeof localStorage !== 'undefined' ? localStorage.getItem('jef-station') ?? '' : ''
  const isOutside = returnMode === 'outside'

  return (
    <Phone>
      <div className="flex flex-1 flex-col px-5 pb-6 pt-10">
        <span className="text-[16px] font-bold text-[#1B4332]">E-scooter</span>
        <h1 className="pt-1 text-[30px] font-bold text-[#153D2C]">Merci, {name}</h1>
        <p className="text-[14px] text-[#52695C]">Les économies seront calculées après validation de l’usage.</p>
        <div className="mx-auto mt-8 flex h-[140px] w-[140px] items-center justify-center rounded-full bg-[#C5E84D] text-4xl">✓</div>
        <div className="mt-8 rounded-[24px] bg-white p-5">
          <p className="text-[18px] font-bold text-[#153D2C]">{isOutside ? 'Course terminée ici' : 'Retour validé'}</p>
          <p className="pt-2 text-[14px] text-[#52695C]">
            {isOutside
              ? `Moto laissée hors station : ${offAddress}. Réf. ${ref}.`
              : `Moto, casque et clés rendus. Réf. ${ref}${station ? ` · ${station}` : ''}.`}
          </p>
          {isOutside ? (
            <div className="mt-3 rounded-[16px] bg-[#FFFBEB] p-3 text-[13px]">
              <p className="flex justify-between"><span>Frais hors station payés (Wave · démo)</span><span className="font-bold">{fmt(offFee)}</span></p>
              <p className="pt-1 text-[12px] text-[#52695C]">La moto est maintenant visible sur la carte pour quelqu'un d'autre. L'équipe la récupère.</p>
            </div>
          ) : null}
        </div>
        <div className="flex gap-2 pt-4">
          {isOutside ? (
            <Link to="/trouver" search={{ type: 'tous' }} className="flex h-[54px] flex-1 items-center justify-center rounded-[18px] border border-[#1B4332] text-[14px] font-bold text-[#1B4332]">
              Voir sur la carte
            </Link>
          ) : null}
          <Link to="/impact" className="flex h-[54px] flex-1 items-center justify-center rounded-[18px] bg-[#1B4332] text-[15px] font-bold text-white">
            Voir mon impact
          </Link>
        </div>
      </div>
    </Phone>
  )
}
