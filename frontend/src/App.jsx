import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Parts from './pages/Parts';
import PartDetails from './pages/PartDetails';
import Schedules from './pages/Schedules';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="parts" element={<Parts />} />
          <Route path="parts/:partId" element={<PartDetails />} />
          <Route path="schedules" element={<Schedules />} />
          {/* Fallback for unknown routes */}
          <Route path="*" element={<div className="container" style={{ padding: '2rem' }}><h2>404: Page Not Found</h2></div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
