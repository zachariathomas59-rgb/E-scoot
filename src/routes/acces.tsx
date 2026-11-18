import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Phone } from '@/components/phone'

export const Route = createFileRoute('/acces')({
  component: Acces,
})

function Acces() {
  const nav = useNavigate()
  return (
    <Phone>
      <BackHeader title="E-scoot" onBack={() => nav({ to: '/' })} />
      <h1 className="px-5 pt-1 text-[32px] font-bold leading-[40px] text-[#12211C]">Choisis ton parcours</h1>
      <p className="px-5 pt-3 text-[16px] leading-[20px] text-[#63736B]">Déjà membre ? Connecte-toi ou crée ton compte pour te déplacer à Dakar.</p>
      <div className="px-5 pt-8 flex flex-col gap-4">
        <Link to="/connexion" className="flex h-[60px] items-center justify-center rounded-[18px] bg-[#1B4332] text-[18px] font-bold text-white">
          Se connecter
        </Link>
        <Link to="/inscription-telephone" className="flex h-[60px] items-center justify-center border-b border-[#DDE5DF] text-[18px] font-bold text-[#1B4332]">
          Créer un compte
        </Link>
        <p className="pt-4 text-center text-[12px] font-bold text-[#63736B]">Prototype · aucune donnée ni transaction réelle.</p>
      </div>
    </Phone>
  )
}

export function BackHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="flex items-center gap-3 px-4 pt-4 pb-2">
      <button onClick={onBack} aria-label="Retour" className="flex h-6 w-6 items-center justify-center text-[#1B4332]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <div className="flex items-center gap-2">
        <img src="https://files.monstarx.app/0svp0dutvg/public/design/img-e027fcfad97ad412.jpg" alt="Logo E-scoot" className="h-8 w-6 object-cover" />
        <span className="text-[16px] font-bold text-[#1B4332]">{title}</span>
      </div>
    </div>
  )
}
