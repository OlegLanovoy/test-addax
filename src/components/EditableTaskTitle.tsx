import { useState, useRef, useEffect } from "react";
import { TaskTitle, TaskInput } from "@/styles";

type EditableTaskTitleProps = {
  title: string;
  onSave: (newTitle: string) => void;
  onDelete: () => void;
};

export function EditableTaskTitle({
  title,
  onSave,
  onDelete,
}: EditableTaskTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmed = value.trim();
    if (trimmed && trimmed !== title) {
      onSave(trimmed);
    }
    setIsEditing(false);
  };

  return isEditing ? (
    <TaskInput
      ref={inputRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleSave}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSave();
        } else if (e.key === "Escape") {
          setIsEditing(false);
        } else if (e.key === "Delete" && e.ctrlKey) {
          onDelete();
        }
      }}
    />
  ) : (
    <TaskTitle onDoubleClick={() => setIsEditing(true)}>{title}</TaskTitle>
  );
}
