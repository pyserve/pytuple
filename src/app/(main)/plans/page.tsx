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
import { BadgeCheck } from "lucide-react";
import { useState } from "react";

type Plan = {
  id: string;
  name: string;
  description: string;
  features: string[];
  price: string;
};

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter Plan",
    description: "Perfect for small businesses.",
    features: ["Up to 5 users", "Basic analytics", "Email support"],
    price: "$9/month",
  },
  {
    id: "pro",
    name: "Pro Plan",
    description: "Advanced features with more storage.",
    features: ["Unlimited users", "Advanced analytics", "Priority support"],
    price: "$29/month",
  },
  {
    id: "enterprise",
    name: "Enterprise Plan",
    description: "Custom solutions for large businesses.",
    features: [
      "Dedicated account manager",
      "Custom integrations",
      "24/7 support",
    ],
    price: "Contact us",
  },
];

export default function PlanSelector({
  onSelect,
}: {
  onSelect?: (planId: string) => void;
}) {
  const [selectedPlan, setSelectedPlan] = useState<string>("starter");

  const handleSelect = (planId: string) => {
    setSelectedPlan(planId);
    if (onSelect) onSelect(planId);
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Select Your Plan</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            onClick={() => handleSelect(plan.id)}
            className={`cursor-pointer transition hover:shadow-lg ${
              selectedPlan === plan.id
                ? "border-primary ring-2 ring-primary"
                : "border-border"
            }`}
          >
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </div>
              {selectedPlan === plan.id && (
                <BadgeCheck className="text-primary w-6 h-6" />
              )}
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-2xl font-bold">{plan.price}</p>
              <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                variant={selectedPlan === plan.id ? "default" : "outline"}
                className="w-full"
              >
                {selectedPlan === plan.id ? "Selected" : "Choose Plan"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
