"use client";

import { SparklesCore } from "@/components/main/ui/sparkles";
import { motion } from "framer-motion";
import {
  BarChart3,
  Building,
  Globe,
  Headphones,
  Layers,
  Mic,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { useState } from "react";

const features = [
  {
    id: "advanced",
    label: "Advanced",
    icon: Sparkles,
    title: "Advanced AI Intelligence",
    description:
      "Powered by Meta's LLAMA 3.0, our system understands natural language and context for human-like conversations.",
    benefits: [
      { text: "Natural language understanding", icon: Mic },
      { text: "Context-aware responses", icon: Sparkles },
      { text: "Sentiment analysis", icon: BarChart3 },
      { text: "Multi-turn conversations", icon: Layers },
    ],
  },
  {
    id: "crystal",
    label: "Crystal",
    icon: Mic,
    title: "Crystal Clear Audio",
    description:
      "Experience pristine audio quality with advanced noise reduction and voice enhancement technology.",
    benefits: [
      { text: "Background noise cancellation", icon: Shield },
      { text: "Voice clarity enhancements", icon: Mic },
      { text: "Audio filtering technology", icon: Layers },
      { text: "High-definition sound", icon: Headphones },
    ],
  },
  {
    id: "comprehensive",
    label: "Comprehensive",
    icon: BarChart3,
    title: "Comprehensive Analytics",
    description:
      "Detailed insights and reporting to improve your communication effectiveness.",
    benefits: [
      { text: "Usage statistics and trends", icon: BarChart3 },
      { text: "Conversation quality metrics", icon: Sparkles },
      { text: "Engagement analysis", icon: Layers },
      { text: "Performance reporting", icon: Zap },
    ],
  },
  {
    id: "global",
    label: "Global",
    icon: Globe,
    title: "Global Accessibility",
    description:
      "Connect seamlessly across borders with multi-language support and international compatibility.",
    benefits: [
      { text: "50+ languages supported", icon: Globe },
      { text: "Real-time translation", icon: Sparkles },
      { text: "Regional adaptations", icon: Building },
      { text: "Cultural context awareness", icon: Layers },
    ],
  },
  {
    id: "enterprise",
    label: "Enterprise-Grade",
    icon: Building,
    title: "Enterprise-Grade Security",
    description:
      "State-of-the-art security protocols to protect your sensitive communications and data.",
    benefits: [
      { text: "End-to-end encryption", icon: Shield },
      { text: "Compliance certifications", icon: Building },
      { text: "Role-based access control", icon: Layers },
      { text: "Secure data storage", icon: Zap },
    ],
  },
  {
    id: "seamless",
    label: "Seamless",
    icon: Zap,
    title: "Seamless Integration",
    description:
      "Effortlessly connect with your existing tools and workflows for maximum productivity.",
    benefits: [
      { text: "Multi-device synchronization", icon: Layers },
      { text: "API integrations", icon: Zap },
      { text: "Cross-platform compatibility", icon: Globe },
      { text: "Real-time updates", icon: Sparkles },
    ],
  },
];

export function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState("advanced");
  const activeFeature =
    features.find((feature) => feature.id === activeTab) || features[0];

  return (
    <div className="relative">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 mb-4">
          Powerful AI Features
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Experience the next generation of voice communication with our
          cutting-edge AI technology
        </p>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto scrollbar-none justify-center space-x-4 mb-12 pb-2">
        {features.map((feature) => (
          <button
            key={feature.id}
            onClick={() => setActiveTab(feature.id)}
            className={`flex items-center px-6 py-3 rounded-lg transition-all ${
              activeTab === feature.id
                ? "bg-slate-900 border border-slate-800 shadow-lg relative before:absolute before:inset-0 before:rounded-lg before:p-[1px] before:bg-gradient-to-r before:from-purple-500 before:to-blue-500 before:-z-10 before:opacity-50"
                : "bg-slate-900/30 hover:bg-slate-900/50"
            }`}
          >
            <feature.icon
              className={`h-5 w-5 mr-2 ${
                activeTab === feature.id ? "text-white" : "text-slate-400"
              }`}
            />
            <span
              className={`whitespace-nowrap text-sm font-medium ${
                activeTab === feature.id ? "text-white" : "text-slate-400"
              }`}
            >
              {feature.label}
            </span>
          </button>
        ))}
      </div>

      {/* Feature Content */}
      <div className="relative">
        <div className="relative z-10">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          >
            {/* Feature Details */}
            <div className="order-2 lg:order-1">
              <div className="mb-6">
                <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <activeFeature.icon className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-50 to-neutral-400 mb-4">
                  {activeFeature.title}
                </h3>
                <p className="text-slate-400 mb-8">
                  {activeFeature.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeFeature.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="mt-0.5 bg-purple-500/10 p-1.5 rounded-full">
                      <benefit.icon className="w-4 h-4 text-purple-500" />
                    </div>
                    <span className="text-sm text-slate-300">
                      {benefit.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Image/Visualization */}
            <div className="order-1 lg:order-2 bg-slate-900/50 border border-slate-800 rounded-xl h-[400px] relative overflow-hidden">
              <div className="absolute inset-0">
                <SparklesCore
                  id="featureSparkles"
                  background="transparent"
                  minSize={0.6}
                  maxSize={1.4}
                  particleDensity={90}
                  className="w-full h-full"
                  particleColor="#8B5CF6"
                  speed={0.5}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-purple-500/10 rounded-full flex items-center justify-center">
                  <activeFeature.icon className="w-12 h-12 text-purple-500" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
