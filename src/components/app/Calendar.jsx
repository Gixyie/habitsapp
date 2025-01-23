import React, { useState, useEffect } from 'react';
import './Calendar.css';

const Calendar = ({ activityName }) => {
     // Stati per mese, anno e progressi
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  // Stato per i progressi (matrice settimane x giorni)
  const [progress, setProgress] = useState(
    JSON.parse(localStorage.getItem(`${activityName}-calendarProgress`)) || {}
);

// Calcola il numero di giorni nel mese corrente
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();


 // Array dinamico per i giorni del mese
 const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);


  // Aggiorna il localStorage quando il progresso cambia
  useEffect(() => {
    localStorage.setItem(`${activityName}-calendarProgress`, JSON.stringify(progress));
}, [progress, activityName]);

// Funzione per aggiornare il progresso di un giorno specifico
  const toggleDay = (day) => {
    const key = `${currentYear}-${currentMonth}`;
    const newProgress = { ...progress };
    newProgress[key] = newProgress[key] || {};
    newProgress[key][day] = newProgress[key][day] === 1 ? 0 : 1;
    setProgress(newProgress);
  };
 // Giorni della settimana
 const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  

  // Funzioni per navigare tra i mesi
  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (currentMonth === 0) setCurrentYear((prev) => prev - 1);
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) setCurrentYear((prev) => prev + 1);
  };

 return (
    <div className="calendar">
      <div className="navbar">
        {/* Navigazione tra mesi */}
        <button onClick={goToPreviousMonth}>←</button>
        <h2>
          {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
        </h2>
        <button onClick={goToNextMonth}>→</button>
      </div>
       {/* Giorni della settimana */}
      <div className="days-of-week">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="day-name">{day}</div>
         ))}
         </div>
          {/* Griglia del calendario */}
          <div className="calendar-grid">
        {daysArray.map((day) => (
          <div
            key={day}
            className={`day-box ${progress[`${currentYear}-${currentMonth}`]?.[day] === 1 ? 'completed' : ''}`}
            onClick={() => toggleDay(day)}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
