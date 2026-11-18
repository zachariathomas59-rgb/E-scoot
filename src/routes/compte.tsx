import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Phone, TopBar, BottomTabs, ICON_DOC, ICON_HELP } from '@/components/phone'

export const Route = createFileRoute('/compte')({
  component: Compte,
})

function Compte() {
  const nav = useNavigate()
  const name = typeof localStorage !== 'undefined' ? localStorage.getItem('jef-name') ?? 'Mamadou Diop' : 'Mamadou Diop'
  const profil = typeof localStorage !== 'undefined' ? localStorage.getItem('jef-profil') ?? 'Livreur' : 'Livreur'
  return (
    <Phone scroll tabbar={<BottomTabs active="compte" />}>
      <div className="bg-[#F3F6F2] px-[22px] pt-[9px] pb-[8px] text-[11px] font-bold text-[#12211C]">9:41</div>
      <TopBar />
      <h1 className="px-5 pt-2 text-[30px] font-bold tracking-[-0.6px] text-[#153D2C]">Mon espace</h1>
      <p className="px-5 pt-1 text-[14px] text-[#52695C]">Gère tes informations et tes locations.</p>
      <div className="px-5 pt-6">
        <div className="rounded-[20px] border border-[#DFE7DE] bg-white p-4">
          <p className="text-[18px] font-bold text-[#12211C]">{name}</p>
          <p className="pt-1 text-[15px] text-[#52695C]">{profil === 'Livreur' ? 'Utilisateur' : profil} · Dakar</p>
        </div>
        <Link to="/trajets" className="mt-3 flex items-center gap-3 rounded-[20px] border border-[#DFE7DE] bg-white p-4 text-[#12211C]">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] bg-[#DBF0E3]"><img src={ICON_DOC} alt="" className="h-7 w-7" /></span>
          <span><span className="block text-[18px] font-bold text-[#12211C]">Mes locations</span><span className="block text-[14px] text-[#52695C]">Réservations et reçus</span></span>
        </Link>
        <Link to="/photo-document" className="mt-3 flex items-center gap-3 rounded-[20px] border border-[#DFE7DE] bg-white p-4 text-[#12211C]">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] bg-[#DBF0E3]"><img src={ICON_DOC} alt="" className="h-7 w-7" /></span>
          <span><span className="block text-[18px] font-bold text-[#12211C]">Documents</span><span className="block text-[14px] text-[#52695C]">Pièce et permis vérifiés au comptoir</span></span>
        </Link>
        <Link to="/aide" className="mt-3 flex items-center gap-3 rounded-[20px] border border-[#DFE7DE] bg-white p-4 text-[#12211C]">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] bg-[#DBF0E3]"><img src={ICON_HELP} alt="" className="h-7 w-7" /></span>
          <span><span className="block text-[18px] font-bold text-[#12211C]">Aide &amp; sécurité</span><span className="block text-[14px] text-[#52695C]">Assistance, règles, incidents</span></span>
        </Link>
        <button onClick={() => nav({ to: '/trajets' })} className="mt-8 flex h-[54px] w-full items-center rounded-[18px] bg-[#1B4332] pl-4 text-[15px] font-bold text-white">Voir mes locations</button>
        <button onClick={() => { localStorage.clear(); nav({ to: '/' }) }} className="mt-3 w-full pb-6 text-center text-[13px] font-bold text-[#63736B]">Se déconnecter</button>
      </div>
    </Phone>
  )
}
