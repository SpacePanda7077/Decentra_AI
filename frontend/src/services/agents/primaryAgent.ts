// services/agents/primaryAgent.ts
import { hederaLogTool } from "../tools/hederaLogTool.js";
import { aiModelTool } from "../tools/aiModelTool.js";
import { supabase } from "@/lib/supabase";
import { AgentParams, AgentResponse } from "./types";

/**
 * Verify if an API key is valid and has available quota
 */
async function verifyApiKey(apiKey: string): Promise<{ ok: boolean; error?: string }> {
  try {
    if (!apiKey) {
      return { ok: false, error: "API key is required" };
    }

    const { data, error } = await supabase
      .from("api_keys")
      .select("calls")
      .eq("api_key", apiKey)
      .single();

    if (error) {
      return { ok: false, error: "Invalid API key" };
    }

    // Check if the key has any calls left (null means unlimited)
    const hasQuota = data.calls === null || data.calls > 0;
    if (!hasQuota) {
      return { ok: false, error: "API key quota exhausted" };
    }

    return { ok: true };
  } catch (error) {
    console.error("Error verifying API key:", error);
    return { 
      ok: false, 
      error: error instanceof Error ? error.message : "Failed to verify API key"
    };
  }
}

/**
 * Primary Agent orchestrator.
 * Validates API key, calls Hedera log tool, then model tool, returns final payload.
 */
export async function invokeAgent(params: AgentParams): Promise<AgentResponse> {
  const { wallet, apiKey, model, message } = params;

  try {
    // Input validation
    if (!apiKey) {
      return { success: false, error: "API key is required" };
    }
    if (!message) {
      return { success: false, error: "Message is required" };
    }
    if (!model) {
      return { success: false, error: "Model selection is required" };
    }

    // 0) Verify API key + quota (server-side)
    const check = await verifyApiKey(apiKey);
    if (!check.ok) {
      return { success: false, error: check.error || "Invalid or exhausted API key" };
    }

    // 1) Hedera: log message with retries
    let hederaRes = { transactionId: null as string | null, consensusTimestamp: null as string | null };
    try {
      const result = await hederaLogTool.func({ wallet, apiKey, message });
      if (result) {
        hederaRes = {
          transactionId: result.transactionId,
          consensusTimestamp: result.consensusTimestamp
        };
      }
    } catch (error) {
      console.error("Hedera logging failed:", error);
      // Continue with AI response even if Hedera fails
    }

    // 2) AI Model: call Unreal to get response (and update DB record)
    try {
      const modelRes = await aiModelTool.func({
        apiKey,
        model,
        message,
        wallet,
        transactionId: hederaRes.transactionId,
        consensusTimestamp: hederaRes.consensusTimestamp,
      });

      if (!modelRes?.aiContent) {
        throw new Error("No response content from AI model");
      }

      // Successful response
      return {
        success: true,
        aiResponse: modelRes.aiContent,
        transactionId: hederaRes.transactionId,
        consensusTimestamp: hederaRes.consensusTimestamp,
      };
    } catch (error: any) {
      console.error("AI model error:", error);
      return {
        success: false,
        error: error?.message || "Failed to get AI response"
      };
    }
  } catch (error: any) {
    // Return a structured error response
    console.error("Agent invocation error:", error);
    return {
      success: false,
      error: error?.message || "Failed to process message",
    };
  }
}
