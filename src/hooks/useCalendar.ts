// src/hooks/useCalendar.ts
import { useState, useMemo } from 'react';

export function useCalendar(initialYear = 2024, initialMonth = 0) {
  const [currentDate, setCurrentDate] = useState(new Date(initialYear, initialMonth, 1));
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  
  // Tracks navigation direction for Framer Motion sliding animations (1 = right, -1 = left)
  const [direction, setDirection] = useState(0); 

  // useMemo ensures we only recalculate the grid when the month/year actually changes
  const calendarGrid = useMemo(() => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const emptyCells = firstDay === 0 ? 6 : firstDay - 1; 
    return { daysInMonth, emptyCells };
  }, [currentDate]);

  const handleDateClick = (day: number) => {
    const clicked = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    if (!startDate || (startDate && endDate)) {
      setStartDate(clicked);
      setEndDate(null);
    } else if (clicked < startDate) {
      setStartDate(clicked);
    } else {
      setEndDate(clicked);
    }
  };

  const getDayStatus = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    if (startDate?.getTime() === date.getTime()) return "start";
    if (endDate?.getTime() === date.getTime()) return "end";
    if (startDate && endDate && date > startDate && date < endDate) return "between";
    return null;
  };

  // Centralized navigation functions
  const navigateMonth = (offset: number) => {
    setDirection(offset > 0 ? 1 : -1);
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const navigateYear = (offset: number) => {
    setDirection(offset > 0 ? 1 : -1);
    setCurrentDate(new Date(currentDate.getFullYear() + offset, currentDate.getMonth(), 1));
  };

  return {
    currentDate,
    startDate,
    endDate,
    direction,
    ...calendarGrid,
    handleDateClick,
    getDayStatus,
    navigateMonth,
    navigateYear
  };
}