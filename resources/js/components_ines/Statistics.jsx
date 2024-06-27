import React, { useState, useEffect } from 'react';
import { Pie, Bar, Line, Doughnut, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale } from 'chart.js';
import statistics from "../../../../../Downloads/dashboard/my-dashboard-ines/src/data/statistics.json";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale
);

function Statistics({ teamId }) { // recebe como props o id da equipa selecionada
  const [showAll, setShowAll] = useState(false); // Estado para controlar a visibilidade de todas as equipas
  const [filteredStatistics, setFilteredStatistics] = useState([]); // Estado que mantém as estatísticas filtradas com base no teamId recebido
  const [totalMembers, setTotalMembers] = useState(0); // Estado que armazena o número total de elementos da equipa selecionada
  const visibleStatistics = showAll ? filteredStatistics : filteredStatistics.slice(0, 3); // var que determina quantos garficos ficam visiveis

  useEffect(() => {
    if (teamId) {

      //Aqui fazer chamada à BD das estatíticas da equipa (a partir do id)

      const teamStatistics = statistics.filter(stat => stat.teamId === teamId); // Filtragem *provisória* das estatisticas da equipa atual
      setFilteredStatistics(teamStatistics.length > 0 ? teamStatistics : defaultStatistics); // atualizamos o estado das estatisticas

      // Aqui, vamos obter o número total de elementos da equipa
      // Supondo que temos uma função getTotalMembers(teamId) que retorna o número de elementos da equipa -> *chamada à BD*
      const total = getTotalMembers(teamId);
      setTotalMembers(total);
    } else {
      setFilteredStatistics(defaultStatistics);
      setTotalMembers(6);
    }
  }, [teamId]); // as estatísticas são atualizadas conforme o teamId atual

  // Supondo que temos uma função que retorna o número total de membros da equipa -> CHAMADA À BD A PARTIR DO ID DA EQUIPA
  const getTotalMembers = (teamId) => {
    // implementação fictícia -> substituir isto com a lógica real
    const teamMembers = {
      1: 5, // Suponha que a equipa 1 tem 5 elemntos
      2: 5  // Suponha que a equipa 2 tem 5 elemntos
    };
    return teamMembers[teamId] || 0;
  };

  // Caso não haja equipas ou as equipas ainda não tenham realizado nenhuma atividade as estatísticas encontram-se a zeros:
  const defaultStatistics = [
    {
      id: 'default1',
      title: "Feedback",
      description: "Sem valores disponíveis",
      chartType: "pie",
      data: [1, 7, 2, 4, 3],
      labels: ["Muito mau", "Insatisfatório", "Satisfatório", "Bom", "Muito Bom"],
      backgroundColor: ["#D9D9D9", "#D9D9D9", "#D9D9D9", "#D9D9D9", "#D9D9D9"]
    },
    {
      id: 'default2',
      title: "Envolvimento",
      description: "Sem valores disponíveis",
      chartType: "doughnut",
      "data": [25, 20, 10, 35, 25],
      labels: ["Muito Baixo", "Baixo", "Médio", "Alto", "Muito Alto"],
      backgroundColor: ["#D9D9D9", "#D9D9D9", "#D9D9D9", "#D9D9D9", "#D9D9D9"]
    },
    {
      id: 'default3',
      title: "Satisfação",
      description: "Sem valores disponíveis",
      chartType: "radar",
      data: [3, 2, 4, 3, 5],
      labels: ["Mau", "Razoável", "Bom", "Ótimo", "Excelente"],
      backgroundColor: ["#D9D9D9", "#D9D9D9", "#D9D9D9", "#D9D9D9", "#D9D9D9"]
    },
    {
      id: 'default4',
      title: "Participação",
      description: "Sem valores disponíveis",
      chartType: "bar",
      data: [3, 6, 5],
      labels: ["Atividade x", "Atividade y", "Atividade z"],
      backgroundColor: ["#D9D9D9", "#D9D9D9", "#D9D9D9", "#D9D9D9", "#D9D9D9"]
    },
    {
      id: 'default5',
      title: "Produtividade",
      description: "Sem valores disponíveis",
      chartType: "line",
      data: [20, 60, 60],
      labels: ["Atividade x", "Atividade y", "Atividade z"],
      backgroundColor: ["#D9D9D9", "#D9D9D9", "#D9D9D9", "#D9D9D9", "#D9D9D9"]
    }
  ];

{/* Uma função que renderiza o gráfico com base no tipo especificado em stat.chartType */}
  const renderChart = (stat) => {
    const chartData = {
      labels: stat.labels,
      datasets: [{
        data: stat.data,
        backgroundColor: stat.backgroundColor
      }]
    };

    const optionsBar = {
      scales: {
        y: {
          min: stat.yMin || 0,
          max: stat.yMax || totalMembers || 5 // define escala de 0 até ao número total de elementos da equipa
        }
      }
    };

    const optionsLine = {
      scales: {
        y: {
          min: stat.yMin || 0,
          max: stat.yMax || 100 // define escala de 0 a 100
        }
      }
    };


    switch (stat.chartType) {
      case 'pie':
        return <Pie data={chartData} />;
      case 'bar':
        return <Bar data={chartData} options={optionsBar} />;
      case 'line':
        return <Line data={chartData} options={optionsLine}/>;
      case 'doughnut':
        return <Doughnut data={chartData} />;
      case 'radar':
        return <Radar data={chartData} />;
      case 'legend':
        return (
          <ul className="text-left mt-12">
            {stat.labels.map((label, index) => (
              <li key={index} className="mb-2">
                <span
                  className="block w-4 h-4 inline-block rounded mr-2"
                  style={{ backgroundColor: stat.backgroundColor[index] }}
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
        <h2 className="font-manjari font-semibold text-2xl">ESTATÍSTICAS</h2>
        <button className="text-[#808080] hover:text-slate-600 px-4 py-2 rounded-md underline"
        onClick={() => setShowAll(!showAll)}>
          {showAll ? 'Ver Menos' : 'Ver Tudo'}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleStatistics.map(stat => (
          <div key={stat.id} className="bg-white px-8 py-4 rounded-lg shadow-md text-center">
            <h2 className="font-manjari text-xl font-semibold">{stat.title}</h2>
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
