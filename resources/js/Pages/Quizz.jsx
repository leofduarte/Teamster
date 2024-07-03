import React, { useState, useEffect } from "react";
import Introduction from "../components_ines/Introduction";
import Information from "../components_ines/Information";
import MandatoryQuestions from "../components_ines/MandatoryQuestions";
import MediumQuestions from "../components_ines/MediumQuestions";
import CompleteQuestions from "../components_ines/CompleteQuestions";
import ProgressBar from "../components_ines/ProgressBar";
import {Inertia} from "@inertiajs/inertia";
import {router} from "@inertiajs/react";

const Quizz = (props) => {
    const id = props.user_id;
    console.log(id);
    const [participant, setParticipant] = useState({});

    const fetchParticipant = async (id) => {
        try {
            const response = await axios.post(
                `api/v1/getparticipantdata/${id}`
            );
            setParticipant(response.data);
            console.log("Participant fetched:", response.data);
        } catch (error) {
            console.error("Failed to fetch participant:", error);
        }
    };

    useEffect(() => {
        fetchParticipant(id); // Pass the id as an argument here
    }, [id]); // id is a dependency of this effect

    const [step, setStep] = useState(() => {
        const savedStep = localStorage.getItem("currentQuizStep");
        return savedStep ? parseInt(savedStep, 10) : 1;
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        localStorage.setItem("currentQuizStep", step);
    }, [step]);

    const handleNextStep = () => {
        if (step < 5) {
            setStep(step + 1);
        } else {
            router.visit("/participant")
        }
    };

    const handlePrevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleCompleteQuiz = () => {
        console.log("Questionário concluído! - redirect")
        router.visit("/participant")
    };

    return (
        <div className="flex flex-row min-h-screen bg-[#F8F7FC]">
            <ProgressBar step={step} />
            <div className="flex flex-col flex-grow mt-6 p-8 overflow-y-auto">
                {step === 1 && <Introduction onNext={handleNextStep} />}
                {step === 2 && (
                    <Information
                        onNext={handleNextStep}
                        onPrev={handlePrevStep}
                        id={id}
                    />
                )}
                {step === 3 && (
                    <MandatoryQuestions
                        id={id}
                        onNext={handleNextStep}
                        onPrev={handlePrevStep}
                        onComplete={handleCompleteQuiz}
                    />
                )}
                {step === 4 && (
                    <MediumQuestions
                        id={id}
                        onNext={handleNextStep}
                        onPrev={handlePrevStep}
                        onComplete={handleCompleteQuiz}
                    />
                )}
                {step === 5 && (
                    <CompleteQuestions
                        id={id}
                        onNext={handleNextStep}
                        onPrev={handlePrevStep}
                        onComplete={handleCompleteQuiz}
                    />
                )}
            </div>
        </div>
    );
};

export default Quizz;
