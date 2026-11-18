import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export const LOGO = 'https://files.monstarx.app/0svp0dutvg/public/design/img-e027fcfad97ad412.jpg'
export const HERO_MOTO = 'https://files.monstarx.app/0svp0dutvg/public/images/moto-electrique-hero.webp'
export const FLAG_SN = 'https://files.monstarx.app/0svp0dutvg/public/design/drapeau-du-se-ne-gal-d506916c.svg'
export const BACK_ICON = 'https://files.monstarx.app/0svp0dutvg/public/design/icon-instance-back-03791459.svg'
export const CHECK_ICON = 'https://files.monstarx.app/0svp0dutvg/public/design/icon-instance-check-0e0536c1.svg'
export const CHECK_BIG = 'https://files.monstarx.app/0svp0dutvg/public/design/icon-check-56f031fd.svg'
export const ICON_HOME = 'https://files.monstarx.app/0svp0dutvg/public/design/icon-instance-home-cd3273c5.svg'
export const ICON_SEARCH = 'https://files.monstarx.app/0svp0dutvg/public/design/icon-instance-search-858f91eb.svg'
export const ICON_ROUTE = 'https://files.monstarx.app/0svp0dutvg/public/design/icon-route-trajets-daedcc3b.svg'
export const ICON_ROUTE_SM = 'https://files.monstarx.app/0svp0dutvg/public/design/icon-route-75956b2d.svg'
export const ICON_ACCOUNT = 'https://files.monstarx.app/0svp0dutvg/public/design/icon-instance-account-95cbaf4e.svg'
export const ICON_ACCOUNT_ACTIVE = 'https://files.monstarx.app/0svp0dutvg/public/design/icon-instance-account-97a1bceb.svg'
export const ICON_LIGHTNING = 'https://files.monstarx.app/0svp0dutvg/public/design/icon-lightning-af795e13.svg'
export const ICON_LIGHTNING_SM = 'https://files.monstarx.app/0svp0dutvg/public/design/icon-instance-lightning-af795e13.svg'
export const ICON_PIN = 'https://files.monstarx.app/0svp0dutvg/public/design/icon-pin-2f0929e2.svg'
export const ICON_PIN_RESULT = 'https://files.monstarx.app/0svp0dutvg/public/design/icon-pin-ef2f7038.svg'
export const ICON_PIN_ASSIST = 'https://files.monstarx.app/0svp0dutvg/public/design/icon-instance-pin-8f7280dd.svg'
export const ICON_BATTERY = 'https://files.monstarx.app/0svp0dutvg/public/design/icon-instance-battery-d541e995.svg'
export const ICON_HELP = 'https://files.monstarx.app/0svp0dutvg/public/design/icon-help-4b038f8f.svg'
export const ICON_HELP_SM = 'https://files.monstarx.app/0svp0dutvg/public/design/icon-instance-help-4b038f8f.svg'
export const ICON_HELP_CIRCLE = 'https://files.monstarx.app/0svp0dutvg/public/design/icon-help-c41ae902.svg'
export const ICON_ALERT = '/placeholders/image-1.svg'
export const ICON_FILTER = 'https://files.monstarx.app/0svp0dutvg/public/design/icon-instance-filter-dd632ea8.svg'
export const ICON_DOC = 'https://files.monstarx.app/0svp0dutvg/public/design/icon-instance-document-4cb40692.svg'
export const ICON_LOCK = 'https://files.monstarx.app/0svp0dutvg/public/design/ico-ne-verrou-4d13ce53.svg'
export const ICON_TORCH = 'https://files.monstarx.app/0svp0dutvg/public/design/ico-ne-lampe-torche-8a0d69b0.svg'
export const WAVE_IMG = 'https://files.monstarx.app/0svp0dutvg/public/design/img-9c7fb33852656984.png'
export const WAVE_BADGE = WAVE_IMG
export const WAVE_REAL = 'https://files.monstarx.app/0svp0dutvg/public/uploads/chat/qg6dkxppew/image.png'
export const OM_REAL = 'https://files.monstarx.app/0svp0dutvg/public/uploads/chat/f5p34x4l6h/image.png'
export const ILLU_MOTO = 'https://files.monstarx.app/0svp0dutvg/public/images/moto-electrique-dakar.webp'
export const ILLU_TROTTI = 'https://files.monstarx.app/0svp0dutvg/public/images/trottinette-solaire-dakar.webp'
export const MAP_DAKAR = 'https://files.monstarx.app/0svp0dutvg/public/design/map-dakar-6e945a9c.svg'
export const MAP_ZONES = 'https://files.monstarx.app/0svp0dutvg/public/design/map-dakar-8c15551f.svg'
export const MAP_APERCU = 'https://files.monstarx.app/0svp0dutvg/public/design/map-dakar-aperc-u-0703043c.svg'
export const MAP_APERCU_SM = 'https://files.monstarx.app/0svp0dutvg/public/design/map-dakar-aperc-u-22b8b4a5.svg'
export const MAP_ROUTES = 'https://files.monstarx.app/0svp0dutvg/public/design/routes-eau-parcs-et-repe-res-bbb75898.svg'

