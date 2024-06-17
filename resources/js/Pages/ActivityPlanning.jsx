import React, {useEffect, useState} from "react";
import {Button} from "../Components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import {Input} from "@/Components/ui/input.jsx";
import {cn} from "@/lib/utils.js";
import {CalendarIcon} from "@radix-ui/react-icons";
import {format} from "date-fns";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/Components/ui/select.jsx";
import {Textarea} from "@/Components/ui/textarea.jsx";
import {Slider} from "@/Components/ui/slider.jsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/Components/ui/popover.jsx";
import {Calendar} from "@/Components/ui/calendar.jsx";

function ActivityPlanningForm({auth}) {
    const [objetivo, setObjetivo] = useState([]);
    const [objetivos, setObjetivos] = useState([]);
    const [localizacao, setLocalizacao] = useState("");
    const [orcamento, setOrcamento] = useState(0);
    const [numParticipantes, setNumParticipantes] = useState("");
    const [dia, setDia] = useState("");
    const [observacoes, setObservacoes] = useState("");
    const [prompt, setPrompt] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const data = {
        objetivos: objetivos,
        numParticipantes: numParticipantes,
        dia: dia,
        orcamento: orcamento,
        localizacao: localizacao,
        observacoes: observacoes,
    };

    function isEmpty(value) {
        if (typeof value === "string") {
            return value.trim() === "";
        } else if (Array.isArray(value)) {
            return value.length === 0;
        }
        return false;
    }

    function handleLocalizacaoChange(e) {
        setLocalizacao(e.target.value);
    }

    function handleEquipaChange(value) {
        setNumParticipantes(value);
    }

    const handleOrcamentoChange = (newValue) => {
        setOrcamento(newValue);
    };

    const handleObjetivosAdd = () => {
        if (isEmpty(objetivo)) {
            alert("não podes");
        } else {
            setObjetivos([...objetivos, objetivo]);
            setObjetivo("");
        }
    };

    const handleObjetivosKeyPress = (e) => {
        if (e.key === "Enter") {
            if (isEmpty(objetivo)) {
                alert("não podes");
            } else {
                setObjetivos([...objetivos, objetivo]);
                setObjetivo("");
            }
        }
    };

    const handleObjetivosRemove = (e) => {
        const novoObjetivo = e.currentTarget.value;
        setObjetivos(objetivos.filter((objetivo) => objetivo !== novoObjetivo));
    };


    const handleAction = () => {
        console.log("action");
        setIsDialogOpen(true);
    };

    const handleCancel = () => {
        console.log("cancel");
        setIsDialogOpen(false);
    };

    const handleConfirm = async () => {
        console.log("confirm")
        setIsDialogOpen(false);

        console.log(data);
        try {
            const response = await axios.post(
                "/api/v1/activity-planning",
                data
            );
            console.log(response);
            setPrompt(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        console.log(data);
        console.log(numParticipantes);
    }, [objetivo, numParticipantes, dia, orcamento, localizacao, observacoes]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Activity Planning</h2>}
        >
            <Head title="Activity Planning"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div>
                                <div className=" flex h-[10%] mb-5">
                                    <h1 className="font-bold text-3xl">Planear Atividade</h1>
                                </div>

                                <div className="h-[30%] flex flex-col w-full ">
                                    <h2 className="font-serif uppercase text-2xl h-[23%] mb-3">
                                        Nova atividade
                                    </h2>

                                    <div className="flex flex-wrap justify-start mb-3">
                                        <div className="w-[40%] mr-4 ">
                                            <p className="text-left text-xs mb-2">Nome da Atividade</p>
                                            <Input placeholder="Ex. Viagem de Barco"/>
                                        </div>

                                        <div className="w-[25%] mr-4">
                                            <p className="text-left text-xs mb-2">Data</p>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"calendar"}
                                                        className={cn(
                                                            "border rounded-md text-large shadow-sm w-full",
                                                            !dia && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4"/>
                                                        {dia ? format(dia, "PPP") : <span>Escolhe uma data</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0 " align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={dia}
                                                        onSelect={setDia}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>

                                        <div className="w-[25%]">
                                            <p className="text-left text-xs mb-2">Localização</p>
                                            <Input
                                                placeholder="Ex. Aveiro"
                                                value={localizacao}
                                                onChange={handleLocalizacaoChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap justify-start">
                                        <div className="w-[40%] mr-4">
                                            <p className="text-left text-xs mb-2">Equipa</p>
                                            <Select onValueChange={handleEquipaChange}>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Selecionar Equipa"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="5">5</SelectItem>
                                                    <SelectItem value="10">10</SelectItem>
                                                    <SelectItem value="15">15</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className=" w-1/4">
                                            <p className="text-left text-xs mb-4">Orçamento: <span className={"font-extrabold text-sm"}> {orcamento}€</span></p>
                                            <Slider
                                                max={1000}
                                                step={5}
                                                onValueChange={handleOrcamentoChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <div className="h-1/2">
                                        <h2 className="font-serif text-2xl mt-10 mb-2">Objetivos</h2>
                                    </div>
                                    <div>
                                        <p className="text-left text-xs mb-2">
                                            Adicione os objetivos da atividade
                                        </p>
                                        <div className="flex">
                                            <Input
                                                className="w-[40%] me-5"
                                                placeholder="Ex. Comunicação, ..."
                                                value={objetivo}
                                                onChange={(e) => setObjetivo(e.target.value)}
                                                onKeyPress={handleObjetivosKeyPress}
                                            />
                                            <Button
                                                className="h-10"
                                                variant="secondary"
                                                onClick={handleObjetivosAdd}
                                                disabled={isEmpty(objetivo) || objetivo.length == 0}
                                            >
                                                Adicionar
                                            </Button>
                                        </div>
                                        <div className="flex flex-col mt-2 justify-start">
                                            <div className="flex">
                                                {objetivos.map((objetivo, index) => (
                                                    <Button
                                                        key={index}
                                                        variant={"outline"}
                                                        value={objetivo}
                                                        onMouseEnter={(e) =>
                                                            (e.currentTarget.textContent = "Remover")
                                                        }
                                                        onMouseLeave={(e) =>
                                                            (e.currentTarget.textContent = objetivo)
                                                        }
                                                        onClick={handleObjetivosRemove}
                                                    >
                                                        {objetivo}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="font-serif text-2xl mt-10 mb-2">Observações</h2>
                                    <div>
                                        <p className="text-left text-xs mb-2">
                                            Escreva aqui as observações que acha importantes
                                        </p>
                                        <Textarea
                                            placeholder="Ex. Uma atividade simples apenas para conviver"
                                            value={observacoes}
                                            onChange={(e) => setObservacoes(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <AlertDialog isOpen={isDialogOpen}>
                                <AlertDialogTrigger asChild><Button onClick={handleAction}>Add
                                    Activity</Button></AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader className={"text-black"}>
                                        <AlertDialogTitle>Confirm addition</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Do you want to add this activity?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                            {prompt && <pre className="mt-4 text-xs text-black">{prompt}</pre>}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default ActivityPlanningForm;
