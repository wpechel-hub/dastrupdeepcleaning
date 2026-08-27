"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "./actions";

function ContractsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12h6m-6 4h6M9 8h1.5M5.25 3.75h13.5A1.5 1.5 0 0 1 20.25 5.25v13.5a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V5.25a1.5 1.5 0 0 1 1.5-1.5Z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

const links = [
  { label: "Contracts", href: "/dashboard", Icon: ContractsIcon },
  { label: "New Contract", href: "/dashboard/new", Icon: PlusIcon },
];

export default function Sidebar({ userName }: { userName: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const initial = userName?.trim()?.[0]?.toUpperCase() || "?";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const navContent = (
    <>
      <Link href="/dashboard" className="flex justify-center px-5 pt-7 pb-5">
        <Image
          src="/dastrup-logo-color.png"
          alt="Dastrup Deep Cleaning"
          width={160}
          height={129}
          priority
          className="h-16 w-auto object-contain"
        />
      </Link>

      <ul className="flex-1 px-3 space-y-1">
        {links.map((link) => {
          const active = pathname === link.href;
          const Icon = link.Icon;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={
                  active
                    ? { background: "rgba(27,75,122,0.08)", color: "#1B4B7A" }
                    : { color: "#5a6472" }
                }
              >
                <Icon />
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="px-3 pb-6 pt-3 border-t border-[#e2e6ec]">
        <div className="flex items-center gap-2.5 px-3 py-2">
          <span
            className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold text-white shrink-0"
            style={{ background: "linear-gradient(135deg, #1B4B7A, #38BDF8)" }}
          >
            {initial}
          </span>
          <span className="text-sm text-[#1b1f27] truncate">{userName}</span>
        </div>
        <form action={logoutAction} className="mt-2">
          <button
            type="submit"
            className="w-full px-3.5 py-2 rounded-lg text-xs font-semibold text-left border border-[#1B4B7A]/30 text-[#1B4B7A] hover:bg-[#1B4B7A]/5 transition-colors"
          >
            Log out
          </button>
        </form>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <header className="sm:hidden sticky top-0 z-20 bg-white flex items-center justify-between px-4 py-3 border-b border-[#e2e6ec]">
        <Image src="/dastrup-logo-color.png" alt="Dastrup Deep Cleaning" width={100} height={81} className="h-9 w-auto object-contain" />
        <button onClick={() => setOpen(true)} aria-label="Open menu" className="p-2 -mr-2">
          <span className="block h-0.5 w-6 mb-1.5 bg-[#1B4B7A]" />
          <span className="block h-0.5 w-6 mb-1.5 bg-[#1B4B7A]" />
          <span className="block h-0.5 w-6 bg-[#1B4B7A]" />
        </button>
      </header>

      {/* Mobile drawer */}
      <div className={`sm:hidden fixed inset-0 z-30 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
        <aside className={`absolute top-0 left-0 bottom-0 w-72 max-w-[80vw] bg-white flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="absolute top-4 right-4 text-2xl leading-none text-[#1B4B7A]">
            ×
          </button>
          {navContent}
        </aside>
      </div>

      {/* Desktop fixed sidebar */}
      <aside className="hidden sm:flex sm:flex-col fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-[#e2e6ec]">
        {navContent}
      </aside>
    </>
  );
}
