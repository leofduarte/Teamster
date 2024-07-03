import React, { useState, useEffect } from "react";
import { Pie, Bar, Line, Doughnut, Radar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    RadialLinearScale,
} from "chart.js";
import axios from "axios";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    RadialLinearScale
);

function Statistics({ teamId }) {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [participantsCount, setParticipantsCount] = useState(0);
    const [participantResponses, setParticipantResponses] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [filteredStatistics, setFilteredStatistics] = useState([]);

    //? Esta função vai buscar todas as equipas e guarda-as no estado 'teams'
    useEffect(() => {
        const getTeams = async () => {
            try {
                const response = await axios.post("/api/v1/equipas");
                console.log("Equipas:", response.data);
                setTeams(response.data);
            } catch (error) {
                console.error("Erro ao buscar equipas:", error);
            }
        };

        getTeams();
    }, []);

    //? Esta função conta o numero de participantes da equipa selecionada e guarda no estado 'participantsCount'
    useEffect(() => {
        if (teamId && teams.length > 0) {
            const team = teams.find((t) => t.id === teamId);
            setSelectedTeam(team);
            if (team) {
                setParticipantsCount(team.participants.length);
            }
        }
    }, [teamId, teams]);

    //? Esta função vai buscar o feedback dos participantes da equipa selecionada e guarda no estado 'participantResponses'
    useEffect(() => {
        const getParticipantsFeedback = async () => {
            if (selectedTeam) {
                try {
                    const response = await axios.post(
                        "/api/v1/getAllResponses",
                        {
                            teamId: selectedTeam.id,
                        }
                    );
                    console.log(
                        "Feedback dos participantes da equipa:",
                        response.data
                    );

                    const filteredResponses = response.data.filter((response) =>
                        selectedTeam.participants.some(
                            (participant) =>
                                participant.id === response.participantId
                        )
                    );

                    setParticipantResponses(filteredResponses);
                    console.log(
                        "Respostas filtradas dos participantes da equipa:",
                        filteredResponses
                    );

                    // Processar respostas aqui
                    // processResponses(filteredResponses);
                } catch (error) {
                    console.error(
                        "Erro ao buscar feedback dos participantes:",
                        error
                    );
                }
            }
        };

        getParticipantsFeedback();
    }, [selectedTeam]);

    const defaultStatistics = [
        {
            id: "default1",
            title: "Feedback",
            description: "Sem valores disponíveis",
            chartType: "pie",
            data: [1, 7, 2, 4, 3],
            labels: [
                "Muito mau",
                "Insatisfatório",
                "Satisfatório",
                "Bom",
                "Muito Bom",
            ],
            backgroundColor: [
                "#D9D9D9",
                "#D9D9D9",
                "#D9D9D9",
                "#D9D9D9",
                "#D9D9D9",
            ],
        },
        {
            id: "default2",
            title: "Envolvimento",
            description: "Sem valores disponíveis",
            chartType: "doughnut",
            data: [25, 20, 10, 35, 25],
            labels: ["Muito Baixo", "Baixo", "Médio", "Alto", "Muito Alto"],
            backgroundColor: [
                "#D9D9D9",
                "#D9D9D9",
                "#D9D9D9",
                "#D9D9D9",
                "#D9D9D9",
            ],
        },
        {
            id: "default3",
            title: "Satisfação",
            description: "Sem valores disponíveis",
            chartType: "radar",
            data: [3, 2, 4, 3, 5],
            labels: ["Mau", "Razoável", "Bom", "Ótimo", "Excelente"],
            backgroundColor: [
                "#D9D9D9",
                "#D9D9D9",
                "#D9D9D9",
                "#D9D9D9",
                "#D9D9D9",
            ],
        },
        {
            id: "default4",
            title: "Participação",
            description: "Sem valores disponíveis",
            chartType: "bar",
            data: [3, 6, 5],
            labels: ["Atividade x", "Atividade y", "Atividade z"],
            backgroundColor: [
                "#D9D9D9",
                "#D9D9D9",
                "#D9D9D9",
                "#D9D9D9",
                "#D9D9D9",
            ],
        },
        {
            id: "default5",
            title: "Produtividade",
            description: "Sem valores disponíveis",
            chartType: "line",
            data: [20, 60, 60],
            labels: ["Atividade x", "Atividade y", "Atividade z"],
            backgroundColor: [
                "#D9D9D9",
                "#D9D9D9",
                "#D9D9D9",
                "#D9D9D9",
                "#D9D9D9",
            ],
        },
    ];

    const visibleStatistics = showAll ? filteredStatistics : defaultStatistics;

    const renderChart = (stat) => {
        const chartData = {
            labels: stat.labels,
            datasets: [
                {
                    data: stat.data,
                    backgroundColor: stat.backgroundColor,
                },
            ],
        };

        const optionsBar = {
            scales: {
                y: {
                    min: stat.yMin || 0,
                    max: stat.yMax || participantsCount || 5,
                },
            },
        };

        const optionsLine = {
            scales: {
                y: {
                    min: stat.yMin || 0,
                    max: stat.yMax || 100,
                },
            },
        };

        switch (stat.chartType) {
            case "pie":
                return <Pie data={chartData} />;
            case "bar":
                return <Bar data={chartData} options={optionsBar} />;
            case "line":
                return <Line data={chartData} options={optionsLine} />;
            case "doughnut":
                return <Doughnut data={chartData} />;
            case "radar":
                return <Radar data={chartData} />;
            case "legend":
                return (
                    <ul className="text-left mt-12">
                        {stat.labels.map((label, index) => (
                            <li key={index} className="mb-2">
                                <span
                                    className="block w-4 h-4 inline-block rounded mr-2"
                                    style={{
                                        backgroundColor:
                                            stat.backgroundColor[index],
                                    }}
                                ></span>
                                {label}
                            </li>
                        ))}
                    </ul>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div className="flex items-center justify-between mb-3">
                <h2 className="font-manjari font-semibold text-2xl">
                    ESTATÍSTICAS
                </h2>
                <button
                    className="text-[#808080] hover:text-slate-600 px-4 py-2 rounded-md underline"
                    onClick={() => setShowAll(!showAll)}
                >
                    {showAll ? "Ver Menos" : "Ver Tudo"}
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {visibleStatistics.map((stat) => (
                    <div
                        key={stat.id}
                        className="bg-white px-8 py-4 rounded-lg shadow-md text-center"
                    >
                        <h2 className="font-manjari text-xl font-semibold">
                            {stat.title}
                        </h2>
                        <p className="mb-5">{stat.description}</p>
                        <div className="h-40 flex items-center justify-center">
                            {renderChart(stat)}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Statistics;
