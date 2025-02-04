import React from "react";
import "./Calendar.css";

const Calendar = ({ month, year, activities, assignHabitToDay, habits }) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();
  const calendarDays = [];

  for (let i = 0; i < startDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${day}`;
    const dayHabits = activities[dateKey] || [];
    const habitColors = dayHabits.map(
      (habitName) => habits.find((h) => h.name === habitName)?.color || "#ccc"
    );

    calendarDays.push(
      <div
        key={day}
        className="calendar-day"
        onClick={() => assignHabitToDay(dateKey)}
        style={{ background: habitColors.length ? `linear-gradient(45deg, ${habitColors.join(", ")})` : "white" }}
      >
        {day}
      </div>
    );
  }

  return <div className="calendar-grid">{calendarDays}</div>;
};

export default Calendar;
