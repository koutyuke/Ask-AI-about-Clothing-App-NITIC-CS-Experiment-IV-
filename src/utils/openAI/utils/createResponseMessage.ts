import type { MessageContent } from "@langchain/core/messages";

const createAIResponseMessage = (messageContent: MessageContent): string => {
  if (typeof messageContent === "string") {
    return messageContent;
  }
  return messageContent.reduce(
    (acc, c) =>
      acc +
      (c.type === "text"
        ? c.text
        : c.type === "image_url"
        ? `\n${c.image_url}\n`
        : ""),
    ""
  );
};

export { createAIResponseMessage };
