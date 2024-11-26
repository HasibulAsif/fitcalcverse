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
  Brain,
  Timer,
  Menu
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
        'Waist-to-Hip Ratio Calculator'
      ]
    },
    {
      title: 'Energy & Metabolism',
      icon: <Activity className="w-4 h-4" />,
      items: [
        'Calorie Calculator',
        'Calories Burned Calculator',
        'Weight Loss Calculator'
      ]
    },
    {
      title: 'Nutrition',
      icon: <BarChart3 className="w-4 h-4" />,
      items: [
        'Macronutrient Calculator',
        'Water Intake Calculator'
      ]
    }
  ];

  return (
    <div 
      className={cn(
        "h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-4 flex justify-between items-center">
        <h1 className={cn("font-bold text-xl", collapsed && "hidden")}>
          FitCalcVerse
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

      <nav className="mt-6">
        {menuItems.map((section, idx) => (
          <div key={idx} className="px-4 py-2">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
              {section.icon}
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
    </div>
  );
};

export default Sidebar;