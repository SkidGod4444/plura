"use client";
import { Sparkle, UserIcon } from "lucide-react";
import { motion } from "motion/react";

export function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full justify-end ">
      <div className="group relative inline-flex mt-auto items-center md:-ml-12 ml-auto">
        <div className="mr-4 flex items-center overflow-hidden">{children}</div>
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-primary text-primary-foreground">
          <UserIcon />
        </div>
      </div>
    </div>
  );
}

export function BotMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={`flex flex-row w-full  md:px-0 `}
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="flex w-full justify-start ">
        <div className="group relative inline-flex mt-auto items-start ">
          <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-primary text-primary-foreground">
            <Sparkle />
          </div>
          <div className="ml-4 flex items-start overflow-hidden grow">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}


