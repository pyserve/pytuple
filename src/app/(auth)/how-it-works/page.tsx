"use client";

import Navbar from "@/components/navbar";
import { SparklesCore } from "@/components/sparkles";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Bot,
  CheckCircle,
  Database,
  MessageSquareText,
  PhoneCall,
} from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <Database className="w-12 h-12 text-purple-500" />,
      title: "1. Lead Ingestion",
      description:
        "New leads are created and enter your system, ready for automated outreach.",
    },
    {
      icon: <PhoneCall className="w-12 h-12 text-purple-500" />,
      title: "2. Automated Dialing (Twilio)",
      description:
        "After a configurable delay (e.g., a few minutes), our system uses the lead's phone number to dial the call via Twilio's free tier.",
    },
    {
      icon: <Bot className="w-12 h-12 text-purple-500" />,
      title: "3. AI Interaction (Gemini via Ollama)",
      description:
        "The AI agent, powered by the Gemini model hosted on our Ollama server, engages in a natural conversation. Please note there's a typical 1-2 second delay for AI responses.",
    },
    {
      icon: <MessageSquareText className="w-12 h-12 text-purple-500" />,
      title: "4. Backend Processing (Django)",
      description:
        "Our robust Python Django backend manages call flows, integrates with Twilio, processes AI responses, and handles data logging.",
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-purple-500" />,
      title: "5. Frontend Display (Next.js)",
      description:
        "The Next.js frontend provides a seamless user interface for monitoring calls, managing leads, and accessing analytics.",
    },
  ];

  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <div className="h-full w-full absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage-howitworks"
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
            How CallBot AI Works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-xl mb-12 max-w-3xl mx-auto"
          >
            {`Our goal is to provide a powerful AI voice calling system. While we
            strive for free operation, we currently leverage Twilio's free tier
            for telephony services.`}
          </motion.p>

          <div className="flex flex-col items-center">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                className="relative w-full max-w-2xl mb-8"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 flex flex-col items-center text-center hover:border-purple-500 transition-all duration-300">
                  <div className="mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 * index + 0.3 }}
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-purple-500"
                  >
                    <ArrowDown className="w-8 h-8 animate-bounce" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
