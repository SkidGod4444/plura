import { createAI } from "ai/rsc";
import { ClientMessage, ServerMessage, sendMessage,sendAiGreeting } from "@/actions/action";

export type AIState = ServerMessage[];
export type UIState = ClientMessage[];

export const AI = createAI<
  AIState,
  UIState,
  {
    sendMessage: (message: string) => Promise<ClientMessage>;
    sendAiGreeting: () => Promise<ClientMessage[]>;
  }
>({
  initialAIState: [],
  initialUIState: [],
  actions: {
    sendMessage,
    sendAiGreeting,
  },
});