export function Phone({ children, bg = '#F8F9F8', scroll = false, tabbar }: { children: ReactNode; bg?: string; scroll?: boolean; tabbar?: ReactNode }) {
  return (
    <div className="min-h-screen w-full" style={{ background: '#E4E9E4' }}>
      <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col" style={{ background: bg, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <div className={scroll ? 'flex-1 overflow-y-auto pb-4' : 'flex-1'}>{children}</div>
        {tabbar ? tabbar : null}
      </div>
    </div>
  )
}

export function StatusSpacer({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center justify-between px-[22px] pt-[9px] pb-[8px]" style={{ background: dark ? '#1B4332' : '#FFFFFF' }}>
      <span className={cn('text-[11px] font-bold leading-[14px]', dark ? 'text-white' : 'text-[#12211C]')}>
        9:41
      </span>
      <span className={cn('text-[11px]', dark ? 'text-white/80' : 'text-[#12211C]/60')}>● ● ●</span>
    </div>
  )
}

export function Brand({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-2 px-5 pt-2">
      <img src={LOGO} alt="E-scoot" className="h-8 w-6 object-cover" />
      <span className="text-[16px] font-bold leading-[22px]" style={{ color: dark ? '#fff' : '#1B4332' }}>
        E-scoot
      </span>
    </div>
  )
}

export function TopBar({ backTo = '/accueil', dark = false }: { backTo?: string; dark?: boolean }) {
  return (
    <div className="flex items-center gap-3 px-4 pt-2">
      <Link to={backTo} className="flex h-6 w-6 items-center justify-center" aria-label="Retour">
        <img src={BACK_ICON} alt="Retour" className="h-6 w-6" style={dark ? { filter: 'invert(1)' } : undefined} />
      </Link>
      <div className="flex items-center gap-2">
        <img src={LOGO} alt="E-scoot" className="h-8 w-6 object-cover" />
        <span className="text-[16px] font-bold" style={{ color: dark ? '#fff' : '#1B4332' }}>
          E-scoot
        </span>
      </div>
    </div>
  )
}

export function BackHeader({ title, backTo }: { title: string; backTo: string }) {
  return (
    <div className="flex items-center gap-3 px-4 pt-4 pb-2">
      <Link to={backTo} className="flex h-6 w-6 items-center justify-center" aria-label="Retour">
        <img src={BACK_ICON} alt="Retour" className="h-6 w-6" />
      </Link>
      <div className="flex items-center gap-2">
        <img src={LOGO} alt="E-scoot" className="h-8 w-6 object-cover" />
        <span className="text-[16px] font-bold text-[#1B4332]">{title}</span>
      </div>
    </div>
  )
}

export function PageTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="px-5 pt-3">
      <h1 className="text-[32px] font-bold leading-[40px] text-[#12211C]">{title}</h1>
      {sub ? <p className="mt-2 text-[16px] leading-[20px] text-[#63736B]">{sub}</p> : null}
    </div>
  )
}

export function PrimaryCta({ to, children, onClick }: { to?: string; children: ReactNode; onClick?: () => void }) {
  const cls = 'mx-5 mb-6 mt-auto flex h-[54px] items-center rounded-[18px] bg-[#1B4332] px-[14px] text-[14px] font-bold leading-[18px] text-white'
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  )
}

export function BottomTabs({ active }: { active: 'accueil' | 'trouver' | 'trajets' | 'compte' }) {
  const items = [
    { id: 'accueil', label: 'Accueil', to: '/accueil', icon: ICON_HOME },
    { id: 'trouver', label: 'Trouver', to: '/trouver', icon: ICON_SEARCH },
    { id: 'trajets', label: 'Trajets', to: '/trajets', icon: ICON_ROUTE },
    { id: 'compte', label: 'Compte', to: '/compte', icon: active === 'compte' ? ICON_ACCOUNT_ACTIVE : ICON_ACCOUNT },
  ] as const
  return (
    <nav className="sticky bottom-0 border-t border-[#DDE5DF] bg-white px-2 pt-2 pb-5">
      <div className="flex">
        {items.map((it) => {
          const on = active === it.id
          return (
            <Link
              key={it.id}
              to={it.to}
              className="flex flex-1 flex-col items-center gap-1 py-1 text-[12px] font-bold"
              style={{ color: on ? '#1B4332' : '#63736B' }}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: on ? '#C5E84D' : 'transparent' }}>
                <img src={it.icon} alt={it.label} className="h-[22px] w-[22px] object-contain" />
              </span>
              {it.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export function FieldLabel({ children }: { children: ReactNode }) {
  return <p className="px-5 text-[10px] font-bold leading-[13px] tracking-wide text-[#63736B]">{children}</p>
}
