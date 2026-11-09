import Link from "next/link";
import AccountMenu, { HeaderUser } from "./account-menu";
import NavLinks from "./nav-links";
import Wordmark from "./wordmark";

interface SiteHeaderProps {
  guest?: boolean;
  user: HeaderUser | null;
}

const SiteHeader = ({ guest = false, user }: SiteHeaderProps) => {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="mx-auto w-full max-w-shell px-5 sm:px-8">
        <div className="flex h-14 items-center justify-between gap-3 sm:h-16 sm:gap-4">
          <div className="flex min-w-0 items-center gap-8">
            <Wordmark className="shrink-0" />
            {!guest && (
              <div className="hidden h-16 sm:block">
                <NavLinks />
              </div>
            )}
          </div>

          {guest ? (
            <div className="flex items-center gap-2 whitespace-nowrap sm:gap-3">
              <Link
                href="/login"
                className="text-[12.5px] font-medium text-ink-soft transition-colors hover:text-ink sm:text-[13px]"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="btn-secondary h-9 px-3 sm:px-3.5"
              >
                <span className="sm:hidden">Sign up</span>
                <span className="hidden sm:inline">Create account</span>
              </Link>
            </div>
          ) : (
            <AccountMenu user={user} />
          )}
        </div>

        {!guest && (
          <div className="-mx-5 border-t border-line px-5 sm:hidden">
            <div className="flex h-11 items-center">
              <NavLinks />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default SiteHeader;
