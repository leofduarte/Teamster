import axios from "axios";
import {useToast} from "../Components/ui/use-toast";
import {Input} from "@/Components/ui/input";
import {Label} from "@/Components/ui/label";
import {Button} from "@/Components/ui/button";
import {useState} from "react";
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

const AddParticipantAndTeam = ({auth, onClose, fetchTeamsAndParticipants}) => {
    const [error, setError] = useState(null);
    const [teamName, setTeamName] = useState('');
    const {toast} = useToast();
    const [participantEmail, setParticipantEmail] = useState('');
    const [participantEmails, setParticipantEmails] = useState([]);
    const [showGetEmailExcel, setShowGetEmailExcel] = useState(false);

    const handleAddEmail = () => {
        if (participantEmail) {
            setParticipantEmails([...participantEmails, {email: participantEmail}]);
            setParticipantEmail('');
        }
    };

    const handleAddTeamAndParticipant = async (event) => {
        event.preventDefault();

        const teamFormData = new FormData(document.getElementById('teamForm'));
        const teamData = Object.fromEntries(teamFormData.entries());
        teamData.userId = auth.user.id;

        const participantData = {emails: participantEmails.map(emailObj => emailObj.email)};

        console.log('Participant data:', participantData);

        try {
            const teamResponse = await axios.post(`/api/v1/addteam`, teamData);
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

            fetchTeamsAndParticipants();
            setParticipantEmail('');

            for (const emailObj of participantEmails) {
                try {
                    const inviteResponse = await axios.post('/api/v1/invite', { email: emailObj.email, team_id: newTeamId });
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

    return (
        <div className={"p-4 flex flex-col gap-4 min-h-[340px] justify-center"}>
            <form id="teamForm" onSubmit={handleAddTeamAndParticipant}>
                <div className={"flex flex-col"}>
                    <div className="flex flex-row">
                        <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Team Name
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
                                    <p className="text-sm">Enter the name of your Team. Example: <strong>Marketing Team</strong></p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className="flex flex-row">
                        <Input type="text" name="name" id="name"
                               onChange={(e) => {
                                   setTeamName(e.target.value);
                                   setError(null);
                               }}
                               className="mt-1 p-2 border border-gray-300 rounded-md w-96"/>
                        {error && (
                            <p className="text-red-500 text-xs italic">{error}</p>
                        )}
                    </div>
                </div>
            </form>

            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Department"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Departments</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <form id="participantForm" onSubmit={handleAddTeamAndParticipant}>
                <div className={"flex flex-col"}>
                    <div className="flex flex-row">
                        <Label htmlFor="emails" className="block text-sm font-medium text-gray-700">
                            Participant Emails
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
                                    <p className="text-sm">Enter the emails of the participants you want to add to the team.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className="flex flex-row">
                        <Input type="text" name="email" id="email"
                               value={participantEmail}
                               onChange={(e) => {
                                   setParticipantEmail(e.target.value);
                               }}/>
                        <Button variant={"secondary"} className={"ms-2"} type="button" onClick={handleAddEmail}>
                            Add Email
                        </Button>
                    </div>

                    <div className="flex items-center space-x-2 mt-4">
                        <Checkbox id="terms"
                                  onCheckedChange={(checked) => setShowGetEmailExcel(checked)}
                        />
                        <Label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Extract Emails from .csv/ .xlsx files.
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
                    <Button className={"mt-8"} type="submit">Submit</Button>
                </div>
            </form>
        </div>
    );
}

export default AddParticipantAndTeam;
