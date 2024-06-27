import React, {useState, useEffect} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import {Head} from '@inertiajs/react';
import axios from 'axios';
import {Button} from '../Components/ui/button.jsx';
import {Avatar, AvatarImage, AvatarFallback} from '../Components/ui/avatar.jsx';
import {toast} from "@/Components/ui/use-toast.js";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "../Components/ui/hover-card"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Modal from "@/Components/Modal.jsx";
import AddParticipantAndTeam from "@/Pages/AddParticipantAndTeam.jsx";
import AddParticipantToTeam from "@/Pages/AddParticipantToTeam.jsx";

const SeeTeams = ({auth, teams}) => {
    //const [teams, setTeams] = useState([]);
    useEffect(() => {
        console.log(teams);
    }, []);

    return (
        <div>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="text-xl font-semibold leading-tight text-gray-800">See Teams/ Members</h2>}
            >
                <Head title="See Teams/ Members"/>

                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <div className="p-6 text-gray-900">
                                <div className={"flex justify-between"}>
                                    <h1 className={"text-3xl font-bold text-black"}>
                                        Equipas
                                    </h1>

                                </div>

                                <div>
                                    {teams.map(team => (
                                        <p key={"team.id"}>{team}</p>
                                    ))}
                                </div>



                            </div>
                        </div>
                    </div>
                </div>




            </AuthenticatedLayout>
        </div>
    );
};

export default SeeTeams;
