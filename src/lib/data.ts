import OpenAI from "@/assets/chatgpt.png";
import Gemini from "@/assets/gemini.png";
import LLama from "@/assets/meta.png";
import { ConnectionType } from ".";

export const apps: ConnectionType[] = [
  {
    id: "google-gemini",
    provider: "Google Gemini",
    description:
      "Google Gemini is an advanced AI tool designed for seamless integration into your workflows. Connect now to leverage powerful natural language processing and generation features.",
    logo: Gemini,
    url: "https://generativelanguage.googleapis.com/v1beta/models",
  },
  {
    id: "openai",
    provider: "OpenAI",
    description:
      "OpenAI provides powerful language models for building advanced AI applications. Use it to enhance chatbots, generate text, and more.",
    logo: OpenAI,
    url: "https://api.openai.com/v1/models",
  },
  {
    id: "llama",
    provider: "Meta LLama",
    description:
      "Meta's LLaMA is a family of open-source language models optimized for research and lightweight deployment on personal infrastructure.",
    logo: LLama,
    url: "https://huggingface.co/api/whoami-v2",
  },
];
