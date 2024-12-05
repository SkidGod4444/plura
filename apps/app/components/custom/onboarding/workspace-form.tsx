"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Car, LoaderCircle, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { sleep } from "@/lib/utils";
const createWorkspace =async(workspaceName:string)=>{
  await sleep(2000);
  return {
    id: Date.now(),
    name: workspaceName,
  }
}
export default function DialogDemo() {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault()

   const data = new FormData(e.currentTarget);

   const workspaceName = data.get("workspace") as string

   try {
    setIsLoading(true);

    const res = await createWorkspace(workspaceName)

    toast.success(`Workspace ${workspaceName} created`)

    return res
   } catch (error) {
     toast.error(`Error creating workspace!Please try again `)
     console.log("error", error);
   }finally{
    setIsLoading(false);
   }
   
  };
  return (
    <Card className="bg-woodsmoke-950 rounded-lg shadow-md sm:w-[350px] shrink">
      <CardContent>
        <div className=" flex flex-col py-4 ">
          <CardTitle className="sm:text-start text-bold text-2xl text-center text-neutral-200">
            Create Workspace
          </CardTitle>
          <CardDescription className="text-start text-neutral-400">
            Create a new workspace for your account
          </CardDescription>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="relative">
            <Label className="text-sm text-neutral-400">Workspace Name</Label>
            <Input
              name="workspace"
              placeholder="eg:new-workspace"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className={cn("w-full bg-gray-200 rounded-md", {
              "bg-neutral-600": isLoading,
            })}
            disabled={isLoading || value.trim().length === 0}
          >
            {isLoading ? <LoaderCircle className="animate-spin" /> : "Create"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
