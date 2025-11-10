import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Input, Spin, Tooltip } from "antd";
import { MessageOutlined, SendOutlined, CloseOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { assistantSendMessage } from "../../services/assistantServices";

const { TextArea } = Input;

const QUICK_RESPONSE_GROUPS = [
  { label: "Physically", options: ["Drained", "Tired", "Good", "Great"] },
  { label: "Mentally", options: ["Struggling", "Good", "Awesome"] },
  { label: "Injured", options: ["Yes", "No"] },
  { label: "Sleep", options: ["8+ Hours", "6-8 Hours", "4-5 Hours", "Less than 4"] },
  { label: "Stress", options: ["High", "Med", "Low"] },
];

const buildInitialMessage = (firstName, workoutSummary) => {
  const intro = `Hello${firstName ? ` ${firstName}` : ""}`;
  const summaryText =
    workoutSummary ||
    "I haven't seen a recent workout yet—happy to help plan what's next.";
  const prompt =
    "Can I revise any of your training for you? If so, please give me a quick status update below.";
  return {
    id: `assistant-${Date.now()}`,
    role: "assistant",
    content: [intro, summaryText, prompt].join("\n"),
    createdAt: new Date().toISOString(),
  };
};

const formatWorkoutSummary = (workouts = []) => {
  if (!Array.isArray(workouts) || workouts.length === 0) {
    return "";
  }

  const workoutsWithDates = workouts
    .filter((workout) => workout?.WorkoutDateTime)
    .sort(
      (a, b) =>
        dayjs(b.WorkoutDateTime).valueOf() - dayjs(a.WorkoutDateTime).valueOf()
    );

  if (!workoutsWithDates.length) {
    return "";
  }

  const latestWorkout = workoutsWithDates[0];
  const latestDay = dayjs(latestWorkout.WorkoutDateTime).format("dddd");
  const latestType = latestWorkout.WorkoutType || "session";
  const latestDistanceKm = Number(latestWorkout.WorkoutDistance) / 1000;
  const latestSummaryParts = [`Latest was a ${latestType} on ${latestDay}`];
  if (Number.isFinite(latestDistanceKm) && latestDistanceKm > 0.1) {
    latestSummaryParts.push(`(~${latestDistanceKm.toFixed(1)} km)`);
  }

  const sevenDaysAgo = dayjs().subtract(7, "day");
  const recentSessions = workoutsWithDates.filter((workout) =>
    dayjs(workout.WorkoutDateTime).isAfter(sevenDaysAgo)
  );
  const recentSummary =
    recentSessions.length > 0
      ? `${recentSessions.length} workout${
          recentSessions.length === 1 ? "" : "s"
        } logged in the last 7 days`
      : "";

  return [recentSummary, latestSummaryParts.join(" ")].filter(Boolean).join(". ");
};

const AIAssistant = ({ customer, workouts }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [quickSelections, setQuickSelections] = useState({});
  const [showQuickCheck, setShowQuickCheck] = useState(true);
  const listRef = useRef(null);
  const hasBootstrappedRef = useRef(false);

  const idCustomer = customer?.idCustomer || null;
  const athleteFirstName = useMemo(
    () => customer?.FirstName || "",
    [customer?.FirstName]
  );
  const workoutSummary = useMemo(
    () => formatWorkoutSummary(workouts),
    [workouts]
  );
  const quickCheckComplete = QUICK_RESPONSE_GROUPS.every(
    (group) => quickSelections[group.label]
  );

  useEffect(() => {
    if (isOpen && !hasBootstrappedRef.current) {
      setMessages([buildInitialMessage(athleteFirstName, workoutSummary)]);
      hasBootstrappedRef.current = true;
    }
  }, [isOpen, athleteFirstName, workoutSummary]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const finalizeQuickSelections = (selections) => {
    const summary = QUICK_RESPONSE_GROUPS.map(
      (group) => `${group.label}: ${selections[group.label]}`
    ).join(" | ");
    handleSend(`Quick status update -> ${summary}`);
    setShowQuickCheck(false);
  };

  const handleQuickSelect = (label, option) => {
    setQuickSelections((prev) => {
      const next = { ...prev, [label]: option };
      const completed = QUICK_RESPONSE_GROUPS.every(
        (group) => next[group.label]
      );
      if (completed) {
        finalizeQuickSelections(next);
      }
      return next;
    });
  };

  const handleSend = async (presetText) => {
    const textToSend = typeof presetText === "string" ? presetText : inputValue.trim();
    if (!textToSend) return;
    if (!idCustomer) {
      setErrorMessage("We need to load your athlete profile before contacting the coach.");
      return;
    }

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
        idCustomer,
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
            height: 460,
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
            {showQuickCheck && (
              <div
                style={{
                  marginBottom: 12,
                  maxHeight: 140,
                  overflowY: "auto",
                  paddingRight: 4,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    color: "#6b7280",
                    marginBottom: 8,
                    fontWeight: 500,
                  }}
                >
                  Quick status check
                </div>
                {QUICK_RESPONSE_GROUPS.map((group, index) => (
                  <div
                    key={group.label}
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                      alignItems: "center",
                      marginBottom: 8,
                      paddingBottom: 8,
                      borderBottom:
                        index === QUICK_RESPONSE_GROUPS.length - 1
                          ? "none"
                          : "1px solid #e5e7eb",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#1f2937",
                        minWidth: 72,
                      }}
                    >
                      {group.label}:
                    </span>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 6,
                        flex: 1,
                      }}
                    >
                      {group.options.map((option) => {
                        const selected = quickSelections[group.label] === option;
                        return (
                          <Button
                            key={`${group.label}-${option}`}
                            size="small"
                            type={selected ? "primary" : "default"}
                            ghost={false}
                            style={{
                              minWidth: 72,
                              borderRadius: 16,
                              backgroundColor: selected ? "#2563eb" : "#f3f4f6",
                              color: selected ? "#ffffff" : "#1f2937",
                              borderColor: selected ? "#2563eb" : "#e5e7eb",
                            }}
                            onClick={() => handleQuickSelect(group.label, option)}
                          >
                            {option}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                ))}
                {!quickCheckComplete && (
                  <div style={{ fontSize: 11, color: "#6b7280" }}>
                    Select one option per row to start chatting.
                  </div>
                )}
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
              disabled={isSending || (showQuickCheck && !quickCheckComplete)}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={() => handleSend()}
                disabled={
                  isSending ||
                  !inputValue.trim() ||
                  (showQuickCheck && !quickCheckComplete)
                }
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
  workouts: PropTypes.arrayOf(
    PropTypes.shape({
      WorkoutDateTime: PropTypes.string,
      WorkoutType: PropTypes.string,
      WorkoutDistance: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })
  ),
};

AIAssistant.defaultProps = {
  customer: null,
  workouts: [],
};

export default AIAssistant;
