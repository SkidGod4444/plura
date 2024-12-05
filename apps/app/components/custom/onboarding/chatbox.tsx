"use client"
import { AI } from "@/lib/ai";
import { useActions, useUIState } from "ai/rsc";
import { ChatList } from "./chatList";
import { UserMessage } from "./message";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { use, useEffect, useRef } from "react";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import { sleep } from "@/lib/utils";

const formSchema = z.object({
  message: z.string(),
});
type formType = z.infer<typeof formSchema>

export default function Chatbox() {
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();
 const [messages, setMessages] = useUIState<typeof AI>();
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });
 const { sendMessage,sendAiGreeting} = useActions<typeof AI>();
 const onSubmit = async (data: formType) => {         
  console.log(data)
  const message = data.message.trim();
  if (!message) {
    return 
  } 
  form.reset()
   setMessages((currentMessages) => [
     ...currentMessages,
     {
       id: Date.now(),
       role: "user",
       display: <UserMessage>{message}</UserMessage>,
     },
   ]);
   try {
      const response = await sendMessage(message);
      setMessages((currentMessages) => [...currentMessages, response]);
   } catch (error) {
    toast.error("Something went wrong");
   }
 };
let count = 0
 useEffect(() => {
  const fetchAiGreeting = async () => {
    const response = await sendAiGreeting();
    console.log("greeting", response)
    setMessages((currentMessages) => [...response,...currentMessages]);
  };
  fetchAiGreeting();
 }, [])
 useEffect(() => {
    const fetchProceed = async()=> {
     await sleep(3000)
      const response = await sendMessage("should we continue?")
      setMessages((currentMessages) => [...currentMessages,response]);
   
    }
    if(messages.length === 1){
      fetchProceed()
    }
 }, [messages.length])

  return (
    <div className=" mx-auto max-w-2xl relative ">
      <div ref={messagesContainerRef} className="pb-[200px] pt-4 md:pt-10 h-[calc(100vh-130px)] overflow-y-auto ">
        <ChatList messages={messages} />
        <div ref={messagesEndRef}  />
      </div>
      <div className="fixed inset-x-0 w-full bottom-4 ">
        <div className="max-w-2xl mx-auto sm:p-0 px-4   ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grow border border-woodsmoke-900/[0.5] flex flex-row justify-center items-center rounded-full bg-woodsmoke-950 p-1 shadow-md ">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Textarea
                          className="resize-none  placeholder:text-neutral-600"
                          placeholder="Leave a comment"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className=" p-1 self-end group">
                  <Button
                    type="submit"
                    className="p-2  rounded-2xl bg-woodsmoke-700 border border-neutral-700 hover:bg-woodsmoke-700/80"
                    size={"sm"}
                  >
                    <ArrowUp
                      size={20}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="text-neutral-500 group-hover:text-neutral-200 "
                    />
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}