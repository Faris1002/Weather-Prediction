import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is PC building?",
    answer: "PC building is the process of assembling a personal computer from individual components. It allows you to customize your system to meet specific gaming needs. Whether you're a beginner or an expert, our assistant simplifies this process."
  },
  {
    question: "How does the assistant work?",
    answer: "Our assistant guides you through selecting the best components based on your gaming preferences. Simply input the games you want to play, your preferred resolution, and target FPS. It will recommend optimal parts and ensure compatibility."
  },
  {
    question: "Can I save builds?",
    answer: "Yes! You can save your builds for future reference. This feature allows you to revisit and modify your selections at any time. Share your builds with friends or keep them private."
  },
  {
    question: "What is compatibility checking?",
    answer: "Compatibility checking ensures that all selected components work seamlessly together. Our tool alerts you to any potential issues, such as bottlenecks or mismatched parts. This helps prevent costly mistakes during your build."
  },
  {
    question: "Where can I find prices?",
    answer: "You can find real-time pricing for components through our integrated Gemini API. This feature compares prices from multiple retailers, ensuring you get the best deals. Stay updated on the latest prices as you build."
  }
];

export const FAQ = () => {
  return (
    <section className="bg-white px-16 py-28 max-md:px-8 max-md:py-16 max-sm:px-4 max-sm:py-12">
      <div className="max-w-screen-md mb-20 max-sm:w-full">
        <h2 className="text-5xl font-bold text-black">FAQs</h2>
        <p className="text-lg text-black">
          Here are some common questions about PC building and using our assistant.
        </p>
      </div>

      <Accordion type="single" collapsible className="border-b-black border-b border-solid">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-t-black border-t border-solid">
            <AccordionTrigger className="text-lg font-bold text-black px-0 py-5">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-black pb-6">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="w-[560px] text-center mt-6 max-sm:w-full">
        <h3 className="text-[32px] font-bold text-black">Still have questions?</h3>
        <p className="text-base text-black mt-4 mb-6 mx-0">We're here to help!</p>
        <button className="text-base cursor-pointer border text-black px-5 py-2 border-solid border-black hover:bg-gray-100 transition-colors max-sm:w-full">
          Contact
        </button>
      </div>
    </section>
  );
};
