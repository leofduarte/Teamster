import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

function EditPartners({ partner, closeModal, refreshPartners }) {
    const [name, setName] = useState(partner.name);
    const [url, setUrl] = useState(partner.url);
    const [description, setDescription] = useState(partner.description);
    const [location, setLocation] = useState(partner.location); // Adicionando o estado da localização

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "name") {
            setName(value);
        } else if (name === "url") {
            setUrl(value);
        } else if (name === "description") {
            setDescription(value);
        } else if (name === "location") {
            // Tratando a mudança de valor da localização
            setLocation(value);
        }
    };

    const savePartner = async () => {
        const isConfirmed = window.confirm(
            "Tem certeza de que deseja salvar as alterações?"
        );
        if (isConfirmed) {
            try {
                await axios.post(`/api/v1/editpartners/${partner.id}`, {
                    name,
                    url,
                    description,
                    location, // Incluindo localização nos dados enviados
                });
                refreshPartners();
                closeModal();
            } catch (error) {
                console.error("Error saving partner:", error);
            }
        }
    };

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                <div className="bg-[#F8F7FC] w-[63%] h-[90%] max-h-[90vh] rounded-lg shadow-lg overflow-y-auto">
                    <button onClick={closeModal} className="float-end m-4">
                        <FontAwesomeIcon
                            icon={faXmark}
                            className="h-5 w-5 p-2 text-gray-500 hover:text-black hover:bg-gray-200 rounded"
                        />
                    </button>

                    <div className="p-4">
                        <h2 className="font-serif text-3xl">Editar Parceiro</h2>
                        <div className="flex flex-col gap-4">
                            <p>Nome</p>
                            <Input
                                name="name"
                                value={name}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="Nome do Parceiro"
                            />
                            <p>URL</p>
                            <Input
                                name="url"
                                value={url}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="URL do Parceiro"
                            />
                            <p>Localização</p>
                            <Input
                                name="location"
                                value={location}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="Localização do Parceiro"
                            />
                            <p>Descrição</p>
                            <Input
                                name="description"
                                value={description}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="Descrição do Parceiro"
                            />
                            <Button
                                onClick={savePartner}
                                icon={faCheck}
                                text="Salvar"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditPartners;
