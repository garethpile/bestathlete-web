import React, { useEffect, useState } from "react";
import { Modal, DatePicker, Select, Input } from "antd";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(weekday);
dayjs.extend(localeData);

const REASON_OPTIONS = [
  { value: "Illness", label: "Illness" },
  { value: "Vacation", label: "Vacation" },
  { value: "Work", label: "Work" },
  { value: "Personal", label: "Personal" },
  { value: "Other", label: "Other" },
];

const TrainToggleModal = ({ open, initialDate, onCancel, onConfirm }) => {
  const [reason, setReason] = useState("Personal");
  const [notes, setNotes] = useState("");
  const [range, setRange] = useState(() => {
    const base = initialDate ? dayjs(initialDate) : dayjs();
    return [base, base];
  });

  useEffect(() => {
    if (initialDate) {
      const base = dayjs(initialDate);
      setRange([base, base]);
    }
  }, [initialDate, open]);

  const handleOk = () => {
    if (!range || !range[0] || !range[1]) {
      return;
    }
    onConfirm({
      reason,
      notes,
      start: range[0].startOf("day"),
      end: range[1].startOf("day"),
    });
  };

  return (
    <Modal
      open={open}
      title="Update Training Availability"
      okText="Save"
      cancelText="Cancel"
      onOk={handleOk}
      onCancel={onCancel}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Select
          value={reason}
          options={REASON_OPTIONS}
          onChange={setReason}
          placeholder="Reason"
        />
        <DatePicker.RangePicker
          value={range}
          onChange={(vals) => {
            if (!vals) {
              return;
            }
            const [start, end] = vals;
            setRange([dayjs(start), dayjs(end || start)]);
          }}
          allowClear={false}
          style={{ width: "100%" }}
        />
        <Input.TextArea
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          maxLength={240}
        />
      </div>
    </Modal>
  );
};

export default TrainToggleModal;
