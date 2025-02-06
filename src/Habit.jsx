import React from "react";
import "./Habit.css"; // Importa il CSS del form

const Habit = ({ newHabitName, setNewHabitName, newHabitColor, setNewHabitColor, addHabit, setShowHabitForm }) => {
  return (
    <div className="habit-modal-overlay" onClick={() => setShowHabitForm(false)}>
      <div className="habit-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Aggiungi Nuova Abitudine</h2>
        <input
          type="text"
          placeholder="Nome abitudine"
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
          className="habit-input"
        />
        <input
          type="color"
          value={newHabitColor}
          onChange={(e) => setNewHabitColor(e.target.value)}
          className="habit-color-picker"
        />
        <div className="habit-buttons">
          <button className="add-button" onClick={addHabit}>Aggiungi</button>
          <button className="cancel-button" onClick={() => setShowHabitForm(false)}>Annulla</button>
        </div>
      </div>
    </div>
  );
};

export default Habit;
