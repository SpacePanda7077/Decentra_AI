// services/tools/aiModelTool.ts
import { getChatCompletion } from "@/actions/unreal/chat.js";
import { saveMessageRecord } from "../db/saveMessageRecord.js";

/**
 * Model tool — server-only.
 * Calls your existing Unreal API wrapper and updates the DB record (if transactionId provided).
 */
export const aiModelTool = {
  name: "aiModelTool",
  description: "Call the installed Unreal AI to generate a response and save it to DB.",
  /**
   * params:
   * - apiKey: string (api key token / session token to call Unreal)
   * - model: string
   * - message: string
   * - wallet?: string
   * - transactionId?: string
   * - consensusTimestamp?: string
   */
  async func({
    apiKey,
    model,
    message,
    wallet,
    transactionId,
    consensusTimestamp,
  }: {
    apiKey: string;
    model: string;
    message: string;
    wallet?: string;
    transactionId?: string | null;
    consensusTimestamp?: string | null;
  }): Promise<{ aiContent: string }> {
    try {
      // Input validation
      if (!apiKey) throw new Error("API key is required");
      if (!message) throw new Error("Message is required");
      if (!model) throw new Error("Model selection is required");

      // Call AI model with retries
      let data;
      let retries = 3;
      let lastError;

      while (retries > 0) {
        try {
          data = await getChatCompletion(apiKey, model, message);
          break;
        } catch (error: any) {
          lastError = error;
          retries--;
          if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s between retries
            continue;
          }
          throw error;
        }
      }

      if (!data) {
        throw lastError || new Error("Failed to get response from AI model");
      }

      // Parse and validate AI response
      const aiContent = data.choices?.[0]?.message?.content;

      if (!aiContent) {
        throw new Error("Invalid or empty response from AI model");
      }

      // Attempt to save to database
      try {
        const messageRecord = {
          wallet: wallet ?? null,
          api_key: apiKey ?? null,
          user_message: message,
          ai_response: aiContent,
          model: model ?? null,
          transaction_id: transactionId ?? null,
          consensus_timestamp: consensusTimestamp ?? null,
        };

        if (transactionId) {
          await saveMessageRecord(messageRecord, { upsertByTx: true });
        } else {
          await saveMessageRecord(messageRecord);
        }
      } catch (dbError) {
        // Log DB error but don't fail the request
        console.error("Failed to save message record:", dbError);
      }

      // Return the AI response
      return { aiContent };
    } catch (error: any) {
      console.error("AI model tool error:", error);
      throw new Error(error.message || "Failed to get AI response");
    }
  }
};
