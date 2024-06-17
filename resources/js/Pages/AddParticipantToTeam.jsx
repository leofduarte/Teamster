import axios from "axios";
import {toast} from "@/Components/ui/use-toast.js";
import {Input} from "@/Components/ui/input.jsx";
import {Label} from "@/Components/ui/label.jsx";
import {Button} from "@/Components/ui/button.jsx";
import GetEmailExcel2_CP from "@/Pages/Teams/GetEmailExcel2_CP.jsx";
import {useEffect, useState} from "react";
import {Checkbox} from "@/Components/ui/checkbox.jsx";

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
            const response = await axios.post(`/api/v1/teams/${teamId}/addmultipleparticipants`, participantData);

            toast({
                variant: "success",
                title: "Success!",
                description: `${participantData.email} has been added to the team.`,
            });

            fetchTeamsAndParticipants();
            setParticipantEmail('');
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
        <div className={"p-4 flex flex-col gap-4 min-h-[340px] justify-center"}>
            <form onSubmit={handleAddParticipant}>
                <div className={"flex flex-col"}>
                    <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Participant Email
                    </Label>
                    <div className="flex flex-row">
                        <Input type="email" name="email" id="email" value={emailInput}
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

                <div className="flex flex-row flex-wrap">
                    {participantEmails.map((emailObj, index) => (
                        <div key={index} className={"mt-2 mr-2"}>
                            <p className="w-fit rounded-full bg-green-300 px-4 py-2 text-black text-xs">{emailObj.email}</p>
                        </div>
                    ))}
                </div>

                <div className="flex flex-row justify-end mt-4">
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </div>
    )
};
export default AddParticipantToTeam;
