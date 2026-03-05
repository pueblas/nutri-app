import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, Calendar, Settings, LogOut } from 'lucide-react';
import './Sidebar.css';

export const Sidebar = () => {
    const menuItems = [
        { name: 'Dashboard', icon: <Home size={20} />, path: '/' },
        { name: 'Pacientes', icon: <Users size={20} />, path: '/pacientes' },
        { name: 'Consultas', icon: <Calendar size={20} />, path: '/consultas' },
        { name: 'Configuración', icon: <Settings size={20} />, path: '/settings' },
    ];

    return (
        <aside className="sidebar glass-panel">
            <div className="sidebar-header">
                <div className="logo-placeholder">
                    <span className="logo-icon">🌿</span>
                    <h2>NutriApp</h2>
                </div>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                end={item.path === '/'}
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="sidebar-footer">
                <button className="logout-btn">
                    <LogOut size={20} />
                    <span>Cerrar Sesión</span>
                </button>
            </div>
        </aside>
    );
};
