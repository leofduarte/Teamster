import React, {useEffect, useState} from 'react';
import Text_CP from "@/Components/EmployeeForm/InputsComponents/Text_cp";
import Checkbox_CP from "@/Components/EmployeeForm/InputsComponents/Checkbox_cp";
import Radio_CP from "@/Components/EmployeeForm/InputsComponents/Radio_cp";
import {Button} from "@/Components/ui/button";
import axios from "axios";
import {toast} from "@/Components/ui/use-toast.js";
import {Input} from "@/Components/ui/input.jsx";
import {Head} from "@inertiajs/react";
import {Label} from "@/Components/ui/label";
import {Layout} from "./Layout";

const AddResponse = ({questionnaire}) => {
    const [questionnaire_id, setQuestionnaire_id] = useState(92);
    const [participant_id, setParticipant_id] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState({});

    const handleInputChange = (questionId, selectedOption,) => {
        setResponses(prevResponses => ({
            ...prevResponses,
            [questionId]: {question_id: questionId, response: JSON.stringify(selectedOption)}
        }));
    };

    useEffect(() => {
        console.log('Responses:', responses);
    }, [responses]);

    const handleSubmitResponses = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/v1/addresponses', {
                responses: Object.values(responses),
                questionnaire_id: questionnaire_id,
                participant_id: participant_id,
            });
            toast({
                variant: "success",
                title: "Success!",
                description: `${response.data.message}`,
            });
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Error!",
                description: `${error.response.data.message}`,
            });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('/api/v1/getquestions', {
                    questionnaire_id: questionnaire_id,
                });
                setQuestions(response.data.questions);
                console.log(response.data.questions)
            } catch (error) {
                console.error(error);
                toast({
                    variant: "destructive",
                    title: "Error!",
                    description: `${error.response.data.message}`,
                });
            }
        };
        if (questionnaire_id) {
            fetchData();
        }
    }, [questionnaire_id]);

    useEffect(() => {
        if (questionnaire && questionnaire !== null) {
            console.log(questionnaire);
            setQuestionnaire_id(questionnaire.id);
        }
    }, [questionnaire]);

    return (
        <div>
            <Layout sidebar={
                <div
                    className={"flex flex-col gap-4 h-screen justify-center items-center place-content-center w-screen"}>
                    <div>
                        <Label>Participant ID</Label>
                        <Input className={""} type={"number"} label={"Participant ID"}
                               onChange={(e) => setParticipant_id(e.target.value)}/>
                    </div>
                </div>
            }>
                <Head title="Add Response"/>

                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 pt-12">
                    <div className="overflow-hidden">
                        <div className="p-6 text-gray-900">
                            <h1 className={"text-3xl font-bold text-black"}>
                                Formulário de Feedback
                            </h1>
                            <div className={"my-6 flex flex-col justify-between"}>
                                <h2 className={"text-2xl font-serif uppercase"}>Está na hora de responderes ao
                                    Formulário de Feedback</h2>
                                <p className={"text-gray-500"}>
                                    Por favor, responde com sinceridade e honestidade a todas as questões.
                                </p>

                                {questions && questions.sort((a, b) => b.is_mandatory - a.is_mandatory).map((question, index) => (
                                    <div key={index}
                                         className={"my-4 bg-white p-4 min-h-fit rounded-xl gap-4 flex flex-col shadow-lg"}>
                                        {question.type === 'text' && <Text_CP
                                            id={question.id}
                                            item={question}
                                            options={question.options}
                                            showButtons={false}
                                            onInputChange={handleInputChange}
                                        />}
                                        {question.type === 'checkbox' && <Checkbox_CP
                                            id={question.id}
                                            item={question}
                                            options={question.options}
                                            showButtons={false}
                                            onInputChange={(isChecked) => handleInputChange(question.id, isChecked ? "1" : "0")}
                                        />}
                                        {question.type === 'radio' && <Radio_CP
                                            id={question.id}
                                            item={question}
                                            options={Array.isArray(question.options) ? question.options : [question.options]}
                                            showButtons={false}
                                            onInputChange={(selectedOption) => {
                                                const optionsArray = Array.isArray(JSON.parse(question.options)) ? JSON.parse(question.options) : [JSON.parse(question.options)];
                                                const selectedOptionObject = optionsArray.find(opt => opt.id === selectedOption);
                                                handleInputChange(question.id, {
                                                    id: selectedOptionObject.id,
                                                    label: selectedOptionObject.label
                                                });
                                            }}
                                        />}
                                    </div>
                                ))}
                            </div>
                            <div className={"flex justify-end"}>
                                <Button onClick={handleSubmitResponses}>Submit Responses</Button>
                            </div>
                        </div>
                    </div>
                </div>


            </Layout>
        </div>
    );
}

export default AddResponse;
