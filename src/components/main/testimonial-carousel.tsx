"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CTO, TechVision",
    content:
      "EchoLink has revolutionized how we handle customer service. The AI-powered voice system has improved our response times and customer satisfaction significantly.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop",
  },
  {
    name: "Michael Chen",
    role: "Product Manager, GlobalTalk",
    content:
      "The real-time translation feature has been a game-changer for our international team. We can now collaborate seamlessly regardless of language barriers.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop",
  },
  {
    name: "Jessica Williams",
    role: "Director of Sales, Elevate Inc",
    content:
      "Our sales team loves the analytics provided by EchoLink. We can now understand customer sentiment and optimize our approach based on real data.",
    avatar:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=256&auto=format&fit=crop",
  },
  {
    name: "David Rodriguez",
    role: "Support Lead, SaaSHub",
    content:
      "The voice quality and AI intelligence of EchoLink has allowed us to scale our support operations without sacrificing quality. Our customers are happier than ever.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop",
  },
];

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const next = () => {
    setCurrent((current) =>
      current === testimonials.length - 1 ? 0 : current + 1
    );
  };

  const prev = () => {
    setCurrent((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  useEffect(() => {
    if (!autoplay) return;

    const timer = setTimeout(() => {
      next();
    }, 5000);

    return () => clearTimeout(timer);
  }, [current, autoplay]);

  return (
    <div className="relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <Card className="bg-slate-900/50 border-slate-800 mb-8">
              <CardContent className="pt-6 px-6 md:px-10">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p className="text-lg md:text-xl text-slate-300 mb-6">
                  &ldquo;{testimonials[current].content}&rdquo;
                </p>
                <div className="flex items-center justify-center">
                  <Avatar className="h-12 w-12 border-2 border-slate-800">
                    <AvatarImage
                      src={testimonials[current].avatar}
                      alt={testimonials[current].name}
                    />
                    <AvatarFallback className="bg-gradient-to-r from-neutral-50 to-neutral-400 text-slate-950">
                      {testimonials[current].name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4 text-left">
                    <p className="font-semibold text-white">
                      {testimonials[current].name}
                    </p>
                    <p className="text-sm text-slate-400">
                      {testimonials[current].role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrent(index);
                    setAutoplay(false);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    current === index ? "bg-white" : "bg-slate-600"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-slate-800/50"
        onClick={() => {
          prev();
          setAutoplay(false);
        }}
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-slate-800/50"
        onClick={() => {
          next();
          setAutoplay(false);
        }}
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
}
