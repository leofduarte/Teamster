import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
    faXmark,
    faPenToSquare,
    faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

export function AddPartners({ closeModal }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const [form, setForm] = useState({
        name: "",
        url: "",
        description: "",
        location: "", // Adicionado campo location ao estado inicial
    });

    const { name, url, description, location } = form; // Destructuring para incluir location

    const isEmpty = (value) => {
        if (typeof value === "string") {
            return value.trim() === "";
        } else if (Array.isArray(value)) {
            return value.length === 0;
        }
        return false;
    };

    const savePartner = async () => {
        console.log("A guardar parceiro...");
        if (isEmpty(name) || isEmpty(description) || isEmpty(location)) {
            alert("Preencha todos os campos");
        } else {
            try {
                console.log("Dados a serem enviados:", {
                    name,
                    url,
                    description,
                    location,
                }); 
                const response = await axios.post("/api/v1/savepartners", {
                    name,
                    url,
                    description,
                    location,
                });
                console.log("Resposta do servidor:", response);
                if (response.status === 201 || response.status === 200) {
                    alert("Parceiro guardado com sucesso!");
                    if (typeof closeModal === "function") {
                        closeModal();
                    }
                } else {
                    alert("Erro ao guardar o parceiro");
                }
            } catch (error) {
                console.error("Erro ao enviar o formulário:", error);
                alert("Erro ao guardar o parceiro");
            }
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="bg-[#F8F7FC] w-[63%] h-[90%] max-h-[90vh] rounded-lg shadow-lg overflow-y-auto">
                <button onClick={() => closeModal()} className="float-end m-4">
                    <FontAwesomeIcon
                        icon={faXmark}
                        className="h-5 w-5 p-2 text-gray-500 hover:text-black hover:bg-gray-200 rounded"
                    />
                </button>

                <div className="p-4">
                    <h2 className="font-serif text-3xl">Adicionar Parceiro</h2>
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
                        <p>Descrição</p>
                        <Input
                            name="description"
                            value={description}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Descrição do Parceiro"
                        />
                        <p>Localização</p>{" "}
                        <Input
                            name="location"
                            value={location}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Localização do Parceiro"
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
    );
}
