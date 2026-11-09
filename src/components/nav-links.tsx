"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Summarize" },
  { href: "/history", label: "History" },
];

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="flex h-full items-center gap-5 sm:gap-6">
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={`relative flex h-full items-center text-[12.5px] transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] sm:text-[13px] ${
              isActive
                ? "font-medium text-ink after:bg-accent"
                : "text-ink-muted after:bg-transparent hover:text-ink"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavLinks;
