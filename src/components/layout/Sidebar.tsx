import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Scale,
  Activity,
  Dumbbell,
  Calculator,
  BarChart3,
  Menu,
  LayoutDashboard,
  Flame,
  UtensilsCrossed,
  Clock,
  Heart,
  Weight,
  Ruler,
  Droplets,
  Percent,
  Timer
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const Sidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const menuItems = [
    {
      title: 'Hot',
      icon: <Flame className="w-4 h-4" />,
      items: [
        { 
          name: 'TotalFit Calculator', 
          path: '/total-fit-calculator', 
          icon: <Calculator className="w-4 h-4" /> 
        },
        { 
          name: 'Meal Plan Generator', 
          path: '/meal-plan-generator',
          badge: 'Coming Soon',
          icon: <Clock className="w-4 h-4 text-primary animate-pulse" />
        }
      ]
    },
    {
      title: 'Body Composition',
      icon: <Scale className="w-4 h-4" />,
      items: [
        { 
          name: 'BMI Calculator', 
          path: '/bmi-calculator',
          icon: <Weight className="w-4 h-4" />
        },
        { 
          name: 'Body Fat Calculator', 
          path: '/body-fat-calculator',
          icon: <Percent className="w-4 h-4" />
        },
        { 
          name: 'Lean Body Mass Calculator', 
          path: '/lean-body-mass-calculator',
          icon: <Ruler className="w-4 h-4" />
        },
        { 
          name: 'Ideal Body Weight Calculator', 
          path: '/ideal-body-weight-calculator',
          icon: <Scale className="w-4 h-4" />
        },
        { 
          name: 'Waist-to-Hip Calculator', 
          path: '/waist-to-hip-calculator',
          icon: <Ruler className="w-4 h-4" />
        }
      ]
    },
    {
      title: 'Energy & Metabolism',
      icon: <Activity className="w-4 h-4" />,
      items: [
        { 
          name: 'Calorie Calculator', 
          path: '/calorie-calculator',
          icon: <Calculator className="w-4 h-4" />
        },
        { 
          name: 'Calories Burned Calculator', 
          path: '/calories-burned-calculator',
          icon: <Flame className="w-4 h-4" />
        },
        { 
          name: 'Weight Goal Calculator', 
          path: '/weight-goal-calculator',
          icon: <Weight className="w-4 h-4" />
        }
      ]
    },
    {
      title: 'Nutrition',
      icon: <BarChart3 className="w-4 h-4" />,
      items: [
        { 
          name: 'Macronutrient Calculator', 
          path: '/macronutrient-calculator',
          icon: <BarChart3 className="w-4 h-4" />
        },
        { 
          name: 'Water Intake Calculator', 
          path: '/water-intake-calculator',
          icon: <Droplets className="w-4 h-4" />
        },
        { 
          name: 'Glycemic Load Calculator', 
          path: '/glycemic-load-calculator',
          icon: <Activity className="w-4 h-4" />
        },
        { 
          name: 'Meal Calorie Calculator', 
          path: '/meal-calorie-calculator',
          icon: <Calculator className="w-4 h-4" />
        }
      ]
    },
    {
      title: 'Fitness',
      icon: <Dumbbell className="w-4 h-4" />,
      items: [
        { 
          name: 'One Rep Max Calculator', 
          path: '/one-rep-max-calculator',
          icon: <Dumbbell className="w-4 h-4" />
        },
        { 
          name: 'Heart Rate Zone Calculator', 
          path: '/heart-rate-zone-calculator',
          icon: <Heart className="w-4 h-4" />
        },
        { 
          name: 'TotalFit Calculator', 
          path: '/total-fit-calculator',
          icon: <Calculator className="w-4 h-4" />
        }
      ]
    }
  ];

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
          <Link
            to="/dashboard"
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-700 rounded-md transition-colors",
              collapsed && "justify-center"
            )}
            role="menuitem"
          >
            <LayoutDashboard className="w-4 h-4 min-w-[1rem]" />
            {!collapsed && <span>Dashboard</span>}
          </Link>

          {menuItems.map((section, idx) => (
            <div 
              key={idx} 
              className={cn("space-y-1", collapsed && "flex flex-col items-center")}
              role="menu"
              aria-label={section.title}
            >
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
                      className="flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-700 rounded-md transition-colors group"
                      role="menuitem"
                    >
                      <div className="flex items-center gap-2">
                        {item.icon || <div className="w-4 h-4" />}
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <Badge variant="outline" className="bg-primary/10 text-primary animate-pulse">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="h-24" />
      </ScrollArea>
    </div>
  );
};

export default Sidebar;