import React from "react";
import logo from "../../../public/build/assets/logo.svg";
import {Inertia} from "@inertiajs/inertia";

function Layout({children, sidebar}) {

    return (
        <div className="flex h-full">
            {/* Left Bar */}
            <div
                className="flex h-full w-[17%] bg-white text-stone-700 fixed"
                role="navigation"
            >
                <div className="w-full h-full flex flex-col">
                    <div className="self-center content-center h-[10%]">
                        <img src={logo} className="h-20" alt="Logo"/>
                    </div>
                    <div className="h-1/2">
                        <div className="py-2 border-e-4 border-solid border-white hover:border-gray-800">
                            <button
                                onClick={() => Inertia.visit('/dashboard')}
                                className="w-full text-left cursor-pointer ms-5"
                            >
                                Dashboard
                            </button>
                        </div>
                        <div className="py-2 border-e-4 border-solid border-white hover:border-gray-800">
                            <button className="w-full text-left cursor-pointer ms-5"
                                    onClick={() => Inertia.visit('/atividade')}
                            >
                                Planear Atividade
                            </button>
                        </div>
                        <div className="py-2 border-e-4 border-solid border-white hover:border-gray-800">
                            <button className="w-full text-left cursor-pointer ms-5"
                                    onClick={() => Inertia.visit('/analise')}
                            >
                                Análise
                            </button>
                        </div>
                        <div className="py-2 border-e-4 border-solid border-white hover:border-gray-800">
                            <button className="w-full text-left cursor-pointer ms-5"
                                    onClick={() => Inertia.visit('/feedback')}
                            >
                                Questionários de Feedback
                            </button>
                        </div>
                        <div className="py-2 border-e-4 border-solid border-white hover:border-gray-800">
                            <button className="w-full text-left cursor-pointer ms-5"
                                    onClick={() => Inertia.visit('/addresponse')}
                            >
                                Responder Questionário (apenas para participantes)
                            </button>
                        </div>
                        <div className="py-2 border-e-4 border-solid border-white hover:border-gray-800">
                            <button className="w-full text-left cursor-pointer ms-5"
                                    onClick={() => Inertia.visit('/teams')}
                            >
                                Equipas
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 w-[83%] ml-[17%] min-h-screen h-full py-6 px-10 bg-[#F8F7FC] overflow-auto mr-[20%]">
                {children}
            </div>

            {/* Right Bar */}
            <div className="flex h-full w-[20%] bg-white fixed right-0 justify-center">
                <div className={"py-6  px-4"}>
                {sidebar}
                </div>
            </div>
        </div>
    );
}

export {Layout};
