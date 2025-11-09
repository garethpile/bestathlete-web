import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Input, Spin, Tooltip } from "antd";
import {
  MessageOutlined,
  SendOutlined,
  CloseOutlined,
  SmileOutlined,
  MehOutlined,
  FrownOutlined,
  ThunderboltOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { assistantSendMessage } from "../../services/assistantServices";

const { TextArea } = Input;

const buildInitialMessage = (firstName) => ({
  id: `assistant-${Date.now()}`,
  role: "assistant",
  content: `Hi${firstName ? ` ${firstName}` : ""}! How are you feeling about your training today?`,
  createdAt: new Date().toISOString(),
});

/**
 * Floating AI assistant that sits in the lower-right corner of the app.
 * On open it greets the athlete and forwards subsequent conversation turns
 * to the backend assistant service.
 */
const SENTIMENT_PRESETS = [
  { label: "All Good", text: "All good", icon: <SmileOutlined /> },
  { label: "Body Tired", text: "Body tired", icon: <MehOutlined /> },
  { label: "Injured", text: "I'm injured", icon: <FrownOutlined /> },
  { label: "Stressed", text: "Feeling stressed", icon: <ThunderboltOutlined /> },
  { label: "Struggling mentally", text: "Struggling mentally", icon: <HeartOutlined /> },
];

const AIAssistant = ({ customer }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const listRef = useRef(null);
  const hasBootstrappedRef = useRef(false);

  const customerId = customer?.idCustomer || null;
  const athleteFirstName = useMemo(() => customer?.FirstName || "", [customer?.FirstName]);

  useEffect(() => {
    if (isOpen && !hasBootstrappedRef.current) {
      setMessages([buildInitialMessage(athleteFirstName)]);
      hasBootstrappedRef.current = true;
    }
  }, [isOpen, athleteFirstName]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSend = async (presetText) => {
    const textToSend = typeof presetText === "string" ? presetText : inputValue.trim();
    if (!textToSend) return;

    const outgoingMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend,
      createdAt: new Date().toISOString(),
    };

    const updatedHistory = [...messages, outgoingMessage];
    setMessages(updatedHistory);
    if (!presetText) {
      setInputValue("");
    }
    setErrorMessage("");
    setIsSending(true);

    try {
      const assistantReply = await assistantSendMessage({
        customerId,
        messages: updatedHistory.map(({ role, content }) => ({ role, content })),
      });

      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        role: assistantReply.role || "assistant",
        content: assistantReply.content,
        createdAt: new Date().toISOString(),
        metadata: assistantReply,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Failed to send message to assistant:", error);

      setErrorMessage(
        "Sorry, I couldn't reach the training assistant. Please try again shortly."
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        right: 24,
        bottom: 24,
        zIndex: 1100,
      }}
    >
      {isOpen ? (
        <div
          style={{
            width: 360,
            maxWidth: "calc(100vw - 32px)",
            height: 440,
            background: "#ffffff",
            borderRadius: 16,
            boxShadow: "0 12px 32px rgba(15, 23, 42, 0.18)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              background: "#1890ff",
              color: "#fff",
            }}
          >
            <div>
              <div style={{ fontWeight: 600 }}>Coach Assistant</div>
              <div style={{ fontSize: 12, opacity: 0.85 }}>
                Powered by BestAthlete + GPT
              </div>
            </div>
            <Tooltip title="Close assistant">
              <Button
                size="small"
                type="text"
                icon={<CloseOutlined style={{ color: "#fff" }} />}
                onClick={handleToggle}
              />
            </Tooltip>
          </div>

          <div
            ref={listRef}
            style={{
              flex: 1,
              padding: "12px 16px",
              overflowY: "auto",
              background: "#f5f7fb",
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: msg.role === "user" ? "flex-end" : "flex-start",
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    maxWidth: "85%",
                    borderRadius: 12,
                    padding: "8px 12px",
                    backgroundColor:
                      msg.role === "user" ? "#1890ff" : "#ffffff",
                    color: msg.role === "user" ? "#ffffff" : "#1f2937",
                    boxShadow:
                      msg.role === "user"
                        ? "0 4px 12px rgba(24, 144, 255, 0.35)"
                        : "0 2px 8px rgba(15, 23, 42, 0.12)",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {msg.content}
                </div>
                <span
                  style={{
                    fontSize: 11,
                    color: "#9ca3af",
                    marginTop: 4,
                  }}
                >
                  {dayjs(msg.createdAt).format("HH:mm")}
                </span>
              </div>
            ))}
            {isSending && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <Spin size="small" />
              </div>
            )}
            {errorMessage && (
              <div
                style={{
                  marginTop: 8,
                  fontSize: 12,
                  color: "#d14343",
                  background: "#fdecea",
                  padding: "8px 12px",
                  borderRadius: 8,
                }}
              >
                {errorMessage}
              </div>
            )}
          </div>

          <div style={{ padding: "12px 16px", borderTop: "1px solid #e5e7eb" }}>
            {messages.length === 1 && messages[0].role === "assistant" && (
              <div
                style={{
                  marginBottom: 12,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                {SENTIMENT_PRESETS.map((preset) => (
                  <Button
                    key={preset.label}
                    icon={preset.icon}
                    size="small"
                    style={{ borderRadius: 999 }}
                    onClick={() => {
                      setInputValue(preset.text);
                      handleSend(preset.text);
                    }}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            )}
            <TextArea
              rows={2}
              placeholder="Tell me how you're feeling today..."
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onPressEnter={(event) => {
                if (!event.shiftKey) {
                  event.preventDefault();
                  handleSend();
                }
              }}
              disabled={isSending}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={() => handleSend()}
                disabled={isSending || !inputValue.trim()}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Tooltip title="Chat with your AI coach">
          <Button
            type="primary"
            shape="circle"
            size="large"
            icon={<MessageOutlined />}
            onClick={handleToggle}
            style={{
              width: 56,
              height: 56,
              boxShadow: "0 12px 24px rgba(24, 144, 255, 0.35)",
            }}
          />
        </Tooltip>
      )}
    </div>
  );
};

AIAssistant.propTypes = {
  customer: PropTypes.shape({
    idCustomer: PropTypes.string,
    FirstName: PropTypes.string,
  }),
};

AIAssistant.defaultProps = {
  customer: null,
};

export default AIAssistant;
