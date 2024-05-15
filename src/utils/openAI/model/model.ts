import { ChatOpenAI } from "@langchain/openai";
import type { GPTModel } from "./type";

const API_KEY =
  process.env.OPENAI_API_KEY || process.env.EXPO_PUBLIC_OPENAI_API_KEY;

const createChatModel = (modelName: GPTModel = "gpt-3.5-turbo") => {
  if (!API_KEY) {
    throw new Error("APIキーが設定されていません。");
  }

  return new ChatOpenAI({
    modelName: modelName,
    maxTokens: 1024,
    temperature: 0.2,
    apiKey: API_KEY,
  });
};

export { createChatModel };
