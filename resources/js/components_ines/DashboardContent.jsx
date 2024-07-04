import React from "react";
import Statistics from "./Statistics.jsx";
import Teams from "./Teams.jsx";

function DashboardContent({ teams, selectedTeamId, onSelectTeam }) {

    return (
        <div className="px-8 bg-[#F8F7FC] flex-2 mr-5 mb-8 overflow-hidden">
            <div className="mt-5">
                <h1 className="mb-16 mt-10 text-4xl font-bold">Dashboard</h1>
            </div>
            <div className="joyride-statistics">
                <Statistics teams={teams}
                            onSelectTeam={onSelectTeam}
                            selectedTeamId={selectedTeamId} />
            </div>
            <div className="joyride-teams">
                <Teams
                    teams={teams}
                    onSelectTeam={onSelectTeam}
                    selectedTeamId={selectedTeamId}
                />
            </div>
        </div>
    );
}

export default DashboardContent;
