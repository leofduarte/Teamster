import React, { useState, useEffect } from 'react';
import Statistics from './Statistics.jsx';
import Teams from './Teams.jsx';
import teams from '../data/teams.json';

function DashboardContent() {
  const [selectedTeamId, setSelectedTeamId] = useState(null); // var de estado que guarda o id da equipa selecionada na componente das equipas

  useEffect(() => {
    if (teams.length > 0) {
      setSelectedTeamId(teams[0].id);
    }
  }, []);

  return (
    <div className="px-8 bg-[#F8F7FC] flex-2 mr-5 mb-8 overflow-hidden">
      <div className="mt-5">
        <h1 className="mb-20 mt-10 text-4xl font-bold">Dashboard</h1>
      </div>
      <div className="joyride-statistics">
        <Statistics teamId={selectedTeamId} /> {/*PASSO 2 -> Passa como props o team id com o valor guardado na var de estado*/}
      </div>
      <div className="joyride-teams">
        <Teams onSelectTeam={setSelectedTeamId} selectedTeamId={selectedTeamId} /> {/*PASSO 1 -> callback function da equipa selecionada: recebe-se o id e atualiza a var de estado*/}
      </div>
    </div>
  );
}

export default DashboardContent;
