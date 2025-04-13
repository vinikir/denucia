import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './MessageDetails.css';

const MessageDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) {
        return (
            <div className="details-container">
                <div className="details-card">
                    <h2>Mensagem não encontrada</h2>
                    <p>Não foi possível carregar os detalhes da mensagem.</p>
                    <button onClick={() => navigate(-1)}>Voltar</button>
                </div>
            </div>
        );
    }

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            const offset = -3 * 60; // Fuso de São Paulo (UTC-3)
            const localDate = new Date(date.getTime() + offset * 60 * 1000);

            return localDate.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        } catch (e) {
            return 'Data inválida';
        }
    };

    return (
        <div className="details-container">
            <div className="details-card">
               

                <h2>{state.titulo || "Mensagem sem título"}</h2>

                <div className="detail-item">
                    <span className="detail-label">Data:</span>
                    <span className="detail-value">{formatDate(state.data)}</span>
                </div>

                <div className="detail-item full-width">
                    <span className="detail-label">Mensagem:</span>
                    <div className="message-content">
                        {state.msg || "Nenhuma mensagem disponível"}
                    </div>
                </div>

                <button className="back-button" onClick={() => navigate("/admin/mensagem")}>
                    &larr; Voltar
                </button>
            </div>
        </div>
    );
};

export default MessageDetails;