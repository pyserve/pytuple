import OpenAI from "@/assets/chatgpt.png";
import Gemini from "@/assets/gemini.png";
import LLama from "@/assets/meta.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const apps = [
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
  return (
    <div className="container max-w-6xl space-y-6 p-4">
      {apps.map((app) => (
        <div
          key={app.id}
          className="p-6 bg-gray-50 rounded-xl shadow flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <Image
              src={app.logo}
              className="border rounded-full object-contain"
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
            <Button variant="outline">Test Connection</Button>
            <Button>Connect</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
