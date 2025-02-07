import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";
import "./HabitsApp.css";
import Habit from "../../Habit"; // Importiamo il form correttamente
import { useNavigate } from "react-router-dom"; // Importiamo useNavigate


const HabitsApp = () => {
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [calendarActivities, setCalendarActivities] = useState({});
  const [showHabitForm, setShowHabitForm] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");  
  const [newHabitColor, setNewHabitColor] = useState("#FF5733"); 
  const navigate = useNavigate(); // Hook per la navigazione

  const openDayFocus = (date) => {
    navigate(`/day/${date}`); 
  };
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("habitData")) || {};
    setCalendarActivities(savedData);
  }, []);


  useEffect(() => {
    const savedData = localStorage.getItem("habitData");
    if (savedData) {
      setCalendarActivities(JSON.parse(savedData));
    }
  }, []);
  
  useEffect(() => {
    if (Object.keys(calendarActivities).length > 0) {
      localStorage.setItem("habitData", JSON.stringify(calendarActivities));
    }
  }, [calendarActivities]);
  
  useEffect(() => {
    const savedHabits = localStorage.getItem("habitsList");
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
  }, []);
  

  const addHabit = () => {
    if (newHabitName.trim()) {
      const updatedHabits = [...habits, { name: newHabitName, color: newHabitColor || getRandomColor() }];
      setHabits(updatedHabits);
      localStorage.setItem("habitsList", JSON.stringify(updatedHabits)); // Salva le abitudini nel localStorage
      setNewHabitName("");
      setNewHabitColor("#FF5733"); // Reset del colore
      setShowHabitForm(false); // Chiudi il form dopo aver aggiunto l'abitudine
    }
  };
  
  const removeHabitFromList = (habitName) => {
    const updatedHabits = habits.filter(habit => habit.name !== habitName);
    setHabits(updatedHabits);
    localStorage.setItem("habitsList", JSON.stringify(updatedHabits)); // Aggiorna il localStorage
  };
  

  const selectHabit = (habit) => {
    setSelectedHabit(habit);
  };

  const assignHabitToDay = (day) => {
    if (!selectedHabit) return;
  
    setCalendarActivities((prev) => {
      const updated = { ...prev };
      if (!updated[currentYear]) updated[currentYear] = {};
      if (!updated[currentYear][currentMonth]) updated[currentYear][currentMonth] = {};
      if (!updated[currentYear][currentMonth][day]) updated[currentYear][currentMonth][day] = [];
  
      // Evita duplicati
      if (!updated[currentYear][currentMonth][day].some(habit => habit.name === selectedHabit.name)) {
        updated[currentYear][currentMonth][day].push(selectedHabit);
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

  const removeHabitFromDay = (date, habitName) => {
    const key = `${currentYear}-${currentMonth}`;
    setCalendarActivities((prev) => {
      const updated = { ...prev };
      if (updated[key] && updated[key][date]) {
        updated[key][date] = updated[key][date].filter(habit => habit.name !== habitName);
        if (updated[key][date].length === 0) {
          delete updated[key][date]; // Se non ci sono più abitudini, elimina il giorno
        }
      }
      return updated;
    });
  };
  

  return (
    <div className="container">
      <div className="header">
        <h1>Habit Tracker <i className="ri-checkbox-circle-line"></i></h1>
        <button onClick={() => setShowHabitForm(true)}>Aggiungi nuova abitudine</button>
      </div>

      {/* Mostra il form come popup/modal */}
      {showHabitForm && (
        <div className="habit-modal-overlay" onClick={()=> setShowHabitFprm(false)}>
        <Habit 
          newHabitName={newHabitName}
          setNewHabitName={setNewHabitName}
          newHabitColor={newHabitColor}
          setNewHabitColor={setNewHabitColor}
          addHabit={addHabit}
          setShowHabitForm={setShowHabitForm} // Passiamo la funzione per chiudere il popup
        />
        </div>
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
            onClick={(e) => {
              e.stopPropagation(); // Impedisce di attivare altri eventi indesiderati
              selectHabit(habit);
            }}
          >
            {habit.name}
            <button onClick={(e) => { e.stopPropagation(); removeHabitFromList(habit.name); }}>❌</button>

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
        openDayFocus={openDayFocus} // Passiamo la funzione al calendario
      />
    </div>
  );
};

export default HabitsApp;
