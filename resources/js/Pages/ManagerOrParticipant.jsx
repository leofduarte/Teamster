import Navbar from "@/components_ines/Navbar.jsx";
import Footer from "@/components_ines/Footer.jsx";
import React from "react";
import {Button} from "@/Components/ui/button.jsx";
import {InertiaLink} from "@inertiajs/inertia-react";

const ManagerOrParticipant = () => {

    return (
        <div className='bg-slate-50 font-poppins h-full'>
            <Navbar/>

            <div className={"justify-center flex flex-col items-center place-content-center gap-8 my-12"}>

                <h1 className={"text-center text-3xl font-bold uppercase"}>É um Planeador ou um Participante?</h1>

                <div className={"flex flex-row gap-8"}>

                    <div
                        className={"bg-white p-4 min-h-[400px] rounded-md flex flex-col min-w-[480px] max-w-[480px] shadow-md justify-center items-center text-center"}>
                        <h3 className={"text-2xl font-semibold uppercase text-gray-500"}>Login</h3>
                        <h2 className={"text-4xl font-bold uppercase"}>Como Participante</h2>

                        <p className={"mt-4 capitalize max-w-[80%]"}>Pode ver todas as actividades da sua equipa</p>
                        <InertiaLink href={"/participantauth"}>
                        <Button className={"mt-4"}>Login como Participante</Button>
                            </InertiaLink>
                    </div>


                    <div
                        className={"bg-white p-4 min-h-[400px] rounded-md flex flex-col min-w-[480px] max-w-[480px] shadow-md justify-center items-center text-center"}>
                        <h3 className={"text-2xl font-semibold uppercase text-gray-500"}>Login</h3>
                        <h2 className={"text-4xl font-bold uppercase"}>Como Planeador</h2>

                        <p className={"mt-4 capitalize max-w-[80%]"}>Como gestor, pode criar actividades e gerir a equipa</p>
                        <InertiaLink href={"/login"}>
                            <Button className={"mt-4"}>Login Como Planeador Manager</Button>
                        </InertiaLink>
                    </div>

                </div>
            </div>
            <Footer/>
        </div>
    )
        ;
}

export default ManagerOrParticipant;
