"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function PricingCards() {
  const isAuthenticated = true;
  const [annual, setAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small businesses just getting started",
      price: annual ? 29 : 39,
      features: [
        "Up to 500 minutes per month",
        "Basic AI voice capabilities",
        "Email support",
        "1 phone number included",
        "Standard analytics",
      ],
      popular: false,
      color: "border-slate-200 dark:border-slate-700",
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses with higher call volumes",
      price: annual ? 79 : 99,
      features: [
        "Up to 2,000 minutes per month",
        "Advanced AI voice capabilities",
        "Priority support",
        "5 phone numbers included",
        "Comprehensive analytics",
        "Custom voice personality",
        "API access",
      ],
      popular: true,
      color: "border-purple-200 dark:border-purple-900",
    },
    {
      name: "Enterprise",
      description: "For organizations with advanced needs and high volume",
      price: annual ? 199 : 249,
      features: [
        "Unlimited minutes",
        "Premium AI voice capabilities",
        "24/7 dedicated support",
        "Unlimited phone numbers",
        "Advanced analytics & reporting",
        "Custom integrations",
        "SLA guarantees",
        "Dedicated account manager",
      ],
      popular: false,
      color: "border-slate-200 dark:border-slate-700",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-full">
          <Label
            htmlFor="billing-toggle"
            className={`px-4 py-2 rounded-full text-sm ${
              !annual ? "bg-white dark:bg-slate-700 shadow-sm" : ""
            }`}
          >
            Monthly
          </Label>
          <Switch
            id="billing-toggle"
            checked={annual}
            onCheckedChange={setAnnual}
          />
          <Label
            htmlFor="billing-toggle"
            className={`px-4 py-2 rounded-full text-sm flex items-center gap-1 ${
              annual ? "bg-white dark:bg-slate-700 shadow-sm" : ""
            }`}
          >
            Annual{" "}
            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
              Save 20%
            </span>
          </Label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card
              className={`relative h-full flex flex-col ${
                plan.popular
                  ? "border-2 border-primary shadow-lg shadow-primary/10"
                  : plan.color
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/3">
                  <div className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <Sparkles className="h-3 w-3" />
                    MOST POPULAR
                  </div>
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground ml-1">/month</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 shadow-lg"
                      : ""
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  <Link href={isAuthenticated ? "/dashboard" : "/register"}>
                    {plan.name === "Enterprise"
                      ? "Contact Sales"
                      : "Get Started"}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
