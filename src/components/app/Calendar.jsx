import React from "react";
import "./Calendar.css";

const Calendar = ({ month, year, activities, assignHabitToDay, openDayFocus, selectedHabit }) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const handleDayClick = (day) => {
    if (selectedHabit) {
      assignHabitToDay(day);
    } else {
      openDayFocus(day);
    }
  };

  return (
    <div className="calendar">
      <div className="weekdays">
        {["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"].map((day, index) => (
          <div key={index} className="weekday">{day}</div>
        ))}
      </div>

      <div className="days-grid">
        {Array.from({ length: firstDayOfWeek }, (_, i) => (
          <div key={`empty-${i}`} className="empty-day"></div>
        ))}

        {Array.from({ length: daysInMonth }, (_, dayIndex) => {
          const day = dayIndex + 1;
          return (
            <div key={day} className="calendar-day" onClick={() => handleDayClick(day)}>
              <span className="day-number">{day}</span>
              <div className="habits-container">
                {activities[day] && activities[day].map((habit, index) => (
                  <div key={index} className="habit-badge" style={{ backgroundColor: habit.color }}>
                    {habit.name}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
