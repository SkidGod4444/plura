"use server";
import { ReactNode } from "react";
import { createStreamableValue, getMutableAIState, streamUI } from "ai/rsc";
import { togetherai } from "@ai-sdk/togetherai";
import { AI } from "@/lib/ai";
import { BotMessage } from "@/components/custom/onboarding/message";
import BeatLoader from "@/components/custom/onboarding/BeatLoader";
import { getSession } from "./session";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Proceed from "@/components/custom/onboarding/proceed";
import WorkspaceForm from "@/components/custom/onboarding/workspace-form";
import {sleep } from "@/lib/utils";
export type ServerMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ClientMessage = {
  id: number;
  role: "user" | "assistant";
  display: ReactNode;
};

export const sendMessage = async (
  message: string
): Promise<{
  id: number;
  role: "user" | "assistant";
  display: ReactNode;
}> => {
  const history = getMutableAIState<typeof AI>();
  console.log(history.get().length)

  history.update([...history.get(), { role: "user", content: message }]);

  const response = await streamUI({
    model: togetherai("meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo"),
    system: `You are a helpful assistant.
    if the message comes as "should we continue" then call proceed tool
    if the message comes as  "yes" then call workspace tool`,
    messages: [{ role: "user", content: message }, ...history.get()],
    temperature: 0,
    initial: (
      <BotMessage>
        <BeatLoader />
      </BotMessage>
    ),
    text: async function ({ content, done }) {
      await sleep(1000);
      if (done) {
        history.done([...history.get(), { role: "assistant", content }]);
        
      }
      return <BotMessage>{content}</BotMessage>;
    },
    tools: {
        workspace:{
        description: "yes",
        parameters: z.object({}),
        generate: async function* ({}) {
          yield (console.log("call workspace"),
          (
            <BotMessage>
              <BeatLoader />
            </BotMessage>
          ));

          return (
            <BotMessage>
             <WorkspaceForm />
            </BotMessage>
          );
        },
      },
      proceed: {
        description: "should we continue",
        parameters: z.object({}),
        generate: async function* ({}) {
          yield (console.log("should we continue?"),
          (
            <BotMessage>
              <BeatLoader />
            </BotMessage>
          ));

          return (
            <BotMessage>
             <Proceed />
            </BotMessage>
          );
        },
      },
    
    },
  });

  return {
    id: Date.now(),
    role: "assistant" as const,
    display: response.value,
  };
};
 export const sendAiGreeting = async ():Promise<ClientMessage[]> => {
  const session= await getSession()
  const {name,email} = session!.user
  const contentString = `Hi ${name}, welcome to Plura AI!.Your email is ${email}.I am going to help you with oboarding your acccount`
  const history = getMutableAIState<typeof AI>();
  console.log(history.get())
  const value = await streamUI({
    model: togetherai("meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo"),
    system: ` always reply the exact same text exactly as it is: ${contentString}
    `,
    messages: history.get(),
    initial: (
      <BotMessage>
        <BeatLoader />
      </BotMessage>
    ),
    text: async function ({ content, done }) {
      await sleep(1000);
      if (done) {
        history.done([...history.get(), { role: "assistant", content }]);
      }
      return <BotMessage>{content}</BotMessage>;
    },
  });

  return [{
    id: Date.now(),
    role: "assistant" as const,
    display: value.value
  }]
 }
