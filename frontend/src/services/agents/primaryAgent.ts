// services/agents/primaryAgent.ts
import { hederaLogTool } from "../tools/hederaLogTool.js";
import { aiModelTool } from "../tools/aiModelTool.js";
import { verifyApiKey } from "@/actions/supabase/api_keys.js";

/**
 * Primary Agent orchestrator.
 * Validates API key, calls Hedera log tool, then model tool, returns final payload.
 */
export async function invokeAgent(params: {
  wallet?: string;
  apiKey: string;
  model: string;
  message: string;
}) {
  const { wallet, apiKey, model, message } = params;

  try {
    // Input validation
    if (!apiKey) throw new Error("API key is required");
    if (!message) throw new Error("Message is required");
    if (!model) throw new Error("Model selection is required");

    // 0) Verify API key + quota (server-side)
    const check = await verifyApiKey(apiKey);
    if (!check.ok) {
      throw new Error(check.error || "Invalid or exhausted API key");
    }

    // 1) Hedera: log message with retries
    let hederaRes;
    try {
      hederaRes = await hederaLogTool.func({ wallet, apiKey, message });
    } catch (error) {
      console.error("Hedera logging failed:", error);
      // Continue with AI response even if Hedera fails
      hederaRes = { transactionId: null, consensusTimestamp: null };
    }

    // 2) AI Model: call Unreal to get response (and update DB record)
    let modelRes;
    try {
      modelRes = await aiModelTool.func({
        apiKey,
        model,
        message,
        wallet,
        transactionId: hederaRes.transactionId,
        consensusTimestamp: hederaRes.consensusTimestamp,
      });
    } catch (error: any) {
      console.error("AI model error:", error);
      throw new Error(error.message || "Failed to get AI response");
    }

    // Successful response
    return {
      success: true,
      aiResponse: modelRes.aiContent,
      transactionId: hederaRes.transactionId,
      consensusTimestamp: hederaRes.consensusTimestamp,
    };
  } catch (error: any) {
    // Return a structured error response
    console.error("Agent invocation error:", error);
    return {
      success: false,
      error: error.message || "Failed to process message",
    };
  }
}
