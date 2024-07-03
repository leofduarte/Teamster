import React from "react";
import { ScrollArea } from "../Components/ui/scroll-area.jsx";

function Notifications({ closestEvent , closestPlanActivity }) {

    const renderTasks = () => {
        if (!closestEvent || !closestEvent.participant_tasks) {
            return <p>Não há tarefas para exibir no momento.</p>;
        }

        const tasks = closestEvent.participant_tasks;

        const taskList = tasks.split(".").filter((task) => task.trim() !== "");

        return (
            <ul>
                {taskList.map((task, index) => (
                    <li key={index} className="mb-2">
                        {task.trim()}.
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="p-4 bg-white rounded-lg drop-shadow-md">
            <div className="text-center mt-3">
                <h2 className="font-serif font-semibold text-2xl">
                    Tarefas para a próxima atividade!
                </h2>
            </div>
            {closestEvent  && closestPlanActivity ? (
            <div className="flex items-center justify-center">
                <ScrollArea className="h-72 w-72 overflow-y-auto">
                    <div className="p-4">{renderTasks()}</div>
                </ScrollArea>
            </div>
            ) : (
                <div className="text-center mt-4">
                    <p>Não há tarefas para exibir no momento.</p>
                </div>
            )}
        </div>
    );
}

export default Notifications;
