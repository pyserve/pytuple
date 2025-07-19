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
  Network,
  Shield,
  Wifi,
  Settings,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      icon: <Bot className="w-12 h-12 text-blue-500" />,
      title: "Automated Cold Calling",
      description:
        "Effortlessly reach potential customers with AI-driven outbound calls, qualifying leads and initiating conversations at scale.",
    },
    {
      icon: <Headset className="w-12 h-12 text-green-500" />,
      title: "AI-Powered Customer Support",
      description:
        "Provide instant, intelligent support for common queries, freeing up your human agents for complex issues. Seamlessly escalate to live agents when needed.",
    },
    {
      icon: <DollarSign className="w-12 h-12 text-orange-500" />,
      title: "Lead Qualification & Nurturing",
      description:
        "Automatically qualify leads based on predefined criteria and nurture them through personalized voice interactions.",
    },
    {
      icon: <CalendarCheck className="w-12 h-12 text-yellow-500" />,
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
      icon: <Globe className="w-12 h-12 text-red-500" />,
      title: "Multi-Language Support",
      description:
        "Expand your reach with AI agents capable of communicating fluently in multiple languages.",
    },
  ];

  const helpDeskFeatures = [
    {
      icon: <Wifi className="w-10 h-10 text-blue-500" />,
      title: "Network Connectivity Troubleshooting",
      description:
        "Guide users through step-by-step diagnostics for internet access issues, slow connections, and Wi-Fi problems.",
      solutions: [
        "No internet access resolution",
        "Connection speed optimization",
        "Wi-Fi authentication fixes",
      ],
    },
    {
      icon: <Shield className="w-10 h-10 text-green-500" />,
      title: "Password & Account Management",
      description:
        "Automated assistance for password resets, account lockouts, and 2FA setup - the most common IT tickets.",
      solutions: [
        "Forgotten password recovery",
        "Account unlock procedures",
        "Multi-factor authentication setup",
      ],
    },
    {
      icon: <Settings className="w-10 h-10 text-orange-500" />,
      title: "Intelligent Ticket Triage",
      description:
        "Use NLP to categorize problems, assign priorities, and route complex issues to human agents seamlessly.",
      solutions: [
        "Smart problem classification",
        "Priority-based routing",
        "Context-aware escalation",
      ],
    },
    {
      icon: <Zap className="w-10 h-10 text-yellow-500" />,
      title: "Instant Knowledge Base Access",
      description:
        "Provide immediate answers for repetitive questions like VPN connections, printer setup, and network configuration.",
      solutions: [
        "VPN connection guidance",
        "Printer network setup",
        "Configuration troubleshooting",
      ],
    },
    {
      icon: <Users className="w-10 h-10 text-purple-500" />,
      title: "Contextual User Interactions",
      description:
        "Remember user history and preferences to provide personalized troubleshooting and build trust.",
      solutions: [
        "User history tracking",
        "Personalized solutions",
        "Preference-based support",
      ],
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-red-500" />,
      title: "Analytics & Continuous Improvement",
      description:
        "Monitor trends, resolution rates, and user satisfaction to refine automated flows and identify improvement areas.",
      solutions: [
        "Performance tracking",
        "Trend analysis",
        "Automated flow optimization",
      ],
    },
  ];

  const commonTickets = [
    {
      problem: "Internet not working",
      solution: "Guide user to check connections, restart modem",
    },
    {
      problem: "Slow connection",
      solution: "Suggest speed tests, reset, move closer to router",
    },
    {
      problem: "Wi-Fi authentication failure",
      solution: "Walk through password, SSID selection, updates",
    },
    {
      problem: "Account/password problems",
      solution: "Reset password, unlock account, guide MFA",
    },
    {
      problem: "Printer/network device offline",
      solution: "Check cables, restart printer/router",
    },
    {
      problem: "VPN/configuration questions",
      solution: "Step-by-step VPN connection guide",
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
                <p className="text-gray-300 mb-4 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Help Desk Network Solutions Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-24"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Specialized Help Desk Network Solutions
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-4xl mx-auto">
              Our AI voice system is specifically designed to handle the most
              common network-related support tickets, reducing response times
              and improving user satisfaction for IT help desks.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {helpDeskFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + 0.1 * index }}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/40 transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    {feature.icon}
                    <h3 className="text-lg font-semibold text-white ml-3">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 mb-4 text-sm">
                    {feature.description}
                  </p>
                  <div className="space-y-2">
                    {feature.solutions.map((solution, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-xs text-gray-400"
                      >
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                        {solution}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Common Tickets Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Most Common Help Desk Network Tickets We Automate
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-white font-semibold pb-4 pr-6">
                        Problem Type
                      </th>
                      <th className="text-white font-semibold pb-4">
                        AI-Powered Solution
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {commonTickets.map((ticket, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 1.3 + 0.1 * index }}
                        className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200"
                      >
                        <td className="text-gray-300 py-4 pr-6 font-medium">
                          {ticket.problem}
                        </td>
                        <td className="text-gray-400 py-4 text-sm">
                          {ticket.solution}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm">
                  <span className="text-purple-400 font-medium">85%</span> of
                  these tickets can be resolved automatically, freeing up your
                  IT team for complex issues.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
