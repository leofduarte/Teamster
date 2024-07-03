import React from "react";
import {Separator} from "../Components/ui/separator.jsx";

function Events({ closestEvent, closestPlanActivity }) {

    const formatDate = (dateString) => {
        if (!dateString) return "Data não disponível";

        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
            console.log("Invalid date string:", dateString);
            return "Data inválida";
        }

        return date.toLocaleDateString("pt-BR", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="bg-white drop-shadow-md rounded-lg text-center p-5 joyride-events">
            <h2 className="text-2xl font-bold mb-2 font-serif">
                PRÓXIMA ATIVIDADE
            </h2>
            <Separator />
            <div>
                {closestEvent && closestPlanActivity ? (
                    <div className="text-start">
                        <div className="flex justify-between mb-2 mt-2">
                            <p>{closestEvent.name}</p>
                            <p>{formatDate(closestPlanActivity.date)}</p>
                        </div>
                    </div>
                ) : (
                    <p>Não há atividades programadas.</p>
                )}
            </div>
            <Separator />
        </div>
    );
}

export default Events;
