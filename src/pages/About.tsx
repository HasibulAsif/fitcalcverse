import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Award, Heart } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: "Expert Team",
      description: "Our team of certified fitness experts and nutritionists are here to guide you."
    },
    {
      icon: <Award className="w-12 h-12 text-primary" />,
      title: "Proven Methods",
      description: "Science-backed calculations and recommendations for optimal results."
    },
    {
      icon: <Heart className="w-12 h-12 text-primary" />,
      title: "Personalized Care",
      description: "Tailored fitness and nutrition plans that adapt to your unique needs."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500 mb-4">
          About HT Workout
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          We're dedicated to making fitness accessible and effective for everyone through technology and expertise.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <Card key={index} className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <div className="mb-4">{feature.icon}</div>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-400">
            <p>
              At HT Workout, we believe that everyone deserves access to professional-grade fitness tools
              and guidance. Our platform combines cutting-edge technology with proven fitness methodologies
              to help you achieve your health and fitness goals.
            </p>
            <p>
              Whether you're just starting your fitness journey or you're an experienced athlete,
              our comprehensive suite of calculators and planners helps you make informed decisions
              about your health and fitness routine.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;