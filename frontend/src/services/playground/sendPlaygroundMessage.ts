// services/playground/sendPlaygroundMessage.ts
import { invokeAgent } from "../agents/primaryAgent.js";

/**
 * Entry function called by your server action / API route.
 * Keep this server-side only and import it from server actions.
 */
export async function sendPlaygroundMessage({
  wallet,
  apiKey,
  model,
  message,
}: {
  wallet?: string;
  apiKey: string;
  model: string;
  message: string;
}) {
  return await invokeAgent({ wallet, apiKey, model, message });
}





