import { createFileRoute, Link } from '@tanstack/react-router'
import { Phone, TopBar } from '@/components/phone'

export const Route = createFileRoute('/depot')({
  component: Depot,
})

function Depot() {
  return (
    <Phone scroll>
      <div className="bg-[#F3F6F2] px-[22px] pt-[9px] pb-[8px] text-[11px] font-bold text-[#12211C]">9:41</div>
      <div className="flex items-center gap-2 px-4 pt-3">
        <Link to="/itineraire/$zoneId" params={{ zoneId: 'sacre-coeur' }} aria-label="Retour" className="text-[24px] leading-none text-[#1B4332]">‹</Link>
        <span className="text-[12px] font-bold text-[#1B4332]">Station solaire</span>
      </div>
      <h1 className="px-5 pt-2 text-[30px] font-bold leading-[38px] tracking-[-0.6px] text-[#153D2C]">Recharge en station</h1>
      <p className="px-5 pt-2 text-[14px] leading-[21px] text-[#52695C]">E-Rider Cargo ou E-City : l’équipe E-scooter prend le relais.</p>
      <div className="mx-5 mt-4 rounded-[20px] border border-[#DFE7DE] bg-white p-4 shadow-[0px_3px_12px_0px_rgba(20,51,36,0.04)]">
        <p className="text-[15px] font-bold leading-[22px] text-[#153D2C]">1 · Stationne ta moto</p>
        <p className="pt-2 text-[13px] leading-[19px] text-[#52695C]">Gare ta moto électrique à la station solaire réservée.</p>
      </div>
      <div className="mx-5 mt-3 rounded-[20px] border border-[#DFE7DE] bg-white p-4 shadow-[0px_3px_12px_0px_rgba(20,51,36,0.04)]">
        <p className="text-[15px] font-bold leading-[22px] text-[#153D2C]">2 · Scanne la station</p>
        <p className="pt-2 text-[13px] leading-[19px] text-[#52695C]">Scanne le QR code de la station pour associer ta moto au créneau de recharge.</p>
      </div>
      <div className="mx-5 mt-3 rounded-[20px] border border-[#DFE7DE] bg-white p-4 shadow-[0px_3px_12px_0px_rgba(20,51,36,0.04)]">
        <p className="text-[15px] font-bold leading-[22px] text-[#153D2C]">3 · L’équipe E-scooter branche la moto</p>
        <p className="pt-2 text-[13px] leading-[19px] text-[#52695C]">Recharge directe en station solaire. Le branchement et la recharge sont assurés par l’équipe E-scooter.</p>
      </div>
      <div className="mx-5 mt-4 rounded-[20px] bg-[#1B4332] p-4 shadow-[0px_3px_12px_0px_rgba(20,51,36,0.04)]">
        <p className="text-[15px] font-bold leading-[22px] text-white">1 000 F CFA / recharge complète</p>
        <p className="pt-2 text-[13px] leading-[19px] text-[#E1EDDE]">Incluse au forfait journalier ; sinon, paiement à la fin de la charge via Wave ou Orange Money.</p>
      </div>
      <div className="flex items-center justify-center gap-2 py-4">
        <img src="https://files.monstarx.app/0svp0dutvg/public/design/img-e027fcfad97ad412.jpg" alt="E-scooter" className="h-6 w-[18px] object-cover" />
        <span className="text-[13px] font-bold text-[#1B4332]">E-scooter</span>
      </div>
      <div className="px-5 pb-6">
        <Link to="/associer" className="flex h-[54px] items-center justify-center rounded-[18px] bg-[#1B4332] text-[15px] font-bold text-white">Scanner le QR de la station</Link>
      </div>
    </Phone>
  )
}
