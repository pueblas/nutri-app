import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, MoreVertical, Edit2, List, Grid } from 'lucide-react';
import { mockPatients } from '../data/mockData';
import './Patients.css';

export const Patients = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const filteredPatients = mockPatients.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="patients-container">
            <header className="page-header">
                <div>
                    <h1>Mis Pacientes</h1>
                    <p className="subtitle">Gestiona el historial y progreso de tus clientes.</p>
                </div>
                <button className="btn-primary">
                    <Plus size={20} />
                    <span>Nuevo Paciente</span>
                </button>
            </header>

            <div className="filters-toolbar glass-panel fade-in">
                <div className="search-box">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="view-toggles">
                    <button className="btn-icon active"><List size={18} /></button>
                    <button className="btn-icon"><Grid size={18} /></button>
                </div>
            </div>

            <div className="patients-table-container glass-panel fade-in" style={{ animationDelay: '0.1s' }}>
                <table className="patients-table">
                    <thead>
                        <tr>
                            <th>Paciente</th>
                            <th>Contacto</th>
                            <th>Objetivo</th>
                            <th>Última Visita</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients.map(patient => (
                            <tr key={patient.id} className="patient-row" onClick={() => navigate(`/pacientes/${patient.id}`)} style={{ cursor: 'pointer' }}>
                                <td>
                                    <div className="patient-name-cell">
                                        <div className="avatar">{patient.name.charAt(0)}</div>
                                        <div>
                                            <span className="name">{patient.name}</span>
                                            <span className="age">{patient.age} años</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="contact-cell">
                                        <span>{patient.email}</span>
                                        <span className="phone">{patient.phone}</span>
                                    </div>
                                </td>
                                <td><span className="goal-badge">{patient.goal}</span></td>
                                <td>{new Date(patient.lastVisit).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                                <td>
                                    <div className="actions-cell">
                                        <button className="btn-icon-small"><Edit2 size={16} /></button>
                                        <button className="btn-icon-small"><MoreVertical size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredPatients.length === 0 && (
                            <tr>
                                <td colSpan="5" className="empty-state">No se encontraron pacientes que coincidan con la búsqueda.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
