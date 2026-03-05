import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockPatients } from '../data/mockData';
import { ArrowLeft, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './ReportGenerator.css';

export const ReportGenerator = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const reportRef = useRef();
    const patient = mockPatients.find(p => p.id === parseInt(id));

    if (!patient) return <div>Paciente no encontrado</div>;

    const handleDownloadPDF = async () => {
        const element = reportRef.current;
        if (!element) return;

        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Reporte_Nutricional_${patient.name.replace(/\s+/g, '_')}.pdf`);
    };

    return (
        <div className="report-generator-container">
            <header className="report-header">
                <div className="header-left">
                    <button className="btn-icon-blur" onClick={() => navigate(`/pacientes/${patient.id}`)}>
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1>Generar Reporte</h1>
                        <p className="subtitle">Vista previa del documento PDF</p>
                    </div>
                </div>
                <button className="btn-primary" onClick={handleDownloadPDF}>
                    <Download size={18} />
                    <span>Descargar PDF</span>
                </button>
            </header>

            <div className="report-preview-wrapper fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="a4-document" ref={reportRef}>
                    <div className="doc-header">
                        <div className="logo-placeholder">🌿 NutriApp</div>
                        <div className="doc-meta">
                            <p><strong>Profesional:</strong> Dra. Pueblas</p>
                            <p><strong>Fecha:</strong> {new Date().toLocaleDateString('es-ES')}</p>
                        </div>
                    </div>

                    <h1 className="doc-title">Plan Nutricional y Progreso</h1>

                    <div className="doc-section">
                        <h2>Datos del Paciente</h2>
                        <div className="doc-grid">
                            <p><strong>Nombre:</strong> {patient.name}</p>
                            <p><strong>Edad:</strong> {patient.age} años</p>
                            <p><strong>Objetivo:</strong> {patient.goal}</p>
                            <p><strong>Peso Actual:</strong> {patient.weight} kg</p>
                        </div>
                    </div>

                    <div className="doc-section">
                        <h2>Distribución de Macronutrientes</h2>
                        <div className="macros-container">
                            <div className="macro-box">
                                <span className="macro-title">Proteínas</span>
                                <span className="macro-value">30%</span>
                            </div>
                            <div className="macro-box">
                                <span className="macro-title">Carbohidratos</span>
                                <span className="macro-value">45%</span>
                            </div>
                            <div className="macro-box">
                                <span className="macro-title">Grasas</span>
                                <span className="macro-value">25%</span>
                            </div>
                        </div>
                    </div>

                    <div className="doc-section">
                        <h2>Recomendaciones Generales</h2>
                        <ul className="recommendations-list">
                            <li>Mantené una hidratación de al menos 2.5 litros diarios.</li>
                            <li>Priorizá el consumo de proteínas magras en todas las comidas.</li>
                            <li>Realizá actividad física de fuerza 3 a 4 veces por semana.</li>
                            <li>Evitá los ultraprocesados y enfocate en comida real y natural.</li>
                        </ul>
                    </div>

                    <div className="doc-footer">
                        <p>Este documento es generado automáticamente por NutriApp.</p>
                        <p>Ante cualquier duda clínica, consulta presencial.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
