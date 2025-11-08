/**
 * Service helpers for interacting with the BestAthlete AI assistant.
 * The assistant is expected to sit behind a REST endpoint that proxies to
 * a ChatGPT-style agent capable of issuing function calls into the existing
 * AWS Amplify / DynamoDB backend.
 *
 * The endpoint URL should be provided via the REACT_APP_ASSISTANT_ENDPOINT
 * environment variable, for example:
 *   REACT_APP_ASSISTANT_ENDPOINT=https://api.example.com/assistant/chat
 *
 * Until that endpoint is available this module will fall back to returning a
 * canned response so that the UI can function without breaking.
 */

import { getTraceHeaders } from "./traceHelpers";

const { REACT_APP_ASSISTANT_ENDPOINT } = process.env;

/**
 * Sends a conversation turn to the assistant service and returns the agent reply.
 *
 * @param {Object} params
 * @param {string} params.customerId - Identifier used by the backend to scope data.
 * @param {Array<{ role: string, content: string }>} params.messages - Full chat history.
 * @returns {Promise<{ role: string, content: string, [key: string]: any }>}
 */
export const assistantSendMessage = async ({ customerId, messages }) => {
  if (!Array.isArray(messages)) {
    throw new Error("assistantSendMessage requires an array of messages");
  }

  // If no endpoint is configured yet, simulate a minimal assistant response.
  if (!REACT_APP_ASSISTANT_ENDPOINT) {
    console.warn(
      "[assistantServices] REACT_APP_ASSISTANT_ENDPOINT not set. Returning fallback response."
    );
    return {
      role: "assistant",
      content:
        "I'm not connected to the training planner just yet, but I'm here to listen. Let me know how you're feeling and we'll use that once the integration is ready.",
      isFallback: true,
    };
  }

  const payload = {
    customerId,
    messages,
  };

  try {
    const response = await fetch(REACT_APP_ASSISTANT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getTraceHeaders(),
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Assistant service responded with ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();

    /**
     * The backend is expected to return an object with at least:
     * { role: "assistant", content: "..." }
     * Additional metadata (such as drafted workout adjustments) will be passed through.
     */
    if (!data || typeof data.content !== "string") {
      throw new Error("Assistant response missing a valid content field");
    }

    return data;
  } catch (error) {
    console.error("[assistantServices] Error while contacting assistant:", error);
    throw error;
  }
};
