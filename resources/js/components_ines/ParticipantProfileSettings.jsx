import React, { useState, useEffect } from "react";
import ConfirmationPopup from "../components_ines/ConfirmationPopup.jsx";

function ParticipantProfileSettings({
                                        isEditingProfile,
                                        setIsEditingProfile,
                                        participant,
                                    }) {
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [userName, setUserName] = useState("");
    const [getUrl, setGetUrl] = useState(false);

    const [participantData, setParticipantData] = useState(participant);

    useEffect(() => {
        if (participant) {
            setParticipantData(participant);
        }
    }, [participant]);

    const handleLogoutClick = () => {
        setShowConfirmPopup(true);
    };

    const handleCancelClick = () => {
        setShowConfirmPopup(false);
    };

    const handleConfirmClick = () => {
        setShowConfirmPopup(false);
        setUserName("");
    };

    return (
        <>
            {participantData && (
                <div className="bg-white shadow-md rounded-lg p-5 flex items-center joyride-profile">
                    <img
                        src={`https://api.dicebear.com/8.x/big-smile/svg?seed=${participantData.participant.email}`}
                        alt="User"
                        className="rounded-full object-cover w-12 h-12 mr-4"
                    />

                    <div>
                        <p className="text-lg font-medium">
                            {participantData.participant.name}
                        </p>
                        <div className="mt-1 text-sm gap-4 flex">
                            {!getUrl && (
                                <a
                                    onClick={() => {
                                        setIsEditingProfile(true);
                                    }}
                                    className="underline hover:text-slate-600"
                                >
                                    Editar perfil
                                </a>
                            )}
                            <a
                                href="#"
                                onClick={handleLogoutClick}
                                className="underline text-[#F54468] hover:text-red-400"
                            >
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {showConfirmPopup && (
                <ConfirmationPopup
                    logo="happy"
                    message="Deseja terminar sessão?"
                    buttons={true}
                    onConfirm={handleConfirmClick}
                    onCancel={handleCancelClick}
                />
            )}
        </>
    );
}

export default ParticipantProfileSettings;
