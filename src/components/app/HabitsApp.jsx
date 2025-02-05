import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";
import "./HabitsApp.css";
import Habit from "../../Habit";




const HabitsApp = () => {
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [calendarActivities, setCalendarActivities] = useState({});
  const [showHabitForm, setShowHabitForm] = useState(false); // Stato per mostrare il form
  const [newHabitName, setNewHabitName] = useState("");  
  const [newHabitColor, setNewHabitColor] = useState("#FF5733"); 

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
      setShowHabitForm(false); // Chiudi il form dopo aver aggiunto l'abitudine
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
      
      // Evita duplicati
      if (!updated[key][date].some(habit => habit.name === selectedHabit.name)) {
        updated[key][date].push(selectedHabit);
      }
  
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
      <div className="header">
        <h1>Habit Tracker <i className="ri-checkbox-circle-line"></i></h1>
        <button onClick={() => setShowHabitForm(true)}>Aggiungi nuova abitudine</button>
      </div>

      {/* Mostra il form per aggiungere un'abitudine */}
      {showHabitForm && (
        <Habit 
          newHabitName={newHabitName}
          setNewHabitName={setNewHabitName}
          newHabitColor={newHabitColor}
          setNewHabitColor={setNewHabitColor}
          addHabit={addHabit}
        />
      )}

      {/* Navigazione per cambiare mese */}
      <div className="month-nav">
        <button onClick={() => changeMonth(-1)}><i className="ri-arrow-left-s-line"></i></button>
        <span>{new Date(currentYear, currentMonth).toLocaleString("default", { month: "long", year: "numeric" })}</span>
        <button onClick={() => changeMonth(1)}><i className="ri-arrow-right-s-line"></i></button>
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
