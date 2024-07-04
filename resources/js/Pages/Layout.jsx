import React from "react";
import logo from "../../../storage/app/public/logos/logo-teamster.svg";
import {Inertia} from "@inertiajs/inertia";


function Layout({children, sidebar, profile}) {

    const isActive = (path) => {
        return window.location.pathname === path ? 'border-gray-800 border-e-4 border-solid ' : '';
    }

    const redirectToDash = () => {
        Inertia.visit('/dashboard');
    }

    return (
        <div className="flex h-full">
            {/* Left Bar */}
            <div
                className="flex h-full w-[17%] bg-white text-stone-700 fixed"
                role="navigation"
            >
                <div className="w-full h-full flex flex-col">

                    <div>
                        <img src={logo} className="h-auto w-fit cursor-pointer" alt="Logo" onClick={redirectToDash}/>
                    </div>

                    <div className={"flex flex-col justify-between h-screen text-lg  mt-4"}
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
                                className={`py-2 border-e-4 border-solid border-white hover:border-gray-300 ${isActive('/atividade')}`}>
                                <button className="w-full text-left cursor-pointer ms-5"
                                        onClick={() => Inertia.visit('/atividade')}
                                >
                                    Planear Atividade
                                </button>
                            </div>
                            <div
                                className={`py-2 border-e-4 border-solid border-white hover:border-gray-300 ${isActive('/feedback')}`}>
                                <button className="w-full text-left cursor-pointer ms-5"
                                        onClick={() => Inertia.visit('/feedback')}
                                >
                                    Questionários de Feedback
                                </button>
                            </div>
                            <div
                                className={`py-2 border-e-4 border-solid border-white hover:border-gray-300 ${isActive('/teams')}`}>
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
                    <div className={"py-6 px-4"}>
                        {sidebar}
                    </div>
                )}
            </div>
        </div>
    );
}

export {Layout};
