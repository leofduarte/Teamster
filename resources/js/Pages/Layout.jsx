import React, {useEffect} from "react";
import logo from "../../../public/build/assets/logo.svg";
import {Inertia} from "@inertiajs/inertia";


function Layout({children, sidebar, profile}) {

    const isActive = (path) => {
        return window.location.pathname === path ? 'border-gray-800 border-e-4 border-solid ' : '';
    }

    return (
        <div className="flex h-full">
            {/* Left Bar */}
            <div
                className="flex h-full w-[17%] bg-white text-stone-700 fixed"
                role="navigation"
            >
                <div className="w-full h-full flex flex-col">

                    <div className="">
                        <img src={logo} className="h-28 w-auto" alt="Logo"/>
                    </div>
                    <div className={"flex flex-col justify-between h-screen"}
                    >
                        <div>
                            <div
                                className={`py-2 hover:border-e-4 hover:border-solid hover:border-gray-300 ${isActive('/dashboard')}`}>
                                <button
                                    onClick={() => Inertia.visit('/dashboard')}
                                    className="w-full text-left cursor-pointer ms-5"
                                >
                                    Dashboard
                                </button>
                            </div>
                            <div
                                className={`py-2 border-e-4 border-solid border-white hover:border-gray-800 ${isActive('/atividade')}`}>
                                <button className="w-full text-left cursor-pointer ms-5"
                                        onClick={() => Inertia.visit('/atividade')}
                                >
                                    Planear Atividade
                                </button>
                            </div>
                            <div
                                className={`py-2 border-e-4 border-solid border-white hover:border-gray-800 ${isActive('/analise')}`}>
                                <button className="w-full text-left cursor-pointer ms-5"
                                        onClick={() => Inertia.visit('/analise')}
                                >
                                    Análise
                                </button>
                            </div>
                            <div
                                className={`py-2 border-e-4 border-solid border-white hover:border-gray-800 ${isActive('/feedback')}`}>
                                <button className="w-full text-left cursor-pointer ms-5"
                                        onClick={() => Inertia.visit('/feedback')}
                                >
                                    Questionários de Feedback
                                </button>
                            </div>
                            <div
                                className={`py-2 border-e-4 border-solid border-white hover:border-gray-800 ${isActive('/addresponse')}`}>
                                <button className="w-full text-left cursor-pointer ms-5"
                                        onClick={() => Inertia.visit('/addresponse')}
                                >
                                    Responder Questionário (apenas para participantes)
                                </button>
                            </div>
                            <div
                                className={`py-2 border-e-4 border-solid border-white hover:border-gray-800 ${isActive('/teams')}`}>
                                <button className="w-full text-left cursor-pointer ms-5"
                                        onClick={() => Inertia.visit('/teams')}
                                >
                                    Equipas
                                </button>
                            </div>
                        </div>
                        <div>
                            {profile}
                        </div>
                    </div>
                </div>
                <div>
                </div>
            </div>


            {/* Content */}
            <div className="flex-1 w-[83%] ml-[17%] min-h-screen h-full py-6 px-10 bg-[#F8F7FC] overflow-auto mr-[20%]">
                {children}
            </div>

            {/* Right Bar */
            }
            <div className="flex h-full w-[20%] bg-white fixed right-0 justify-center">
                {sidebar && (
                    <div className={"py-6  px-4"}>
                        {sidebar}
                    </div>
                )}
            </div>
        </div>
    )
        ;
}

export {Layout};
