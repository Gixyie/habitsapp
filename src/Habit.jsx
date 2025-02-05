import React from 'react';

const Habit = ({ newHabitName, setNewHabitName, newHabitColor, setNewHabitColor, addHabit }) => {
  return (
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
  );
};

export default Habit;
