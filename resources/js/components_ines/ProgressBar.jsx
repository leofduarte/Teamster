import React from 'react';
// import { RiNumber1, RiNumber2, RiNumber3, RiNumber4, RiNumber5 } from "react-icons/ri";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoHorizontal from "../../../storage/app/public/logos/logo-teamster.svg";

const RiNumber1 = () => <FontAwesomeIcon icon={faCircle} />

const ProgressBar = ({ step }) => {
    const steps = [
        { label: 'INTRODUÇÃO', Icon: RiNumber1 },
        { label: 'INFORMAÇÕES', Icon: RiNumber1 },
        { label: 'Bem-Estar e Restrições', Icon: RiNumber1 },
        { label: 'Áreas de Interesse', Icon: RiNumber1 },
        { label: 'O que te Motiva', Icon: RiNumber1 }
    ];

    return (
        <div className="flex flex-col items-center justify-start bg-white px-8 py-4 mx-20 my-12 shadow-lg rounded-lg" style={{ height: '620px' }}>
            <img src={logoHorizontal} alt="Teamster Logo" className="w-64 mb-8" />
            <div className="grid grid-cols-[auto_auto] gap-x-4">
                <div className="flex flex-col items-center">
                    {steps.map((stepInfo, index) => {
                        const Icon = stepInfo.Icon;
                        const isCompleted = index + 1 < step;
                        const isActive = index + 1 === step;

                        return (
                            <React.Fragment key={index}>
                                <div className={`flex items-center justify-center h-12 w-12 rounded-full text-white ${isCompleted ? 'bg-[#56C496]' : isActive ? 'bg-[#FE9DCB]' : 'bg-[#AAAAAA]'}`}>
                                    <Icon className="text-xl h-6 w-6" />
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`w-1 h-12 ${isCompleted ? 'bg-[#56C496]' : 'bg-[#AAAAAA]'}`}></div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
                <div className="flex flex-col justify-start mt-6 ml-4">
                    {steps.map((stepInfo, index) => (
                        <div key={index} className="flex items-center">
                            <div className="flex-1 mb-16">
                <span className={`text-xl font-bold font-serif uppercase ${index + 1 <= step ? 'text-black' : 'text-gray-500'}`}>
                  {stepInfo.label}
                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
