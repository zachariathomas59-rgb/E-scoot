import { createFileRoute, Link } from '@tanstack/react-router'
import { Phone, BottomTabs } from '@/components/phone'

export const Route = createFileRoute('/reservation-trottinette')({
  validateSearch: (s: Record<string, unknown>) => ({ code: typeof s.code === 'string' ? s.code : undefined }),
  component: NoResa,
})

function NoResa() {
  const { code } = Route.useSearch()
  return (
    <Phone scroll tabbar={<BottomTabs active="trouver" />}>
      <div className="px-5 pb-6 pt-10">
        <p className="text-[12px] font-bold text-[#63736B]">TROTTINETTE · PAS DE RÉSERVATION</p>
        <h1 className="pt-1 text-[26px] font-extrabold leading-[32px] text-[#12211C]">
          {code ? `La ${code} ne se réserve pas` : 'Les trottinettes ne se réservent pas'}
        </h1>
        <p className="pt-2 text-[14px] leading-[21px] text-[#52695C]">
          Une trottinette garée dehors reste libre pour tout le monde. On ne peut pas la bloquer depuis chez soi.
          Si tu la veux, va sur place : premier arrivé, premier servi. Tu paies seulement quand tu es devant, puis ça déverrouille.
        </p>
        <div className="mt-4 rounded-[16px] bg-[#EAF0E8] p-4 text-[13px] leading-[19px] text-[#153D2C]">
          <p className="font-bold">Comment ça marche :</p>
          <ol className="list-decimal pl-5 pt-1 text-[#52695C]">
            <li>Va à la trottinette avec l'itinéraire.</li>
            <li>Devant elle, ouvre Scanner et vise le QR sur le guidon.</li>
            <li>Choisis ton forfait, paie, ça déverrouille.</li>
          </ol>
        </div>
        <div className="pt-4">
          <Link
            to="/aller-trottinette"
            search={{ code: code ?? undefined }}
            className="flex h-[54px] items-center justify-center rounded-[18px] bg-[#1B4332] text-[15px] font-bold text-white"
          >
            Voir l'itinéraire{code ? ` vers ${code}` : ''}
          </Link>
          <Link
            to="/scanner-trottinette"
            search={{ code: code ?? undefined }}
            className="mt-2 flex h-[54px] items-center justify-center rounded-[18px] bg-[#C5E84D] text-[15px] font-bold text-[#1B4332]"
          >
            Je suis devant · Scanner
          </Link>
          <Link to="/trouver" search={{ type: 'tous' }} className="block pt-3 text-center text-[13px] font-bold text-[#1B4332] underline">
            Retour aux trottinettes
          </Link>
        </div>
      </div>
    </Phone>
  )
}
