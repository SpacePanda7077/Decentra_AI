// Agent types
export interface AgentParams {
  wallet?: string;
  apiKey: string;
  model: string;
  message: string;
}

export interface AgentSuccessResponse {
  success: true;
  aiResponse: string;
  transactionId: string | null;
  consensusTimestamp: string | null;
}

export interface AgentErrorResponse {
  success: false;
  error: string;
}

export type AgentResponse = AgentSuccessResponse | AgentErrorResponse;