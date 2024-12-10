import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Calculator,
  Dumbbell,
  Apple,
  Settings,
  X
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ mobile, onClose }: SidebarProps) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Dumbbell, label: 'Workout Suggestion', path: '/workout-suggestion' },
    { icon: Apple, label: 'Meal Plan', path: '/meal-plan-generator' },
    { icon: Calculator, label: 'Calculators', path: '/total-fit-calculator' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className={cn(
      "flex flex-col h-screen w-64 bg-secondary/50 backdrop-blur-xl border-r border-white/10",
      mobile && "h-full"
    )}>
      {mobile && (
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <img 
            src="/lovable-uploads/165f3aff-06b0-4b7f-84cb-c3257ac7b5ae.png" 
            alt="Healthy Thako Logo" 
            className="h-8 w-auto"
          />
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                    "hover:bg-white/10",
                    isActive ? "bg-primary text-white" : "text-gray-300"
                  )
                }
                onClick={mobile ? onClose : undefined}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;