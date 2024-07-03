import React, { useState, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { useForm } from "@inertiajs/inertia-react";
import questionsData from "../data/averages.json";
import axios from "axios";
import {Inertia} from "@inertiajs/inertia";

const MediumQuestions = ({ onNext, onPrev, onComplete, id }) => {
    const questions = questionsData.questions;
    const [isComplete, setIsComplete] = useState(false);
    const [answers, setAnswers] = useState({});
    const { data, setData, post, processing, errors } = useForm({
        passions: "",
        hobbies: "",
    });
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

    const processAnswers = (is_completed) => {
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
                newPassions = "literatura, arte";
                newHobbies = "ler, participar em workshops criativos";
                break;
            case "2":
                newPassions = "cinema, entretenimento, tecnologia";
                newHobbies = "ver filmes, ouvir música";
                break;
            case "3":
                newPassions =
                    "discussão intelectual, convivência, socialização";
                newHobbies = "sair com amigos, conviver, viajar";
                break;
            case "4":
                newPassions = "desporto, natureza, aventura";
                newHobbies = "explorar trilhas, praticar desportos";
                break;
            default:
                newPassions = "Não especificado";
                newHobbies = "Não especificado";
                break;
        }

        setData({ passions: newPassions, hobbies: newHobbies, is_completed: is_completed });
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
            passions: JSON.stringify(data.passions.split(", ")),
            hobbies: JSON.stringify(data.hobbies.split(", ")),
            is_completed: data.is_completed,
            participant_id: id,
        };

        console.log("Data being sent:", dataToSend);

        if (data.passions.length === 0 || data.hobbies.length === 0) {
            console.error("Passions or hobbies are empty");
            return;
        }

        axios
            .post(`/api/v1/saveTraits/${id}`, dataToSend)
            .then((response) => {
                console.log("API response:", response.data);
                if (response.data.message === "Traits updated successfully!") {
                    console.log("Traits updated successfully");
                    if (isComplete) {
                        onComplete();
                    } else {
                        onNext();
                    }
                } else if(response.data.message == "Traits finished successfully!"){
                    Inertia.visit("/participant");
                }else {
                    console.error("Failed to update traits", response.data);
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
        processAnswers(true);
    };

    const handleContinue = () => {
        processAnswers(false);
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
                        onClick={() => handleContinue()}
                        disabled={!isFormValid()}
                    >
                        Continuar Questionário
                    </Button>
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

export default MediumQuestions;
