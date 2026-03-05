import React from 'react';
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';
import './MainLayout.css';

export const MainLayout = () => {
    return (
        <div className="main-layout">
            <Sidebar />
            <main className="content-area">
                <Outlet />
            </main>
        </div>
    );
};
