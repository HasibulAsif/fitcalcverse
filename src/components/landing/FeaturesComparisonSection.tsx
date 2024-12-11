import { Check, X } from "lucide-react";

const features = [
  {
    name: "Personalized Meal Plans",
    healthyThako: true,
    competitors: false,
    highlight: "Culturally relevant meal suggestions"
  },
  {
    name: "Workout Tracking",
    healthyThako: true,
    competitors: true,
    highlight: "Advanced analytics and progress tracking"
  },
  {
    name: "Professional Trainers",
    healthyThako: true,
    competitors: false,
    highlight: "Direct access to certified trainers"
  },
  {
    name: "Nutrition Calculator",
    healthyThako: true,
    competitors: true,
    highlight: "Comprehensive health metrics"
  },
  {
    name: "AI-Powered Recommendations",
    healthyThako: true,
    competitors: false,
    highlight: "Smart suggestions based on your progress"
  }
];

export const FeaturesComparisonSection = () => {
  return (
    <div className="relative z-10 py-24 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500 mb-4">
            Why Choose Healthy Thako?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            See how we compare to other fitness apps
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-4 px-6 text-left">Features</th>
                <th className="py-4 px-6 text-center">Healthy Thako</th>
                <th className="py-4 px-6 text-center">Competitors</th>
                <th className="py-4 px-6 text-left hidden md:table-cell">Our Advantage</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors"
                >
                  <td className="py-4 px-6">{feature.name}</td>
                  <td className="py-4 px-6 text-center">
                    {feature.healthyThako ? (
                      <Check className="w-6 h-6 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-6 h-6 text-red-500 mx-auto" />
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {feature.competitors ? (
                      <Check className="w-6 h-6 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-6 h-6 text-red-500 mx-auto" />
                    )}
                  </td>
                  <td className="py-4 px-6 hidden md:table-cell text-gray-400">
                    {feature.highlight}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};