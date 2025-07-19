"use client";

import Navbar from "@/components/navbar";
import { SparklesCore } from "@/components/sparkles";
import { motion } from "framer-motion";
import {
  BellRing,
  ClipboardList,
  PhoneCall,
  ShoppingCart,
  Users,
} from "lucide-react";

export default function ExamplesPage() {
  const examples = [
    {
      icon: <ShoppingCart className="w-12 h-12 text-purple-500" />,
      title: "Sales Lead Qualification",
      description:
        "Automatically call new leads, ask qualifying questions, and identify high-potential prospects for your sales team.",
    },
    {
      icon: <Users className="w-12 h-12 text-purple-500" />,
      title: "Customer Service Automation",
      description:
        "Handle routine customer inquiries, provide FAQs, and guide users through common processes, reducing call center load.",
    },
    {
      icon: <BellRing className="w-12 h-12 text-purple-500" />,
      title: "Appointment Reminders & Confirmations",
      description:
        "Send automated voice reminders for appointments, events, or payments, and allow customers to confirm or reschedule.",
    },
    {
      icon: <ClipboardList className="w-12 h-12 text-purple-500" />,
      title: "Survey & Feedback Collection",
      description:
        "Conduct automated voice surveys to gather customer feedback, market research, or product satisfaction data.",
    },
    {
      icon: <PhoneCall className="w-12 h-12 text-purple-500" />,
      title: "Debt Collection Reminders",
      description:
        "Gently remind customers about overdue payments and provide options for resolution, maintaining a professional tone.",
    },
    {
      icon: <PhoneCall className="w-12 h-12 text-purple-500" />,
      title: "Event & Webinar Registrations",
      description:
        "Automate the registration process for your events, collecting necessary information and sending confirmations.",
    },
  ];

  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <div className="h-full w-full absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage-examples"
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
            Real-World Applications
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-xl mb-12 max-w-3xl mx-auto"
          >
            See how CallBot AI can be leveraged across various industries and
            use cases to drive efficiency and engagement.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {examples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 flex flex-col items-center text-center hover:border-purple-500 transition-all duration-300"
              >
                <div className="mb-4">{example.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {example.title}
                </h3>
                <p className="text-gray-400">{example.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
