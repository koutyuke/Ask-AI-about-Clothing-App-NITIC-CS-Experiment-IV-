import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import { baseHumanMessage } from "./message/human";
import { baseSystemMessage } from "./message/system";
import { createChatModel } from "./model";

type ClothingRecommendation = {
  summary: string;
  point: string;
  tops: string;
  outerwear: string;
  bottoms: string;
  shoes: string;
  accessories: string;
};

const main = async () => {
  const parser = new JsonOutputFunctionsParser();

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

  const weather =
    "気象状況:曇り\n最低気温:13度\n最高気温:19度\n湿度:60%\n風:東北5m/s\n降水確率:0%\n";

  const question = "今日の服装は何がいいですか？";

  const chatModel = createChatModel("gpt-4o");

  const runnable = chatModel
    .bind({
      functions: [extractionFunctionSchema],
      function_call: { name: "extractor" },
    })
    .pipe(parser);

  const systemMessage = baseSystemMessage();
  const humanMessage = await baseHumanMessage({ weather, question });

  const res = (await runnable.invoke([
    systemMessage,
    humanMessage,
  ])) as ClothingRecommendation;

  console.log(res);
};

main();
