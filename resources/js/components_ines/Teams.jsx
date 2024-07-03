import React, { useState, useMemo } from "react";
import { ScrollArea, ScrollBar } from "../Components/ui/scroll-area.jsx";

function Teams({ onSelectTeam, selectedTeamId, teams }) {
    console.log("Teams rendering", {
        selectedTeamId,
        teamsLength: teams.length,
    });
    const [showAll, setShowAll] = useState(false);

    // Sort teams to ensure selected team is first
    const sortedTeams = useMemo(() => {
        return teams.slice().sort((a, b) => {
            if (a.id === selectedTeamId) return -1;
            if (b.id === selectedTeamId) return 1;
            return 0;
        });
    }, [teams, selectedTeamId]);

    // Determine visible teams
    const visibleTeams = showAll ? sortedTeams : sortedTeams.slice(0, 1);

    const handleSelectTeam = (teamId) => {
        alert(`handleSelectTeam called with teamId: ${teamId}`);
        onSelectTeam(teamId);
    };

    return (
        <>
            {teams.length > 0 ? (
                <>
                    <div className="flex items-center justify-between mt-12 mb-3">
                        <h2 className="font-manjari font-semibold text-2xl">
                            EQUIPAS
                        </h2>
                        <button
                            className="text-[#808080] hover:text-slate-600 px-4 py-2 rounded-md underline"
                            onClick={() => setShowAll(!showAll)}
                        >
                            {showAll ? "Ver Menos" : "Ver Tudo"}
                        </button>
                    </div>

                    {visibleTeams.map((team) => (
                        <button
                            key={team.id}
                            onClick={() => {
                                handleSelectTeam(team.id);
                            }}
                            className="w-full text-left"
                        >
                            <ScrollArea
                                className={`w-full rounded-lg shadow-md bg-white mb-5 px-6 pt-4 pb-7 border-2 ${
                                    selectedTeamId === team.id
                                        ? "border-current"
                                        : "border-transparent"
                                } hover:border-current`}
                            >
                                <p className="mb-5 flex items-center">
                                    <span className="font-manjari mt-2 text-xl font-semibold"></span>
                                    <span className="ml-3">{team.description}</span>
                                </p>
                                <div className="overflow-x-auto">
                                    <div className="flex gap-7 max-w-[700px]">
                                        {(team.participants || []).map(
                                            (participant) => (
                                                <div
                                                    key={participant.id}
                                                    className="flex flex-col items-center"
                                                >
                                                    <div className="relative group cursor-pointer">
                                                        <img
                                                            width={80}
                                                            height={80}
                                                            src={`https://api.dicebear.com/9.x/big-smile/svg?seed=${participant.name}`}
                                                            alt={
                                                                participant.name
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                                <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                        </button>
                    ))}
                </>
            ) : (
                <>
                    <div className="flex mt-12 mb-3 items-center justify-between">
                        <h2 className="font-manjari font-semibold text-2xl">
                            EQUIPAS
                        </h2>
                        <button
                            className="text-[#808080] hover:text-slate-600 px-4 py-2 rounded-md underline"
                            onClick={() => setShowAll(!showAll)}
                        >
                            {showAll ? "Ver Menos" : "Ver Tudo"}
                        </button>
                    </div>
                </>
            )}
        </>
    );
}

export default Teams;
