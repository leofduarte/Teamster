import { useState } from "react";
import { Button } from "@/Components/ui/button";
import {
    faXmark,
    faPenToSquare,
    faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect } from "react";
import {router} from "@inertiajs/react";

function Output({ resultadoResposta, onCloseModal, planActivityId }) {
    // Criação dos estados para cada texto editável
    const [nome, setNome] = useState(resultadoResposta[0]);
    const [descricaoAtividade, setDescricaoAtividade] = useState(
        resultadoResposta[1]
    );
    const [atividades, setAtividades] = useState(resultadoResposta[2]);
    const [horario, setHorario] = useState(resultadoResposta[3]);
    const [tarefasPlaneador, setTarefasPlaneador] = useState(
        resultadoResposta[4]
    );
    const [tarefasParticipantes, setTarefasParticipantes] = useState(
        resultadoResposta[5] || ""
    );
    const [planatividadeid, setPlanAtividadeId] = useState(planActivityId);

    useEffect(() => {
        setPlanAtividadeId(planActivityId);

        console.log("planActivityId in Output:", planatividadeid);
    }, []);

    // Estados para controlar o modo de edição
    const [isEditingDescricaoAtividade, setIsEditingDescricaoAtividade] =
        useState(false);
    const [isEditingAtividades, setIsEditingAtividades] = useState(false);
    const [isEditingHorario, setIsEditingHorario] = useState(false);
    const [isEditingTarefasPlaneador, setIsEditingTarefasPlaneador] =
        useState(false);
    const [isEditingTarefasParticipantes, setIsEditingTarefasParticipantes] =
        useState(false);

    const handleSave = async () => {
        const atividadeData =
            JSON.parse(localStorage.getItem("atividadeData")) || [];

        const novaAtividade = [
            nome,
            descricaoAtividade,
            atividades,
            horario,
            tarefasPlaneador,
            tarefasParticipantes,
        ];

        const response = await axios.post("/api/v1/saveactivity", {
          novaAtividade,
          planatividadeid,
      });
        console.log("yooo");
        console.log(response.data.data.id);

        // Verifica se a nova atividade já existe no localStorage
        const atividadeExistente = atividadeData.some(
            (atividade) => atividade[0] === nome
        );

        if (!atividadeExistente) {
            atividadeData.push(novaAtividade);
            localStorage.setItem(
                "atividadeData",
                JSON.stringify(atividadeData)
            );
            router.get("/atividade/detalhes/"+response.data.data.id);
        } else {
            alert("A atividade já existe!");
        }
    };

    console.log("horario", typeof horario, horario);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="bg-[#F8F7FC] w-[63%] h-[90%] max-h-[90vh] rounded-lg shadow-lg overflow-y-auto">
                <button onClick={onCloseModal} className="float-end m-4">
                    <FontAwesomeIcon
                        icon={faXmark}
                        className="h-5 w-5 p-2 text-gray-500 hover:text-black hover:bg-gray-200 rounded"
                    />
                </button>
                <div className="p-6">
                    <h1 className="font-bold text-3xl text-black mb-4">
                        Nova Atividade
                    </h1>

                    <div className="mb-6">
                        <h2 className="font-serif uppercase text-2xl text-black mb-5">
                            {nome}
                        </h2>
                        <div className="bg-white rounded shadow-sm p-3">
                            <div className="flex justify-between items-center">
                                <h1 className="font-serif text-lg font-semibold">
                                    Descrição
                                </h1>
                                <button
                                    onClick={() =>
                                        setIsEditingDescricaoAtividade(
                                            !isEditingDescricaoAtividade
                                        )
                                    }
                                >
                                    <FontAwesomeIcon
                                        className="text-gray-500 hover:text-black"
                                        icon={
                                            isEditingDescricaoAtividade
                                                ? faCheck
                                                : faPenToSquare
                                        }
                                    />
                                </button>
                            </div>
                            {isEditingDescricaoAtividade ? (
                                <textarea
                                    className="w-full h-full text-sm p-2 border border-gray-300 rounded"
                                    value={descricaoAtividade}
                                    onChange={(e) =>
                                        setDescricaoAtividade(e.target.value)
                                    }
                                />
                            ) : (
                                <p className="text-sm">{descricaoAtividade}</p>
                            )}
                        </div>
                        <div className="bg-white rounded shadow-sm p-3 mt-4">
                            <div className="flex justify-between items-center">
                                <h1 className="font-serif text-lg font-semibold">
                                    Atividades
                                </h1>
                                <button
                                    onClick={() =>
                                        setIsEditingAtividades(
                                            !isEditingAtividades
                                        )
                                    }
                                >
                                    <FontAwesomeIcon
                                        className="text-gray-500 hover:text-black"
                                        icon={
                                            isEditingAtividades
                                                ? faCheck
                                                : faPenToSquare
                                        }
                                    />
                                </button>
                            </div>
                            {isEditingAtividades ? (
                                <textarea
                                    className="w-full  text-sm p-2 border border-gray-300 rounded"
                                    value={atividades}
                                    onChange={(e) =>
                                        setAtividades(e.target.value)
                                    }
                                />
                            ) : (
                                <p className="text-sm">{atividades}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <div className="bg-white rounded shadow-sm p-3 w-1/2">
                            <div className="flex justify-between items-center">
                                <h1 className="font-serif text-lg font-semibold">
                                    Horário
                                </h1>
                                <button
                                    onClick={() =>
                                        setIsEditingHorario(!isEditingHorario)
                                    }
                                >
                                    <FontAwesomeIcon
                                        className="text-gray-500 hover:text-black"
                                        icon={
                                            isEditingHorario
                                                ? faCheck
                                                : faPenToSquare
                                        }
                                    />
                                </button>
                            </div>
                            {isEditingHorario ? (
                                <textarea
                                    className="w-full  text-sm p-2 border border-gray-300 rounded"
                                    value={horario}
                                    onChange={(e) => setHorario(e.target.value)}
                                />
                            ) : (
                                <p className="text-sm">{horario}</p>
                            )}
                        </div>
                        <div className="bg-white rounded shadow-sm p-3 w-1/2">
                            <div className="flex justify-between items-center">
                                <h1 className="font-serif text-lg font-semibold">
                                    Tarefas Planeador
                                </h1>
                                <button
                                    onClick={() =>
                                        setIsEditingTarefasPlaneador(
                                            !isEditingTarefasPlaneador
                                        )
                                    }
                                >
                                    <FontAwesomeIcon
                                        className="text-gray-500 hover:text-black"
                                        icon={
                                            isEditingTarefasPlaneador
                                                ? faCheck
                                                : faPenToSquare
                                        }
                                    />
                                </button>
                            </div>
                            {isEditingTarefasPlaneador ? (
                                <textarea
                                    className="w-full p-2  text-sm border border-gray-300 rounded"
                                    value={tarefasPlaneador}
                                    onChange={(e) =>
                                        setTarefasPlaneador(e.target.value)
                                    }
                                />
                            ) : (
                                <p className="text-sm">{tarefasPlaneador}</p>
                            )}
                        </div>
                    </div>

                    {tarefasParticipantes && (
                        <div className="bg-white rounded shadow-sm p-3 mt-4">
                            <div className="flex justify-between items-center">
                                <h1 className="font-serif text-lg font-semibold">
                                    Tarefas Participantes
                                </h1>
                                <button
                                    onClick={() =>
                                        setIsEditingTarefasParticipantes(
                                            !isEditingTarefasParticipantes
                                        )
                                    }
                                >
                                    <FontAwesomeIcon
                                        className="text-gray-500 hover:text-black"
                                        icon={
                                            isEditingTarefasParticipantes
                                                ? faCheck
                                                : faPenToSquare
                                        }
                                    />
                                </button>
                            </div>
                            {isEditingTarefasParticipantes ? (
                                <textarea
                                    className="w-full  text-sm p-2 border border-gray-300 rounded"
                                    value={tarefasParticipantes}
                                    onChange={(e) =>
                                        setTarefasParticipantes(e.target.value)
                                    }
                                />
                            ) : (
                                <p className="text-sm">
                                    {tarefasParticipantes}
                                </p>
                            )}
                        </div>
                    )}

                    <div className="mt-4 flex justify-end">
                        <Button onClick={handleSave}>Manter Atividade</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Output;
