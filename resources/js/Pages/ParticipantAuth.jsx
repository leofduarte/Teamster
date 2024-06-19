import React, { useState } from "react";
import axios from 'axios';
import backgroundImage from "../../../public/background.svg";
import logo from "../../../public/build/assets/logo.svg";
import {Button} from "../Components/ui/button.jsx";
import {Input} from "../Components/ui/input.jsx";
import {Label} from "../Components/ui/label.jsx";

function ParticipantAuth() {
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [code, setCode] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // This line prevents the form from submitting normally, which would cause a page reload
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
                const response = await axios.post('/api/v1/participantauth/verify', { email, code });
                console.log(response.data);
                if (response.data.message === 'Login successful') {
                    console.log('Login successful');
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
    return (
        <>
            <div className="h-screen w-screen bg-[#F8F7FC]">
                <div>
                    <img className="z-0 fixed h-[10%] w-auto" src={logo} alt="Logo"/>
                </div>

                <div className="z-10 fixed inset-0 flex justify-center">
                    <div className="text-center w-[27%] px-6 bg-white rounded-[2rem] place-content-center">
                        <h1 className="text-2xl font-serif uppercase">Iniciar Sessão</h1>
                        <form onSubmit={handleSubmit}>
                            {!emailSent ? (
                                <>
                                    <Label className={"text-start"}>E-mail</Label>
                                    <Input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                                    <Button type="submit">
                                        Send Code
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <p>Enter the code generated from the link sent to <br/> <span
                                        className={"font-bold"}>{email}</span></p>
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
