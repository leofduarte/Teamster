import React, { useState } from "react";
import { Button } from "@/Components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import questionsData from "../data/complete.json";
import { useForm } from "@inertiajs/inertia-react";
import axios from "axios";
import { useEffect } from "react";

const CompleteQuestions = ({ onNext, onPrev, onComplete, id }) => {
    const questions = questionsData.questions;
    const [answers, setAnswers] = useState({});
    const { data, setData, post, processing, errors } = useForm({
        passions: "",
        hobbies: "",
    });
    const [isComplete, setIsComplete] = useState(false);
    const [isDataProcessed, setIsDataProcessed] = useState(false);

    const handleChange = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
    };

    const isFormValid = () => {
        return (
            Object.keys(answers).length === questions.length &&
            Object.values(answers).every((answer) => answer !== "")
        );
    };

    const processAnswers = () => {
        const answerCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };

        Object.values(answers).forEach((answer) => {
            const position = questions[0].options.indexOf(answer) + 1;
            answerCounts[position]++;
        });

        const maxPosition = Object.keys(answerCounts).reduce((a, b) =>
            answerCounts[a] > answerCounts[b] ? a : b
        );

        let newPassions = "";
        let newHobbies = "";

        switch (maxPosition) {
            case "1":
                newPassions = "sossego, tranquilidade";
                newHobbies = "reflexão, meditação";
                break;
            case "2":
                newPassions = "ambiente familiar, self-improvement";
                newHobbies = "convivio";
                break;
            case "3":
                newPassions = "criatividade, inovação";
                newHobbies = "desenho, pintura";
                break;
            case "4":
                newPassions = "amizades, relaxar";
                newHobbies = "exercicios fisicos";
                break;
            default:
                newPassions = "Não especificado";
                newHobbies = "Não especificado";
                break;
        }

        setData({ passions: newPassions, hobbies: newHobbies });
        setIsDataProcessed(true);
    };

    useEffect(() => {
        if (isDataProcessed) {
            console.log("Data after processing:", data);
            handleApiCall();
        }
    }, [isDataProcessed]);

    const handleApiCall = () => {
        const dataToSend = {
            passions: data.passions.split(", "),
            hobbies: data.hobbies.split(", "),
            participant_id: id,
        };

        console.log("Data being sent:", dataToSend);

        if (data.passions.length === 0 || data.hobbies.length === 0) {
            console.error("Passions or hobbies are empty");
            return;
        }

        axios
            .post(`/api/v1/appendTraits/${id}`, dataToSend)
            .then((response) => {
                console.log("API response:", response.data);
                if (response.data.message === "Traits appended successfully!") {
                    console.log("Traits appended successfully");
                    alert("Questionário Concluido com sucesso!");

                    onComplete();
                } else {
                    console.error("Failed to append traits", response.data);
                }
            })
            .catch((error) => {
                console.error("Error response:", error.response?.data);
                console.error("Error status:", error.response?.status);
                console.error("Error headers:", error.response?.headers);
            });
    };

    const handleComplete = () => {
        setIsComplete(true);
        processAnswers();
    };

    return (
        <div className="p-8 w-full max-w-2xl">
            <h2 className="text-3xl font-bold mb-8">
                Questionário de interesses
            </h2>
            {questions.map((question) => (
                <div
                    className="mb-8 bg-white p-8 rounded-lg drop-shadow-md"
                    key={question.id}
                >
                    <label className="block text-lg mb-4 font-semibold">
                        {question.question}
                    </label>
                    {question.options.length > 0 ? (
                        <RadioGroup
                            onValueChange={(value) =>
                                handleChange(question.id, value)
                            }
                        >
                            {question.options.map((option, index) => (
                                <label
                                    key={index}
                                    className="flex items-center mb-2"
                                >
                                    <RadioGroupItem value={option} />
                                    <span className="ml-2">{option}</span>
                                </label>
                            ))}
                        </RadioGroup>
                    ) : (
                        <textarea
                            className="w-full p-2 border rounded"
                            onChange={(e) =>
                                handleChange(question.id, e.target.value)
                            }
                            rows="4"
                        ></textarea>
                    )}
                </div>
            ))}
            <div className="flex justify-between">
                <Button variant="outline" className="px-6" onClick={onPrev}>
                    Voltar
                </Button>
                <div className="flex space-x-4">
                    <Button
                        className="px-6"
                        onClick={handleComplete}
                        disabled={!isFormValid() || processing}
                    >
                        Terminar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CompleteQuestions;
