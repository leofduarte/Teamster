import axios from "axios";
import {toast} from "@/Components/ui/use-toast.js";
import {Input} from "@/Components/ui/input.jsx";
import {Label} from "@/Components/ui/label.jsx";
import {Button} from "@/Components/ui/button.jsx";
import GetEmailExcel2_CP from "@/Pages/Teams/GetEmailExcel2_CP.jsx";
import {useEffect, useState} from "react";
import {Checkbox} from "@/Components/ui/checkbox.jsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/Components/ui/tooltip.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import {router} from "@inertiajs/react";

const AddParticipantToTeam = ({teamId, fetchTeamsAndParticipants, setParticipantEmail, onClose}) => {
    const [participantEmails, setParticipantEmails] = useState([]);
    const [emailInput, setEmailInput] = useState('');
    const [showGetEmailExcel, setShowGetEmailExcel] = useState(false);

    const handleAddEmail = () => {
        if (emailInput) {
            setParticipantEmails([...participantEmails, {email: emailInput}]);
            setEmailInput('');
        }
    };

    const handleAddParticipant = async (event) => {
        event.preventDefault();
        console.log('handleAddParticipant triggered');

        const participantData = {
            emails: participantEmails.map(emailObj => emailObj.email),
        };

        try {
            let teamResponse = [];
           await axios.post(`/api/v1/teams/${teamId}/addmultipleparticipants`, participantData)
                .then(response => {
                    console.log(response.data);
                    teamResponse = response.data;
                });
            console.log(teamResponse);


            toast({
                variant: "success",
                title: "Success!",
                description: `${participantData.email} has been added to the team.`,
            });

            // Send email invitations
            participantEmails.forEach(emailObj => {
                axios.post('/api/v1/invite', { email: emailObj.email, team_id: teamId })
                    .then(response => {
                        console.log(response.data);

                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            });

            //router.get('/teams');
            // fetchTeamsAndParticipants();
            // setParticipantEmail('');
        } catch (error) {
            console.error('Error adding participant:', error);
            toast({
                variant: "destructive",
                title: "Error!",
                description: `An error occurred while adding the participant. ${error.response.data.message}`,
            });
        } finally {
            setParticipantEmails([]);
            onClose();
        }
    };

    useEffect(() => {
        console.log("teamId", teamId);
    }, [teamId]);

    return (
        <div className={"p-4 min-h-full"}>
            <form id="participantForm" onSubmit={handleAddParticipant}>
                <h2 className="text-2xl font-bold mb-4">Add Participant to Team</h2>
                <div className={"gap-4 flex flex-col"}>
                    <div className={"flex flex-col"}>
                        <div className="flex flex-row">
                            <Label htmlFor="name" className="block text-sm leading-8 font-medium text-gray-700">
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
                                        <p className="text-sm">
                                            Enter the emails of the participants you want to add to the team.
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <div className="flex flex-row">
                            <Input type="email" name="email" id="email" value={emailInput}
                                   variant={"activity"} placeholder="Email"
                                   onChange={(e) => setEmailInput(e.target.value)}/>
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
                    </div>


                    {participantEmails.length > 0 && (
                        <div className="flex flex-row flex-wrap">
                            {participantEmails.map((emailObj, index) => (
                                <div key={index} className={"mt-2 mr-2"}>
                                    <p className="w-fit rounded-full bg-green-300 px-4 py-2 text-black text-xs">{emailObj.email}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex flex-row justify-end">
                        <Button type="submit">Submit</Button>
                    </div>
                </div>
            </form>
        </div>
    )
};
export default AddParticipantToTeam;
