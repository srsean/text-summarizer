import { getSession } from "@/helpers/session";
import { User } from "@prisma/client";
import React from "react";
import SiteHeader from "./site-header";

interface UserLayoutProps {
  children: React.ReactNode;
  guest?: string;
}

const UserLayout = async ({ children, guest }: UserLayoutProps) => {
  const isGuest = guest === "true";
  const session = isGuest ? null : await getSession();
  const user = session?.user as User | undefined;

  return (
    <div className="flex min-h-dvh flex-col bg-paper">
      <SiteHeader
        guest={isGuest}
        user={
          user
            ? {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
              }
            : null
        }
      />
      <main className="mx-auto w-full max-w-shell flex-1 px-5 pb-16 pt-8 sm:px-8 sm:pt-10 lg:pb-20">
        {children}
      </main>
    </div>
  );
};

export default UserLayout;
