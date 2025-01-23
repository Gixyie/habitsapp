import React, {useState, useEffect} from 'react'
import './HabitsApp.css'
import Calendar from "./Calendar";




const HabitsApp = () => {
 // Stato per la lista delle abitudini
 
    const [habits, setHabits] = useState(() => {
        // Recupera i dati dal localStorage all'avvio
        const savedHabits = localStorage.getItem('habits');
        return savedHabits ? JSON.parse(savedHabits) : [];
      });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newHabit, setNewHabit] = useState({ name: '', progress: '', icon: '' });
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
      setIsModalOpen(false);
      setNewHabit({ name: '', icon: '' }); // Resetta il form
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewHabit((prevHabit) => ({ 
        ...prevHabit, 
        [name]: value ,
    }));
    };
  

 // Funzione per aggiungere una nuova abitudine
 const addHabit = () => {
    if (!newHabit.name) {
        alert('Per favore, compila tutti i campi!');
        return;
      }
      const updatedHabits = [...habits, { id: habits.length + 1, ...newHabit }];
      setHabits(updatedHabits);
      localStorage.setItem('habits', JSON.stringify(updatedHabits)); // Salva nel localStorage
      closeModal();
    };

    useEffect(() => {
        // Sincronizza il localStorage ogni volta che cambia la lista delle abitudini
        localStorage.setItem('habits', JSON.stringify(habits));
      }, [habits]);

      
  return (
    <div className= 'container'>
        <h1>Habits Tracker</h1>
    <div className= 'week-calendar'>
        {['Mo', 'Tu', 'Wh', 'Th', 'Fr', 'Sa', 'Sun'].map((day, index) => (
            <div key={index} className="day-circle">
                {day}
            </div>
        ))}
    </div>
    <div className="habit-list">
        {habits.map((habit) => (
          <div key={habit.id} className="habit-item">
            <div className="habit-icon">{habit.icon}</div>
            <div className="habit-details">
              <h2>{habit.name}</h2>
              <p>{habit.progress}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="add-habit-button" onClick={openModal}>+</button>
    
    
      {/* Modale */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Aggiungi una nuova abitudine</h2>
            <label>
              Nome:
              <input
                type="text"
                name="name"
                value={newHabit.name}
                onChange={handleInputChange}
              />
            </label>
            
            <div className="modal-buttons">
              <button className="modal-add-button" onClick={addHabit}>Aggiungi</button>
              <button className="modal-cancel-button" onClick={closeModal}>Annulla</button>
            </div>
          </div>
        </div>
    )}
    <Calendar />
    </div>
  );
};

export default HabitsApp;