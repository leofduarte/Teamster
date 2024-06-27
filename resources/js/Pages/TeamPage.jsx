import React, {useState} from 'react';
import {Layout} from './Layout.jsx';
import {InertiaLink} from "@inertiajs/inertia-react";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/Components/ui/hover-card.jsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/Components/ui/avatar.jsx";
import {Inertia} from "@inertiajs/inertia";
import {Checkbox} from "@/Components/ui/checkbox.jsx";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/Components/ui/pagination.jsx";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/Components/ui/tooltip"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from "@/Components/ui/alert-dialog.jsx";
import Modal from "@/Components/Modal.jsx";
import AddParticipantToTeam from "@/Pages/AddParticipantToTeam.jsx";
import {Button} from "@/Components/ui/button.jsx";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

const TeamPage = ({team, participants, countStatus3, questionnaires, userQuestionnaires}) => {
    const [participantToRemove, setParticipantToRemove] = useState(null);
    const [showAddParticipant, setShowAddParticipant] = useState(false);
    const [selectedParticipants, setSelectedParticipants] = useState([]);
    const [checkboxActive, setCheckboxActive] = useState(false);

    function toggleParticipantSelection(participantId) {
        if (selectedParticipants.includes(participantId)) {
            setSelectedParticipants(selectedParticipants.filter(id => id !== participantId));
        } else {
            setSelectedParticipants([...selectedParticipants, participantId]);
        }
    }

    function removeSelectedParticipants() {
        selectedParticipants.forEach(participantId => {
            removeParticipant(team.id, participantId);
        });
        setSelectedParticipants([]);
    }


    console.log('team', team);
    console.log('participants:', participants);
    console.log('questionnaires:', questionnaires);
    console.log('userQuestionnaires:', userQuestionnaires);

    const participantsArray = participants.data ? Object.values(participants.data) : participants;
    console.log(participantsArray);


    function removeParticipant(teamId, participantId) {
        axios.delete(`/api/v1/team/${teamId}/participant/${participantId}`)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <Layout>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 pt-12">
                <div className="overflow-hidden">
                    <div className="p-6 text-gray-900">
                        <h1 className={"text-3xl font-bold text-black"}>
                            {team.name}
                        </h1>

                        <div className={"my-6 flex flex-col justify-between"}>
                            <div className={"flex justify-between"}>
                                <h2 className={"text-2xl font-serif uppercase"}>Gerir Equipa</h2>
                                <Button
                                    onClick={() => setShowAddParticipant(true)}>
                                    Adicionar Membros
                                </Button>
                            </div>
                            <div className={"my-4 bg-white p-4 min-h-fit rounded-md gap-4 flex flex-col"}>
                                <div className={"flex gap-2"}>
                                    <h3 className={"text-2xl font-bold"}>
                                        Membros
                                    </h3>

                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <span
                                                    className={"text-md font-bold text-emerald-500"}> ({participants.total})</span>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Total de membros</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>

                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                 <span className={"text-md font-bold text-yellow-500"}>
                                        ({countStatus3})
                                    </span>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Convites pendentes</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <div className={"flex justify-between space-x-4"}>
                                        <button onClick={() => setCheckboxActive(!checkboxActive)}>
                                            {checkboxActive ? "Cancelar" : "Selecionar"}
                                        </button>
                                        {checkboxActive && (
                                            <button onClick={removeSelectedParticipants}>
                                                <FontAwesomeIcon icon={faTrash} className={"text-red-500"}/>
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className={"gap-2"}>
                                    {participantsArray.map((participant, index) => (
                                        <div key={index} className={"flex flex-row justify-between"}>
                                            <div className={"flex items-center gap-2 align-middle"}>
                                                {checkboxActive && (
                                                    <Checkbox
                                                        className={"items-center flex align-middle"}
                                                        checked={selectedParticipants.includes(participant.id)}
                                                        onCheckedChange={() => {
                                                            toggleParticipantSelection(participant.id);
                                                            console.log("checked:", selectedParticipants);
                                                        }}
                                                    />
                                                )}
                                                <div className={"flex "}>
                                                    {participant.pivot.status_id === 3 ? (
                                                        <HoverCard>
                                                            <HoverCardTrigger>
                                                                <Avatar className={"h-12 w-12"}>
                                                                    <AvatarImage className={"filter grayscale"}
                                                                                 src={`https://api.dicebear.com/8.x/big-smile/svg?seed=${participant.email}`}/>
                                                                    <AvatarFallback>CN</AvatarFallback>
                                                                </Avatar>
                                                            </HoverCardTrigger>
                                                            <HoverCardContent>
                                                                <div className={"flex items-center gap-2"}>
                                                                    <Avatar className={"h-12 w-12"}>
                                                                        <AvatarImage
                                                                            src={`https://api.dicebear.com/8.x/big-smile/svg?seed=${participant.email}`}/>
                                                                        <AvatarFallback>CN</AvatarFallback>
                                                                    </Avatar>
                                                                    <div className={"flex flex-col"}>
                                                                        <p>{participant.email}</p>
                                                                        <p className={"text-sm text-gray-500"}>
                                                                            Convite pendente</p>
                                                                    </div>
                                                                </div>
                                                            </HoverCardContent>
                                                        </HoverCard>
                                                    ) : (
                                                        <Avatar className={"h-12 w-12"}>
                                                            <AvatarImage
                                                                src={`https://api.dicebear.com/8.x/big-smile/svg?seed=${participant.email}`}/>
                                                            <AvatarFallback>CN</AvatarFallback>
                                                        </Avatar>
                                                    )}
                                                    <p className={"flex items-center font-semibold"}>
                                                        {participant.name ? (
                                                            participant.name
                                                        ) : (
                                                            participant.email
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <FontAwesomeIcon icon={faEllipsisVertical}
                                                                     className={"px-2 focus-visible:ring-0"}/>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()}>
                                                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                                                    <DropdownMenuSeparator/>
                                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem>Resend Invite</DropdownMenuItem>

                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild
                                                                            className={"hover:text-red-100"}>
                                                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}
                                                                              onClick={() => setParticipantToRemove(participant.id)}
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
                                                                    onClick={() => setParticipantToRemove(null)}
                                                                >
                                                                    Cancel
                                                                </AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    variant={"destructive"}
                                                                    onClick={() => {
                                                                        removeParticipant(team.id, participantToRemove);
                                                                        setParticipantToRemove(null);
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
                                    ))}


                                    {participants.last_page > 1 && (
                                        <Pagination>
                                            <PaginationContent>
                                                {(participants.links || []).map((link, index) => {
                                                    if (link && link.url) {
                                                        let label = link.label;
                                                        if (link.label === "&laquo; Previous") {
                                                            label = "Previous";
                                                        } else if (link.label === "Next &raquo;") {
                                                            label = "Next";
                                                        }
                                                        return (
                                                            <PaginationItem key={index}>
                                                                <PaginationLink href="#" onClick={(e) => {
                                                                    e.preventDefault();
                                                                    Inertia.visit(link.url);
                                                                }} isActive={link.active}>
                                                                    {label}
                                                                </PaginationLink>
                                                            </PaginationItem>
                                                        );
                                                    } else {
                                                        return (
                                                            <PaginationItem key={index}>
                                                                <PaginationEllipsis/>
                                                            </PaginationItem>
                                                        );
                                                    }
                                                })}
                                            </PaginationContent>
                                        </Pagination>
                                    )}

                                </div>
                            </div>

                            <div className={"my-4 bg-white p-4 min-h-fit rounded-md gap-4 flex flex-col"}>
                                <div className={"flex flex-col gap-2"}>
                                    <h3 className={"text-2xl font-bold"}>
                                        Questionários
                                    </h3>
                                    <div className={"flex flex-col gap-2"}>
                                        {questionnaires.map((questionnaire, index) => (
                                            <div key={index} className={"flex flex-col"}>
                                                <div className={"flex justify-between"}>
                                                    <h3 className={"font-bold"}>{questionnaire.title}</h3>
                                                    <div>
                                                        <InertiaLink href={`/questionnaires/${questionnaire.id}/edit`}
                                                                     className="text-blue-600 hover:text-blue-800 mr-2">
                                                            Edit
                                                        </InertiaLink>
                                                        <InertiaLink
                                                            href={`/teams/${team.id}/questionnaires/${questionnaire.id}`}
                                                            method="delete"
                                                            as="button"
                                                            className="text-red-600 hover:text-red-800"
                                                        >
                                                            Remove
                                                        </InertiaLink>
                                                    </div>
                                                </div>
                                                <p>{questionnaire.description}</p>
                                            </div>
                                        ))}

                                        <div className={"flex flex-col gap-4 "}>
                                            {userQuestionnaires.filter(userQuestionnaire =>
                                                !questionnaires.some(questionnaire => questionnaire.id === userQuestionnaire.id)
                                            ).map((questionnaire, index) => (
                                                <div key={index}
                                                     className={"bg-gray-200 flex items-center justify-between"}>
                                                    <div>
                                                        <h4 className={"font-bold"}>{questionnaire.title}</h4>
                                                        <p>{questionnaire.description}</p>
                                                    </div>
                                                    <InertiaLink
                                                        href={`/teams/${team.id}/questionnaires/${questionnaire.id}`}
                                                        method="post"
                                                        as="button"
                                                        className="bg-primary text-sm text-white p-2 rounded-md hover:bg-blue-800"
                                                    >
                                                        Add to team
                                                    </InertiaLink>
                                                </div>
                                            ))}

                                            <Modal show={showAddParticipant}
                                                   onClose={() => setShowAddParticipant(false)}>
                                                <AddParticipantToTeam teamId={team.id}
                                                                      onClose={() => setShowAddParticipant(false)}/>
                                            </Modal>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default TeamPage;
