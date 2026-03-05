import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockPatients } from '../data/mockData';
import { ArrowLeft, Save, FileText, Activity } from 'lucide-react';
import './NewConsultation.css';

export const NewConsultation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const patient = mockPatients.find(p => p.id === parseInt(id));

    const [metrics, setMetrics] = useState({
        weight: patient?.weight || '',
        bodyFat: '',
        muscleMass: '',
        notes: ''
    });

    if (!patient) return <div>Paciente no encontrado</div>;

    const handleSave = () => {
        // Acá en el MVP solo simulamos el guardado
        alert(`Consulta guardada para ${patient.name}`);
        navigate(`/reporte/${patient.id}`);
    };

    return (
        <div className="consultation-container">
            <header className="consultation-header">
                <div className="header-left">
                    <button className="btn-icon-blur" onClick={() => navigate(`/pacientes/${patient.id}`)}>
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1>Nueva Consulta: {patient.name}</h1>
                        <p className="subtitle">Registrando métricas al {new Date().toLocaleDateString()}</p>
                    </div>
                </div>
                <button className="btn-primary" onClick={handleSave}>
                    <Save size={18} />
                    <span>Finalizar y Reporte</span>
                </button>
            </header>

            <div className="consultation-grid fade-in">
                <div className="form-section glass-panel">
                    <div className="section-title">
                        <Activity size={20} />
                        <h2>Métricas Biométricas</h2>
                    </div>

                    <div className="form-grid">
                        <div className="input-group">
                            <label>Peso (kg)</label>
                            <input
                                type="number"
                                value={metrics.weight}
                                onChange={e => setMetrics({ ...metrics, weight: e.target.value })}
                                placeholder="Ej. 65"
                            />
                        </div>
                        <div className="input-group">
                            <label>Grasa Corporal (%)</label>
                            <input
                                type="number"
                                value={metrics.bodyFat}
                                onChange={e => setMetrics({ ...metrics, bodyFat: e.target.value })}
                                placeholder="Ej. 22.5"
                            />
                        </div>
                        <div className="input-group">
                            <label>Masa Muscular (kg)</label>
                            <input
                                type="number"
                                value={metrics.muscleMass}
                                onChange={e => setMetrics({ ...metrics, muscleMass: e.target.value })}
                                placeholder="Ej. 28.3"
                            />
                        </div>
                    </div>
                </div>

                <div className="form-section glass-panel" style={{ animationDelay: '0.1s' }}>
                    <div className="section-title">
                        <FileText size={20} />
                        <h2>Notas de Seguimiento</h2>
                    </div>
                    <div className="input-group full-width">
                        <textarea
                            rows="6"
                            placeholder="Escribe aquí las observaciones, feedback sobre la dieta, estado emocional..."
                            value={metrics.notes}
                            onChange={e => setMetrics({ ...metrics, notes: e.target.value })}
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};
