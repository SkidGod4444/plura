import type { UIState } from "@/lib/ai";

export function ChatList({ messages }: { messages: UIState[number][] }) {

 console.log(messages)

  return (
    <div className="relative mx-auto w-full md:p-0 p-4 ">
      {messages.map((message, index) => (
        <div key={index} className="pb-4">
          {message.display}
        </div>
      ))}
    </div>
  );
}
