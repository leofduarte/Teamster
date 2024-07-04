import React, { useState } from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import ConfirmationPopup from "./ConfirmationPopup";
import { Separator } from "@/Components/ui/separator";

function EditProfile({ participant, setIsEditingProfile, isEditingProfile }) {
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [profile, setProfile] = useState(participant);
    const [isSaved, setIsSaved] = useState(false);

    // Função para renderizar o pop-up
    const handleDeleteClick = () => {
        setShowConfirmPopup(true);
    };

    // Função para cancelar a ação
    const handleCancelClick = () => {
        setShowConfirmPopup(false);
    };

    // Função para confirmar a ação
    const handleConfirmClick = () => {
        setShowConfirmPopup(false);
        console.log("Conta eliminada");
        // Lógica adicional para eliminar a conta
    };

    // Função para salvar alterações
    const handleSaveChanges = () => {
        console.log("Alterações guardadas:", profile);
        setIsSaved(true);
        setTimeout(() => {
            setIsSaved(false);
        }, 3000);
    };

    // Função para descartar alterações
    const handleDiscardChanges = () => {
        setIsEditingProfile(false);
        console.log("Alterações descartadas.");
    };

    return (
        <>
            <div className="p-8 bg-white drop-shadow-md rounded-lg flex flex-col items-center">
                <div className="relative">
                    <img
                        className="rounded-full h-20"
                        src={`https://api.dicebear.com/8.x/big-smile/svg?seed=${profile.participant.email}`}
                    />
                </div>

                <div className="w-full mb-4">
                    <p className="text-left text-xs mb-2">Nome</p>
                    <Input
                        type="text"
                        placeholder={profile.participant.name}
                        className="w-full"
                        value={profile.name}
                        onChange={(e) =>
                            setProfile({ ...profile, name: e.target.value })
                        }
                    />
                </div>

                <div className="w-full mb-4">
                    <p className="text-left text-xs mb-2">E-mail</p>
                    <Input
                        type="email"
                        disabled
                        placeholder="Finanças"
                        className="w-full"
                        value={profile.participant.email}
                    />
                </div>

                <div className="w-full mb-4">
                    <p className="text-left text-xs mb-2">Telemóvel</p>
                    <Input
                        type="tel"
                        placeholder={profile.participant.phone}
                        className="w-full"
                        value={profile.position}
                        onChange={(e) =>
                            setProfile({ ...profile, position: e.target.value })
                        }
                    />
                </div>

                <div className="flex justify-center w-full mb-10">
                    <Button
                        variant="outline"
                        className="mr-4"
                        onClick={handleDiscardChanges}
                    >
                        Voltar
                    </Button>
                    <Button onClick={handleSaveChanges}>
                        Guardar Alterações
                    </Button>
                </div>

                {isSaved && (
                    <div className="text-[#56C496] text-sm mb-4">
                        Alterações guardadas com sucesso!
                    </div>
                )}

                {/*<Separator orientation={"horizontal"} />*/}
                {/*<a*/}
                {/*    className="text-sm text-[#F54468] hover:text-red-400 underline text-center mt-2 flex items-center"*/}
                {/*    href="#"*/}
                {/*    onClick={handleDeleteClick}*/}
                {/*>*/}
                {/*    Eliminar conta*/}
                {/*</a>*/}
            </div>

            {showConfirmPopup && (
                <ConfirmationPopup
                    logo="sad"
                    message="Tem a certeza que deseja eliminar a sua conta?"
                    buttons={true}
                    onConfirm={handleConfirmClick}
                    onCancel={handleCancelClick}
                />
            )}
        </>
    );
}

export default EditProfile;
