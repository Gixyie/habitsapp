import React from "react";
import "./Calendar.css";

const Calendar = ({ month, year, activities, assignHabitToDay, habits }) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay(); // 0 = Domenica, 6 = Sabato

  const weekDays = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"];

  return (
    <div className="calendar">
      {/* Giorni della settimana */}
      <div className="week-days">
        {weekDays.map((day, index) => (
          <div key={index} className="week-day">{day}</div>
        ))}
      </div>

      {/* Giorni del mese */}
      <div className="days-grid">
        {/* Spazi vuoti per allineare il primo giorno del mese */}
        {Array(firstDay).fill(null).map((_, index) => (
          <div key={`empty-${index}`} className="empty-day"></div>
        ))}

        {/* Giorni del mese */}
        {Array.from({ length: daysInMonth }, (_, index) => {
          const day = index + 1;
          const dateKey = `${year}-${month}-${day}`;
          return (
            <div
              key={day}
              className="day"
              onClick={() => assignHabitToDay(day)}
            >
              {day}
              {/* Mostra le attività associate a quel giorno */}
              {activities[day] && activities[day].map((habit, idx) => (
                <div key={idx} className="habit-dot" style={{ backgroundColor: habit.color }}></div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
