import React, { useState, useEffect } from "react";
import Statistics from "./Statistics.jsx";
import Teams from "./Teams.jsx";

function DashboardContent({ teams }) {
    console.log("DashboardContent rendering", teams);
    const [selectedTeamId, setSelectedTeamId] = useState(null);

    console.log("selectedTeamId", selectedTeamId);

    // Lógica para listar as equipas e selecionar apenas a primeira, a não ser que já haja uma equipa selecionada
    useEffect(() => {
    }, [selectedTeamId]);

    return (
        <div className="px-8 bg-[#F8F7FC] flex-2 mr-5 mb-8 overflow-hidden">
            <div className="mt-5">
                <h1 className="mb-20 mt-10 text-4xl font-bold">Dashboard</h1>
            </div>
            <div className="joyride-statistics">
                <Statistics teamId={selectedTeamId} />
            </div>
            <div className="joyride-teams">
                <Teams
                    teams={teams}
                    onSelectTeam={setSelectedTeamId}
                    selectedTeamId={selectedTeamId}
                />
            </div>
        </div>
    );
}

export default DashboardContent;
