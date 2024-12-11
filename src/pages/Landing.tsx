import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { CTASection } from "@/components/landing/CTASection";
import { EmailSignupSection } from "@/components/landing/EmailSignupSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { FeaturesComparisonSection } from "@/components/landing/FeaturesComparisonSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { Helmet } from "react-helmet";

const Landing = () => {
  return (
    <>
      <Helmet>
        <title>HT Workout - Advanced Fitness Calculators & Analytics</title>
        <meta name="description" content="Access comprehensive fitness calculators for BMI, body fat, macros, and more. Get personalized workout plans and track your progress with our advanced analytics." />
        <meta name="keywords" content="fitness calculator, BMI calculator, body fat calculator, macro calculator, workout planner, fitness analytics, health tracking" />
        <meta property="og:title" content="HT Workout - Advanced Fitness Calculators & Analytics" />
        <meta property="og:description" content="Transform your fitness journey with our comprehensive suite of calculators and analytics tools." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className="min-h-screen bg-black relative overflow-hidden w-full">
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <CTASection />
        <EmailSignupSection />
        <TestimonialsSection />
        <HowItWorksSection />
        <FeaturesComparisonSection />
        <AboutSection />
        <FAQSection />
      </div>
    </>
  );
};

export default Landing;