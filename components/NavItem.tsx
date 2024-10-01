import { LucideIcon } from "lucide-react";
import Link from "next/link";

type NavItemProps = {
  icon: LucideIcon;
  label: string;
  href: string;
};

export const NavItem: React.FC<NavItemProps> = ({
  icon: Icon,
  label,
  href,
}) => (
  <Link
    href={href || "/"}
    className="flex flex-col lg:flex-row items-center justify-center lg:justify-start lg:gap-9 p-2 w-full rounded hover:text-orange-400"
  >
    <Icon size={24} className="transition-colors duration-300" />
    <span className="text-xs mt-1 transition-colors duration-300">{label}</span>
  </Link>
);
