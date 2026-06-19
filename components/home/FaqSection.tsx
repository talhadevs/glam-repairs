"use client";

import { useState } from "react";
import AnimatedSlideIn from "@/components/home/AnimatedSlideIn";

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: "What is included in my Glam Repair skin guidance report?",
    answer:
      "Your report includes a personalized skin analysis, routine recommendations tailored to your concerns, lifestyle tips, and clear guidance on next steps. Everything is reviewed by a certified skincare expert and delivered within 24 hours.",
  },
  {
    question: "Who can use Glam Repair's skin assessment service?",
    answer:
      "Anyone with skin concerns can use Glam Repair — whether you are dealing with acne, dryness, sensitivity, or simply want expert guidance on your routine. No referral or prior dermatology visit is required.",
  },
  {
    question: "How does the skin assessment process work?",
    answer:
      "Share your skin concerns, upload clear photos in natural lighting, and our expert reviews them privately. You receive a detailed, personalized report with actionable recommendations delivered to you within 24 hours.",
  },
  {
    question: "Are my photos kept private and secure?",
    answer:
      "Yes. Your photos are stored in a private internal system with restricted access. Only the expert preparing your report can view them, and you can request complete deletion at any time after delivery.",
  },
  {
    question: "How quickly will I receive my personalized report?",
    answer:
      "Most reports are delivered within 24 hours of submitting your photos and concerns. You will receive your full skin guidance report directly, without waiting weeks for an in-person appointment.",
  },
];

type FaqAccordionItemProps = {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
};

function FaqAccordionItem({ item, isOpen, onToggle }: FaqAccordionItemProps) {
  return (
    <div className="rounded-[20px] bg-brand-surface px-4 py-4 sm:px-7 sm:py-6">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-start justify-between gap-4 text-left"
      >
        <span
          className={`text-base font-bold leading-snug transition-colors duration-300 sm:text-lg ${
            isOpen ? "text-brand-primary" : "text-black"
          }`}
        >
          {item.question}
        </span>
        <span
          className="mt-0.5 shrink-0 text-xl font-light leading-none text-black transition-transform duration-300"
          aria-hidden
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p
            className={`pt-4 text-base font-light leading-relaxed text-black transition-opacity duration-300 sm:text-[15px] motion-reduce:transition-none ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set([0]));

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section className="w-full bg-white pt-6 pb-12 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24">
      <div className="grid w-full gap-8 px-4 sm:gap-12 sm:px-10 lg:grid-cols-[minmax(0,36%)_minmax(0,64%)] lg:items-start lg:gap-12 lg:px-16 xl:px-20">
        <AnimatedSlideIn direction="left">
          <h2 className="font-serif text-[2rem] leading-[1.1] tracking-normal text-brand-primary sm:text-[3.25rem] lg:text-[3.5rem]">
            Frequently Asked Question
          </h2>
        </AnimatedSlideIn>

        <div className="flex w-full min-w-0 flex-col gap-4 sm:gap-5">
          {faqItems.map((item, index) => (
            <AnimatedSlideIn
              key={item.question}
              direction="left"
              delay={index * 120}
            >
              <FaqAccordionItem
                item={item}
                isOpen={openItems.has(index)}
                onToggle={() => toggleItem(index)}
              />
            </AnimatedSlideIn>
          ))}
        </div>
      </div>
    </section>
  );
}
