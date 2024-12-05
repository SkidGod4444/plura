import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {ArrowUp} from "lucide-react";

export function ChatInput() {
  return (
    <div className="fixed inset-x-0 w-full bottom-4 ">
      <div className="max-w-2xl mx-auto ">
        <form>
          <div className="grow border border-card flex flex-col justify-center items-center rounded-2xl bg-card p-1 shadow-md ">
            <Textarea
              id="textarea-17"
              className="resize-none placeholder:text-neutral-600"
              placeholder="Leave a comment"
            />

            <div className=" px-2 self-end group">
              <div className="p-1 rounded-md bg-woodsmoke-700 border border-neutral-700">
                <ArrowUp
                  size={20}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="text-neutral-500 group-hover:text-neutral-200 "
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}



