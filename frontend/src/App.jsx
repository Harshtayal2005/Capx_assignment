import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home_page from "./components/home_page";
import { Myprovider } from "./context/createContext";

const App = () => {
  return (
    <Router>
      <Myprovider>
        <Routes>
          <Route path="/" element={<Home_page/>} />
        </Routes>
      </Myprovider>
    </Router>
  );
};

export default App;
