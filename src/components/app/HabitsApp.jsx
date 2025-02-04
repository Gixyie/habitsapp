import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";
import "./HabitsApp.css";

const HabitsApp = () => {
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [calendarActivities, setCalendarActivities] = useState({});
  const [newHabitName, setNewHabitName] = useState("");  // Stato per il nome della nuova abitudine
  const [newHabitColor, setNewHabitColor] = useState("#FF5733"); // Stato per il colore della nuova abitudine

  // Funzione per generare un colore casuale
  const getRandomColor = () => {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#F3FF33"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("habitData")) || {};
    setCalendarActivities(savedData);
  }, []);

  useEffect(() => {
    localStorage.setItem("habitData", JSON.stringify(calendarActivities));
  }, [calendarActivities]);

  const addHabit = () => {
    if (newHabitName) {
      setHabits([...habits, { name: newHabitName, color: newHabitColor || getRandomColor() }]);
      setNewHabitName("");
      setNewHabitColor("#FF5733"); // Reset del colore
    }
  };

  const selectHabit = (habit) => {
    setSelectedHabit(habit);
  };

  const assignHabitToDay = (date) => {
    if (!selectedHabit) {
      alert("Seleziona un'abitudine prima di assegnarla!");
      return;
    }
    const key = `${currentYear}-${currentMonth}`;
    setCalendarActivities((prev) => {
      const updated = { ...prev };
      if (!updated[key]) updated[key] = {};
      if (!updated[key][date]) updated[key][date] = [];
      if (!updated[key][date].includes(selectedHabit.name))
        updated[key][date].push(selectedHabit.name);
      return updated;
    });
  };

  const changeMonth = (offset) => {
    let newMonth = currentMonth + offset;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  return (
    <div className="container">
      <h1>Habit Tracker</h1>
      
      {/* Navigazione per cambiare mese */}
      <div className="month-nav">
        <button onClick={() => changeMonth(-1)}>◀</button>
        <span>{new Date(currentYear, currentMonth).toLocaleString("default", { month: "long", year: "numeric" })}</span>
        <button onClick={() => changeMonth(1)}>▶</button>
      </div>
  
      {/* Aggiunta di una nuova abitudine */}
      <div className="add-habit-container">
        <input
          type="text"
          placeholder="Nome abitudine"
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
        />
        <input
          type="color"
          value={newHabitColor}
          onChange={(e) => setNewHabitColor(e.target.value)}
        />
        <button onClick={addHabit}>Aggiungi</button>
      </div>
  
      {/* Lista delle abitudini */}
      <div className="habit-list">
        {habits.map((habit, index) => (
          <div 
            key={index} 
            className="habit-item" 
            style={{ backgroundColor: habit.color }} 
            onClick={() => selectHabit(habit)}
          >
            {habit.name}
          </div>
        ))}
      </div>
  
      {/* Calendario */}
      <Calendar
        month={currentMonth}
        year={currentYear}
        activities={calendarActivities[`${currentYear}-${currentMonth}`] || {}}
        assignHabitToDay={assignHabitToDay}
        habits={habits}
      />
    </div>
  );
};

export default HabitsApp;
