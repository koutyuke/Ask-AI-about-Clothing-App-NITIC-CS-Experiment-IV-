import { HumanMessage } from "@langchain/core/messages";
import { weatherChatPromptTemplate } from "../../promptTemplate/weather";

type Options = Parameters<typeof weatherChatPromptTemplate>[0];

const baseHumanMessage = async ({ ...options }: Options) => {
  return new HumanMessage(await weatherChatPromptTemplate(options));
};

export { baseHumanMessage };
