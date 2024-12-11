import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How do I get started with Healthy Thako?",
    answer: "Simply sign up for an account, complete your fitness profile, and you'll receive personalized meal and workout plans tailored to your goals."
  },
  {
    question: "Are the meal plans customizable?",
    answer: "Yes! Our meal plans are fully customizable to accommodate your dietary preferences, restrictions, and cultural considerations."
  },
  {
    question: "How often should I update my fitness goals?",
    answer: "We recommend reviewing and updating your goals every 4-6 weeks to ensure your plans remain aligned with your progress and changing needs."
  },
  {
    question: "Can I connect with a personal trainer?",
    answer: "Absolutely! Our platform includes access to certified trainers who can provide personalized guidance and support throughout your fitness journey."
  },
  {
    question: "What makes Healthy Thako different from other fitness apps?",
    answer: "We combine advanced technology with cultural understanding to provide personalized fitness solutions that are both effective and culturally relevant."
  }
];

export const FAQSection = () => {
  return (
    <div className="relative z-10 py-24 w-full">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Find answers to common questions about Healthy Thako
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};