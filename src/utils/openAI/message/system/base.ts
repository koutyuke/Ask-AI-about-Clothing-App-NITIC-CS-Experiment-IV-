import { SystemMessage } from "@langchain/core/messages";

const baseSystemMessage = () => {
  return new SystemMessage(
    "You are a clothing advisor. Suggest the best attire based on the information given. Reply to the following questions in Japanese"
  );
};

export { baseSystemMessage };
