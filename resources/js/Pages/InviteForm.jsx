import React, { useState } from 'react';
import axios from 'axios';
import {Button} from "@/Components/ui/button.jsx";
import {Label} from "@/Components/ui/label.jsx";
import {Input} from "@/Components/ui/input.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";

const InviteForm = ({auth}) => {
    const [email, setEmail] = useState('');
    const [teamId, setTeamId] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/v1/invite', { email, team_id: teamId });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error sending invitation.');
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">About</h2>}
        >
            <Head title="About"/>

            <div className={"flex flex-col place-content-center justify-center items-center mt-6"}>
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-8">
                            <h2 className={"text-lg mb-2"}>Invite to Team</h2>
                            <form onSubmit={handleSubmit}>
                                <div className={"flex gap-2"}>
                                <div>
                                    <Label className={"mb-1"}>Email:</Label>
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label>Team ID:</Label>
                                    <Input
                                        type="text"
                                        value={teamId}
                                        onChange={(e) => setTeamId(e.target.value)}
                                        required
                                    />
                                </div>
                                </div>
                                    <Button className={"mt-1"} type="submit">Send Invitation</Button>
                            </form>
                            {message && <p>{message}</p>}
                        </div>
                    </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default InviteForm;
