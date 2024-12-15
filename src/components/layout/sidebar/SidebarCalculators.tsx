import { Calculator, Scale, Activity, Apple, Dumbbell } from 'lucide-react';
import { MenuGroup, MenuItem } from './SidebarMenu';

interface SidebarCalculatorsProps {
  collapsed: boolean;
}

export const SidebarCalculators = ({ collapsed }: SidebarCalculatorsProps) => {
  const calculatorGroups = [
    {
      title: 'Body Composition',
      icon: <Scale className="w-4 h-4" />,
      items: [
        { name: 'BMI Calculator', path: '/bmi-calculator' },
        { name: 'Body Fat Calculator', path: '/body-fat-calculator' },
        { name: 'Lean Body Mass', path: '/lean-body-mass-calculator' },
        { name: 'Ideal Body Weight', path: '/ideal-body-weight-calculator' },
        { name: 'Waist-to-Hip Ratio', path: '/waist-to-hip-calculator' }
      ]
    },
    {
      title: 'Energy & Metabolism',
      icon: <Activity className="w-4 h-4" />,
      items: [
        { name: 'Calorie Calculator', path: '/calorie-calculator' },
        { name: 'Calories Burned', path: '/calories-burned-calculator' },
        { name: 'Weight Goal', path: '/weight-goal-calculator' }
      ]
    },
    {
      title: 'Nutrition',
      icon: <Apple className="w-4 h-4" />,
      items: [
        { name: 'Macronutrient Calculator', path: '/macronutrient-calculator' },
        { name: 'Water Intake', path: '/water-intake-calculator' },
        { name: 'Glycemic Load', path: '/glycemic-load-calculator' },
        { name: 'Meal Calorie', path: '/meal-calorie-calculator' }
      ]
    },
    {
      title: 'Fitness',
      icon: <Dumbbell className="w-4 h-4" />,
      items: [
        { name: 'One Rep Max', path: '/one-rep-max-calculator' },
        { name: 'Heart Rate Zones', path: '/heart-rate-zone-calculator' }
      ]
    }
  ];

  return (
    <>
      {calculatorGroups.map((group, index) => (
        <MenuGroup
          key={index}
          title={group.title}
          icon={group.icon}
          collapsed={collapsed}
        >
          {!collapsed && group.items.map((item, itemIndex) => (
            <MenuItem
              key={itemIndex}
              icon={<Calculator className="w-4 h-4" />}
              title={item.name}
              path={item.path}
            />
          ))}
        </MenuGroup>
      ))}
    </>
  );
};