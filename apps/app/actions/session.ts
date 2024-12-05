"use server"
import { betterFetch } from "@better-fetch/fetch";
import { Session } from "@repo/auth";
import { headers } from "next/headers";

export const getSession = async () => {

  const response = await betterFetch<Session>("http://localhost:3001/api/auth/get-session", 
    {
      baseURL: "http://localhost:3002",
      headers: {
        cookie: (await headers()).get("cookie") || "",
      },
  });
  return response.data
  
}