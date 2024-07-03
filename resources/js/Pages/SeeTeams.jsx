import React, {useState, useEffect} from 'react';
import {Head} from '@inertiajs/react';
import {Button} from '../Components/ui/button.jsx';
import {Avatar, AvatarImage, AvatarFallback} from '../Components/ui/avatar.jsx';
import {
    HoverCard, HoverCardContent, HoverCardTrigger,
} from "../Components/ui/hover-card"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisVertical, faPlus} from "@fortawesome/free-solid-svg-icons";
import Modal from "@/Components/Modal.jsx";
import AddParticipantAndTeam from "@/Pages/AddParticipantAndTeam.jsx";
import AddParticipantToTeam from "@/Pages/AddParticipantToTeam.jsx";
import {Layout} from "./Layout.jsx";
import {InertiaLink} from "@inertiajs/inertia-react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/Components/ui/dropdown-menu.jsx";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/Components/ui/alert-dialog.jsx";

const SeeTeams = (props) => {
    const [teams, setTeams] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [teamIdForNewParticipant, setTeamIdForNewParticipant] = useState(null);
    const [participantEmail, setParticipantEmail] = useState('');
    const [showAddTeamModal, setShowAddTeamModal] = useState(false);
    const [showAddParticipantModal, setShowAddParticipantModal] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [teamToRemove, setTeamToRemove] = useState(null);

    const fetchTeamsAndParticipants = async () => {
        setTeams(props.teams);
        setDepartments(props.departments);
    }

    const updateTeam = (team) => {
        console.log("team", team)
        const index = teams.findIndex(t => t.id === team.id);
console.log("index", index)
        if (index !== -1) {
            const newTeams = [...teams];
            newTeams[index] = team;
            setTeams([...newTeams]);
        }
    }

    console.log('teams:', teams);

    console.log('props:', props);
    console.log('auth:', props.auth.user.id);

    const auth = props.auth;

    /*const fetchDepartments = async () => {
        try {
            const response = await axios.post(`/api/v1/${auth.user.id}/getdepartments`);
            setDepartments(response.data);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    }*/

    useEffect(() => {
        fetchTeamsAndParticipants();
        // fetchDepartments
    }, []);

    useEffect(() => {
        console.log('Teams state:', teams);
    }, [teams]);

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

    return (<div>
        <Layout>
            <Head title="See Teams/ Members"/>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 pt-12">
                <div className="overflow-hidden">
                    <div className="p-6 text-gray-900">
                        <h1 className={"text-3xl font-bold text-black"}>
                            Equipas
                        </h1>
                        <div className={"my-6 flex flex-col justify-between"}>
                            <div className={"flex justify-between"}>
                                <h2 className={"text-2xl font-serif uppercase items-end flex"}>Gerir Equipas</h2>
                                <Button onClick={() => setShowAddTeamModal(true)} className={"align-middle"}>
                                    Adicionar Equipa
                                    <FontAwesomeIcon className={"ms-2"} icon={faPlus}/>
                                </Button>
                            </div>


                            {teams.map((team) => (
                                <div key={team.id}
                                     className={"my-4 bg-white p-4 min-h-fit rounded-xl gap-6 flex flex-col shadow-lg"}>
                                    <div>
                                    <div className="flex flex-row justify-between">
                                            <h3 className="text-2xl font-semibold ">{team.name}</h3>
                                    <div className={"items-center flex"}>
                                            <InertiaLink href={`/teams/${team.id}`} className={"text-sm items-center flex"}>
                                                View more
                                            </InertiaLink>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <FontAwesomeIcon icon={faEllipsisVertical}
                                                                     className={"px-2 ms-2 focus-visible:ring-0"}/>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()}>
                                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild
                                                                            className={"hover:text-red-100"}>
                                                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}
                                                                              onClick={() => setTeamToRemove(team.id)}
                                                                              className={"text-red-500"}>
                                                                Eliminate
                                                            </DropdownMenuItem>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Please Confirm!</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Are you sure you want to remove this participant
                                                                    from the team?
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel
                                                                    variant={"outline"}
                                                                    onClick={() => setTeamToRemove(null)}
                                                                >
                                                                    Cancel
                                                                </AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    variant={"destructive"}
                                                                    onClick={() => {
                                                                        teamToRemove(team.id);
                                                                    }}
                                                                >
                                                                    Continue
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                    </div>
                                        </div>
                                    <h5 className="text-sm content-end ">{team.department.name}</h5>
                                    </div>

                                    <div className="flex gap-1 flex-wrap">
                                        {team.participants.map((participant, index) => (<div key={index}>
                                            <HoverCard>
                                                <HoverCardTrigger>
                                                    {participant.pivot.status_id === 3 ? (<Avatar>
                                                        <AvatarImage className={"filter grayscale"}
                                                                     src={`https://api.dicebear.com/8.x/big-smile/svg?seed=${participant.email}`}/>
                                                        <AvatarFallback>CN</AvatarFallback>
                                                    </Avatar>) : (<Avatar>
                                                        <AvatarImage
                                                            src={`https://api.dicebear.com/8.x/big-smile/svg?seed=${participant.email}`}/>
                                                        <AvatarFallback>CN</AvatarFallback>
                                                    </Avatar>)}
                                                </HoverCardTrigger>
                                                <HoverCardContent>
                                                    <p>{participant.email}</p>
                                                </HoverCardContent>
                                            </HoverCard>
                                        </div>))}

                                        <button
                                            onClick={() => {
                                                setShowAddParticipantModal(true);
                                                setTeamIdForNewParticipant(team.id);
                                            }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                 viewBox="0 0 24 24"
                                                 strokeWidth={1} stroke="currentColor"
                                                 className={"h-11 w-11 text-gray-400"}>
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

                                </div>))}
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showAddParticipantModal} onClose={() => setShowAddParticipantModal(false)} minWidth={"xl"}>
                <AddParticipantToTeam
                    fetchTeamsAndParticipants={fetchTeamsAndParticipants}
                    setParticipantEmail={setParticipantEmail}
                    teamId={teamIdForNewParticipant}
                    onClose={() => setShowAddParticipantModal(false)}
                    updateTeam={updateTeam}
                />
            </Modal>

            <Modal
                closeable={false}
                show={showAddTeamModal}
                onClose={(e) => {
                    setShowAddTeamModal(false);
                    console.log('Modal close triggered');
                    console.log(e);
                }}>
                <AddParticipantAndTeam
                    auth={auth}
                    onClose={() => {
                        setShowAddTeamModal(false);
                        console.log("completed");
                    }}
                    fetchTeamsAndParticipants={fetchTeamsAndParticipants}
                    teamId={teamIdForNewParticipant}
                    departmentsProps={departments}

                />

                {/*<AddTeam
                        fetchTeamsAndParticipants={fetchTeamsAndParticipants}
                         auth={auth}
                         onClose={() => setShowAddTeamModal(false)}
                    />*/}
            </Modal>


        </Layout>
    </div>);
};

export default SeeTeams;
