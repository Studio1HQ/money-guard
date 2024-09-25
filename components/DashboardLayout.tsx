// components/Layout.tsx
import { ReactNode } from "react";

import { MobileMenuToggle } from "./MobileMenu";
import { Sidebar } from "./SideBar";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col h-screen bg-gray-100 text-black">
      {/* Top bar for mobile */}
      <MobileMenuToggle />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 pb-20 lg:pb-4">
          {children}
        </div>
      </div>
    </div>
  );
};
