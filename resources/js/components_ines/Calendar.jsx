import React, { useState, useEffect } from "react";
import { Calendar as UICalendar } from "../Components/ui/calendar.jsx";
import axios from "axios";
import { ScrollArea } from "../Components/ui/scroll-area.jsx";

function Calendar({ teams = [], selectedTeamId, onSelectTeam }) {
    const [date, setDate] = useState(new Date());
    const [planActivities, setPlanActivities] = useState([]);
    const [closestPlanActivity, setClosestPlanActivity] = useState(null);
    const [events, setEvents] = useState([]);
    const [closestEvent, setClosestEvent] = useState(null);

    const selectedTeam = teams.find((team) => team.id === selectedTeamId);

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

                const closestEvent = response.data.find(
                    (event) => event.plan_activity_id === closestPlanActivity.id
                );
                setClosestEvent(closestEvent || null);
            } catch (error) {
                console.error("Failed to fetch events:", error);
            }
        };

        fetchEvents();
    }, [closestPlanActivity]);

    // Função para formatar a data
    const formatDate = (dateString) => {
        if (!dateString) return "Data não disponível";

        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "Data inválida";
        }

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    if (!teams.length) {
        return <div>Nenhuma equipa disponível</div>;
    }

    return (
        <div className="p-5 joyride-calendar">
            <div className="text-center mb-4">
                <h2 className="font-serif font-semibold text-2xl">
                    CALENDÁRIO
                </h2>
            </div>
            <div className="mb-4 flex justify-center">
                <UICalendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                />
            </div>
            <div className="mt-7 text-center">
                <h3 className="font-serif mb-4 font-semibold text-2xl">
                    Próximos Eventos
                </h3>
                <div>
                    {selectedTeamId ? (
                        <>
                            {closestEvent && (
                                <div className="flex justify-between mb-2 mt-2">
                                    <p className="text-start mr-2">
                                        {closestEvent.name}
                                    </p>
                                    <p>
                                        {formatDate(closestPlanActivity.date)}
                                    </p>
                                </div>
                            )}
                            {!closestEvent && (
                                <p className="text-center">
                                    Não há eventos programados para esta equipa
                                </p>
                            )}
                        </>
                    ) : (
                        <p>
                            Selecione uma equipa para ver os eventos próximos.
                        </p>
                    )}
                </div>
            </div>
            <div className="mt-7 text-center">
                <h3 className="font-serif mb-4 font-semibold text-2xl">
                    Tarefas para a Atividade
                </h3>
                <div>
                    {selectedTeamId ? (
                        <>
                            {closestEvent ? (
                                <div className="flex justify-between mb-2 mt-2">
                                    <ScrollArea className="h-32 w-72 overflow-y-auto">
                                        <p className="text-start mr-2 break-words">
                                            {closestEvent.planner_tasks}
                                        </p>
                                    </ScrollArea>
                                </div>
                            ) : (
                                <p>Não existem tarefas</p>
                            )}
                        </>
                    ) : (
                        <p>Selecione uma equipa para ver as suas tarefas.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Calendar;
