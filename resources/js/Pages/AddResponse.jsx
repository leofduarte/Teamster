import React, {useEffect, useState} from 'react';
import Text_CP from "@/Components/EmployeeForm/InputsComponents/Text_cp";
import Checkbox_CP from "@/Components/EmployeeForm/InputsComponents/Checkbox_cp";
import Radio_CP from "@/Components/EmployeeForm/InputsComponents/Radio_cp";
import {Button} from "@/Components/ui/button";
import axios from "axios";
import {toast} from "@/Components/ui/use-toast.js";
import {Input} from "@/Components/ui/input.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head} from "@inertiajs/react";
import {Label} from "@/Components/ui/label";

const AddResponse = ({auth}) => {
    const [questionnaire_id, setQuestionnaire_id] = useState(null);
    const [participant_id, setParticipant_id] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState({});

    const handleInputChange = (questionId, selectedOption) => {
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

    return (
        <div>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Add Response</h2>}
            >
                <Head title="Add Response"/>
                <div className="py-12 ">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">

                            <div className={"flex gap-4"}>
                                <div>
                                    <Label>Questionnaire ID</Label>
                                    <Input className={""} type={"number"} label={"Questionnaire ID"}
                                           onChange={(e) => setQuestionnaire_id(e.target.value)}/>
                                </div>
                                <div>
                                    <Label>Participant ID</Label>
                                    <Input className={""} type={"number"} label={"Participant ID"}
                                           onChange={(e) => setParticipant_id(e.target.value)}/>
                                </div>
                            </div>

                            <h1 className="text-3xl mb-2 text-red-500">To Answer:</h1>
                            {questions && questions.map((question, index) => (
                                <div key={index}>
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
                                            handleInputChange(question.id, {id: selectedOptionObject.id, label: selectedOptionObject.label});
                                        }}
                                    />}
                                </div>
                            ))}
                            <Button onClick={handleSubmitResponses}>Submit Responses</Button>
                        </div>
                    </div>
                </div>

            </AuthenticatedLayout>
        </div>
    );
}

export default AddResponse;
