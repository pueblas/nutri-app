import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { Patients } from './pages/Patients';
import { PatientDetail } from './pages/PatientDetail';
import { NewConsultation } from './pages/NewConsultation';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="pacientes" element={<Patients />} />
          <Route path="pacientes/:id" element={<PatientDetail />} />
          <Route path="consultas" element={<div className="glass-panel" style={{ padding: 24 }}>Módulo de Consultas en construcción</div>} />
          <Route path="consultas/nueva/:id" element={<NewConsultation />} />
          <Route path="settings" element={<div className="glass-panel" style={{ padding: 24 }}>Ajustes</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
