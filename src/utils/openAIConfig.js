import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});
