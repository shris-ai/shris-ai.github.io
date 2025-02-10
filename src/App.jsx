// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TopBar from './routes/TopBar/TopBar';
import Home from './routes/Home/Home';
import PaperDiveIns from './routes/PaperDiveIns/PaperDiveIns';
import PaperBreakdown from './routes/PaperDiveIns/PaperBreakdown';

function App() {
    return (
        <Router>
            <TopBar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/paper-dive-ins" element={<PaperDiveIns />} />
                <Route path="/paper-breakdown" element={<PaperBreakdown />} />
            </Routes>
        </Router>
    );
}

export default App;