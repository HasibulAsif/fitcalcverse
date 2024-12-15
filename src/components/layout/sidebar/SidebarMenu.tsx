import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";

interface MenuItemProps {
  icon: ReactNode;
  title: string;
  path: string;
  collapsed?: boolean;
}

export const MenuItem = ({ icon, title, path, collapsed }: MenuItemProps) => (
  <Link
    to={path}
    className={cn(
      "flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-700 rounded-md transition-colors",
      collapsed && "justify-center"
    )}
  >
    {icon}
    {!collapsed && <span>{title}</span>}
  </Link>
);

interface MenuGroupProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  collapsed?: boolean;
}

export const MenuGroup = ({ title, icon, children, collapsed }: MenuGroupProps) => (
  <div className={cn("space-y-1", collapsed && "flex flex-col items-center")}>
    <div className={cn(
      "flex items-center gap-2 text-gray-400 text-sm mb-2 px-4",
      collapsed && "justify-center"
    )}>
      <div className="min-w-[1rem]">{icon}</div>
      {!collapsed && <span>{title}</span>}
    </div>
    {children}
  </div>
);