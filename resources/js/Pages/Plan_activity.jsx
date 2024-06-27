import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faWandMagicSparkles,
    faCalendar,
    faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { format, set } from "date-fns";
import { cn } from "@/lib/utils";
import { Layout } from "./Layout";
import Output from "./Output";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { Calendar } from "@/Components/ui/calendar";
import { Input } from "@/Components/ui/input";
import { Slider } from "@/Components/ui/slider";
import { Textarea } from "@/Components/ui/textarea";
import { Inertia } from "@inertiajs/inertia";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";

function PlanActivity(activityId) {
    const [activities, setActivities] = useState([]);

    //? Lógica para mdndar dados para a right bar do Layout
    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        try {
            const response = await axios.get("/api/v1/activities");
            setActivities(response.data);
            console.log("Activities Para o Sidebar", response.data);
        } catch (error) {
            console.error("Error fetching activities:", error);
        }
    };

    const handleNavigate = (atividade) => {
        const queryString = new URLSearchParams(atividade).toString();
        Inertia.visit(`/activity?${queryString}`);
    };

    const sidebar = (
        <div className="w-full flex flex-col">
            <div className="text-center flex flex-col items-center">
                <h2 className="text-3xl font-serif mb-3">+ Atividades</h2>
                {activities.length > 0 ? (
                    activities.map((atividade, index) => (
                        <div
                            key={index}
                            className="mb-2 pb-2 border-b-2 border-gray-300 hover:border-black w-[80%]"
                        >
                            <button
                                onClick={() => handleNavigate(atividade)}
                                className="hover:border-black"
                            >
                                <p>
                                    {atividade.name}{" "}
                                    <FontAwesomeIcon
                                        icon={faAngleRight}
                                        className="ml-6"
                                    />
                                </p>
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">
                        Nenhuma atividade encontrada
                    </p>
                )}
            </div>
        </div>
    );

    //? Lógica para quando uma atividade é selecionada posteriormente os valores estarem preenchidos
    const [planActivities, setPlanActivities] = useState([]);

    useEffect(() => {
        const fetchPlanActivities = async () => {
            try {
                const response = await axios.get("/api/v1/getPlanActivities");
                setPlanActivities(response.data);

                const activity = response.data.find(
                    (activity) =>
                        activity.id === parseInt(activityId.activityId)
                );
                if (activity) {
                    console.log("Activity found:", activity);
                    setForm((prevForm) => ({
                        ...prevForm,
                        nome: activity.name || "",
                        objetivo: activity.objective || "",
                        objetivos: [activity.objectives] || [],
                        localizacao: activity.location || "",
                        numParticipantes: activity.participants || "",
                        orcamento: activity.price || "",
                        observacoes: activity.observations || "",
                        duracao: activity.duration || "",
                    }));
                } else {
                    console.log(
                        "No activity found with id:",
                        activityId.activityId
                    );
                }
            } catch (error) {
                console.error("Error fetching activities:", error);
            }
        };

        fetchPlanActivities();
    }, [activityId.activityId]);

    const [form, setForm] = useState({
        nome: "",
        objetivo: "",
        objetivos: [],
        localizacao: "",
        orcamento: [0], // Initialize as an array with a default value
        numParticipantes: "",
        dia: "",
        observacoes: "",
        duracao: "",
    });

    //? Set states
    const [modalIsOpen, setModalIsOpen] = useState(false); //Para abrir a modal
    const [resultadoResposta, setResultadoResposta] = useState([]); //Para dar a resposta
    const [equipas, setEquipas] = useState([]); //Para ir buscar as equipas
    const [selectedEquipaId, setSelectedEquipaId] = useState(null); //Para ir buscar o id da equipa
    const [planActivityId, setPlanActivityId] = useState(""); //Para ir buscar o id da atividade

    //? Desconstroi as propriedades do objeto 'form' em variáveis individuais
    const {
        nome,
        objetivo,
        objetivos,
        localizacao,
        orcamento,
        numParticipantes,
        dia,
        observacoes,
        duracao,
    } = form;

    //? Função para lidar com os inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    //? Função para lidar com a mudança de equipa
    const [participants, setParticipants] = useState([]);
    const [teamsandparticipants, setTeamsandparticipants] = useState([]); //Para ir buscar os participantes
    const [restricoes, setRestricoes] = useState([]); //Para ir buscar as restrições
    const [passions, setPassions] = useState([]); //Para ir buscar os likes
    const [hobbies, setHobbies] = useState([]); //Para ir buscar os hobbiesP

    const handleEquipaChange = useCallback(async (value) => {
        setForm((prevForm) => ({
            ...prevForm,
            numParticipantes: value.participantsLength,
        }));

        setSelectedEquipaId(value.id);
        console.log("Equipa selecionada:", value.id);

        try {
            const response = await axios.post(
                "/api/v1/getParticipantsFromTeams"
            );
            setTeamsandparticipants(response.data);
            console.log("Teams and participants:", response.data);

            // Find the selected team
            const selectedTeam = response.data.find(
                (team) => team.id === value.id
            );

            if (selectedTeam && selectedTeam.participants) {
                // Extract and log hobbies for each participant
                selectedTeam.participants.forEach((participant) => {
                    if (participant.hobbies) {
                        const hobbies = JSON.parse(participant.hobbies);
                    }
                });

                // If you want to store all hobbies in state
                const allHobbies = selectedTeam.participants
                    .map((participant) => {
                        if (participant.hobbies) {
                            return JSON.parse(participant.hobbies);
                        }
                        return [];
                    })
                    .flat();

                setHobbies(allHobbies);
                console.log("Hobbies:", allHobbies);

                const allPassions = selectedTeam.participants
                    .map((participant) => {
                        if (
                            participant.passions &&
                            participant.passions !== "null" &&
                            participant.passions !== ""
                        ) {
                            try {
                                return JSON.parse(participant.passions);
                            } catch (error) {
                                console.error(
                                    "Error parsing likes for participant:",
                                    participant.id,
                                    error
                                );
                                return [];
                            }
                        }
                        return [];
                    })
                    .flat();
                setPassions(allPassions);
                console.log("Likes:", allPassions);

                const allRestricoes = selectedTeam.participants
                    .map((participant) => {
                        if (participant.restrictions) {
                            return JSON.parse(participant.restrictions);
                        }
                        return [];
                    })
                    .flat();
                setRestricoes(allRestricoes);
                console.log("Restrições:", allRestricoes);
            }
        } catch (error) {
            console.error("Error fetching participants and their data:", error);
        }
    }, []);

    //? Função para lidar com a mudança do orçamento
    const handleOrcamentoChange = useCallback((newValue) => {
        setForm((prevForm) => ({
            ...prevForm,
            orcamento: [newValue[0]],
        }));
    }, []);

    //? Função para adicionar objetivos
    const handleObjetivosAdd = () => {
        if (isEmpty(objetivo)) {
            alert("Objetivo não pode estar vazio");
        } else {
            setForm((prevForm) => ({
                ...prevForm,
                objetivos: [...prevForm.objetivos, objetivo],
                objetivo: "",
            }));
        }
    };

    //? Função para adicionar objetivos mas com a tecla Enter
    const handleObjetivosKeyPress = (e) => {
        if (e.key === "Enter") {
            handleObjetivosAdd();
        }
    };

    //? Função para remover objetivos
    const handleObjetivosRemove = (e) => {
        const novoObjetivo = e.currentTarget.value;
        setForm((prevForm) => ({
            ...prevForm,
            objetivos: Array.isArray(prevForm.objetivos)
                ? prevForm.objetivos.filter((obj) => obj !== novoObjetivo)
                : [],
        }));
    };

    //? Função para verificar se um valor é vazio
    const isEmpty = (value) => {
        if (typeof value === "string") {
            return value.trim() === "";
        } else if (Array.isArray(value)) {
            return value.length === 0;
        }
        return false;
    };

    //? Função para ir buscar as equipas para serem listadas no select
    useEffect(() => {
        axios.post("/api/v1/equipas").then((response) => {
            setEquipas(
                response.data.map((team) => ({
                    name: team.name,
                    id: team.id,
                    participants: team.participants,
                }))
            );
        });
    }, []);

    //? Função para ir buscar os partners
    const [partners, setPartners] = useState([]);
    const [partnersLocation, setPartnersLocation] = useState([]); //Para ir buscar as localizações dos parceiros
    const [partnersName, setPartnersName] = useState([]); //Para ir buscar os nomes dos parceiros
    const [partnersDescription, setPartnersDescription] = useState([]); //Para ir buscar as descrições dos parceiros
    const [partnersUrl, setPartnersUrl] = useState([]); //Para ir buscar os urls dos parceiros

    const fetchPartners = async (localizacao) => {
        try {
            const response = await axios.get("/api/v1/getpartners");
            const data = response.data.data;
            if (Array.isArray(data)) {
                const filteredPartners = data.filter(
                    (partner) => partner.location === localizacao
                );

                setPartners(filteredPartners);

                const locations = filteredPartners.map(
                    (partner) => partner.location
                );
                const names = filteredPartners.map((partner) => partner.name);
                const descriptions = filteredPartners.map(
                    (partner) => partner.description
                );
                const urls = filteredPartners.map((partner) => partner.url);

                setPartnersLocation(locations);
                setPartnersName(names);
                setPartnersDescription(descriptions);
                setPartnersUrl(urls);

                console.log("Parceiros filtrados", filteredPartners);
                console.log("Localização dos Parceiros", locations);
                console.log("Nome dos Parceiros", names);
                console.log("Descrição dos Parceiros", descriptions);
                console.log("Url dos Parceiros", urls);
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
    //? Função para enviar o formulário
    const sendForm = async () => {
        console.log("Clicou em Gerar atividade");
        if (
            isEmpty(nome) ||
            isEmpty(localizacao) ||
            isEmpty(numParticipantes) ||
            isEmpty(dia) ||
            isEmpty(duracao) ||
            objetivos.length === 0
        ) {
            alert("Preencha todos os campos");
            return;
        }

        try {
            // Primeiro, busca os partners
            await fetchPartners(localizacao);

            console.log("Enviando o formulário...");
            const requestOne = axios.post("/api/v1/atividade-inicial", {
                ...form,
                orcamento: [form.orcamento[0]],
                passions,
                hobbies,
                restricoes,
                partnersLocation,
                partnersName,
                partnersDescription,
                partnersUrl,
            });
            const requestTwo = axios.post("/api/v1/save-plan-activities", {
                ...form,
                orcamento: [form.orcamento[0]],
                team_id: selectedEquipaId,
                participants,
            });

            const [responseOne, responseTwo] = await Promise.all([
                requestOne,
                requestTwo,
            ]);

            const {
                nome,
                descricao,
                atividades,
                horario,
                tarefas_planeamento,
                tarefas_participante,
            } = responseOne.data;

            setPlanActivityId(responseTwo.data.data.id);

            console.log("ID from responseTwo:", planActivityId);

            setResultadoResposta([
                nome,
                descricao,
                atividades,
                horario,
                tarefas_planeamento,
                tarefas_participante,
            ]);

            setModalIsOpen(true);

            if (responseTwo.status === 200) {
                console.log("Formulário salvo com sucesso.");
            } else {
                console.error("Erro ao salvar formulário.");
            }
        } catch (error) {
            console.error("Erro ao enviar formulário:", error);
        }
    };

    //? Função para verificar se o modal está aberto
    useEffect(() => {
        console.log("modalIsOpen mudou para:", modalIsOpen);
    }, [modalIsOpen]);

    //? Função para verificar se o resultado da resposta mudou (se a ai já respondeu)
    useEffect(() => {
        console.log("Resultado resposta mudou para:", resultadoResposta);
    }, [resultadoResposta]);

    //? Função para verificar se o form mudou
    useEffect(() => {
        console.log("form:", form);
    }, [form]);

    //? Finalmente, o return
    return (
        <>
            <Layout sidebar={sidebar}>
                <div>
                    <div className="flex h-[10%] mb-5">
                        <h1 className="font-bold text-3xl">
                            Planear Atividade
                        </h1>
                    </div>

                    <div className="h-[30%] flex flex-col w-full">
                        <h2 className="font-serif uppercase text-2xl h-[23%] mb-3">
                            Nova atividade
                        </h2>

                        <div className="flex flex-wrap justify-start mb-3">
                            <div className="w-[40%] mr-4">
                                <p className="text-left text-xs mb-2">
                                    Nome da Atividade
                                </p>
                                <Input
                                    placeholder="Ex. Atividade 27/08"
                                    variant={"activity"}
                                    name="nome"
                                    value={nome}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="w-[40%] mr-4">
                                <p className="text-left text-xs mb-2">
                                    Duração da atividade
                                </p>
                                <Input
                                    placeholder="Ex. 8 horas"
                                    variant={"activity"}
                                    name="duracao"
                                    value={duracao}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="w-[25%] mr-4">
                                <p className="text-left text-xs mb-2">Data</p>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"activity"}
                                            className={cn(
                                                "mb-2 py-2 px-1 border rounded border-gray-400 text-large shadow w-full h-10",
                                                !dia && "text-muted-foreground"
                                            )}
                                        >
                                            <FontAwesomeIcon
                                                icon={faCalendar}
                                                className="mr-2 h-4 w-4"
                                            />
                                            {dia ? (
                                                format(new Date(dia), "PPP")
                                            ) : (
                                                <span>Escolhe uma data</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={
                                                dia ? new Date(dia) : undefined
                                            }
                                            onSelect={(date) =>
                                                setForm((prevForm) => ({
                                                    ...prevForm,
                                                    dia: date.toISOString(),
                                                }))
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div className="w-[25%]">
                                <p className="text-left text-xs mb-2">
                                    Localização
                                </p>
                                <Input
                                    placeholder="Ex. Aveiro"
                                    name="localizacao"
                                    value={localizacao}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-start">
                            <div className="w-[40%] mr-4">
                                <p className="text-left text-xs mb-2">Equipa</p>
                                <Select
                                    onValueChange={(value) =>
                                        handleEquipaChange(JSON.parse(value))
                                    }
                                    onChange={(value) =>
                                        handleEquipaChange(JSON.parse(value))
                                    }
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Selecionar Equipa" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {equipas.map((equipa) => (
                                            <SelectItem
                                                key={equipa.id}
                                                value={JSON.stringify({
                                                    id: equipa.id,
                                                    participantsLength:
                                                    equipa.participants
                                                        .length,
                                                })}
                                            >
                                                {equipa.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="relative">
                                <p className="font-medium text-sm text-slate-700 dark:text-slate-400 mb-3">
                                    Orçamento
                                </p>
                                <Slider
                                    value={[orcamento]} // Pass orcamento as an array
                                    onValueChange={handleOrcamentoChange}
                                    max={1000}
                                    step={10}
                                />
                                <p className="text-center mt-2">
                                    {orcamento.toLocaleString("pt-PT", {
                                        style: "currency",
                                        currency: "EUR",
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col mb-5">
                        <div className="h-1/2">
                            <h2 className="font-serif text-2xl pt-10 pb-2">
                                Objetivos
                            </h2>
                        </div>
                        <div>
                            <p className="text-left text-xs mb-2">
                                Adicione os objetivos
                            </p>
                            <div className="flex">
                                <Input
                                    className="w-[40%] me-5"
                                    placeholder="Ex. Melhorar a comunicação"
                                    value={objetivo}
                                    onChange={handleInputChange}
                                    name="objetivo"
                                    onKeyPress={handleObjetivosKeyPress}
                                />
                                <Button
                                    className="h-10"
                                    variant="activity"
                                    onClick={handleObjetivosAdd}
                                    disabled={isEmpty(objetivo)}
                                >
                                    Adicionar
                                </Button>
                            </div>
                            <div className="flex flex-col pt-2 justify-start">
                                <div className="flex">
                                    {objetivos.map((obj, index) => (
                                        <Button
                                            key={index}
                                            className="min-w-28"
                                            variant={"activity"}
                                            value={obj}
                                            onMouseEnter={(e) =>
                                                (e.currentTarget.textContent =
                                                    "Remover")
                                            }
                                            onMouseLeave={(e) =>
                                                (e.currentTarget.textContent =
                                                    obj)
                                            }
                                            onClick={handleObjetivosRemove}
                                        >
                                            {obj}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="font-serif text-2xl pb-2">
                            Observações
                        </h2>
                        <div>
                            <p className="text-left text-xs mb-2">
                                Escreva aqui as observações que acha importantes
                            </p>
                            <Textarea
                                placeholder="Ex. Deslocação não incluída"
                                value={observacoes}
                                onChange={handleInputChange}
                                name="observacoes"
                            />
                        </div>
                    </div>

                    <Button onClick={sendForm}>
                        Gerar atividade{" "}
                        <FontAwesomeIcon
                            className="ms-2"
                            icon={faWandMagicSparkles}
                        />{" "}
                    </Button>
                </div>
            </Layout>

            {modalIsOpen && (
                <Output
                    resultadoResposta={resultadoResposta}
                    onCloseModal={() => setModalIsOpen(false)}
                    planActivityId={planActivityId}
                />
            )}
        </>
    );
}

export default PlanActivity;
