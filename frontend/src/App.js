import './App.css';
import React from 'react';
import Home from './components/Home';
import DataTable from './components/DataTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/db" element={<DataTable />} exact />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

