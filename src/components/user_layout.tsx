import React from "react";
import Sidebar from "./ui/sidebar";

interface UserLayoutProps {
  children: React.ReactNode;
  guest?: string;
}

const UserLayout = ({ children, guest }: UserLayoutProps) => {
  const isGuest = guest === "true";

  return (
    <div className="flex lg:h-screen">
      {!isGuest && <Sidebar />}
      <div className="bg-white p-0 lg:p-6 w-full h-full">{children}</div>
    </div>
  );
};

export default UserLayout;
