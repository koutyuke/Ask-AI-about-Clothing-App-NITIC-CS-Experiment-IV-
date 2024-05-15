import { PromptTemplate } from "@langchain/core/prompts";

type Options = {
  weather?: string;
  question: string;
};

const weatherChatPromptTemplate = async ({ weather, question }: Options) => {
  const textTemplate = new PromptTemplate({
    template:
      "---Weather Information---\n{weather}\n\n---question---\n{question}",
    inputVariables: ["weather", "question"],
  });
  return await textTemplate.format({ weather: weather ?? "None", question });
};

export { weatherChatPromptTemplate };
