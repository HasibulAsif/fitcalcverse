import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard,
  Menu,
  Flame,
  Calculator,
  Leaf
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MenuItem, MenuGroup } from './sidebar/SidebarMenu';
import { SidebarCalculators } from './sidebar/SidebarCalculators';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div 
      className={cn(
        "relative h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <h1 className={cn("font-bold text-xl", collapsed && "hidden")}>
          HT Workout
        </h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="hover:bg-gray-700"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Menu className="w-4 h-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <nav className="mt-6 space-y-6 px-2">
          <MenuItem
            icon={<LayoutDashboard className="w-4 h-4" />}
            title="Dashboard"
            path="/dashboard"
            collapsed={collapsed}
          />

          <MenuGroup
            title="Hot"
            icon={<Flame className="w-4 h-4" />}
            collapsed={collapsed}
          >
            <MenuItem
              icon={<Calculator className="w-4 h-4" />}
              title="TotalFit Calculator"
              path="/total-fit-calculator"
              collapsed={collapsed}
            />
            <MenuItem
              icon={<Leaf className="w-4 h-4" />}
              title="Meal Plan Generator"
              path="/meal-plan-generator"
              collapsed={collapsed}
            />
            <MenuItem
              icon={<Leaf className="w-4 h-4" />}
              title="NutriPlanPro"
              path="/nutri-plan-pro"
              collapsed={collapsed}
            />
          </MenuGroup>

          <MenuGroup
            title="Calculators"
            icon={<Calculator className="w-4 h-4" />}
            collapsed={collapsed}
          >
            {!collapsed && <SidebarCalculators collapsed={collapsed} />}
          </MenuGroup>

          <MenuItem
            icon={<Leaf className="w-4 h-4" />}
            title="Nutrition Tracking"
            path="/nutrition-tracking"
            collapsed={collapsed}
          />
        </nav>
        <div className="h-24" />
      </ScrollArea>
    </div>
  );
};

export default Sidebar;