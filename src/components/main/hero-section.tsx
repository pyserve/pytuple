"use client";

import { SparklesCore } from "@/components/main/ui/sparkles";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function HeroSection() {
  const isAuthenticated = true;
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Reset function to handle going back to thumbnail
  const handleBackToThumbnail = () => {
    setIsVideoPlaying(false);
  };

  // Function to handle video play
  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Full-section sparkle background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 to-slate-900" />
        <SparklesCore
          id="heroSparkles"
          background="transparent"
          minSize={0.8}
          maxSize={2.0}
          particleDensity={120}
          className="w-full h-full"
          particleColor="#8B5CF6"
          speed={0.6}
        />
      </div>

      {/* Additional sparkle layer with different settings */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SparklesCore
          id="heroExtraSparkles"
          background="transparent"
          minSize={1.0}
          maxSize={2.5}
          particleDensity={40}
          className="w-full h-full"
          particleColor="#FFFFFF"
          speed={0.4}
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text Content */}
        <div className="text-center lg:text-left rounded-xl p-8 bg-slate-900/30 backdrop-blur-sm border border-slate-800/30 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <SparklesCore
              id="heroTextSparkles"
              background="transparent"
              minSize={0.4}
              maxSize={1.0}
              particleDensity={60}
              className="w-full h-full"
              particleColor="#FFFFFF"
              speed={0.5}
            />
          </div>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-50 to-neutral-400 leading-tight relative z-10"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Transform Your Voice Calls with AI
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 relative z-10"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Experience the future of communication with our AI-powered voice
            enhancement platform. Crystal clear audio, real-time translations,
            and smart analytics powered by Meta's LLAMA 3.0.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start relative z-10"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-neutral-50 to-neutral-400 text-slate-950"
              asChild
            >
              <Link href={isAuthenticated ? "/dashboard" : "/register"}>
                {isAuthenticated ? "Go to Dashboard" : "Get Started"}
                <ArrowRight className="ml-2 h-4 w-4" />
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
          </motion.div>
        </div>

        {/* Video Demo */}
        <motion.div
          className="rounded-xl overflow-hidden border border-slate-800/50 shadow-2xl relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="aspect-video relative overflow-hidden bg-slate-900/70 backdrop-blur-sm">
            {!isVideoPlaying ? (
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                onClick={handlePlayVideo}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <SparklesCore
                        id="videoSparkles"
                        background="transparent"
                        minSize={0.4}
                        maxSize={1.2}
                        particleDensity={50}
                        className="w-full h-full"
                        particleColor="#8B5CF6"
                        speed={0.5}
                      />
                    </div>
                    <div className="w-20 h-20 rounded-full bg-purple-600/30 backdrop-blur-sm flex items-center justify-center border border-purple-500/50 relative z-10">
                      <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center shadow-xl">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-white/80 font-medium text-lg">
                    Watch Demo
                  </p>
                </div>
                <img
                  src="https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg?auto=compress&cs=tinysrgb&w=1280"
                  alt="AI Voice Technology Demo"
                  className="w-full h-full object-cover opacity-50"
                />
              </div>
            ) : (
              <div className="relative w-full h-full">
                {/* YouTube embed that is guaranteed to work */}
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/HluANRwPyNo?autoplay=1&rel=0"
                  title="AI Voice Technology"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>

                {/* Back button */}
                <div className="absolute top-4 left-4 z-10">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-slate-900/70 border-slate-700 text-white hover:bg-slate-800"
                    onClick={handleBackToThumbnail}
                  >
                    Back
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className="absolute inset-0 pointer-events-none border border-purple-500/20 rounded-xl"></div>
        </motion.div>
      </div>

      {/* Sparkle connector to features section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 z-0 pointer-events-none overflow-hidden">
        <SparklesCore
          id="connectorSparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.5}
          particleDensity={80}
          className="w-full h-full"
          particleColor="#8B5CF6"
          speed={0.5}
        />
      </div>
    </section>
  );
}
