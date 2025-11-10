/**
 * Service helpers for interacting with the BestAthlete Coach Agent.
 * The agent is exposed via the CoachAgent Lambda in bestathlete-mob-be and
 * expects a payload of `{ message, idCustomer }`, where message is the latest
 * user utterance and idCustomer is the BestAthlete customer identifier.
 *
 * Configure the endpoint through REACT_APP_ASSISTANT_ENDPOINT, e.g.
 *   REACT_APP_ASSISTANT_ENDPOINT=https://<api-id>.execute-api.eu-west-1.amazonaws.com/ai/coach
 *
 * When the endpoint is not available we keep returning a canned response so
 * that the UI continues to function in lower environments.
 */

import { getTraceHeaders } from "./traceHelpers";

const { REACT_APP_ASSISTANT_ENDPOINT } = process.env;

/**
 * Sends a conversation turn to the assistant service and returns the agent reply.
 *
 * @param {Object} params
 * @param {string} params.idCustomer - Identifier used by the backend to scope data.
 * @param {Array<{ role: string, content: string }>} params.messages - Full chat history.
 * @returns {Promise<{ role: string, content: string, [key: string]: any }>}
 */
export const assistantSendMessage = async ({ idCustomer, messages }) => {
  if (!idCustomer) {
    throw new Error("assistantSendMessage requires a valid idCustomer");
  }

  if (!Array.isArray(messages)) {
    throw new Error("assistantSendMessage requires an array of messages");
  }

  const latestUserMessage = [...messages]
    .reverse()
    .find((msg) => msg?.role === "user" && typeof msg.content === "string");

  if (!latestUserMessage) {
    throw new Error("assistantSendMessage could not find a user message to send");
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
    message: latestUserMessage.content,
    idCustomer,
    conversation: messages, // CoachAgent currently ignores this, but we send it for future context
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
     * CoachAgent responds with { chat: string, plan?: object }.
     * We normalise that into the legacy { role, content } shape so the
     * rest of the UI can continue to treat it like a chat transcript.
     */
    const content = typeof data?.chat === "string" ? data.chat : data?.content;

    if (!content) {
      throw new Error("Assistant response missing a valid chat field");
    }

    return {
      role: "assistant",
      content,
      plan: data?.plan ?? null,
      raw: data,
    };
  } catch (error) {
    console.error("[assistantServices] Error while contacting assistant:", error);
    throw error;
  }
};
