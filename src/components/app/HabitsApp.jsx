import React, { useState } from "react";
import "./HabitsApp.css";

const HabitsApp = () => {
  const [habits, setHabits] = useState([
    { id: 1, title: "Self care", description: "Teeth, skincare, haircare", streak: 26, progress: "2/2" },
    { id: 2, title: "Journal", description: "Clearing your mind a lil bit", streak: 30, progress: "1/1" },
    { id: 3, title: "Water", description: "Drinking 4-6 glasses daily", streak: 6, progress: "48/32 oz" },
    { id: 4, title: "Bodycare", description: "Shower, lotion", streak: 7, progress: "1/1" },
    { id: 5, title: "Duolingo lesson", description: "", streak: 2, progress: "1/1" },
    { id: 6, title: "Read", description: "At least 2 pages daily", streak: 2, progress: "40/2" }
  ]);

  const [newHabit, setNewHabit] = useState({ title: "", description: "" });

  const handleAddHabit = () => {
    if (newHabit.title.trim() !== "") {
      setHabits([
        ...habits,
        { id: habits.length + 1, ...newHabit, streak: 0, progress: "0/1" }
      ]);
      setNewHabit({ title: "", description: "" });
    }
  };

  return (
    <div className="container">
      <h1>Today</h1>
      <div className="calendar">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="calendar-day">
            {23 + i}
          </div>
        ))}
      </div>

      <div className="habit-list">
        {habits.map((habit) => (
          <div key={habit.id} className="habit-card">
            <div className="habit-title">{habit.title}</div>
            <div className="habit-description">{habit.description}</div>
            <div className="habit-progress">
              <span className="streak">🔥 {habit.streak} Days</span>
              <span className="habit-count">{habit.progress}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="add-habit">
        <input
          type="text"
          placeholder="Habit title"
          value={newHabit.title}
          onChange={(e) => setNewHabit({ ...newHabit, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newHabit.description}
          onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
        />
        <button onClick={handleAddHabit}>Add Habit</button>
      </div>
    </div>
  );
};

export default HabitsApp;


