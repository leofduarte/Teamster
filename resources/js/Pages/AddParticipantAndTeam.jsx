import axios from "axios";
import {useToast} from "../Components/ui/use-toast";
import {Input} from "@/Components/ui/input";
import {Label} from "@/Components/ui/label";
import {Button} from "@/Components/ui/button";
import {useEffect, useState} from "react";
import {Tooltip} from "@/Components/ui/tooltip.jsx";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {TooltipContent, TooltipProvider, TooltipTrigger} from "@/Components/ui/tooltip";
import GetEmailExcel2_CP from "@/Pages/Teams/GetEmailExcel2_CP.jsx";
import {Checkbox} from "@/Components/ui/checkbox.jsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/Components/ui/select.jsx";

const AddParticipantAndTeam = ({auth, onClose, fetchTeamsAndParticipants, departmentsProps}) => {
    const [error, setError] = useState(null);
    const [teamName, setTeamName] = useState('');
    const {toast} = useToast();
    const [participantEmail, setParticipantEmail] = useState('');
    const [participantEmails, setParticipantEmails] = useState([]);
    const [showGetEmailExcel, setShowGetEmailExcel] = useState(false);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
    const [newDepartmentName, setNewDepartmentName] = useState('');
    const [departments, setDepartments] = useState(departmentsProps);

    const handleAddEmail = () => {
        if (participantEmail) {
            setParticipantEmails([...participantEmails, {email: participantEmail}]);
            setParticipantEmail('');
        }
    };

    const handleAddDepartment = async () => {
        try {
            const response = await axios.post(`/api/v1/${auth.user.id}/adddepartment`, { name: newDepartmentName });
            const newDepartment = response.data;
            setDepartments([...departments, newDepartment]);
            setSelectedDepartmentId(newDepartment.id);
            setNewDepartmentName('');
        } catch (error) {
            console.error('Error adding department:', error);
        }
    };

    const handleAddTeamAndParticipant = async (event) => {
        event.preventDefault();

        const teamFormData = new FormData(document.getElementById('teamForm'));
        const teamData = Object.fromEntries(teamFormData.entries());
        teamData.department_id = selectedDepartmentId;

        const participantData = {emails: participantEmails.map(emailObj => emailObj.email)};

        console.log('Participant data:', participantData);

        try {
            const teamResponse = await axios.post(`/api/v1/addteam`, teamData);
            console.log('Team addition response:', teamResponse);
            toast({
                variant: "success",
                title: "Success!",
                description: `${teamData.name} has been added to the teams.`,
            });

            setTeamName('');
            setError(null);

            const newTeamId = teamResponse.data.teamId;

            const participantResponse = await axios.post(`/api/v1/teams/${newTeamId}/addmultipleparticipants`, participantData);
            console.log('Participant addition response:', participantResponse);

            toast({
                variant: "success",
                title: "Success!",
                description: `Participants have been added to the team.`,
            });

            setParticipantEmail('');
            fetchTeamsAndParticipants();

            try {
                const departmentResponse = await axios.post(`/api/v1/teams/${newTeamId}/add-department`, {
                    department_id: selectedDepartmentId,
                });
                console.log(departmentResponse.data);
            } catch (departmentError) {
                console.error('Error adding department to team:', departmentError);
            }

            for (const emailObj of participantEmails) {
                try {
                    const inviteResponse = await axios.post('/api/v1/invite', {
                        email: emailObj.email,
                        team_id: newTeamId
                    });
                    console.log(inviteResponse.data);
                } catch (inviteError) {
                    console.error('Error inviting participant:', inviteError);
                }
            }
        } catch (error) {
            console.error('Error:', error);
            toast({
                variant: "destructive",
                title: "Error!",
                description: `An error occurred. ${error.response?.data?.message || error.message}`,
            });
        } finally {
            onClose();
        }
    };

    useEffect(() => {
        console.log("selectedDepartmentId", selectedDepartmentId);
    }, [selectedDepartmentId]);

    return (
        <div className={"p-4 min-h-full "}>
            <form id="teamForm" onSubmit={handleAddTeamAndParticipant}>
                <h2 className="text-2xl font-bold mb-4">Adicione Equipa e Participantes</h2>
                <div className={"gap-4 flex flex-col"}>
                    <div className={"flex flex-col"}>
                        <div className="flex flex-row">
                            <Label htmlFor="name" className="block text-sm leading-8 font-medium text-gray-700">
                                Nome da Equipa
                            </Label>
                            <TooltipProvider onOpenAutoFocus={(event) => event.preventDefault()}>
                                <Tooltip>
                                    <TooltipTrigger className={"cursor-pointer"}>
                                        <FontAwesomeIcon
                                            className="ms-2"
                                            icon={faCircleInfo}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-sm">Insira o nome da equipa. Exemplo: <strong>Equipa de Marketing
                                            </strong></p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="flex flex-row">
                            <Input type="text" name="name" id="name"
                                   variant={"activity"} placeholder="Team Name"
                                   onChange={(e) => {
                                       setTeamName(e.target.value);
                                       setError(null);
                                   }}
                                   className="mt-1 p-2 border border-gray-300 rounded-md"/>
                            {error && (
                                <p className="text-red-500 text-xs italic">{error}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-row">
                        <Select
                            onValueChange={(selectedOption) => {
                                const department = JSON.parse(selectedOption);
                                setSelectedDepartmentId(department.id);
                            }}
                        >
                            <SelectTrigger className="min-w-fit">
                                <SelectValue placeholder="Selecione um Departmento"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup label="Departments">
                                    {departments.map((department) => (
                                        <SelectItem
                                            key={department.id}
                                            value={JSON.stringify({
                                                id: department.id,
                                                name: department.name,
                                            })}
                                        >
                                            {department.name}
                                        </SelectItem>
                                    ))}
                                    <div className="flex flex-row">
                                        <Input type="text" name="newDepartment" id="newDepartment"
                                               variant={"activity"} placeholder="New Department Name"
                                               value={newDepartmentName}
                                               onChange={(e) => setNewDepartmentName(e.target.value)}/>
                                        <Button variant={"secondary"} className={"ms-2 mt-1"} type="button"
                                                onClick={handleAddDepartment}>
                                            Adicionar Departmento
                                        </Button>
                                    </div>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className={"flex flex-col"}>
                        <div className="flex flex-row">
                            <Label htmlFor="emails" className="block text-sm leading-8 font-medium text-gray-700">
                                Emails de Participantes
                            </Label>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger className={"cursor-pointer"}>
                                        <FontAwesomeIcon
                                            className="ms-2"
                                            icon={faCircleInfo}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-sm">
                                            Adicione os emails dos participantes que deseja adicionar à equipa.
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="flex flex-row">
                            <Input type="text" name="email" id="email"
                                      variant={"activity"}
                                      placeholder="Email"
                                   className="mt-1 p-2 border border-gray-300 rounded-md"
                                   value={participantEmail}
                                   onChange={(e) => {
                                       setParticipantEmail(e.target.value);
                                   }}/>
                            <Button variant={"secondary"} className={"ms-2 mt-1"} type="button"
                                    onClick={handleAddEmail}>
                                Adicionar Email
                            </Button>
                        </div>

                        <div className="flex items-center space-x-2 mt-2">
                            <Checkbox id="terms"
                                      onCheckedChange={(checked) => setShowGetEmailExcel(checked)}
                            />
                            <Label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Extrair emails de ficheiros .csv/ .xlsx.
                            </Label>
                        </div>

                        {showGetEmailExcel && (
                            <div className="mt-4">
                                <GetEmailExcel2_CP setEmails={setParticipantEmails}/>
                            </div>
                        )}

                        <div className="flex flex-row flex-wrap">
                            {participantEmails.map((emailObj, index) => (
                                <div key={index} className={"mt-2 mr-2"}>
                                    <p className="w-fit rounded-full bg-green-300 px-4 py-2 text-black text-xs">{emailObj.email}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={"flex justify-end"}>
                        <Button type="submit">
                            Adicionar Equipa e Participantes
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddParticipantAndTeam;
