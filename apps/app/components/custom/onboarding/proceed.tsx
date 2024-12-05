"use client";
import { Button } from "@/components/ui/button";
import { AI } from "@/lib/ai";
import { useActions, useUIState } from "ai/rsc";
import { useState } from "react";

export default function Proceed() {
  const [activeButton, setActiveButton] = useState<"yes" | "no" | null>(null);
  const { sendMessage } = useActions<typeof AI>();
  const [messages, setMessages] = useUIState<typeof AI>();
const handleClick = async (reply: "yes"|"no") => {
  setActiveButton(reply);
  try {
    const response = await sendMessage(reply);
    setMessages((currentMessages) => [...currentMessages, response]);
    console.log("response", JSON.stringify(response.display));
  } catch (error) {
    setActiveButton(null);
    console.log("error", error);
  }
};

  return (
    <div className="p-1 bg-transparent rounded-lg shadow-md">
      <h2 className="text-md  font-bold mb-2 text-start">
        Should we continue?
      </h2>
      <div className="flex justify-start space-x-2">
        <Button
          onClick={(e) => handleClick("yes")}
          variant={activeButton === "yes" ? "default" : "outline"}
          className={`w-16 bg-woodsmoke-950  rounded-full  disabled:cursor-not-allowed ${activeButton === "yes" ? " bg-neutral-600 " : ""}`}
          aria-pressed={activeButton === "yes"}
          disabled={activeButton === "yes" || activeButton === "no"}
        >
          Yes
        </Button>
        <Button
          onClick={() => handleClick("no")}
          variant={activeButton === "no" ? "default" : "outline"}
          className={`w-16 rounded-full bg-woodsmoke-950  disabled:cursor-not-allowed  ${activeButton === "no" ? " bg-neutral-600" : ""}`}
          aria-pressed={activeButton === "no"}
          disabled={activeButton === "no" || activeButton === "yes"}
        >
          No
        </Button>
      </div>
    </div>
  );
}