import React from "react";
import Sidebar from "./ui/sidebar";

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-grow min-h-screen bg-white p-5">{children}</div>
    </div>
  );
};

export default UserLayout;
