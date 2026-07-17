"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Image from "next/image";
import type { ReactNode } from "react";
import wolfIcon from "../app/LoginPage/images/wolf.jpeg";

type IconName =
  | "cashier"
  | "dashboard"
  | "inventory"
  | "customers"
  | "employees"
  | "reports"
  | "stores"
  | "subscription"
  | "help"
  | "settings"
  | "logout";

type MenuItem = {
  label: string;
  icon: IconName;
  href: string;
};

type SidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

const mainItems: MenuItem[] = [
  { label: "Cashier", icon: "cashier", href: "/cashier" },
  { label: "Dashboard", icon: "dashboard", href: "/dashboard" },
  { label: "Inventory", icon: "inventory", href: "/inventory" },
  { label: "Customers", icon: "customers", href: "/customers" },
];

function Icon({ name }: { name: IconName }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const paths: Record<IconName, ReactNode> = {
    cashier: (
      <>
        <rect x="4" y="4" width="16" height="14" rx="2" />
        <path d="M7 8h10M8 12h8" />
      </>
    ),
    dashboard: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="3" />
        <path d="M8 7h8M8 11h8M9 16h.01M15 16h.01" />
      </>
    ),
    inventory: (
      <>
        <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
        <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
      </>
    ),
    customers: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2" />
        <path d="M3 20c.4-4 2.4-6 6-6s5.6 2 6 6M16 14c2.9.1 4.5 2 5 4" />
      </>
    ),
    employees: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20c.4-4 2.4-6 6-6s5.6 2 6 6M19 8v6M16 11h6" />
      </>
    ),
    reports: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="3" />
        <path d="M8 16v-4M12 16V9M16 16v-7" />
      </>
    ),
    stores: (
      <>
        <path d="M4 10h16v10H4zM3 10l2-6h14l2 6M8 20v-5h4v5M7 4v6M17 4v6" />
      </>
    ),
    subscription: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 7h8M8 11h4M12 15c-1.7 0-3 1-3 2.5S10.3 20 12 20s3-1 3-2.5S13.7 15 12 15Z" />
      </>
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9a2.6 2.6 0 1 1 4.4 1.9c-1.4 1.2-1.9 1.5-1.9 3.1M12 17h.01" />
      </>
    ),
    settings: (
      <>
        <path d="M12 3.5 14 5l2.5-.2.8 2.4 2 1.5-1 2.3 1 2.3-2 1.5-.8 2.4-2.5-.2-2 1.5-2-1.5-2.5.2-.8-2.4-2-1.5 1-2.3-1-2.3 2-1.5.8-2.4L10 5l2-1.5Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    logout: (
      <>
        <path d="M14 8l4 4-4 4M18 12H8M11 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5" />
      </>
    ),
  };
  return (
    <svg {...common} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

  return (
    <>
      {/* Dark overlay behind the drawer on mobile */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col rounded-r-3xl bg-black px-4 py-5 font-sans text-[#C5D0E4] shadow-xl transition-transform duration-300 ease-in-out
        lg:static lg:z-auto lg:translate-x-0 lg:shadow-none
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <header className="mb-8 flex items-center justify-between px-2">
          <div className="flex items-center gap-2 text-xl font-bold text-white">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#E87500] text-sm font-black">
              <Image
                className="h-8 w-8 rounded-lg object-cover"
                src={wolfIcon}
                alt="Wolf Sell"
                width={32}
                height={32}
              />
            </span>
            Wolf Sell
          </div>
          {/* Close button — only useful/visible on mobile since the drawer is always open on lg */}
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-[#9AAAC5] hover:bg-amber-600 lg:hidden"
            aria-label="Close menu"
          >
            ✕
          </button>
        </header>

        <nav className="space-y-2">
          {mainItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-amber-600 text-black shadow-lg"
                    : "text-amber-50 hover:bg-amber-50/10 hover:text-white"
                }`}
              >
                <Icon name={item.icon} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <nav className="mt-auto space-y-2 pt-8">
          <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium hover:bg-white/10 hover:text-white">
            <Icon name="help" />
            Help
          </button>
          <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium hover:bg-white/10 hover:text-white">
            <Icon name="settings" />
            Settings
          </button>
          <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium hover:bg-red-500/20 hover:text-red-300">
            <Icon name="logout" />
            Log Out
          </button>
        </nav>
      </aside>
    </>
  );
}