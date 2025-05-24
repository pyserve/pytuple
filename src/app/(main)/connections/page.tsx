"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

import OpenAI from "@/assets/chatgpt.png";
import Gemini from "@/assets/gemini.png";
import LLama from "@/assets/meta.png";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type App = {
  id: string;
  name: string;
  description: string;
  logo: any;
};

const apps: App[] = [
  {
    id: "google-gemini",
    name: "Google Gemini",
    description:
      "Google Gemini is an advanced AI tool designed for seamless integration into your workflows. Connect now to leverage powerful natural language processing and generation features.",
    logo: Gemini,
  },
  {
    id: "openai",
    name: "OpenAI",
    description:
      "OpenAI provides powerful language models for building advanced AI applications. Use it to enhance chatbots, generate text, and more.",
    logo: OpenAI,
  },
  {
    id: "llama",
    name: "LLaMA",
    description:
      "Meta's LLaMA is a family of open-source language models optimized for research and lightweight deployment on personal infrastructure.",
    logo: LLama,
  },
];

export default function ConnectedApps() {
  const [testingApps, setTestingApps] = useState<Record<string, boolean>>({});

  const handleTestConnection = async (appId: string) => {
    setTestingApps((prev) => ({ ...prev, [appId]: true }));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setTestingApps((prev) => ({ ...prev, [appId]: false }));
    toast.success(`${appId} connection successful!`);
  };

  return (
    <div className="container max-w-6xl space-y-6 p-4">
      {apps.map((app) => (
        <div
          key={app.id}
          className="p-6 bg-gray-50 rounded-xl shadow flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4 flex-grow">
            <Image
              src={app.logo}
              className="border rounded-full object-contain p-2 bg-white"
              height={60}
              width={60}
              alt={`${app.name} Logo`}
            />
            <div>
              <div className="text-xl font-semibold">{app.name}</div>
              <div className="text-sm text-gray-600 max-w-md">
                {app.description}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleTestConnection(app.id)}
            >
              {testingApps?.[app.id] ? (
                <span className="flex gap-1">
                  <Loader2 className="animate-spin" />
                  <span>Testing...</span>
                </span>
              ) : (
                "Test Connection"
              )}
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Connect</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Connect {app.name}</DialogTitle>
                  <DialogDescription>
                    Please provide the access token. Click here to know how to
                    get this token.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor={`token-${app.id}`} className="text-right">
                      API Token
                    </Label>
                    <Input
                      id={`token-${app.id}`}
                      placeholder=""
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ))}
    </div>
  );
}
