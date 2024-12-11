import { CheckCircle, Play } from "lucide-react";

const steps = [
  {
    title: "Sign Up",
    description: "Create your account and tell us about your fitness goals"
  },
  {
    title: "Get Your Plan",
    description: "Receive personalized meal and workout plans tailored to your needs"
  },
  {
    title: "Track Progress",
    description: "Monitor your progress and adjust your plans as needed"
  },
  {
    title: "Achieve Results",
    description: "Reach your fitness goals with our comprehensive support system"
  }
];

export const HowItWorksSection = () => {
  return (
    <div className="relative z-10 py-24 w-full bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Play className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500 mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get started with Healthy Thako in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative"
            >
              <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary mb-4 mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 text-center">{step.title}</h3>
                <p className="text-gray-400 text-center">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent transform -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};