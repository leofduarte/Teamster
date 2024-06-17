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

const SeeTeams = ({auth}) => {
    const [teams, setTeams] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [teamIdForNewParticipant, setTeamIdForNewParticipant] = useState(null);
    const [participantEmail, setParticipantEmail] = useState('');
    const [showAddTeamModal, setShowAddTeamModal] = useState(false);
    const [showAddParticipantModal, setShowAddParticipantModal] = useState(false);

    const fetchTeamsAndParticipants = async () => {
        try {
            const response = await axios.post('/api/v1/teams-and-participants', {userId: auth.user.id});
            setTeams(response.data);
        } catch (error) {
            console.error('Error fetching teams and participants:', error);
        }
    };



   /* const handleAddParticipant = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const participantData = Object.fromEntries(formData.entries());

        try {
            const response = await axios.post(`/api/v1/teams/${teamIdForNewParticipant}/addparticipants`, participantData);

            toast({
                variant: "success",
                title: "Success!",
                description: `${participantData.email} has been added to the team.`,
            });

            fetchTeamsAndParticipants();
            setParticipantEmail('');
            setTeamIdForNewParticipant(null);
        } catch (error) {
            console.error('Error adding participant:', error);
            toast({
                variant: "destructive",
                title: "Error!",
                description: `An error occurred while adding the participant. ${error.response.data.message}`,
            });
        }
    };*/

    useEffect(() => {
        fetchTeamsAndParticipants();
    }, []);

    useEffect(() => {
        console.log('teams:', teams);
    }, []);

    useEffect(() => {
        console.log('Modal state:', showAddParticipantModal);
    }, [showAddParticipantModal]);

    useEffect(() => {
        console.log('Input field state:', participantEmail);
    }, [participantEmail]);

    useEffect(() => {
        if (!showForm) {
            setParticipantEmail('');
        }
    }, [showForm]);

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
                                    <Button onClick={() => setShowAddTeamModal(true)} className={"align-middle"}>
                                        Adicionar Equipa
                                        <FontAwesomeIcon className={"ms-2"} icon={faPlus}/>
                                    </Button>
                                </div>
                                <div className={"my-6 flex flex-col justify-between"}>
                                    <h2 className={"text-2xl font-serif uppercase"}>Gerir Equipas</h2>
                                    {teams.map((team) => (
                                        <div key={team.id} className={"my-4 bg-white p-4 min-h-[140px] rounded-md justify-around flex flex-col"}>
                                            <div className="flex flex-row gap-4">
                                            <h3 className="text-2xl font-semibold">{team.name}</h3>
                                                <h5 className="text-base content-end">Departamento Financeiro</h5>
                                            </div>
                                            <div className="flex gap-1">
                                                {team.participants.map((participant, index) => (
                                                    <div key={index}>
                                                        <HoverCard>
                                                            <HoverCardTrigger>
                                                                <Avatar>
                                                                    <AvatarImage
                                                                        src={`https://api.dicebear.com/8.x/big-smile/svg?seed=${participant.email}`}/>
                                                                    <AvatarFallback>CN</AvatarFallback>
                                                                </Avatar>
                                                            </HoverCardTrigger>
                                                            <HoverCardContent>
                                                                <p>{participant.email}</p>
                                                            </HoverCardContent>
                                                        </HoverCard>
                                                    </div>
                                                ))}

                                                <button onClick={() => {setShowAddParticipantModal(true);
                                                    setTeamIdForNewParticipant(team.id);
                                                }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                         strokeWidth={1} stroke="currentColor" className={"h-12 w-12 text-gray-300"}>
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                                    </svg>
                                                </button>
                                            </div>




                                            {/*
                                            <Button className={"mt-4"}
                                                    onClick={() => {
                                                        setTeamIdForNewParticipant(team.id);
                                                        setShowForm(!showForm)
                                                    }}>
                                                Add Participant
                                            </Button>

                                            {showForm && teamIdForNewParticipant === team.id && (
                                                <form onSubmit={handleAddParticipant}>
                                                    <Input type="email" name="email" placeholder="Email"
                                                           onChange={(e) => setParticipantEmail(e.target.value)}
                                                           value={participantEmail}
                                                           required/>
                                                    <Button type="submit">Submit</Button>
                                                </form>
                                            )}*/}

                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                    <Modal show={showAddParticipantModal} onClose={() => setShowAddParticipantModal(false)}>
                        <AddParticipantToTeam fetchTeamsAndParticipants={fetchTeamsAndParticipants}
                                              setParticipantEmail={setParticipantEmail}
                                                teamId={teamIdForNewParticipant}
                                                onClose={() => setShowAddParticipantModal(false)}
                        />
                    </Modal>

                <Modal show={showAddTeamModal} onClose={() => {setShowAddTeamModal(false); console.log('Modal close triggered')}}>
                    <AddParticipantAndTeam
                        auth={auth}
                        onClose={() => setShowAddTeamModal(false)}
                        fetchTeamsAndParticipants={fetchTeamsAndParticipants}
                        teamId={teamIdForNewParticipant}
                    />

                    {/*<AddTeam
                        fetchTeamsAndParticipants={fetchTeamsAndParticipants}
                         auth={auth}
                         onClose={() => setShowAddTeamModal(false)}
                    />*/}
                </Modal>


            </AuthenticatedLayout>
        </div>
    );
};

export default SeeTeams;
