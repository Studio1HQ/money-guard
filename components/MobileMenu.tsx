"use client";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Home, PieChart, CreditCard, List } from "lucide-react";
import { NavItem } from "./NavItem";

export const MobileMenuToggle = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="lg:hidden flex items-center justify-between p-4 bg-white">
        <h2 className="text-xl font-bold">MoneyGuard</h2>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white z-20 flex justify-around items-center h-16">
        <NavItem icon={Home} label="Home" />
        <NavItem icon={PieChart} label="Invest" />
        <NavItem icon={CreditCard} label="Cards" />
        <NavItem icon={List} label="Trans." />
      </div>
    </>
  );
};
