import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/Components/ui/scroll-area";
import axios from "axios";

function Team({ teams, id, onTeamSelect }) {
    const [selectedTeamIndex, setSelectedTeamIndex] = useState(0);
    const [showTeamList, setShowTeamList] = useState(false);
    const [allParticipants, setAllParticipants] = useState([]);

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response = await axios.post(
                    `api/v1/getParticipantsFromTeams`,
                    { teamId: id }
                );
                setAllParticipants(response.data);
            } catch (error) {
                console.error("Failed to fetch participants:", error);
            }
        };
        fetchParticipants();
    }, [id]);

    useEffect(() => {
        if (teams && teams.length > 0) {
            onTeamSelect(teams[selectedTeamIndex]);
        }
    }, [selectedTeamIndex, teams, onTeamSelect]);

    if (!teams || teams.length === 0) {
        return (
            <div className="bg-white drop-shadow-md rounded-lg text-center p-5 ">
                <h2 className="text-2xl font-bold mb-3 font-serif">
                    Neste momento não há equipas disponíveis
                </h2>
            </div>
        );
    }

    const selectedTeam = teams[selectedTeamIndex];

    const handleMoreClick = () => {
        setShowTeamList(true);
    };

    const handleTeamSelect = (index) => {
        setSelectedTeamIndex(index);
        setShowTeamList(false);
        if (onTeamSelect) {
            onTeamSelect(teams[index]);
        }
    };

    if (showTeamList) {
        return (
            <div className="bg-white drop-shadow-md rounded-lg text-center p-5 ">
                <h2 className="text-2xl font-bold mb-3 font-serif">
                    SELECIONE UMA EQUIPA
                </h2>

                {teams.map((team, index) => (
                    <div
                        key={team.id}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleTeamSelect(index)}
                    >
                        {team.name}
                    </div>
                ))}
            </div>
        );
    }

    const selectedTeamParticipants =
        allParticipants.find((team) => team.id === selectedTeam.id)
            ?.participants || [];

    return (
        <div className="bg-white drop-shadow-md rounded-lg text-center p-5 joyride-team">
            <h2 className="text-2xl font-bold mb-3 font-serif">A SUA EQUIPA</h2>

            <div className="flex items-center justify-center flex-col">
                <div key={selectedTeam.id} className="w-full max-w-md mb-5">
                    <div className="mb-3">
                        <p className=" mt-2 text-xl  text-left">
                            {selectedTeam.name}
                        </p>
                    </div>
                    <ScrollArea className="h-72 w-full  overflow-y-auto p-1">
                        {selectedTeamParticipants.map((participant) => (
                            <div
                                key={participant.id}
                                className="flex items-center px-2"
                            >
                                <div className="flex-shrink-0 mr-2">
                                    <img
                                        className="rounded-full h-10"
                                        src={`https://api.dicebear.com/8.x/big-smile/svg?seed=${participant.email}`}
                                        alt={participant.name}
                                    />
                                </div>
                                <p className="text-left text-sm">
                                    {participant.email}
                                </p>
                            </div>
                        ))}
                    </ScrollArea>
                </div>
                <button
                    onClick={handleMoreClick}
                    className=" text-gray-500  hover:text-black self-start"
                >
                    Mais equipas
                </button>
            </div>
        </div>
    );
}

export default Team;
