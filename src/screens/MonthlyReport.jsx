import React, { useState, useEffect } from 'react';
import './MonthlyReport.css';
import api from '../connection/connection';
import { useNavigate } from 'react-router-dom';

const MonthlyReport = () => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    // Gera anos para o dropdown (últimos 10 anos)
    const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

    const months = [
        { value: '01', label: 'Janeiro' },
        { value: '02', label: 'Fevereiro' },
        { value: '03', label: 'Março' },
        { value: '04', label: 'Abril' },
        { value: '05', label: 'Maio' },
        { value: '06', label: 'Junho' },
        { value: '07', label: 'Julho' },
        { value: '08', label: 'Agosto' },
        { value: '09', label: 'Setembro' },
        { value: '10', label: 'Outubro' },
        { value: '11', label: 'Novembro' },
        { value: '12', label: 'Dezembro' }
    ];

    const fetchData = async () => {
        if (!selectedMonth) {
            setError('Selecione um mês');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Calcula primeiro e último dia do mês
            const firstDay = new Date(`${selectedYear}-${selectedMonth}-01T00:00:00Z`);
            const lastDay = new Date(selectedYear, selectedMonth, 0); // Último dia do mês
            lastDay.setHours(23, 59, 59, 999);

            // Formata datas para ISO string
            const startDate = firstDay.toISOString();
            const endDate = lastDay.toISOString();

            console.log('Buscando dados de:', startDate, 'até', endDate);

            const response = await api.post('/denuncia/buscar', {
                "dataInicio":startDate,
                "dataFim":endDate
            });



            setData(response.data.valor);
        } catch (err) {
            setError('Erro ao buscar dados. Tente novamente.');
            console.error('Erro na requisição:', err);
        } finally {
            setLoading(false);
        }
    };

    // Formata data UTC para formato brasileiro (Fuso de São Paulo)
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);

            // Ajusta para fuso horário de São Paulo (UTC-3)
            const offset = -3 * 60; // -3 horas em minutos
            const localDate = new Date(date.getTime() + offset * 60 * 1000);

            return localDate.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
               
            });
        } catch (e) {
            console.error('Erro ao formatar data:', e);
            return 'Data inválida';
        }
    };

    // Obtém o título ou as primeiras 20 letras da mensagem
    const getDisplayTitle = (item) => {
        if (item.titulo && item.titulo.trim() !== '') {
            return item.titulo;
        }
        return item.msg ? item.msg.substring(0, 20) + (item.msg.length > 20 ? '...' : '') : 'Sem título';
    };
console.log("asdasd")
    return (
        <div className="report-container">
            <div className="report-header">
                <h2>Relatório Mensal</h2>

                <div className="filters">
                    <div className="filter-group">
                        <label htmlFor="month">Mês:</label>
                        <select
                            id="month"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            disabled={loading}
                        >
                            <option value="">Selecione</option>
                            {months.map((month) => (
                                <option key={month.value} value={month.value}>
                                    {month.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="year">Ano:</label>
                        <select
                            id="year"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                            disabled={loading}
                        >
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={fetchData}
                        disabled={loading || !selectedMonth}
                    >
                        {loading ? 'Buscando...' : 'Buscar'}
                    </button>
                </div>

                {error && <div className="error-message">{error}</div>}
            </div>

            <div className="results">
                {data.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}
                                    className="clickable-row"
                                    onClick={() => navigate('/admin/detalhes', {
                                    state: {
                                        titulo: item.titulo || getDisplayTitle(item),
                                        msg: item.msg,
                                        data: item.data
                                    }
                                    })}
                                >
                                    <td>{getDisplayTitle(item)}</td>
                                    <td>{formatDate(item.data)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    !loading && <div className="no-results">Nenhum resultado encontrado</div>
                )}

                {loading && <div className="loading">Carregando...</div>}
            </div>
        </div>
    );
};

export default MonthlyReport;