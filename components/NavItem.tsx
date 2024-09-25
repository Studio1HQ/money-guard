import { LucideIcon } from "lucide-react";

type NavItemProps = {
  icon: LucideIcon;
  label: string;
};

export const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label }) => (
  <button className="flex flex-col items-center justify-center p-2 w-full hover:bg-gray-400 rounded">
    <Icon size={24} />
    <span className="text-xs mt-1">{label}</span>
  </button>
);
