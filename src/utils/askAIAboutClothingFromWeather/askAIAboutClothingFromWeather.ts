import type { Weather } from "@/src/types/weather";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import { generatePrompt } from "../genPrompt";
import { baseHumanMessage } from "../openAI/message/human";
import { baseSystemMessage } from "../openAI/message/system";
import { createChatModel } from "../openAI/model";

type ClothingRecommendation = {
  summary: string;
  point: string;
  tops: string;
  outerwear: string;
  bottoms: string;
  shoes: string;
  accessories: string;
};

const extractionFunctionSchema = {
  name: "extractor",
  description: "Extracts fields from the input.",
  parameters: {
    type: "object",
    properties: {
      summary: {
        type: "string",
        description: "The summary of the clothing recommendation.",
      },
      point: {
        type: "string",
        description: "The point of the clothing recommendation.",
      },

      tops: {
        type: "string",
        description: "The recommended top.",
      },
      outerwear: {
        type: "string",
        description: "The recommended outerwear.",
      },
      bottoms: {
        type: "string",
        description: "The recommended bottoms.",
      },
      shoes: {
        type: "string",
        description: "The recommended shoes.",
      },
      accessories: {
        type: "string",
        description: "The recommended accessories.",
      },
    },
    required: [
      "summary",
      "tops",
      "outerwear",
      "bottoms",
      "shoes",
      "accessories",
    ],
  },
};

const askAIAboutClothingFromWeather = async (
  weather: Weather
): Promise<ClothingRecommendation> => {
  const parser = new JsonOutputFunctionsParser();
  const chatModel = createChatModel("gpt-4o");
  const runnable = chatModel
    .bind({
      functions: [extractionFunctionSchema],
      function_call: { name: "extractor" },
    })
    .pipe(parser);

  const weatherText = generatePrompt(weather);
  const question = "今日の服装は何がいいですか？";

  const systemMessage = baseSystemMessage();
  const humanMessage = await baseHumanMessage({
    weather: weatherText,
    question,
  });

  const res = (await runnable.invoke([
    systemMessage,
    humanMessage,
  ])) as ClothingRecommendation;

  return res;
};

export { askAIAboutClothingFromWeather, type ClothingRecommendation };
