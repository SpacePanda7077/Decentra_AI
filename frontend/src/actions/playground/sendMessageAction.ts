"use server";

import { sendPlaygroundMessage } from "@/services/playground/sendPlaygroundMessage";

/**
 * Server Action called from the Playground UI
 */
export async function sendMessageAction({
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
  try {
    const result = await sendPlaygroundMessage({ wallet, apiKey, model, message });
    return {
      success: true,
      aiResponse: result.aiResponse,
      transactionId: result.transactionId,
      consensusTimestamp: result.consensusTimestamp,
    };
  } catch (error: any) {
    console.error("sendMessageAction error:", error);
    return { success: false, error: error.message || "Unknown error" };
  }
}
