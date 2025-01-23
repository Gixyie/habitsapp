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

        // Stato per la mappatura delle attività al calendario
  const [calendarActivities, setCalendarActivities] = useState({});

  // Stato per l'abitudine selezionata
  const [selectedHabit, setSelectedHabit] = useState(null);

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

    const deleteHabit = (habitId) => {
      // Rimuovi l'attività dall'elenco
      const updatedHabits = habits.filter((habit) => habit.id !== habitId);
      setHabits(updatedHabits);
      localStorage.setItem('habits', JSON.stringify(updatedHabits));
  
      // Rimuovi l'attività anche dal calendario
      const updatedCalendarActivities = { ...calendarActivities };
      Object.keys(updatedCalendarActivities).forEach((month) => {
        Object.keys(updatedCalendarActivities[month]).forEach((day) => {
          updatedCalendarActivities[month][day] = updatedCalendarActivities[month][day].filter(
            (id) => id !== habitId
          );
  
          // Se il giorno non ha più attività, lo rimuoviamo
          if (updatedCalendarActivities[month][day].length === 0) {
            delete updatedCalendarActivities[month][day];
          }
        });
  
        // Se il mese non ha più giorni, lo rimuoviamo
        if (Object.keys(updatedCalendarActivities[month]).length === 0) {
          delete updatedCalendarActivities[month];
        }
      });
  
      setCalendarActivities(updatedCalendarActivities);
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
          <div
            key={habit.id}
            className={`habit-item ${selectedHabit === habit.id ? 'selected' : ''}`}
            onClick={() => setSelectedHabit(habit.id)} // Seleziona l'attività
          >
            <div className="habit-icon">{habit.icon}</div>
            <div className="habit-details">
              <h2>{habit.name}</h2>
              <p>{habit.progress}</p>
            </div>
            <button
              className="delete-habit-button"
              onClick={(e) => {
                e.stopPropagation(); // Evita di selezionare l'attività durante l'eliminazione
                deleteHabit(habit.id);
              }}
            >
              ❌
            </button>
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
     <Calendar
        selectedHabit={selectedHabit} // Passa l'attività selezionata
        habits={habits}
        calendarActivities={calendarActivities}
        setCalendarActivities={setCalendarActivities}
      />
    </div>
  );
};

export default HabitsApp;