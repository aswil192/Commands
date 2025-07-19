import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CalendarProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
}

const Calendar = ({ selectedDate, onDateSelect }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [animationKey, setAnimationKey] = useState(0);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const today = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Get first day of the month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  // Get previous month's last few days
  const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
  const prevMonthDays = [];
  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    prevMonthDays.push(prevMonthLastDay - i);
  }

  // Get current month days
  const currentMonthDays = [];
  for (let day = 1; day <= daysInMonth; day++) {
    currentMonthDays.push(day);
  }

  // Get next month's first few days
  const totalCells = 42; // 6 rows × 7 days
  const remainingCells = totalCells - prevMonthDays.length - currentMonthDays.length;
  const nextMonthDays = [];
  for (let day = 1; day <= remainingCells; day++) {
    nextMonthDays.push(day);
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setAnimationKey(prev => prev + 1);
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isToday = (day: number, type: 'current' | 'prev' | 'next') => {
    if (type !== 'current') return false;
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth &&
      today.getFullYear() === currentYear
    );
  };

  const isSelected = (day: number, type: 'current' | 'prev' | 'next') => {
    if (!selectedDate || type !== 'current') return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    );
  };

  const isWeekend = (dayIndex: number) => {
    return dayIndex === 0 || dayIndex === 6; // Sunday or Saturday
  };

  const handleDateClick = (day: number, type: 'current' | 'prev' | 'next') => {
    let targetDate = new Date(currentYear, currentMonth, day);
    
    if (type === 'prev') {
      targetDate = new Date(currentYear, currentMonth - 1, day);
    } else if (type === 'next') {
      targetDate = new Date(currentYear, currentMonth + 1, day);
    }
    
    onDateSelect?.(targetDate);
  };

  return (
    <Card className="w-full max-w-md mx-auto p-6 bg-gradient-to-br from-card to-secondary/50 shadow-[var(--shadow-card)] border-border/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigateMonth('prev')}
          className="h-8 w-8 border-border hover:bg-calendar-hover transition-all duration-200"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center gap-2 animate-fade-in" key={animationKey}>
          <CalendarIcon className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            {monthNames[currentMonth]} {currentYear}
          </h2>
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigateMonth('next')}
          className="h-8 w-8 border-border hover:bg-calendar-hover transition-all duration-200"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day, index) => (
          <div
            key={day}
            className={`text-center text-sm font-medium py-2 ${
              isWeekend(index) 
                ? 'text-calendar-weekend' 
                : 'text-muted-foreground'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 animate-fade-in" key={`grid-${animationKey}`}>
        {/* Previous month days */}
        {prevMonthDays.map((day) => (
          <button
            key={`prev-${day}`}
            onClick={() => handleDateClick(day, 'prev')}
            className="aspect-square flex items-center justify-center text-sm text-muted-foreground/50 hover:bg-calendar-hover hover:text-foreground transition-all duration-200 rounded-md"
          >
            {day}
          </button>
        ))}

        {/* Current month days */}
        {currentMonthDays.map((day, index) => {
          const dayIndex = (prevMonthDays.length + index) % 7;
          const todayClass = isToday(day, 'current');
          const selectedClass = isSelected(day, 'current');
          const weekendClass = isWeekend(dayIndex);

          return (
            <button
              key={`current-${day}`}
              onClick={() => handleDateClick(day, 'current')}
              className={`
                aspect-square flex items-center justify-center text-sm font-medium rounded-md
                transition-all duration-200 hover:scale-105 relative
                ${todayClass 
                  ? 'bg-calendar-today text-primary-foreground shadow-lg animate-bounce-in' 
                  : selectedClass
                  ? 'bg-calendar-selected text-primary-foreground shadow-md'
                  : weekendClass
                  ? 'text-calendar-weekend hover:bg-calendar-hover'
                  : 'text-foreground hover:bg-calendar-hover'
                }
              `}
            >
              {day}
              {todayClass && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-calendar-weekend rounded-full animate-pulse" />
              )}
            </button>
          );
        })}

        {/* Next month days */}
        {nextMonthDays.map((day) => (
          <button
            key={`next-${day}`}
            onClick={() => handleDateClick(day, 'next')}
            className="aspect-square flex items-center justify-center text-sm text-muted-foreground/50 hover:bg-calendar-hover hover:text-foreground transition-all duration-200 rounded-md"
          >
            {day}
          </button>
        ))}
      </div>

      {/* Footer with today's date */}
      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-center text-sm text-muted-foreground">
          Today: {today.toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>
    </Card>
  );
};

export default Calendar;
