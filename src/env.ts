import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    BACKEND_URL: z.string().url(),
    FRONTEND_URL: z.string().url(),
    API_URL: z.string().url(),
    // AUTH_URL কে ফ্রন্টএন্ড ডোমেইনে পয়েন্ট করান
    BETTER_AUTH_URL: z.string().url(), 
  },
  runtimeEnv: {
    BACKEND_URL: process.env.BACKEND_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    API_URL: process.env.API_URL,
    // ভেরিয়েবলগুলো এনভায়রনমেন্ট থেকে রিড করা
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || process.env.FRONTEND_URL,
  },
});