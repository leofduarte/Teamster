import React, { useState } from "react";
import { Button } from "@/Components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import {Inertia} from "@inertiajs/inertia";

const MandatoryQuestions = ({ onNext, onPrev, onComplete, id }) => {
    const questions = [
        {
            id: 1,
            question:
                "Como te sentes em relação a atividades físicas e desporto?",
            options: [
                "Muito confortável",
                "Confortável",
                "Indiferente",
                "Nada Confortável",
            ],
            optionsLabel: [
                "Sente-se muito confortável com atividade fisica e desporto",
                "Sente-se confortável com atividade fisica e desporto",
                "Sente-se indiferente com atividade fisica e desporto",
                "Não se sente nada confortável com atividade fisica e desporto",
            ],
        },
        {
            id: 2,
            question:
                "Tens alguma restrição alimentar ou alergia de que precisamos estar cientes? Se sim, por favor, especifica",
            label: "Restrições alimentares",
            options: [],
        },
        {
            id: 3,
            question: "Gostas de nadar?",
            options: [
                "Gosto de nadar e sinto-me confortável em águas profundas",
                "Gosto de nadar onde tenho pé",
                "Não gosto de nadar",
            ],
            optionsLabel: [
                "Gosto de nadar e sinto-me confortável em águas profundas",
                "Gosto de nadar onde tenho pé",
                "Não gosto de nadar",
            ],
        },
        {
            id: 4,
            question:
                "Qual é o teu nível de conforto em atividades ao ar livre (caminhadas, acampamentos, etc.)?",
            options: [
                "Muito confortável",
                "Confortável",
                "Indiferente",
                "Nada Confortável",
            ],
            optionsLabel: [
                "Sente-se muito confortável com atividade ao ar livre",
                "Sente-se confortável com atividade ao ar livre",
                "Sente-se indiferente com atividade ao ar livre",
                "Não se sente nada confortável com atividade ao ar livre",
            ],
        },
        {
            id: 5,
            question:
                "Tens alguma condição de saúde ou lesão permanente que possa afetar a tua participação em alguma atividade?",
            label: "Condições de saúde",
            options: [],
        },
    ];

    const [answers, setAnswers] = useState({});
    const [isComplete, setIsComplete] = useState(false);
    const processAnswers = (completed) => {
        const answerToBD = [];

        for (let index = 0; index < questions.length; index++) {
            const question = questions[index];
            const id = question.id;
            const answer = answers[id];
            if (answer) {
                if (question.options.length) {
                    const position = question.options.indexOf(answer);
                    answerToBD.push(question.optionsLabel[position]);
                } else {
                    answerToBD.push(question.label + ": " + answer);
                }
            } else {
                answerToBD.push(null);
            }
        }

        handleApiCall(answerToBD, id, completed);
    };

    const handleApiCall = (answers, id, completed) => {
        const dataToSend = {
            restrictions: JSON.stringify(answers),
            participant_id: id,
            is_complete: completed
        };

        if (answers.length !== questions.length) {
            console.error("Restrictions answers are not enough");
            return;
        }


        axios
            .post(`/api/v1/saveRestrictions/${id}`, dataToSend)
            .then((response) => {
                console.log("API response:", response.data);
                if (response.data.message === "Restrictions updated successfully!" ) {
                    console.log("Restrictions updated successfully");
                    if (isComplete) {
                        onComplete();
                    } else {
                        onNext();
                    }
                } else if(response.data.message === "Restrictions finished successfully!") {
                    console.log("inertia redirect");
                    Inertia.visit("/participant");
                } else {
                    console.error("Failed to update traits", response.data);
                }
            })
            .catch((error) => {
                console.error("Error response:", error.response?.data);
                console.error("Error status:", error.response?.status);
                console.error("Error headers:", error.response?.headers);
            });
    };

    const handleChange = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
        console.log(answers);
    };

    const isFormValid = () => {
        return (
            Object.keys(answers).length === questions.length &&
            Object.values(answers).every((answer) => answer !== "")
        );
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
                    <label className="block text-lg mb-4">
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
                    {isFormValid() ? (
                        <Button className="px-6" onClick={handleComplete}>
                            Terminar
                        </Button>
                    ) : (
                        <Button className="px-6" disabled>
                            Terminar
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MandatoryQuestions;
