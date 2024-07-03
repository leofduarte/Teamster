import React, { useState } from "react";
import axios from 'axios';
import backgroundImage from "../../../public/background.svg";
import logo from "../../../public/build/assets/logo.svg";
import {Button} from "../Components/ui/button.jsx";
import {Input} from "../Components/ui/input.jsx";
import {Label} from "../Components/ui/label.jsx";
import { Inertia } from '@inertiajs/inertia';

function ParticipantAuth() {
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [code, setCode] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!emailSent) {
            try {
                const response = await axios.post('/api/v1/participantauth/login', { email });
                console.log(response.data);
                setEmailSent(true);
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                const response = await axios.post('participantauth/verify', { email, code });
                console.log(response.data);
                    console.log('Login successful');
                Inertia.visit('/participant');
            } catch (error) {
                console.error(error);
            }
        }
    }
    return (
        <>
            <div className="h-screen w-screen bg-[#F8F7FC]">
                <div>
                    <img className="z-50 fixed h-[10%] w-auto" src={logo} alt="Logo"/>
                </div>

                <div className="z-10 flex place-content-center justify-center bg-[#F8F7FC]">
                    <div className=" z-10 p-8 bg-white rounded-[2rem] shadow-lg min-h-[300px] min-w-96  place-content-center">
                        <h1 className="mb-6 text-2xl font-serif text-center text-gray-700 uppercase">Iniciar Sessão</h1>
                        <form onSubmit={handleSubmit}>
                            {!emailSent ? (
                                <>
                                    <Label className={"text-start"}>E-mail</Label>
                                    <Input className={"mb-2"} type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                                    <Button type="submit">
                                        Send Code
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <p>Enter the code generated from the link sent to
                                        <br/>
                                        <span className={"font-bold"}>{email}</span>
                                    </p>
                                    <Input type="number" value={code} placeholder={"Enter verification code"}
                                           onChange={e => setCode(e.target.value)}/>
                                    <Button type="submit">
                                        Login
                                    </Button>
                                </>
                            )}
                        </form>
                    </div>
                </div>


                <div
                    className=" z-0 fixed bottom-0 left-0 w-full h-[45%] bg-no-repeat bg-cover"
                    style={{backgroundImage: `url(${backgroundImage})`}}
                ></div>
            </div>
        </>
    );
}

export default ParticipantAuth;
