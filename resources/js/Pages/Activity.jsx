import React from "react";
import {Layout} from "./Layout";
import {useState, useEffect} from "react";
import axios from "axios";
import {Inertia} from "@inertiajs/inertia";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight, faFilePdf} from "@fortawesome/free-solid-svg-icons";
import PlanActivity from "./Plan_activity";
import {Button} from "@/Components/ui/button.jsx";
import Profile from "@/components_ines/Profile.jsx";
import {InertiaLink} from "@inertiajs/inertia-react";

const Activity = ({auth ,activity}) => {
    // ? Lógica para mostrar as atividades no sidebar
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);

    const [activityId, setActivityId] = useState(activity);

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

    const handleNavigate = (event, atividade) => {
        event.preventDefault();
        Inertia.visit(`/atividade/detalhes/${atividade.id}`);
    };

    const searchParams = new URLSearchParams(window.location.search);
    const atividade = Object.fromEntries(searchParams.entries());

    useEffect(() => {
        const fetchSelectedActivity = async () => {
            if (atividade.id) {
                try {
                    const response = await axios.get(`/api/v1/atividade/detalhes/${atividade.id}`);
                    setSelectedActivity(response.data);
                    console.log("Selected activity:", response.data);
                } catch (error) {
                    console.error("Error fetching selected activity:", error);
                }
            }
        };

        fetchSelectedActivity();
    }, [atividade.id]);

    const sidebar = (
        <div className="w-full flex flex-col">
            <div className="joyride-profile">
                <Profile id={auth}/>
            </div>
            <div className="text-center flex flex-col items-center">
                <h2 className="text-3xl font-serif mb-3">+ Atividades</h2>
                {activities.length > 0 ? (
                    activities.map((atividade, index) => (
                        <div
                            key={index}
                            className="mb-2 pb-2 border-b-2 border-gray-300 hover:border-black w-[80%]"
                        >
                            <button
                                onClick={(event) => handleNavigate(event, atividade)}
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


    console.log("Activity ID:", activityId, "Type:", typeof activityId);

    console.log(activityId);

    return (
        <>
            <Layout sidebar={sidebar}>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 pt-8">
                    <div className="overflow-hidden">
                        <div className="p-6 text-gray-900">
                            <h1 className={"text-3xl font-bold text-black"}>
                                Atividade
                            </h1>

                            {activityId && (
                                <>
                                    <div className={"my-6 flex flex-col gap-4"}>
                                        <h2 className="font-serif uppercase text-2xl text-black mb-5">
                                            {activityId.name}
                                        </h2>
                                        <div className="bg-white rounded shadow-sm p-3">
                                            <div className="flex justify-between items-center">
                                                <h1 className="font-serif text-lg font-semibold">
                                                    Descrição
                                                </h1>
                                            </div>
                                            <p className="text-sm">{activityId.description}</p>
                                        </div>

                                        <div className="bg-white rounded shadow-sm p-3">
                                            <h1 className="font-serif text-lg font-semibold">
                                                Atividades
                                            </h1>
                                            <div className="flex justify-between items-center">
                                                <p className="text-sm">{activityId.activities}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-row space-x-6">
                                            <div className="bg-white rounded shadow-sm p-3">
                                                <h1 className="font-serif text-lg font-semibold">
                                                    Horário
                                                </h1>
                                                <div className="flex justify-between items-center">
                                                    <p className="text-sm">{activityId.schedule}</p>
                                                </div>
                                            </div>

                                            <div className="bg-white rounded shadow-sm p-3">
                                                <h1 className="font-serif text-lg font-semibold">
                                                    As suas Tarefas
                                                </h1>
                                                <div className="flex justify-between items-center">
                                                    <p className="text-sm">
                                                        {activityId.planner_tasks}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={"flex justify-end gap-4"}>
                                        <InertiaLink href={`/atividade/${activityId.id}/pdf`}
                                                     method={"get"} as={"button"}>
                                            <Button className={"gap-1"}>
                                                <FontAwesomeIcon icon={faFilePdf}
                                                                 className={""}/>
                                                Gerar PDF
                                            </Button>
                                        </InertiaLink>

                                        <Button className={"gap-1"} onClick={() => {
                                            axios.get(`/atividade/${activityId.id}/sendinvite`)
                                                .then(response => {
                                                    // Handle the response here
                                                    console.log(response);
                                                })
                                                .catch(error => {
                                                    // Handle the error here
                                                    console.error(error);
                                                });
                                        }}>
                                            Enviar Convite aos Participantes
                                        </Button>


                                            <InertiaLink href={`/atividade/${activityId.id}`} type={"button"}>
                                                <Button className={"gap-1"}>
                                                         Refazer atividade
                                                </Button>
                                            </InertiaLink>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Activity;
