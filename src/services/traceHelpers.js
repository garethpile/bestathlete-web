const TRACE_HEADER_NAME = "x-amzn-trace-id";

const randomHex = (byteLength) => {
  const cryptoGlobal =
    typeof globalThis !== "undefined" ? globalThis.crypto : undefined;

  if (cryptoGlobal && typeof cryptoGlobal.getRandomValues === "function") {
    const bytes = new Uint8Array(byteLength);
    cryptoGlobal.getRandomValues(bytes);
    return Array.from(bytes, (byte) =>
      byte.toString(16).padStart(2, "0")
    ).join("");
  }

  // Fallback for environments without window.crypto (e.g., certain tests)
  return Array.from({ length: byteLength }, () =>
    Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0")
  ).join("");
};

const buildTraceHeader = () => {
  const epochHex = Math.floor(Date.now() / 1000).toString(16);
  const uniqueId = randomHex(12); // 24 hex chars
  const parentId = randomHex(8); // 16 hex chars
  return `Root=1-${epochHex}-${uniqueId};Parent=${parentId};Sampled=1`;
};

let currentTraceHeader = buildTraceHeader();

export const startNewTrace = () => {
  currentTraceHeader = buildTraceHeader();
  return currentTraceHeader;
};

export const getCurrentTraceHeader = () => currentTraceHeader;

export const getTraceHeaders = () => ({
  [TRACE_HEADER_NAME]: currentTraceHeader,
});

export const TRACE_HEADER_KEY = TRACE_HEADER_NAME;
