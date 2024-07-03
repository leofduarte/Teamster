import {Button} from "@/Components/ui/button.jsx";
import {Input} from "@/Components/ui/input.jsx";
import {Label} from "@/Components/ui/label.jsx";
import {toast} from "@/Components/ui/use-toast.js";
import {useState} from "react";
import {router} from "@inertiajs/react";

const AddParticipantToTeam = ({auth}) => {
    const [errormessage, setErrorMessage] = useState(null);

    const handleAddQuestionnaire = (event) => {
        event.preventDefault();
        console.log('Form Submitted');
        const form = document.getElementById('questionnaireForm');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data.userId = auth.user.id;
        console.log('Form Data:', data);

        axios.post('/api/v1/addquestionnaire', data)
            .then(response => {
                console.log('API Response:', response);
                toast({
                    variant: "success",
                    title: "Success!",
                    description: "Questionnaire added successfully!",
                });
                const questionnaire_id = response.data.questionnaire_id;
                router.get('/questionnaires/'+questionnaire_id+'/edit');
            })
            .catch(error => {
                console.error(error);
                setErrorMessage(error.response.data.message);
                toast({
                    variant: "destructive",
                    title: "Error!",
                    description: `${error.response.data.message}`,
                });
            });
    }

    return (
        <div className={"p-4 min-h-full"}>
            <form id="questionnaireForm" onSubmit={(event) => handleAddQuestionnaire(event)}>
                <h2 className="text-2xl font-bold mb-4">Add Questionnaires</h2>
                <div className="flex flex-col gap-4">
                    <div>
                        <Label htmlFor="name">Title</Label>
                        <Input type="text" name="title" placeholder="Title"/>
                    </div>
                    {errormessage && (
                        <p className="text-red-500 text-sm">{errormessage}</p>
                    )}

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Input type="text" name="description" placeholder="Description"/>
                    </div>
                    <div className="flex justify-end">
                        <Button type={"submit"}>Next</Button>
                    </div>
                </div>
            </form>
        </div>
    )
};
export default AddParticipantToTeam;
