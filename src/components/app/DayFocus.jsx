import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../DayFocus.css"; // Salire di una cartella per raggiungere components


const DayFocus = () => {
  const { date } = useParams(); // Otteniamo la data dalla URL
  const navigate = useNavigate();
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    // Recupera i dati da localStorage
    const savedData = JSON.parse(localStorage.getItem("habitData")) || {};
    const [year, month, day] = date.split("-").map(Number);
    
    // Verifica se i dati esistono e recupera le abitudini per il giorno specificato
    const dayHabits = savedData[`${year}-${month - 1}`]?.[day] || [];
    setHabits(dayHabits);
  }, [date]);

  const removeHabit = (habitName) => {
    const savedData = JSON.parse(localStorage.getItem("habitData")) || {};
    const [year, month, day] = date.split("-").map(Number);

    if (savedData[`${year}-${month - 1}`]?.[day]) {
      savedData[`${year}-${month - 1}`][day] = savedData[`${year}-${month - 1}`][day].filter(
        (habit) => habit.name !== habitName
      );
      localStorage.setItem("habitData", JSON.stringify(savedData));
      setHabits(savedData[`${year}-${month - 1}`][day] || []);
    }
  };

  return (
    <div className="day-focus">
      <h2>Abitudini per {date}</h2>
      <ul>
        {habits.map((habit, index) => (
          <li key={index} style={{ backgroundColor: habit.color }}>
            {habit.name}
            <button onClick={() => removeHabit(habit.name)}>❌</button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/")}>Torna indietro</button>
    </div>
  );
};

export default DayFocus;
