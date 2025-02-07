import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HabitsApp from "./components/app/HabitsApp";
import DayFocus from "./components/app/DayFocus";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HabitsApp />} />
        <Route path="/day/:date" element={<DayFocus />} />
      </Routes>
    </Router>
  );
};

export default App;
