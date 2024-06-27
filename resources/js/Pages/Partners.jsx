import { Layout } from "./Layout.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import { AddPartners } from "./AddPartners.jsx";
import EditPartners from "./EditPartners.jsx";
import { Avatar } from "@/Components/ui/avatar";
import { AvatarImage } from "@/Components/ui/avatar";
import { AvatarFallback } from "@/Components/ui/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function Partners() {
    const [partners, setPartners] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [partnerToEdit, setPartnerToEdit] = useState(null);

    const fetchPartners = async () => {
        try {
            const response = await axios.get("/api/v1/getpartners");
            const data = response.data.data;
            if (Array.isArray(data)) {
                setPartners(data);
            } else {
                console.error(
                    "Expected an array for partners, but received:",
                    data
                );
                setPartners([]);
            }
        } catch (error) {
            console.error("Error fetching partners:", error);
            setPartners([]);
        }
    };

    useEffect(() => {
        fetchPartners();
    }, []);

    const deletePartner = async (id) => {
        if (window.confirm("Tem certeza de que deseja apagar esta parceria?")) {
            try {
                await axios.delete(`/api/v1/deletepartners/${id}`);
                setPartners(partners.filter((partner) => partner.id !== id));
            } catch (error) {
                console.error("Error deleting partner:", error);
            }
        }
    };

    const editPartner = (partner) => {
        setPartnerToEdit(partner);
        setIsEditing(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setPartnerToEdit(null);
    };

    return (
        <>
            <Layout>
                <h1 className="font-bold text-3xl">Área de Administração</h1>
                <h2 className="font-serif text-3xl">Parcerias</h2>
                <button
                    className="hover:text-purple-400"
                    onClick={() => setIsModalOpen(true)}
                >
                    Adicionar atividade
                </button>
                {isModalOpen && (
                    <AddPartners
                        closeModal={closeModal}
                        refreshPartners={fetchPartners}
                    />
                )}
                {isEditing && partnerToEdit && (
                    <EditPartners
                        partner={partnerToEdit}
                        closeModal={closeModal}
                        refreshPartners={fetchPartners}
                    />
                )}
                {Array.isArray(partners) &&
                    partners.map((partner) => (
                        <div
                            key={partner.id}
                            className="drop-shadow bg-white rounded-md p-3 mb-4 flex flex-col content-fit align-middle"
                        >
                            <div className="flex justify-end space-x-2 mb-4">
                                <button
                                    className="hover:text-purple-400"
                                    onClick={() => deletePartner(partner.id)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>

                                <button
                                    className="hover:text-purple-400"
                                    onClick={() => editPartner(partner)}
                                >
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                            </div>

                            <div className="flex">
                                <Avatar className="flex-shrink-0">
                                    <AvatarImage
                                        src={`https://api.dicebear.com/9.x/initials/svg?seed=${partner.name}`}
                                        className="w-20"
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col justify-between ml-4">
                                    <p className="font-serif text-2xl font-medium">
                                        {partner.name}
                                    </p>
                                    <p>Localização: {partner.location}</p>
                                    <p>
                                        Site:{" "}
                                        <a href={partner.url}>{partner.url}</a>
                                    </p>
                                    <p>{partner.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
            </Layout>
        </>
    );
}

export default Partners;
