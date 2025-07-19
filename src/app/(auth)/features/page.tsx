"use client";

import Navbar from "@/components/navbar";
import { SparklesCore } from "@/components/sparkles";
import { motion } from "framer-motion";
import {
  BarChart,
  Bot,
  CalendarCheck,
  DollarSign,
  Globe,
  Headset,
} from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      icon: <Bot className="w-12 h-12 text-purple-500" />,
      title: "Automated Cold Calling",
      description:
        "Effortlessly reach potential customers with AI-driven outbound calls, qualifying leads and initiating conversations at scale.",
    },
    {
      icon: <Headset className="w-12 h-12 text-purple-500" />,
      title: "AI-Powered Customer Support",
      description:
        "Provide instant, intelligent support for common queries, freeing up your human agents for complex issues. Seamlessly escalate to live agents when needed.",
    },
    {
      icon: <DollarSign className="w-12 h-12 text-purple-500" />,
      title: "Lead Qualification & Nurturing",
      description:
        "Automatically qualify leads based on predefined criteria and nurture them through personalized voice interactions.",
    },
    {
      icon: <CalendarCheck className="w-12 h-12 text-purple-500" />,
      title: "Appointment Setting",
      description:
        "Let AI agents handle scheduling and booking appointments directly into your calendar, reducing no-shows.",
    },
    {
      icon: <BarChart className="w-12 h-12 text-purple-500" />,
      title: "Call Analytics & Insights",
      description:
        "Gain valuable insights from call data, including sentiment analysis, common queries, and agent performance.",
    },
    {
      icon: <Globe className="w-12 h-12 text-purple-500" />,
      title: "Multi-Language Support",
      description:
        "Expand your reach with AI agents capable of communicating fluently in multiple languages.",
    },
  ];

  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <div className="h-full w-full absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage-features"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <div className="container mx-auto px-6 py-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-8"
          >
            Powerful Features for Your Business
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-xl mb-12 max-w-3xl mx-auto"
          >
            CallBot AI offers a comprehensive suite of features designed to
            revolutionize your communication strategy.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 flex flex-col items-center text-center hover:border-purple-500 transition-all duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
