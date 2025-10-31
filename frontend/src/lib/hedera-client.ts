import {
  Client,
  PrivateKey,
  Hbar,
  AccountId,
  TransactionReceipt
} from "@hashgraph/sdk";

const accountId = process.env.HEDERA_ACCOUNT_ID;
const privateKey = process.env.HEDERA_PRIVATE_KEY;
const network = process.env.HEDERA_NETWORK || "testnet"; // "mainnet" or "testnet"

if (!accountId || !privateKey) {
  throw new Error("❌ Missing HEDERA_ACCOUNT_ID or HEDERA_PRIVATE_KEY in environment variables");
}

export const hederaClient = (() => {
  let client: Client;

  if (network === "mainnet") {
    client = Client.forMainnet();
  } else {
    client = Client.forTestnet();
  }

  client.setOperator(AccountId.fromString(accountId), PrivateKey.fromString(privateKey));
  console.log(`✅ Hedera client initialized for ${network.toUpperCase()}`);

  return client;
})();

/**
 * Submit a message to Hedera Consensus Service
 */



export async function sendMessageToHedera(topicId: string, message: string) {
  const { TopicMessageSubmitTransaction } = await import("@hashgraph/sdk");

  const tx = new TopicMessageSubmitTransaction({
    topicId,
    message
  });

            const submit = await tx.execute(hederaClient);
            const receipt: TransactionReceipt = await submit.getReceipt(hederaClient);
            // 1. Execute the transaction
            const txResponse = await someTransaction.execute(client);

            // 2. Get receipt to confirm it succeeded
            const receipt = await txResponse.getReceipt(client);
            console.log("Status:", receipt.status.toString());

            // 3. Get transaction record to access consensusTimestamp
            const record = await txResponse.getRecord(client);

            // 4. Extract the timestamp
            const consensusTimestamp = record.consensusTimestamp
            ? record.consensusTimestamp.toDate().toISOString()
            : null;

            console.log("Consensus Timestamp:", consensusTimestamp);


            return {
                transactionId: submit.transactionId.toString(),
                consensusTimestamp
            };
            }

/**
 * Optional: Utility to get account balance
 */
export async function getHederaBalance() {
  const balance = await hederaClient.getAccountBalance(AccountId.fromString(accountId));
  return balance.hbars.toString(HbarUnit.Hbar);
}
