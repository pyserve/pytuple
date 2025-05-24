"use client";

import { FeatureShowcase } from "@/components/main/feature-showcase";
import { Footer } from "@/components/main/footer";
import { HeroSection } from "@/components/main/hero-section";
import { PricingCards } from "@/components/main/pricing-cards";
import { StatsCounter } from "@/components/main/stats-counter";
import { TestimonialCarousel } from "@/components/main/testimonial-carousel";
import { SparklesCore } from "@/components/main/ui/sparkles";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Headphones,
  Menu,
  PhoneCall,
  Play,
  Shield,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isAuthenticated = true;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <div className="w-full absolute inset-0 h-full min-h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.8}
          maxSize={2.0}
          particleDensity={40}
          className="w-full h-full"
          particleColor="#FFFFFF"
          speed={0.6}
        />
      </div>

      {/* Additional connector sparkles layer that fills gap between navbar and sections */}
      <div className="absolute top-16 left-0 right-0 h-24 pointer-events-none z-10">
        <SparklesCore
          id="connectorTopSparkles"
          background="transparent"
          minSize={0.5}
          maxSize={1.8}
          particleDensity={60}
          className="w-full h-full"
          particleColor="#8B5CF6"
          speed={0.5}
        />
      </div>

      <header
        className={`sticky top-0 z-50 w-full border-b border-slate-800 backdrop-blur-lg bg-slate-950/80 transition-shadow duration-300 ${
          scrolled ? "shadow-md shadow-slate-900" : ""
        }`}
      >
        <div className="absolute inset-0 pointer-events-none z-0">
          <SparklesCore
            id="headerSparkles"
            background="transparent"
            minSize={0.4}
            maxSize={1.2}
            particleDensity={40}
            className="w-full h-full"
            particleColor="#8B5CF6"
            speed={0.4}
          />
        </div>
        <div className="container flex h-16 items-center justify-between relative z-10">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="relative">
              <PhoneCall className="h-6 w-6 text-white" />
              <Sparkles className="absolute -right-2 -top-2 h-4 w-4 text-amber-400" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-50 to-neutral-400">
              EchoLink
            </span>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-slate-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          <nav className="hidden md:flex gap-6">
            <Link
              href="#features"
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Pricing
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <Button
                className="bg-gradient-to-r from-neutral-50 to-neutral-400 text-slate-950"
                asChild
              >
                <Link href="/dashboard">
                  Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Button
                  className="bg-gradient-to-r from-neutral-50 to-neutral-400 text-slate-950"
                  asChild
                >
                  <Link href="/register">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-40 bg-slate-950/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="absolute inset-0 pointer-events-none">
              <SparklesCore
                id="mobileMenuSparkles"
                background="transparent"
                minSize={0.3}
                maxSize={1.0}
                particleDensity={15}
                className="w-full h-full"
                particleColor="#FFFFFF"
                speed={0.3}
              />
            </div>
            <motion.div
              className="absolute top-16 left-0 right-0 border-b border-slate-800 bg-slate-950 shadow-lg p-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-4 py-2">
                <Link
                  href="#features"
                  className="text-sm font-medium px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-sm font-medium px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Link
                  href="#testimonials"
                  className="text-sm font-medium px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Testimonials
                </Link>
                <Link
                  href="#pricing"
                  className="text-sm font-medium px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </Link>

                <div className="border-t border-slate-800 my-2 pt-2 flex flex-col gap-2">
                  {isAuthenticated ? (
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-neutral-50 to-neutral-400 text-slate-950"
                    >
                      <Link href="/dashboard">
                        Dashboard
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-slate-700 text-white"
                      >
                        <Link href="/login">Sign In</Link>
                      </Button>
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-neutral-50 to-neutral-400 text-slate-950"
                      >
                        <Link href="/register">
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <HeroSection />

        {/* Stats Counter */}
        <section className="py-12 border-t border-slate-800 relative overflow-hidden">
          <div className="container relative z-10">
            <StatsCounter />
          </div>
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <SparklesCore
              id="statsSparkles"
              background="transparent"
              minSize={0.5}
              maxSize={1.5}
              particleDensity={30}
              className="w-full h-full"
              particleColor="#FFFFFF"
              speed={0.5}
            />
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20 px-6 relative overflow-hidden">
          <div className="container relative z-10">
            <FeatureShowcase />
          </div>
          <div className="absolute inset-0 opacity-50 pointer-events-none">
            <SparklesCore
              id="featuresBgSparkles"
              background="transparent"
              minSize={0.5}
              maxSize={1.8}
              particleDensity={25}
              className="w-full h-full"
              particleColor="#8B5CF6"
              speed={0.5}
            />
          </div>
        </section>

        {/* How It Works */}
        <section
          id="how-it-works"
          className="py-20 px-6 border-t border-slate-800 relative overflow-hidden"
        >
          <div className="container relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-50 to-neutral-400">
                How EchoLink Works
              </h2>
              <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
                Our AI-powered voice calling system is simple to set up and use
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 relative overflow-hidden"
              >
                <div className="absolute inset-0 pointer-events-none">
                  <SparklesCore
                    id={`howItWorksCard-1`}
                    background="transparent"
                    minSize={0.3}
                    maxSize={0.8}
                    particleDensity={15}
                    className="w-full h-full"
                    particleColor="#8B5CF6"
                    speed={0.3}
                  />
                </div>
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-r from-neutral-50 to-neutral-400 mb-4 relative z-10">
                  <Zap className="h-6 w-6 text-slate-950" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 relative z-10">
                  1. Connect Your Account
                </h3>
                <p className="text-slate-400 relative z-10">
                  Set up your Twilio account and connect it to EchoLink with our
                  simple configuration wizard.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 relative overflow-hidden"
              >
                <div className="absolute inset-0 pointer-events-none">
                  <SparklesCore
                    id={`howItWorksCard-2`}
                    background="transparent"
                    minSize={0.3}
                    maxSize={0.8}
                    particleDensity={15}
                    className="w-full h-full"
                    particleColor="#8B5CF6"
                    speed={0.3}
                  />
                </div>
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-r from-neutral-50 to-neutral-400 mb-4 relative z-10">
                  <Shield className="h-6 w-6 text-slate-950" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 relative z-10">
                  2. Configure AI Model
                </h3>
                <p className="text-slate-400 relative z-10">
                  Choose and customize your Meta LLAMA 3.0 model settings to
                  match your specific needs.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 relative overflow-hidden"
              >
                <div className="absolute inset-0 pointer-events-none">
                  <SparklesCore
                    id={`howItWorksCard-3`}
                    background="transparent"
                    minSize={0.3}
                    maxSize={0.8}
                    particleDensity={15}
                    className="w-full h-full"
                    particleColor="#8B5CF6"
                    speed={0.3}
                  />
                </div>
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-r from-neutral-50 to-neutral-400 mb-4 relative z-10">
                  <Headphones className="h-6 w-6 text-slate-950" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 relative z-10">
                  3. Start Making Calls
                </h3>
                <p className="text-slate-400 relative z-10">
                  Begin making AI-powered voice calls with natural language
                  processing and real-time responses.
                </p>
              </motion.div>
            </div>

            <div className="mt-12 text-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-neutral-50 to-neutral-400 text-slate-950"
                asChild
              >
                <Link href={isAuthenticated ? "/dashboard" : "/register"}>
                  <Play className="mr-2 h-4 w-4" />
                  {isAuthenticated ? "Go to Dashboard" : "Get Started Now"}
                </Link>
              </Button>
            </div>
          </div>
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <SparklesCore
              id="howItWorksSparkles"
              background="transparent"
              minSize={0.4}
              maxSize={1.4}
              particleDensity={25}
              className="w-full h-full"
              particleColor="#8B5CF6"
              speed={0.4}
            />
          </div>
        </section>

        {/* Testimonials */}
        <section
          id="testimonials"
          className="py-20 px-6 border-t border-slate-800 relative overflow-hidden"
        >
          <div className="container relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-50 to-neutral-400">
                What Our Customers Say
              </h2>
              <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
                Trusted by businesses worldwide for AI-powered voice
                communication
              </p>
            </div>
            <TestimonialCarousel />
          </div>
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <SparklesCore
              id="testimonialsSparkles"
              background="transparent"
              minSize={0.3}
              maxSize={1.2}
              particleDensity={20}
              className="w-full h-full"
              particleColor="#FFFFFF"
              speed={0.3}
            />
          </div>
        </section>

        {/* Pricing */}
        <section
          id="pricing"
          className="py-20 px-6 border-t border-slate-800 relative overflow-hidden"
        >
          <div className="container relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-50 to-neutral-400">
                Simple, Transparent Pricing
              </h2>
              <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
                Choose the plan that works best for your business needs
              </p>
            </div>
            <PricingCards />
          </div>
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <SparklesCore
              id="pricingSparkles"
              background="transparent"
              minSize={0.4}
              maxSize={1.3}
              particleDensity={20}
              className="w-full h-full"
              particleColor="#8B5CF6"
              speed={0.4}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t border-slate-800 bg-slate-900 relative overflow-hidden">
          <div className="container text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-50 to-neutral-400 mb-6">
              Ready to Transform Your Voice Communication?
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8 text-slate-400">
              Join thousands of businesses using EchoLink's AI-powered voice
              calling system
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-neutral-50 to-neutral-400 text-slate-950"
                asChild
              >
                <Link href={isAuthenticated ? "/dashboard" : "/register"}>
                  {isAuthenticated ? "Go to Dashboard" : "Get Started Free"}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-700 text-white hover:bg-slate-800"
                asChild
              >
                <Link href="/demo">Request Demo</Link>
              </Button>
            </div>
          </div>
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <SparklesCore
              id="ctaSparkles"
              background="transparent"
              minSize={0.6}
              maxSize={1.6}
              particleDensity={30}
              className="w-full h-full"
              particleColor="#FFFFFF"
              speed={0.5}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
