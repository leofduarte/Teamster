import React, {useEffect, useState} from 'react';
import {Head} from "@inertiajs/react";
import {Layout} from "@/Pages/Layout.jsx";
import {toast} from "@/Components/ui/use-toast.js";
import Modal from "@/Components/Modal.jsx";
import AddQuestionnaire from "./AddQuestionaire.jsx";
import {Button} from "@/Components/ui/button.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {InertiaLink} from "@inertiajs/inertia-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/Components/ui/alert-dialog.jsx";

const Questionnaire = ({auth}) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [questionnaires, setQuestionnaires] = useState([]);
    const [showAddQuestionnaireModal, setShowAddQuestionnaireModal] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    console.log(auth.user.id);

    const handleAction = (questionnaireId ) => {
        console.log("action", questionnaireId);
        setIsDialogOpen(true);
    };

    const handleCancel = () => {
        console.log("cancel");
        setIsDialogOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('/api/v1/getquestionnaires', {
                    userId: auth.user.id,
                });
                console.log('API Response:', response);
                setQuestionnaires(response.data);
                console.log('Questionnaires State:', questionnaires);
            } catch (error) {
                console.error(error);
                toast({
                    variant: "destructive",
                    title: "Error!",
                    description: `${error.response.data.message}`,
                });
            }
        }
        fetchData();
    }, []);

    const handleDeleteQuestionnaireDB = async (questionnaireId) => {
        try {
            const response = await axios.delete(`/v1/deletequestionnaire/${questionnaireId}`);
            console.log('API Response:', response);
            toast({
                variant: "success",
                title: "Success!",
                description: "Questionnaire deleted successfully!",
            });
            setQuestionnaires(questionnaires.filter(questionnaire => questionnaire.id !== questionnaireId));
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Error!",
                description: `${error.response.data.message}`,
            });
        }
    }

    return (
        <div>
            <Layout>
                <Head title="Formulário de Feedback"/>

                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 pt-12">
                    <div className="overflow-hidden">
                        <div className="p-6 text-gray-900">
                            <div className={"flex justify-between"}>
                                <h1 className={"text-3xl font-bold text-black"}>
                                    Formulários
                                </h1>
                                <Button onClick={() => setShowAddQuestionnaireModal(true)} className={"align-middle"}>
                                    Adicionar Formulário
                                    <FontAwesomeIcon className={"ms-2"} icon={faPlus}/>
                                </Button>
                            </div>
                            <div className={"my-6 flex flex-col justify-between"}>
                                <h2 className={"text-2xl font-serif uppercase"}>Está na hora de analisar resultados</h2>
                                <p className={"text-gray-500"}>
                                    Pergunte aos seus colaboradores o que pensam sobre a atividade
                                </p>
                            </div>

                            <div className={"gap-4 flex flex-col"}>
                                {questionnaires && questionnaires.map((questionnaire) => (
                                    <div key={questionnaire.id} className="flex justify-between my-4 bg-white p-4 min-h-fit rounded-xl gap-4 shadow-lg">
                                        <div className={"flex items-center"}>
                                            <h2 className={"text-2xl font-serif uppercase"}>{questionnaire.title}</h2>
                                            <span className={"text-gray-500 mx-3"}>-</span>
                                            <p className={"text-gray-500"}>{questionnaire.description}</p>
                                        </div>
                                        <div className={"flex gap-2"}>
                                            <InertiaLink href={`/questionnaires/${questionnaire.id}/edit`} method="get">
                                                <Button>Update</Button>
                                            </InertiaLink>
                                            <AlertDialog isOpen={isDialogOpen}>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant={"destructive"}
                                                        onClick={() => handleAction(questionnaire.id)} >
                                                        Delete
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader className={"text-black"}>
                                                        <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Do you want to <strong>delete</strong> this activity?
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction  variant={"destructive"} onClick={() => handleDeleteQuestionnaireDB(questionnaire.id)}>Confirm</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {errorMessage && (
                                <p className="text-red-500 text-xs italic">{errorMessage}</p>
                            )}
                        </div>
                    </div>
                </div>
            </Layout>



            <Modal title="Adicionar Questionário"
                   onClose={() => setShowAddQuestionnaireModal(false)}
                   show={showAddQuestionnaireModal} auth={auth}
            >
                <AddQuestionnaire auth={auth} onClose={() => setShowAddQuestionnaireModal(false)}/>
            </Modal>

        </div>
    );
};

export default Questionnaire;
