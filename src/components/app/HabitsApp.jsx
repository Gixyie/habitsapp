import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";
import "./HabitsApp.css";
import Habit from "../../Habit"; // Importiamo il form correttamente

const HabitsApp = () => {
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [calendarActivities, setCalendarActivities] = useState({});
  const [showHabitForm, setShowHabitForm] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");  
  const [newHabitColor, setNewHabitColor] = useState("#FF5733"); 

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("habitData")) || {};
    setCalendarActivities(savedData);
  }, []);

  useEffect(() => {
    localStorage.setItem("habitData", JSON.stringify(calendarActivities));
  }, [calendarActivities]);

  const addHabit = () => {
    if (newHabitName) {
      setHabits([...habits, { name: newHabitName, color: newHabitColor }]);
      setNewHabitName("");
      setNewHabitColor("#FF5733");
      setShowHabitForm(false);
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

      {/* Mostra il form come popup/modal */}
      {showHabitForm && (
        <Habit 
          newHabitName={newHabitName}
          setNewHabitName={setNewHabitName}
          newHabitColor={newHabitColor}
          setNewHabitColor={setNewHabitColor}
          addHabit={addHabit}
          setShowHabitForm={setShowHabitForm} // Passiamo la funzione per chiudere il popup
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
