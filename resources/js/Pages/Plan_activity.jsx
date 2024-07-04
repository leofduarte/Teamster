import React, {useState, useEffect, useCallback} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faWandMagicSparkles,
    faCalendar,
    faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import {format, set} from "date-fns";
import {cn} from "@/lib/utils";
import {Layout} from "./Layout";
import Output from "./Output";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import {Calendar} from "@/Components/ui/calendar";
import {Input} from "@/Components/ui/input";
import {Slider} from "@/Components/ui/slider";
import {Textarea} from "@/Components/ui/textarea";
import {Inertia} from "@inertiajs/inertia";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {Button} from "@/Components/ui/button";
import Profile from "@/components_ines/Profile.jsx";

function PlanActivity(props) {
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState("");

    console.log("Props:", props);
    console.log(props.planActivity);

    //? Lógica para mandar dados para a rightBar do Layout
    useEffect(() => {
    const fetchActivities = async () => {
        try {
            const response = await axios.get("/api/v1/activities");
            setActivities(response.data);
            console.log("Activities Para o Sidebar", response.data);
        } catch (error) {
            console.error("Error fetching activities:", error);
        }
    };
    fetchActivities();
}, []);


    const handleNavigate = async (atividade) => {
        try {
            const response = await axios.post(`/api/v1/atividade/detalhes/${atividade.id}`);
            setSelectedActivity(response.data);
            console.log("Selected activity:", response.data);

            Inertia.visit(`/atividade/detalhes/${atividade.id}`);
        } catch (error) {
            console.error("Error fetching selected activity:", error);
        }
    };

    const sidebar = (
        <div className="w-full flex flex-col">
            <div className="joyride-profile">
                <Profile id={props.auth}/>
            </div>
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


    //? Lógica para quando uma atividade é selecionada posteriormente e os preencher os valores
    const [selectedPlanActivity, setSelectedPlanActivity] = useState(props.planActivity);


    useEffect(() => {
        if (props.planActivity) {
            console.log("data",props)

            setForm({
                nome: props.planActivity.name || "",
                objetivos:  JSON.parse(props.planActivity.objectives) || [],
                objetivo: "" || [],
                localizacao: props.planActivity.location || "",
                dia: props.planActivity.date || "",
                numParticipantes: props.planActivity.participants || "",
                orcamento: props.planActivity.price || "",
                observacoes: props.planActivity.observations || "",
                duracao: props.planActivity.duration || "",
            });
        }

    }, [props.planActivity]);
    console.log("Selected Plan Activity:", selectedPlanActivity);



    //? Lógica para o formulário q vai ser enviado
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
        const {name, value} = e.target;
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
            console.log("Equipas", equipas);
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
            setLoadingMessage("A sua atividade está a ser gerada...");
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
            setLoadingMessage("");
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

            setLoadingMessage("");

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
                JSON.stringify(horario),
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
            setLoadingMessage("");
        }
    };

    const handleAddParticipants = () => {
        const newTeam = {
            id: null,
            name: `${numParticipantes} participants`,
            participantsLength: Number(numParticipantes),
        };

        setEquipas(prevEquipas => [...prevEquipas, newTeam]);
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
            <Layout sidebar={sidebar} >
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 pt-12">
                    <div className="overflow-hidden">
                        <div className="p-6 text-gray-900">
                            <h1 className={"text-3xl font-bold text-black"}>
                                Planear Atividade
                            </h1>

                            <div className={"my-6 flex flex-col gap-4"}>
                                <h2 className="font-serif uppercase text-2xl mb-3">
                                    Nova atividade
                                </h2>

                                <div className={"flex flex-col gap-4"}>
                                    <div className="flex mb-3 gap-4">
                                        <div className="w-full">
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

                                        <div className="w-full">
                                            <p className="text-left text-xs mb-2">
                                                Duração da atividade
                                            </p>
                                            <Input
                                                variant={"activity"}
                                                placeholder="Ex. 6 horas"
                                                name="duracao"
                                                value={duracao}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>


                                    <div className={"flex mb-3 gap-4"}>
                                        <div className="w-full">
                                            <p className="text-left text-xs mb-2">Data</p>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"activity"}
                                                        className={cn(
                                                            "mb-2 py-2 px-1 border rounded text-large w-full h-10",
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

                                        <div className="w-full">
                                            <p className="text-left text-xs mb-2">
                                                Localização
                                            </p>
                                            <Input
                                                placeholder="Ex. Aveiro"
                                                variant={"activity"}
                                                name="localizacao"
                                                value={localizacao}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex mb-3 gap-4">
                                        <div className="w-full">
                                            <p className="text-left text-xs mb-2">Equipa</p>
                                            <Select className="w-2/5"
                                                    onValueChange={(value) =>
                                                        handleEquipaChange(JSON.parse(value))
                                                    }
                                                    onChange={(value) =>
                                                        handleEquipaChange(JSON.parse(value))
                                                    }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder={"Seleciona uma equipa"}/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {equipas.map((equipa) => (
                                                        <SelectItem
                                                            key={equipa.id}
                                                            value={JSON.stringify({
                                                                id: equipa.id,
                                                                participantsLength: equipa.participants ? equipa.participants.length : 0
                                                            })}
                                                        >
                                                            {equipa.name}
                                                        </SelectItem>
                                                    ))}

                                                    <div className="flex flex-row">
                                                        <Input
                                                            type="number"
                                                            placeholder="Indica o número de participantes"
                                                            variant={"activity"}
                                                            name="numParticipantes"
                                                            value={numParticipantes}
                                                            onChange={(e) => setForm({
                                                                ...form,
                                                                numParticipantes: e.target.value
                                                            })}
                                                        />
                                                        <Button variant={"activity"} onClick={handleAddParticipants}>
                                                            Add
                                                        </Button>
                                                    </div>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="w-full flex flex-col">
                                            <p className="text-left text-xs mb-2">
                                                Orçamento:
                                                <span className="font-bold text-sm text-center mt-1 ml-2">
                                                {orcamento.toLocaleString("pt-PT", {
                                                    style: "currency",
                                                    currency: "EUR",
                                                })}
                                            </span>
                                            </p>
                                            <div className={"flex items-center align-middle"}>
                                                <Slider
                                                    value={[orcamento]}
                                                    onValueChange={handleOrcamentoChange}
                                                    max={5000}
                                                    step={10}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col mb-3">
                                        <h2 className="font-serif text-2xl pb-2">
                                            Objetivos
                                        </h2>
                                        <p className="text-left text-xs mb-2">
                                            Adicione os objetivos
                                        </p>
                                        <div className="flex gap-4">
                                            <Input
                                                variant={"activity"}
                                                className="w-full"
                                                placeholder="Ex. Melhorar a comunicação"
                                                value={objetivo}
                                                onChange={handleInputChange}
                                                name="objetivo"
                                                onKeyPress={handleObjetivosKeyPress}
                                            />
                                            <Button
                                                className={`h-10 ${isEmpty(objetivo) ? 'cursor-not-allowed' : ''}`}
                                                variant="activity"
                                                onClick={handleObjetivosAdd}
                                                disabled={isEmpty(objetivo)}
                                            >
                                                Adicionar
                                            </Button>
                                        </div>
                                        {objetivos.length > 0 && (
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
                                        )}
                                    </div>

                                    <div className={"flex flex-col mb-3"}>
                                        <h2 className="font-serif text-2xl pb-2">
                                            Observações
                                        </h2>
                                        <div>
                                            <p className="text-left text-xs mb-2">
                                                Escreva aqui as observações que acha importantes
                                            </p>
                                            <Textarea
                                                className={"bg-white border-none border rounded border-gray-400 text-large shadow-md ring-1 ring-gray-200 focus-visible:border-0 h-10 px-4 py-2"}
                                                placeholder="Ex. Deslocação não incluída"
                                                variant={"activity"}
                                                value={observacoes}
                                                onChange={handleInputChange}
                                                name="observacoes"
                                            />

                                        </div>
                                    </div>
                                    <div className={"flex place-content-end justify-end flex-col"}>
                                        <Button type="button" onClick={sendForm}>
                                            <FontAwesomeIcon
                                                className="mr-2"
                                                icon={faWandMagicSparkles}
                                            />
                                            Gerar atividade
                                        </Button>

                                        <p className="text-gray-500 text-sm">
                                            {loadingMessage}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>

            {
                modalIsOpen && (
                    <Output
                        resultadoResposta={resultadoResposta}
                        onCloseModal={() => setModalIsOpen(false)}
                        planActivityId={planActivityId}
                    />
                )
            }
        </>
    )
        ;
}

export default PlanActivity;
