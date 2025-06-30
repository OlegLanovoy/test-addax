import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Header,
  MonthNavigation,
  MonthTitle,
  SearchContainer,
  ViewToggle,
  ViewButton,
} from "@/styles";

type CalendarHeaderProps = {
  monthNames: string[];
  month: number;
  year: number;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  activeView?: "week" | "month";
  setActiveView?: (view: "week" | "month") => void;
};

export function CalendarHeader({
  monthNames,
  month,
  year,
  goToPreviousMonth,
  goToNextMonth,
  searchTerm,
  setSearchTerm,
  activeView = "month",
  setActiveView,
}: CalendarHeaderProps) {
  return (
    <Header>
      <MonthNavigation>
        <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <MonthTitle>
          {monthNames[month]} {year}
        </MonthTitle>
        <Button variant="outline" size="sm" onClick={goToNextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </MonthNavigation>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <SearchContainer>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </SearchContainer>

        <ViewToggle>
          <ViewButton
            active={activeView === "week"}
            onClick={() => setActiveView?.("week")}
          >
            Week
          </ViewButton>
          <ViewButton
            active={activeView === "month"}
            onClick={() => setActiveView?.("month")}
          >
            Month
          </ViewButton>
        </ViewToggle>
      </div>
    </Header>
  );
}
