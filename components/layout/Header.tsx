"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/offers", label: "Offers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-white/80 backdrop-blur">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Bean &amp; Bite
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm ${
                  isActive
                    ? "font-semibold text-amber-700"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/cart"
            className="rounded-full border px-4 py-1 text-sm hover:bg-slate-100"
          >
            Cart
          </Link>
        </nav>
      </div>
    </header>
  );
}
