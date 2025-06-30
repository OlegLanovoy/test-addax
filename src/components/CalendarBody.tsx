import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import {
  CalendarGrid,
  DayHeader,
  DayCell,
  DayNumber,
  TaskCount,
  HolidayItem,
  TaskCard,
  TaskTitle,
  TaskInput,
} from "@/styles";

import type { Task, Holiday } from "@/types/types";
import { EditableTaskTitle } from "./EditableTaskTitle";

type CalendarBodyProps = {
  dayNames: string[];
  calendarDays: {
    date: string;
    day: number;
    isCurrentMonth: boolean;
    isToday: boolean;
  }[];
  month: number;
  monthNames: string[];
  TASK_COLORS: string[];
  editingTask: { date: string; taskId?: string } | null;
  setEditingTask: (task: { date: string; taskId?: string } | null) => void;
  newTaskTitle: string;
  setNewTaskTitle: (title: string) => void;
  addTask: (date: string) => void;
  editTask: (taskId: string, newTitle: string) => void;
  deleteTask: (taskId: string) => void;
  onDragEnd: (result: DropResult) => void;
  getTasksForDate: (date: string) => Task[];
  getHolidaysForDate: (date: string) => Holiday[];
  selectedColor?: string;
  setSelectedColor: (color: string) => void;
};

export function CalendarBody({
  dayNames,
  calendarDays,
  month,
  monthNames,
  TASK_COLORS,
  editingTask,
  setEditingTask,
  newTaskTitle,
  setNewTaskTitle,
  addTask,
  editTask,
  deleteTask,
  onDragEnd,
  getTasksForDate,
  getHolidaysForDate,
  setSelectedColor,
}: CalendarBodyProps) {
  return (
    <CalendarGrid>
      {dayNames.map((day) => (
        <DayHeader key={day}>{day}</DayHeader>
      ))}

      <DragDropContext onDragEnd={onDragEnd}>
        {calendarDays.map(({ date, day, isCurrentMonth, isToday }) => {
          const dayTasks = getTasksForDate(date);
          const dayHolidays = getHolidaysForDate(date);
          const isOtherMonth = !isCurrentMonth;

          return (
            <DayCell
              key={date}
              isCurrentMonth={isCurrentMonth}
              isToday={isToday}
              isOtherMonth={isOtherMonth}
              onClick={(e) => {
                if (e.target === e.currentTarget && isCurrentMonth) {
                  setSelectedColor(TASK_COLORS[0]);
                  setEditingTask({ date });
                }
              }}
            >
              <DayNumber isOtherMonth={isOtherMonth}>
                <span>
                  {isOtherMonth
                    ? `${
                        month === 0 ? "Dec" : monthNames[month - 1].slice(0, 3)
                      } ${day}`
                    : day}
                </span>
                {dayTasks.length > 0 && (
                  <TaskCount>
                    {dayTasks.length} card
                    {dayTasks.length !== 1 ? "s" : ""}
                  </TaskCount>
                )}
              </DayNumber>

              {dayHolidays.map((holiday) => (
                <HolidayItem key={holiday.name}>
                  {holiday.localName}
                </HolidayItem>
              ))}

              <Droppable droppableId={date}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      backgroundColor: snapshot.isDraggingOver
                        ? "#f0f8ff"
                        : "transparent",
                      minHeight: "20px",
                      borderRadius: "3px",
                      transition: "background-color 0.2s ease",
                    }}
                  >
                    {dayTasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <TaskCard
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            color={task.color}
                            isDragging={snapshot.isDragging}
                          >
                            <EditableTaskTitle
                              title={task.title}
                              onSave={(newTitle) => editTask(task.id, newTitle)}
                              onDelete={() => deleteTask(task.id)}
                            />
                          </TaskCard>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              {editingTask?.date === date && !editingTask.taskId ? (
                <div>
                  <TaskInput
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Enter task title..."
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addTask(date);
                      } else if (e.key === "Escape") {
                        setEditingTask(null);
                        setNewTaskTitle("");
                      }
                    }}
                    onBlur={() => {
                      if (newTaskTitle.trim()) {
                        addTask(date);
                      } else {
                        setEditingTask(null);
                        setNewTaskTitle("");
                      }
                    }}
                  />
                </div>
              ) : null}
            </DayCell>
          );
        })}
      </DragDropContext>
    </CalendarGrid>
  );
}
