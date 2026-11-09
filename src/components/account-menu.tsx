"use client";

import { logout } from "@/app/actions";
import { useEffect, useRef, useState } from "react";

export interface HeaderUser {
  firstName: string;
  lastName: string;
  email: string;
}

interface AccountMenuProps {
  user: HeaderUser | null;
}

const getInitials = (user: HeaderUser | null) => {
  if (!user) return "–";

  const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`;
  return initials.toUpperCase() || "–";
};

const AccountMenu = ({ user }: AccountMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const fullName = user
    ? `${user.firstName} ${user.lastName}`.trim()
    : "Account";

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Account menu"
        className="flex h-10 items-center gap-2.5 rounded-md px-1.5 text-ink transition-colors hover:bg-paper-deep focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:pr-2"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink font-sans text-[11px] font-medium leading-none text-paper">
          {getInitials(user)}
        </span>
        <span className="hidden max-w-[140px] truncate text-[13px] font-medium sm:block">
          {user?.firstName || "Account"}
        </span>
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-[54px] w-[240px] rounded-md border border-line bg-surface p-1 shadow-pop sm:mt-2"
        >
          <div className="border-b border-line px-3 py-2.5">
            <p className="truncate text-[13px] font-medium text-ink">
              {fullName}
            </p>
            <p className="mt-0.5 truncate text-[12px] text-ink-muted">
              {user?.email ?? "Signed in"}
            </p>
          </div>
          <form action={logout} className="pt-1">
            <button
              type="submit"
              role="menuitem"
              className="w-full rounded px-3 py-2 text-left text-[13px] text-ink-soft transition-colors hover:bg-paper hover:text-ink focus-visible:ring-2 focus-visible:ring-accent"
            >
              Sign out
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
