import {Head} from "@inertiajs/react";
import axios from "axios";
import { useToast} from "../Components/ui/use-toast";
import {Input} from "@/Components/ui/input";
import {Label} from "@/Components/ui/label";
import {Button} from "@/Components/ui/button";
import {useEffect, useState} from "react";

const AddTeam = ({auth}) => {
    const [error, setError] = useState(null);
    const [teamName, setTeamName] = useState('');
    const {toast} = useToast();
    const [departments, setDepartments] = useState([]);

    const fetchDepartments = async () => {
        try {
            const response = await axios.post('/api/v1/getDepartments');
            setDepartments(response.data);
            console.log(departments);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    }

    const submitTeam = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const teamData = Object.fromEntries(formData.entries());
        teamData.userId = auth.user.id;

        console.log(teamData);

        if (!teamName) {
            setError(<p className="text-red-500 text-xs italic">Please fill out this field.</p>);
            return;
        }

        try {
            await axios.post(`/api/v1/addteam`, teamData);

            toast({
                variant: "success",
                title: "Success!",
                description: `${teamData.name} has been added to the teams.`,
            });

            setTeamName('');
            setError(null);

        } catch (error) {
            console.error('Error adding team:', error);
            toast({
                variant: "destructive",
                title: "Error!",
                description: `An error occurred while adding the team. ${error.response.data.message}`,
            });
        }
    }

    useEffect(() => {
        console.log(departments.map(department => department.id));
    }, [departments]);


    return (
        <div className={"m-8"}>
            <Head title="Add Teams"/>
            <form onSubmit={submitTeam}>
                <div className={"flex flex-col"}>
                    <Label htmlFor="name" className="block text-sm font-medium text-gray-700">Team
                        Name</Label>
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
                <div className={"mt-4"}>
                    <Button type="submit">
                        Add Team
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default AddTeam;
