import { Link, createFileRoute } from '@tanstack/react-router'
import { HERO_MOTO, LOGO, Phone, StatusSpacer } from '@/components/phone'

export const Route = createFileRoute('/')({ component: Demarrer })

function Demarrer() {
  return (
    <Phone bg="#1B4332">
      <StatusSpacer dark />
      <div className="flex items-center justify-between px-5 pt-2">
        <div className="flex items-center gap-3">
          <img src={LOGO} alt="Logo E-scooter" className="h-10 w-[30px] object-cover" />
          <span className="text-[20px] font-bold leading-[28px] text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            E-scooter
          </span>
        </div>
        <span
          className="rounded-[8px] bg-[#FFF3C4] px-[7px] py-1 text-[12px] font-bold text-[#516158]"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Prototype
        </span>
      </div>

      <div className="px-5 pt-4">
        <h1 className="text-[44px] font-extrabold leading-[55px] text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          La route
          <br />
          est à toi.
        </h1>
        <p className="mt-2 text-[15px] leading-[19px] text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Loue une moto ou une trottinette électrique pour tes trajets à Dakar.
        </p>
      </div>

      <div className="relative mx-auto mt-3 h-[300px] w-[300px] overflow-hidden rounded-full bg-[#C5E84D]">
        <img src={HERO_MOTO} alt="Moto électrique" className="h-full w-full object-cover" />
      </div>

      <div className="px-5 pt-1">
        <p className="text-[22px] font-bold leading-[28px] text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Dakar, à ton rythme.
        </p>
        <p className="mt-1 text-[12px] font-medium text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Électrique · simple · pensé pour tes déplacements
        </p>
      </div>

      <div className="mt-3 flex gap-2 px-5">
        {['Sans carburant', 'Moto + trottinette', 'Paiement mobile'].map((c) => (
          <span
            key={c}
            className="flex h-[34px] flex-1 items-center justify-center rounded-full bg-[#C5E84D] px-1 text-center text-[11px] font-bold leading-[14px] text-[#1B4332]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {c}
          </span>
        ))}
      </div>

      <div className="mt-4 flex justify-between px-[43px]">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span key={i} className="h-[2px] w-6 rounded-full bg-[#FFFFFF8C]" />
        ))}
      </div>

      <div className="px-5 py-5 pb-8">
        <Link
          to="/acces"
          className="flex h-[56px] items-center rounded-[16px] bg-[#C5E84D] px-[15px] text-[15px] font-bold text-[#1B4332]"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Commencer
        </Link>
      </div>
    </Phone>
  )
}
