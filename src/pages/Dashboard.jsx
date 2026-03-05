import React from 'react';
import { Users, TrendingUp, Calendar as CalendarIcon, Clock } from 'lucide-react';
import './Dashboard.css';

export const Dashboard = () => {
    const stats = [
        { title: 'Pacientes Activos', value: '124', icon: <Users size={24} />, color: 'var(--accent-primary)' },
        { title: 'Nuevos este mes', value: '+12', icon: <TrendingUp size={24} />, color: 'var(--success)' },
        { title: 'Consultas Hoy', value: '8', icon: <CalendarIcon size={24} />, color: '#F59E0B' },
    ];

    const todayAppointments = [
        { time: '09:00', name: 'Laura Martínez', type: 'Primera vez', status: 'Completado' },
        { time: '10:30', name: 'Carlos Gómez', type: 'Seguimiento', status: 'En progreso' },
        { time: '11:45', name: 'Ana Silva', type: 'Seguimiento', status: 'Pendiente' },
        { time: '14:00', name: 'Marcos Ruiz', type: 'Entrega de Plan', status: 'Pendiente' },
    ];

    return (
        <div className="dashboard-container">
            <header className="page-header">
                <div>
                    <h1>Hola, Dra. Pueblas 👋</h1>
                    <p className="subtitle">Aquí tienes tu resumen de hoy.</p>
                </div>
                <div className="current-date fade-in">
                    <Clock size={16} />
                    <span>{new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
            </header>

            <div className="stats-grid fade-in" style={{ animationDelay: '0.1s' }}>
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card glass-panel">
                        <div className="stat-icon" style={{ color: stat.color, backgroundColor: `${stat.color}15` }}>
                            {stat.icon}
                        </div>
                        <div className="stat-info">
                            <h3>{stat.title}</h3>
                            <p className="stat-value">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="dashboard-content fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="appointments-section glass-panel">
                    <div className="section-header">
                        <h2>Turnos de Hoy</h2>
                        <button className="btn-text">Ver calendario</button>
                    </div>

                    <div className="appointments-list">
                        {todayAppointments.map((apt, idx) => (
                            <div key={idx} className="appointment-item">
                                <div className="apt-time">{apt.time}</div>
                                <div className="apt-details">
                                    <h4>{apt.name}</h4>
                                    <span className="apt-type">{apt.type}</span>
                                </div>
                                <div className={`apt-status badge ${apt.status.replace(/\s+/g, '-').toLowerCase()}`}>
                                    {apt.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
