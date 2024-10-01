import { LucideIcon } from "lucide-react";

type NavItemProps = {
  icon: LucideIcon;
  label: string;
};

export const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label }) => (
  <button className="flex flex-col lg:flex-row items-center justify-center lg:justify-start lg:gap-9 p-2 w-full rounded hover:text-orange-400">
    <Icon size={24} className="transition-colors duration-300" />
    <span className="text-xs mt-1 transition-colors duration-300">{label}</span>
  </button>
);
