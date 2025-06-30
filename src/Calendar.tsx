import { useState, useEffect } from "react";
import { type DropResult } from "@hello-pangea/dnd";
import { CalendarHeader } from "@/components/Header";
import type { Task, Holiday, Country } from "@/types/types";

import { CalendarContainer, TASK_COLORS } from "@/styles";
import { TopBarSettings } from "./components/TopBarSettings";
import { CalendarBody } from "./components/CalendarBody";

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingTask, setEditingTask] = useState<{
    date: string;
    taskId?: string;
  } | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState(TASK_COLORS[0]);
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [availableCountries, setAvailableCountries] = useState<Country[]>([]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const calendarDays = [];

  const prevMonth = new Date(year, month - 1, 0);
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const day = prevMonth.getDate() - i;
    const date = new Date(year, month - 1, day);
    calendarDays.push({
      date: date.toISOString().split("T")[0],
      day,
      isCurrentMonth: false,
      isToday: false,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateString = date.toISOString().split("T")[0];
    calendarDays.push({
      date: dateString,
      day,
      isCurrentMonth: true,
      isToday: dateString === todayString,
    });
  }

  const remainingDays = 42 - calendarDays.length;
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(year, month + 1, day);
    calendarDays.push({
      date: date.toISOString().split("T")[0],
      day,
      isCurrentMonth: false,
      isToday: false,
    });
  }

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch(
          `https://date.nager.at/api/v3/PublicHolidays/${year}/${selectedCountry}`
        );
        const data = await response.json();
        setHolidays(data);
      } catch (error) {
        console.error("Failed to fetch holidays:", error);
        setHolidays([]);
      }
    };

    fetchHolidays();
  }, [year, selectedCountry]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://date.nager.at/api/v3/AvailableCountries"
        );
        const data = await response.json();
        setAvailableCountries(data);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
        setAvailableCountries([
          { countryCode: "US", name: "United States" },
          { countryCode: "GB", name: "United Kingdom" },
          { countryCode: "DE", name: "Germany" },
          { countryCode: "FR", name: "France" },
          { countryCode: "CA", name: "Canada" },
        ]);
      }
    };

    fetchCountries();
  }, []);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const addTask = (date: string) => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: `task-${Date.now()}-${Math.random()}`,
        title: newTaskTitle.trim(),
        color: TASK_COLORS[Math.floor(Math.random() * TASK_COLORS.length)],
        date,
      };
      setTasks((prev) => [...prev, newTask]);
      setNewTaskTitle("");
      setEditingTask(null);
    }
  };

  const editTask = (taskId: string, newTitle: string) => {
    if (newTitle.trim()) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, title: newTitle.trim() } : task
        )
      );
    }
    setEditingTask(null);
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    const sourceDate = source.droppableId;
    const destDate = destination.droppableId;

    if (sourceDate === destDate) {
      const dayTasks = getTasksForDate(sourceDate);
      const reorderedTasks = Array.from(dayTasks);
      const [removed] = reorderedTasks.splice(source.index, 1);
      reorderedTasks.splice(destination.index, 0, removed);

      setTasks((prev) => {
        const otherTasks = prev.filter((task) => task.date !== sourceDate);
        return [...otherTasks, ...reorderedTasks];
      });
    } else {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === draggableId ? { ...task, date: destDate } : task
        )
      );
    }
  };

  const getTasksForDate = (date: string) => {
    const filteredTasks = tasks.filter(
      (task) =>
        task.date === date &&
        (searchTerm === "" ||
          task.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    return filteredTasks;
  };

  const getHolidaysForDate = (date: string) => {
    return holidays.filter((holiday) => holiday.date === date);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <CalendarContainer>
      <TopBarSettings
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        availableCountries={availableCountries}
      />

      <CalendarHeader
        monthNames={monthNames}
        month={month}
        year={year}
        goToPreviousMonth={goToPreviousMonth}
        goToNextMonth={goToNextMonth}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <CalendarBody
        dayNames={dayNames}
        calendarDays={calendarDays}
        month={month}
        monthNames={monthNames}
        TASK_COLORS={TASK_COLORS}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        addTask={addTask}
        editTask={editTask}
        deleteTask={deleteTask}
        onDragEnd={onDragEnd}
        getTasksForDate={getTasksForDate}
        getHolidaysForDate={getHolidaysForDate}
        setSelectedColor={setSelectedColor}
        selectedColor={selectedColor}
      />
    </CalendarContainer>
  );
}
