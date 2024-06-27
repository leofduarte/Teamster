import React from "react";
import { Layout } from "./Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import PlanActivity from "./Plan_activity";

const Activity = () => {
    // ? Lógica para mostrar as atividades no sidebar
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        try {
            const response = await axios.get("/api/v1/activities");
            setActivities(response.data);
            console.log("Activities fetched:", response.data);
        } catch (error) {
            console.error("Error fetching activities:", error);
        }
    };

    const handleNavigate = (atividade) => {
        const queryString = new URLSearchParams(atividade).toString();
        Inertia.visit(`/activity?${queryString}`);
    };

    const sidebar = (
        <div className="w-full flex flex-col">
            <div className="text-center flex flex-col items-center">
                <h2 className="text-3xl font-serif mb-3">+ Atividades</h2>
                {activities.length > 0 ? (
                    activities.map((atividade, index) => (
                        <div
                            key={index}
                            className="mb-2 pb-2 border-b-2 border-gray-300 hover:border-black w-[80%]"
                        >
                            <button
                                onClick={() => handleNavigate(atividade)}
                                className="hover:border-black"
                            >
                                <p>
                                    {atividade.name}{" "}
                                    <FontAwesomeIcon
                                        icon={faAngleRight}
                                        className="ml-6"
                                    />
                                </p>
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">
                        Nenhuma atividade encontrada
                    </p>
                )}
            </div>
        </div>
    );

    const searchParams = new URLSearchParams(window.location.search);
    const atividade = Object.fromEntries(searchParams.entries());
    console.log(atividade);

    //? Passar o id da atividade para a página de planeamento de atividade para recriar a atividade
    const [navigate, setNavigate] = useState(false);
    const activityId = atividade.plan_activity_id;

    // Logs de depuração
    console.log("Activity ID:", activityId, "Type:", typeof activityId);

    if (navigate) {
        return <PlanActivity activityId={activityId} />;
    }
    console.log(activityId);

    return (
        <>
            <Layout sidebar={sidebar}>
                <div className="">
                    <h1 className="font-bold text-3xl text-black mb-4">
                        Nova Atividade
                    </h1>
                    <h2 className="font-serif uppercase text-2xl text-black mb-5">
                        {atividade.name}
                    </h2>

                    <button
                        className="ml-auto block"
                        onClick={() => setNavigate(true)}
                    >
                        Refazer atividade
                    </button>

                    <div className="bg-white rounded shadow-sm p-3">
                        <div className="flex justify-between items-center">
                            <h1 className="font-serif text-lg font-semibold">
                                Descrição
                            </h1>
                        </div>
                        <p className="text-sm">{atividade.description}</p>
                    </div>
                    <div className="bg-white rounded shadow-sm p-3 mt-4">
                        <h1 className="font-serif text-lg font-semibold">
                            Atividades
                        </h1>
                        <div className="flex justify-between items-center">
                            <p className="text-sm">{atividade.activities}</p>
                        </div>
                    </div>

                    <div className="flex flex-row space-x-6">
                        <div className="bg-white rounded shadow-sm p-3 mt-4">
                            <h1 className="font-serif text-lg font-semibold">
                                Horário
                            </h1>
                            <div className="flex justify-between items-center">
                                <p className="text-sm">{atividade.schedule}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded shadow-sm p-3 mt-4">
                            <h1 className="font-serif text-lg font-semibold">
                                As suas Tarefas
                            </h1>
                            <div className="flex justify-between items-center">
                                <p className="text-sm">
                                    {atividade.planner_tasks}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Activity;
