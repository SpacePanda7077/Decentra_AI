// services/tools/hederaLogTool.ts
import { submitMessageToConsensus } from "../hedera/submitMessage.js";
import { saveMessageRecord } from "../db/saveMessageRecord.js";

/**
 * Hedera tool — server-only.
 * Submits the raw user message to Hedera and creates a placeholder DB record (ai_response null).
 */
export const hederaLogTool = {
  name: "hederaLogTool",
  description: "Submit user message to Hedera Consensus and persist a placeholder record.",
  async func({ wallet, apiKey, message }: { wallet?: string; apiKey?: string; message: string }): Promise<{ transactionId: string | null; consensusTimestamp: string | null }> {
    try {
      if (!message) {
        throw new Error("Message is required for Hedera logging");
      }

      // Try to submit to Hedera with retries
      let retries = 3;
      let lastError;
      let consensusResult;

      while (retries > 0) {
        try {
          consensusResult = await submitMessageToConsensus(message);
          break;
        } catch (error: any) {
          lastError = error;
          retries--;
          if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s between retries
            continue;
          }
          throw new Error(`Hedera consensus failed: ${error.message || 'Unknown error'}`);
        }
      }

      if (!consensusResult) {
        throw lastError || new Error("Failed to submit message to Hedera");
      }

      const { transactionId, consensusTimestamp } = consensusResult;

      // Attempt to save placeholder record
      try {
        await saveMessageRecord(
          {
            wallet: wallet ?? null,
            api_key: apiKey ?? null,
            user_message: message,
            ai_response: null,
            model: null,
            transaction_id: transactionId,
            consensus_timestamp: consensusTimestamp,
          },
          { upsertByTx: false }
        );
      } catch (dbError) {
        // Log DB error but don't fail the request since we have the Hedera transaction
        console.error("Failed to save placeholder record:", dbError);
      }

      return { transactionId, consensusTimestamp };
    } catch (error: any) {
      console.error("Hedera log tool error:", error);
      // Return null values to indicate Hedera logging failed
      return { transactionId: null, consensusTimestamp: null };
    }
  },
};
