import styled from "@emotion/styled";


export const TopBar = styled.div`
  background-color: #ff9500;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  font-weight: 600;
`;

export const TopBarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const TopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const ViewToggle = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
`;

export const ViewButton = styled.button<{ active: boolean }>`
  padding: 6px 12px;
  background-color: ${(props) =>
    props.active ? "rgba(255, 255, 255, 0.3)" : "transparent"};
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const CountrySelect = styled.select`
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
  font-size: 14px;
  cursor: pointer;

  &:focus {
    outline: none;
    background-color: white;
  }
`;

export const CalendarContainer = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
`;

export const Header = styled.div`
  background-color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
 
`;

export const MonthNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const MonthTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin: 0;
  min-width: 200px;
  text-align: center;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  background-color: #ddd;
  margin: 0;
`;

export const DayHeader = styled.div`
  background-color: #f8f9fa;
  padding: 15px 12px;
  text-align: center;
  font-weight: 600;
  color: #666;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
`;

export const DayCell = styled.div<{
  isCurrentMonth: boolean;
  isToday: boolean;
  isOtherMonth: boolean;
}>`
  background-color: ${(props) => (props.isOtherMonth ? "#f8f9fa" : "white")};
  min-height: 140px;
  padding: 8px;
  position: relative;
  border-bottom: 1px solid #ddd;

  &:hover {
    background-color: ${(props) =>
      props.isOtherMonth ? "#f0f1f2" : "#fafafa"};
  }
`;

export const DayNumber = styled.div<{ isOtherMonth: boolean }>`
  font-weight: 500;
  color: ${(props) => (props.isOtherMonth ? "#999" : "#333")};
  margin-bottom: 6px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TaskCount = styled.span`
  font-size: 12px;
  color: #666;
  font-weight: normal;
`;

export const HolidayItem = styled.div`
  background-color: #fff3cd;
  color: #856404;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 11px;
  margin-bottom: 3px;
  font-weight: 500;
  border-left: 3px solid #ffc107;
`;

export const TaskCard = styled.div<{ color: string; isDragging: boolean }>`
  background-color: white;
  border-radius: 3px;
  padding: 6px 8px;
  margin-bottom: 3px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  cursor: grab;
  transition: all 0.2s ease;
  opacity: ${(props) => (props.isDragging ? 0.8 : 1)};
  transform: ${(props) => (props.isDragging ? "rotate(2deg)" : "none")};
  position: relative;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background-color: ${(props) => props.color};
    border-radius: 3px 0 0 3px;
  }

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
  }

  &:active {
    cursor: grabbing;
  }
`;

export const TaskTitle = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #333;
  line-height: 1.3;
  padding-left: 8px;
`;

export const TaskInput = styled.input`
  width: 100%;
  padding: 6px 8px;
  border: 2px solid #3b82f6;
  border-radius: 4px;
  font-size: 12px;
  outline: none;
  background-color: white;
`;

export const ColorPicker = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 4px;
`;

export const ColorOption = styled.button<{ color: string; selected: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 2px solid ${(props) => (props.selected ? "#374151" : "transparent")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const TASK_COLORS = [
  "#10b981", 
  "#f59e0b", 
  "#ef4444", 
  "#3b82f6", 
  "#8b5cf6", 
  "#06b6d4", 
  "#f97316", 
  "#84cc16", 
];
