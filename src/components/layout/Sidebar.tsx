import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Scale,
  Activity,
  Heart,
  Dumbbell,
  Calculator,
  BarChart3,
  Droplets,
  Menu,
  LayoutDashboard,
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const Sidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const menuItems = [
    {
      title: 'Body Composition',
      icon: <Scale className="w-4 h-4" />,
      items: [
        'BMI Calculator',
        'Body Fat Calculator',
        'Lean Body Mass Calculator',
        'Ideal Body Weight Calculator',
        'Waist-to-Hip Calculator'
      ]
    },
    {
      title: 'Energy & Metabolism',
      icon: <Activity className="w-4 h-4" />,
      items: [
        'Calorie Calculator',
        'Calories Burned Calculator',
        'Weight Goal Calculator'
      ]
    },
    {
      title: 'Nutrition',
      icon: <BarChart3 className="w-4 h-4" />,
      items: [
        'Macronutrient Calculator',
        'Water Intake Calculator',
        'Glycemic Load Calculator',
        'Meal Calorie Calculator'
      ]
    },
    {
      title: 'Fitness',
      icon: <Dumbbell className="w-4 h-4" />,
      items: [
        'One Rep Max Calculator',
        'Heart Rate Zone Calculator',
        'TotalFit Calculator'
      ]
    }
  ];

  return (
    <div 
      className={cn(
        "relative h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
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
        >
          <Menu className="w-4 h-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <nav className="mt-6 space-y-6 px-2">
          {/* Dashboard Link */}
          <Link
            to="/dashboard"
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-700 rounded-md transition-colors",
              collapsed && "justify-center"
            )}
          >
            <LayoutDashboard className="w-4 h-4 min-w-[1rem]" />
            {!collapsed && <span>Dashboard</span>}
          </Link>

          {/* Menu sections */}
          {menuItems.map((section, idx) => (
            <div key={idx} className={cn("space-y-1", collapsed && "flex flex-col items-center")}>
              <div className={cn(
                "flex items-center gap-2 text-gray-400 text-sm mb-2 px-4",
                collapsed && "justify-center"
              )}>
                <div className="min-w-[1rem]">{section.icon}</div>
                {!collapsed && <span>{section.title}</span>}
              </div>
              {!collapsed && (
                <div className="space-y-1">
                  {section.items.map((item, itemIdx) => (
                    <Link
                      key={itemIdx}
                      to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block px-4 py-2 text-sm hover:bg-gray-700 rounded-md transition-colors"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="h-24" /> {/* Bottom spacing */}
      </ScrollArea>
    </div>
  );
};

export default Sidebar;