"use client";

import Navbar from "@/components/navbar";
import { SparklesCore } from "@/components/sparkles";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

export default function PricingPage() {
  const pricingTiers = [
    {
      name: "Free Tier",
      price: "Free",
      description: "Perfect for testing and small-scale personal projects.",
      features: [
        "Limited Twilio Free Tier usage",
        "Basic AI voice interactions",
        "Up to 50 calls/month",
        "Standard support",
      ],
      unavailableFeatures: [
        "Advanced analytics",
        "Priority support",
        "Custom integrations",
        "High volume calling",
      ],
      buttonText: "Get Started Free",
    },
    {
      name: "Standard",
      price: "$49/month",
      description:
        "Ideal for small businesses looking to automate communication.",
      features: [
        "500 call minutes/month",
        "Enhanced AI voice interactions",
        "Basic analytics",
        "Email support",
        "CRM integration (basic)",
      ],
      unavailableFeatures: [
        "Priority support",
        "Custom integrations",
        "Dedicated account manager",
      ],
      buttonText: "Choose Standard",
    },
    {
      name: "Pro",
      price: "$199/month",
      description:
        "For growing businesses needing robust AI calling capabilities.",
      features: [
        "2000 call minutes/month",
        "Advanced AI voice interactions",
        "Comprehensive analytics",
        "Priority email & chat support",
        "CRM integration (advanced)",
        "Customizable call flows",
      ],
      unavailableFeatures: ["Dedicated account manager"],
      buttonText: "Choose Pro",
    },
    {
      name: "Enterprise",
      price: "Custom",
      description:
        "Tailored solutions for large organizations with specific needs.",
      features: [
        "Unlimited call minutes",
        "Dedicated AI model instances",
        "Real-time analytics dashboard",
        "24/7 Priority support",
        "Full CRM & ERP integrations",
        "Dedicated account manager",
        "On-premise deployment options",
      ],
      unavailableFeatures: [],
      buttonText: "Contact Sales",
    },
  ];

  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <div className="h-full w-full absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage-pricing"
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
            Flexible Pricing for Every Business
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-xl mb-12 max-w-3xl mx-auto"
          >
            Choose the plan that best fits your needs, from testing to
            enterprise-grade automation.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 flex flex-col text-left hover:border-purple-500 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-white mb-2">
                  {tier.name}
                </h3>
                <p className="text-gray-400 mb-4">{tier.description}</p>
                <div className="text-4xl font-bold text-white mb-6">
                  {tier.price === "Custom" ? (
                    tier.price
                  ) : (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                      {tier.price}
                    </span>
                  )}
                </div>
                <ul className="space-y-3 flex-grow mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                  {tier.unavailableFeatures &&
                    tier.unavailableFeatures.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center text-gray-600 line-through"
                      >
                        <X className="w-5 h-5 text-red-400 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                </ul>
                <Button
                  className={`w-full ${
                    tier.name === "Standard" || tier.name === "Pro"
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "bg-gray-700 hover:bg-gray-600"
                  } text-white`}
                  size="lg"
                >
                  {tier.buttonText}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
