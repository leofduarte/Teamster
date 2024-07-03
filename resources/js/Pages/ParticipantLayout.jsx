import React, { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../components_ines/Logo";
import Events from "../components_ines/Events";
import Notifications from "../components_ines/Notifications";
import ParticipantProfileSettings from "../components_ines/ParticipantProfileSettings";
import Team from "../components_ines/Team";
import Medals from "../components_ines/Medals";
import Level from "../components_ines/Level";
import EditProfile from "../components_ines/EditProfile";
import Quizz from "./Quizz.jsx";
import { Inertia } from "@inertiajs/inertia";

function ParticipantLayout(props) {
    // Participant logic
    const id = props.user_id;
    console.log("id", id)
    const [events, setEvents] = useState([]);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [participant, setParticipant] = useState(null);
    const [teams, setTeams] = useState([]);
    const [teamIds, setTeamIds] = useState([]);
    const [planActivities, setPlanActivities] = useState([]);
    const [closestPlanActivity, setClosestPlanActivity] = useState(null);
    const [closestEvent, setClosestEvent] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState(null);

    const handleTeamSelect = (team) => {
        setSelectedTeam(team);
        console.log("Equipe selecionada:", team);
    };

    // Fetch participant data
    useEffect(() => {
        const fetchParticipant = async () => {
            try {
                const response = await axios.post(
                    `/api/v1/getparticipantdata/${id}`
                );
                setParticipant(response.data);
            } catch (error) {
                console.error("Failed to fetch participant:", error);
            }
        };

        fetchParticipant();
    }, [id]);

    // Fetch teams data
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.post(
                    `api/v1/getTeamsByParticipantId/${id}`
                );
                setTeams(response.data.teams);
                if (response.data.teams.length > 0) {
                    setSelectedTeam(response.data.teams[0]);
                }
            } catch (error) {
                console.error("Failed to fetch teams:", error);
            }
        };

        fetchTeams();
    }, [id]);

    // Update team IDs when teams data is available
    useEffect(() => {
        if (teams.length > 0) {
            const ids = teams.map((team) => team.id);
            setTeamIds(ids);
            console.log("teamIds", ids);
        }
    }, [teams]);

    // Fetch plan activities
    useEffect(() => {
        const fetchPlanActivities = async () => {
            if (!selectedTeam) return;

            try {
                const response = await axios.get(
                    `api/v1/getPlanActivities?teamId=${selectedTeam.id}`
                );
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const filteredActivities = response.data.filter((activity) => {
                    return (
                        new Date(activity.date) >= today &&
                        activity.team_id === selectedTeam.id
                    );
                });

                const sortedFutureActivities = filteredActivities.sort(
                    (a, b) => new Date(a.date) - new Date(b.date)
                );

                setPlanActivities(filteredActivities);

                if (sortedFutureActivities.length > 0) {
                    setClosestPlanActivity(sortedFutureActivities[0]);
                    console.log(
                        "closestPlanActivity",
                        sortedFutureActivities[0]
                    );
                } else {
                    setClosestPlanActivity(null);
                }
            } catch (error) {
                console.error("Failed to fetch PlanActivities:", error);
            }
        };

        fetchPlanActivities();
    }, [selectedTeam]);

    // Fetch events data
    useEffect(() => {
        const fetchEvents = async () => {
            if (!closestPlanActivity) return;

            try {
                const response = await axios.get(
                    `api/v1/activities?planActivityId=${closestPlanActivity.id}`
                );
                setEvents(response.data);
                console.log("events", response.data);

                const closestEvent = response.data.find(
                    (event) => event.plan_activity_id === closestPlanActivity.id
                );
                setClosestEvent(closestEvent || null);
                console.log("closestEvent", closestEvent);
            } catch (error) {
                console.error("Failed to fetch events:", error);
            }
        };

        fetchEvents();
    }, [closestPlanActivity]);

    return (
        <>
                <div className="min-h-screen bg-[#F8F7FC] flex flex-col items-center justify-center p-8 font-poppins ">
                    <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="flex flex-col gap-12">
                            <Logo />
                            <Events
                                closestEvent={closestEvent}
                                closestPlanActivity={closestPlanActivity}
                            />
                            <Notifications closestEvent={closestEvent} closestPlanActivity={closestPlanActivity} />
                        </div>

                        <div className="flex flex-col items-center justify-center">
                            {isEditingProfile ? (
                                <EditProfile
                                    participant={participant}
                                    isEditingProfile={isEditingProfile}
                                    setIsEditingProfile={setIsEditingProfile}
                                />
                            ) : (
                                <Level
                                    isEditingProfile={isEditingProfile}
                                    setIsEditingProfile={setIsEditingProfile}
                                />
                            )}
                        </div>
                        <div className="flex flex-col gap-12">
                            <ParticipantProfileSettings
                                participant={participant}
                                isEditingProfile={isEditingProfile}
                                setIsEditingProfile={setIsEditingProfile}
                            />
                            <Team
                                teams={teams}
                                id={id}
                                onTeamSelect={handleTeamSelect}
                            />
                        </div>
                    </div>
                </div>
        </>
    );
}

export default ParticipantLayout;
