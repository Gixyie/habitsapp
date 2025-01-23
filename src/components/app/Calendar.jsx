import React, { useState, useEffect } from 'react';
import './Calendar.css';

const Calendar = ({ selectedHabit, habits, calendarActivities, setCalendarActivities }) => {
  // Stati per mese e anno
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Calcola il numero di giorni nel mese corrente
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Array dinamico per i giorni del mese
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Funzione per aggiungere un'attività a un giorno specifico
  const toggleDay = (day) => {
    if (!selectedHabit) {
      alert('Seleziona un’attività prima di aggiungerla al calendario!');
      return;
    }

    const key = `${currentYear}-${currentMonth}`;
    const newActivities = { ...calendarActivities };

    // Inizializza il mese e il giorno, se non esistono
    newActivities[key] = newActivities[key] || {};
    newActivities[key][day] = newActivities[key][day] || [];

    // Aggiungi o rimuovi l'attività selezionata
    if (newActivities[key][day].includes(selectedHabit)) {
      newActivities[key][day] = newActivities[key][day].filter((habit) => habit !== selectedHabit);
    } else {
      newActivities[key][day].push(selectedHabit);
    }

    setCalendarActivities(newActivities);
  };

  // Funzioni per navigare tra i mesi
  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (currentMonth === 0) setCurrentYear((prev) => prev - 1);
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) setCurrentYear((prev) => prev + 1);
  };

  // Giorni della settimana
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


   // Evidenzia la casella se ci sono attività
   const dayClasses = (day) => {
    const key = `${currentYear}-${currentMonth}`;
    const dayActivities = calendarActivities[key]?.[day] || [];
    return dayActivities.length > 0 ? 'day-box completed' : 'day-box';
  };

  return (
    <div className="calendar">
      <div className="navbar">
        {/* Navigazione tra mesi */}
        <button onClick={goToPreviousMonth}>←</button>
        <h2>
          {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })}{' '}
          {currentYear}
        </h2>
        <button onClick={goToNextMonth}>→</button>
      </div>

      {/* Giorni della settimana */}
      <div className="days-of-week">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="day-name">
            {day}
          </div>
        ))}
      </div>

      {/* Griglia del calendario */}
      <div className="calendar-grid">
        {daysArray.map((day) => {
          const key = `${currentYear}-${currentMonth}`;
          const dayActivities = calendarActivities[key]?.[day] || [];

          return (
            <div
              key={day}
              className={`day-box ${dayActivities.length > 0 ? 'completed' : ''}`}
              onClick={() => toggleDay(day)}
            >
              <strong>{day}</strong>
              <ul className = 'habit-details'>
                {dayActivities.map((habitId) => {
                  const habit = habits.find((h) => h.id === habitId);
                  return (
                    <li key={habitId} className="habit-name">
                      {habit?.name || 'Attività sconosciuta'}
                    </li>
                    
                  );
                })}
              </ul>
            </div>
         
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
