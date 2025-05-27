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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function UpgradeSubscriptionForm() {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [allowEmails, setAllowEmails] = useState(true);

  return (
    <Card className="max-w-6xl mx-auto m-4">
      <CardHeader>
        <CardTitle>Upgrade your subscription</CardTitle>
        <CardDescription>
          You are currently on the free plan. Upgrade to the pro plan to get
          access to all features.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Evil Rabbit" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="example@acme.com" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
          <div className="sm:col-span-2 space-y-1">
            <Label htmlFor="card">Card Number</Label>
            <Input id="card" placeholder="1234 1234 1234 1234" />
          </div>
          <div className="flex gap-2">
            <div className="space-y-1">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input placeholder="MM/YY" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="cvc">CVC</Label>

              <Input placeholder="CVC" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Plans</Label>
          <RadioGroup
            defaultValue="starter"
            className="grid grid-cols-2 items-center gap-2"
          >
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <RadioGroupItem value="starter" id="starter" />
                <div>
                  <Label htmlFor="starter">
                    <div className="font-semibold">Starter Plan</div>
                  </Label>
                  <div className="text-sm text-muted-foreground">
                    Perfect for small businesses.
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <RadioGroupItem value="pro" id="pro" />
                <div>
                  <Label htmlFor="starter">
                    <div className="font-semibold">Pro Plan</div>
                  </Label>
                  <div className="text-sm text-muted-foreground">
                    Advanced features with more storage.
                  </div>
                </div>
              </div>
            </Card>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" placeholder="Enter notes" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={agreeTerms}
              onCheckedChange={() => setAgreeTerms(!agreeTerms)}
            />
            <Label htmlFor="terms">I agree to the terms and conditions</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="emails"
              checked={allowEmails}
              onCheckedChange={() => setAllowEmails(!allowEmails)}
            />
            <Label htmlFor="emails">Allow us to send you emails</Label>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Upgrade Plan</Button>
      </CardFooter>
    </Card>
  );
}
