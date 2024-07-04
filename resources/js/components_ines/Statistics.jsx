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

function Statistics({ onSelectTeam, selectedTeamId, teams }) {
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [participantsCount, setParticipantsCount] = useState(0);
    const [participantResponses, setParticipantResponses] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [filteredStatistics, setFilteredStatistics] = useState([]);

    useEffect(() => {
        const getParticipantsFeedback = async () => {
            if (selectedTeam) {
                try {
                    const response = await axios.post("/api/v1/getAllResponses", {
                        teamId: selectedTeam.id,
                    });
                    console.log(response.data);
                    const filteredResponses = response.data.filter((response) =>
                        selectedTeam.participants.some(
                            (participant) => participant.id === response.participantId
                        )
                    );
                    setParticipantResponses(filteredResponses);
                    processResponses(filteredResponses);
                } catch (error) {
                    console.error("Erro ao buscar feedback dos participantes:", error);
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
                "#56C496",
                "#7565E4",
                "#F54468",
                "#FE9DCB",
                "#FFD52F",
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
                "#56C496",
                "#7565E4",
                "#F54468",
                "#FE9DCB",
                "#FFD52F",
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
                "#56C496",
                "#7565E4",
                "#F54468",
                "#FE9DCB",
                "#FFD52F",
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
            <div className="flex items-center justify-between mb-7">
                <h2 className="font-serif font-semibold text-3xl">
                    ESTATÍSTICAS
                </h2>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {visibleStatistics.map((stat) => (
                    <div
                        key={stat.id}
                        className="bg-white px-8 py-4 rounded-lg shadow-md text-center"
                    >
                        <h2 className="font-serif text-xl font-semibold">
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
