import { MessageSquare, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah J.",
    role: "Fitness Enthusiast",
    image: "/placeholder.svg",
    quote: "This app completely transformed my approach to fitness. The personalized meal plans and workout tracking made it so easy to stay consistent.",
    rating: 5
  },
  {
    name: "Michael R.",
    role: "Business Professional",
    image: "/placeholder.svg",
    quote: "As a busy professional, I love how the app helps me plan my meals and workouts efficiently. The results speak for themselves!",
    rating: 5
  },
  {
    name: "Lisa M.",
    role: "Mother of Two",
    image: "/placeholder.svg",
    quote: "Finally found an app that understands my needs. The meal plans are practical and the workout suggestions are perfect for my schedule.",
    rating: 5
  }
];

export const TestimonialsSection = () => {
  return (
    <div className="relative z-10 py-24 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500 mb-4">
            Success Stories
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            See how our app has helped people achieve their fitness goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-white">{testimonial.name}</h3>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-300 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};