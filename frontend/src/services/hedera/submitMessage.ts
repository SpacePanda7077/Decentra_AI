// services/hedera/submitMessage.ts
import { Client, TopicMessageSubmitTransaction, TopicId } from "@hashgraph/sdk";

/**
 * Create Hedera client (server-side).
 */
function createHederaClient() {
  const network = process.env.HEDERA_NETWORK || "testnet";
  const client = network === "mainnet" ? Client.forMainnet() : Client.forTestnet();

  const operatorId = process.env.HEDERA_OPERATOR_ID;
  const operatorKey = process.env.HEDERA_OPERATOR_KEY;

  if (!operatorId || !operatorKey) {
    throw new Error("Missing HEDERA_OPERATOR_ID or HEDERA_OPERATOR_KEY in env");
  }

  client.setOperator(operatorId, operatorKey);
  return client;
}

/**
 * Submit a message string to the configured Hedera topic.
 * Returns { transactionId, consensusTimestamp }.
 */
export async function submitMessageToConsensus(message: string) {
  if (!process.env.HEDERA_TOPIC_ID) {
    throw new Error("Missing HEDERA_TOPIC_ID in env");
  }

  const client = createHederaClient();
  const topicId = TopicId.fromString(process.env.HEDERA_TOPIC_ID);

  const tx = await new TopicMessageSubmitTransaction({
    topicId,
    message,
  }).execute(client);

  // Try to get record (v1) for consensusTimestamp; if that fails, fallback to receipt (v2)
  try {
    const record = await tx.getRecord(client);
    return {
      transactionId: tx.transactionId.toString(),
      consensusTimestamp: record.consensusTimestamp?.toDate().toISOString() ?? null,
    };
  } catch (err) {
    // If record is not available, just return the transaction ID
    return {
      transactionId: tx.transactionId.toString(),
      consensusTimestamp: null,
    };
  }
}
