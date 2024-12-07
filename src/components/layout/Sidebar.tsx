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
  Flame,
  UtensilsCrossed
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const Sidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const menuItems = [
    {
      title: 'Hot',
      icon: <Flame className="w-4 h-4" />,
      items: [
        { name: 'TotalFit Calculator', path: '/total-fit-calculator' },
        // Meal Plan Generator will be added here later
      ]
    },
    {
      title: 'Meal Plan',
      icon: <UtensilsCrossed className="w-4 h-4" />,
      items: [
        // Meal Plan Generator pages will be added here later
      ]
    },
    {
      title: 'Body Composition',
      icon: <Scale className="w-4 h-4" />,
      items: [
        { name: 'BMI Calculator', path: '/bmi-calculator' },
        { name: 'Body Fat Calculator', path: '/body-fat-calculator' },
        { name: 'Lean Body Mass Calculator', path: '/lean-body-mass-calculator' },
        { name: 'Ideal Body Weight Calculator', path: '/ideal-body-weight-calculator' },
        { name: 'Waist-to-Hip Calculator', path: '/waist-to-hip-calculator' }
      ]
    },
    {
      title: 'Energy & Metabolism',
      icon: <Activity className="w-4 h-4" />,
      items: [
        { name: 'Calorie Calculator', path: '/calorie-calculator' },
        { name: 'Calories Burned Calculator', path: '/calories-burned-calculator' },
        { name: 'Weight Goal Calculator', path: '/weight-goal-calculator' }
      ]
    },
    {
      title: 'Nutrition',
      icon: <BarChart3 className="w-4 h-4" />,
      items: [
        { name: 'Macronutrient Calculator', path: '/macronutrient-calculator' },
        { name: 'Water Intake Calculator', path: '/water-intake-calculator' },
        { name: 'Glycemic Load Calculator', path: '/glycemic-load-calculator' },
        { name: 'Meal Calorie Calculator', path: '/meal-calorie-calculator' }
      ]
    },
    {
      title: 'Fitness',
      icon: <Dumbbell className="w-4 h-4" />,
      items: [
        { name: 'One Rep Max Calculator', path: '/one-rep-max-calculator' },
        { name: 'Heart Rate Zone Calculator', path: '/heart-rate-zone-calculator' },
        { name: 'TotalFit Calculator', path: '/total-fit-calculator' }
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
              {!collapsed && section.items && section.items.length > 0 && (
                <div className="space-y-1">
                  {section.items.map((item, itemIdx) => (
                    <Link
                      key={itemIdx}
                      to={item.path}
                      className="block px-4 py-2 text-sm hover:bg-gray-700 rounded-md transition-colors"
                    >
                      {item.name}
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