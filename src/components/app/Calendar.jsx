import React, { useState } from "react";
import "./Calendar.css";
import { useNavigate } from "react-router-dom";

const Calendar = ({ month, year, activities, assignHabitToDay, habits, openDayFocus }) => {
  const [selectedHabit, setSelectedHabit] = useState(null);  // Aggiungi stato per l'abitudine selezionata
  const navigate = useNavigate();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  
  const handleDayClick = (day) => {
    if (selectedHabit) {
      assignHabitToDay(day, selectedHabit); // Passa l'abitudine selezionata al giorno
    } else {
      navigate(`/day/${day}`); // Se non c'è un'abitudine selezionata, apri il focus del giorno
    }
  };

  const handleHabitSelect = (habit) => {
    setSelectedHabit(habit); // Imposta l'abitudine selezionata
  };

  return (
    <div className="calendar">
      <div className="weekdays">
        {["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"].map((day, index) => (
          <div key={index} className="weekday">{day}</div>
        ))}
      </div>

      <div className="habits-selector">
        {habits.map((habit, index) => (
          <div key={index} className="habit-badge" onClick={() => handleHabitSelect(habit)} style={{ backgroundColor: habit.color }}>
            {habit.name}
          </div>
        ))}
      </div>

      <div className="days-grid">
        {/* Aggiunge spazi vuoti prima del primo giorno del mese */}
        {Array.from({ length: firstDayOfWeek }, (_, i) => (
          <div key={`empty-${i}`} className="empty-day"></div>
        ))}

        {/* Giorni del mese */}
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
