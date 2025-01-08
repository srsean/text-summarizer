import React from "react";
import Sidebar from "./ui/sidebar";

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <div className="flex lg:h-screen">
      <Sidebar />
      <div className="bg-white p-0 lg:p-6 w-full h-full">{children}</div>
    </div>
  );
};

export default UserLayout;
