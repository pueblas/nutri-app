import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockPatients } from '../data/mockData';
import { ArrowLeft, Edit3, Activity, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './PatientDetail.css';

const weightData = [
    { date: '15/08', weight: 68 },
    { date: '15/09', weight: 66.5 },
    { date: '15/10', weight: 65 },
];

export const PatientDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const patient = mockPatients.find(p => p.id === parseInt(id));

    if (!patient) return <div style={{ padding: 40 }}>Paciente no encontrado</div>;

    return (
        <div className="patient-detail-container">
            <header className="detail-header">
                <div className="header-left">
                    <button className="btn-icon-blur" onClick={() => navigate('/pacientes')}>
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1>{patient.name}</h1>
                        <p className="subtitle">{patient.email} | {patient.phone}</p>
                    </div>
                </div>
                <div className="header-actions">
                    <button className="btn-secondary">
                        <Edit3 size={18} />
                        <span>Editar Perfil</span>
                    </button>
                    <button className="btn-primary" onClick={() => navigate(`/consultas/nueva/${patient.id}`)}>
                        <Activity size={18} />
                        <span>Iniciar Consulta</span>
                    </button>
                </div>
            </header>

            <div className="detail-grid">
                <div className="biometrics-card glass-panel fade-in">
                    <h2>Biometría Actual</h2>
                    <div className="metrics-list">
                        <div className="metric-item">
                            <span className="label">Edad</span>
                            <span className="value">{patient.age} años</span>
                        </div>
                        <div className="metric-item">
                            <span className="label">Altura</span>
                            <span className="value">{patient.height} cm</span>
                        </div>
                        <div className="metric-item">
                            <span className="label">Peso inicial</span>
                            <span className="value">68 kg</span>
                        </div>
                        <div className="metric-item highlight">
                            <span className="label">Peso actual</span>
                            <span className="value">{patient.weight} kg</span>
                        </div>
                    </div>
                </div>

                <div className="chart-card glass-panel fade-in" style={{ animationDelay: '0.1s' }}>
                    <div className="chart-header">
                        <h2>Evolución de Peso</h2>
                        <button className="btn-text-small">Ver todas las métricas</button>
                    </div>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={weightData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--glass-border)" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                                <YAxis domain={['dataMin - 2', 'dataMax + 2']} axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }}
                                />
                                <Line type="monotone" dataKey="weight" stroke="var(--accent-primary)" strokeWidth={3} dot={{ r: 6, fill: 'var(--accent-primary)', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="history-card glass-panel fade-in" style={{ animationDelay: '0.2s', gridColumn: '1 / -1' }}>
                    <h2>Historial de Consultas</h2>
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Motivo</th>
                                <th>Peso</th>
                                <th>Notas del profesional</th>
                                <th>Reporte</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>15/10/2023</td>
                                <td>Seguimiento</td>
                                <td>65.0 kg</td>
                                <td className="notes-col">El paciente viene cumpliendo el déficit. Refiere buena energía...</td>
                                <td><button className="btn-icon-small" onClick={(e) => e.stopPropagation()}><Download size={16} /></button></td>
                            </tr>
                            <tr>
                                <td>15/09/2023</td>
                                <td>Seguimiento</td>
                                <td>66.5 kg</td>
                                <td className="notes-col">Ajuste de plan de alimentación, incorporando más proteína...</td>
                                <td><button className="btn-icon-small" onClick={(e) => e.stopPropagation()}><Download size={16} /></button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
