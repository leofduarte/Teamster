//? Imports
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import Modal from "@/Components/Modal.jsx";

//? Define o estado inicial do formulário (form) utilizando o useState hook
function PlanActivity() {
  const [form, setForm] = useState({
    nome: "",
    objetivo: "",
    objetivos: [],
    localizacao: "",
    orcamento: "",
    numParticipantes: "",
    dia: "",
    observacoes: "",
    duracao: "",
  });

  //? Define estados para controlar a abertura do modal (modalIsOpen)
  const [modalIsOpen, setModalIsOpen] = useState(false);
  //? E para armazenar a resposta da requisição (resultadoResposta)
  const [resultadoResposta, setResultadoResposta] = useState([]);

  //? Extrai os valores do estado form para variáveis individuais, facilitando o acesso a esses valores durante a renderização.
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

  //? Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleEquipaChange = useCallback((value) => {
    setForm((prevForm) => ({
      ...prevForm,
      numParticipantes: value,
    }));
  }, []);

  const handleOrcamentoChange = useCallback((newValue) => {
    setForm((prevForm) => ({
      ...prevForm,
      orcamento: newValue,
    }));
  }, []);

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

  const handleObjetivosKeyPress = (e) => {
    if (e.key === "Enter") {
      handleObjetivosAdd();
    }
  };

  const handleObjetivosRemove = (e) => {
    const novoObjetivo = e.currentTarget.value;
    setForm((prevForm) => ({
      ...prevForm,
      objetivos: prevForm.objetivos.filter((obj) => obj !== novoObjetivo),
    }));
  };

  //? Função que verifica se um valor está vazio (para não ter de verificar indivivualmente)
  const isEmpty = (value) => {
    if (typeof value === "string") {
      return value.trim() === "";
    } else if (Array.isArray(value)) {
      return value.length === 0;
    }
    return false;
  };

  //? Form submission
  const sendForm = async () => {
    console.log("Clicou em Gerar atividade");
    if (
      // Primeiro é verificado se está tudo preenchido
      isEmpty(localizacao) ||
      isEmpty(numParticipantes) ||
      isEmpty(dia) ||
      isEmpty(duracao) ||
      objetivos.length === 0
    ) {
      // se não tiver ele manda um erro para o user
      alert("Preencha todos os campos");
    } else {
      try {
        console.log("Enviando o formulário...");
        const response = await axios.post("/api/v1/atividade-inicial", form);

        const {
          nome,
          descricao,
          atividades,
          horario,
          tarefas_planeamento,
          tarefas_participante,
        } = response.data;

        // Recebe as respostas e mete neste array
        setResultadoResposta([
          nome,
          descricao,
          atividades,
          horario,
          tarefas_planeamento,
          tarefas_participante,
        ]);

        // E mete o estado da modal true para ela abrir e mostrar o resultado
        setModalIsOpen(true);
      } catch (error) {
        console.error("Erro ao enviar formulário:", error);
      }
    }
  };

  //? Use effects que monitaram as mudanças dos estados correspondentes
  useEffect(() => {
    console.log("modalIsOpen mudou para:", modalIsOpen);
  }, [modalIsOpen]);

  useEffect(() => {
    console.log("Resultado resposta mudou para:", resultadoResposta);
  }, [resultadoResposta]);

  useEffect(() => {
    console.log(form);
  }, [form]);

  //? E aqui é o return finalmente graças a deus
  return (
    <>
      <Layout>
        <div>
          <div className="flex h-[10%] mb-5">
            <h1 className="font-bold text-3xl">Planear Atividade</h1>
          </div>

          {/* NOVA ATIVIDADE */}
          <div className="h-[30%] flex flex-col w-full">
            <h2 className="font-serif uppercase text-2xl h-[23%] mb-3">
              Nova atividade
            </h2>

            <div className="flex flex-wrap justify-start mb-3">
              <div className="w-[40%] mr-4">
                <p className="text-left text-xs mb-2">Nome da Atividade</p>
                <Input
                  placeholder="Ex. Atividade 27/08"
                  name="nome"
                  value={nome}
                  onChange={handleInputChange}
                />
              </div>

              <div className="w-[40%] mr-4">
                <p className="text-left text-xs mb-2">Duração da atividade</p>
                <Input
                  placeholder="Ex. 8 horas"
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
                      variant={"outline"}
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
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dia}
                      onSelect={(date) =>
                        setForm((prevForm) => ({ ...prevForm, dia: date }))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="w-[25%]">
                <p className="text-left text-xs mb-2">Localização</p>
                <Input
                  placeholder="Ex. Aveiro"
                  name="localizacao"
                  value={localizacao}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* EQUIPA E BUDGET */}
            <div className="flex flex-wrap justify-start">
              <div className="w-[40%] mr-4">
                <p className="text-left text-xs mb-2">Equipa</p>
                <Select onValueChange={handleEquipaChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecionar Equipa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-1/4">
                <p className="text-left text-xs mb-4">Preço</p>
                <Slider
                  defaultValue={[100]}
                  max={1000}
                  step={1}
                  onValueChange={handleOrcamentoChange}
                />
              </div>
            </div>
          </div>

          {/* OBJETIVOS */}
          <div className="flex flex-col mb-5">
            <div className="h-1/2">
              <h2 className="font-serif text-2xl pt-10 pb-2">Objetivos</h2>
            </div>
            <div>
              <p className="text-left text-xs mb-2">Adicione os objetivos</p>
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
                  variant="secondary"
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
                      variant={"outline"}
                      value={obj}
                      onMouseEnter={(e) =>
                        (e.currentTarget.textContent = "Remover")
                      }
                      onMouseLeave={(e) => (e.currentTarget.textContent = obj)}
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
            <h2 className="font-serif text-2xl pb-2">Observações</h2>
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

          <Button onClick={sendForm}>Gerar atividade <FontAwesomeIcon className="ms-2" icon={faWandMagicSparkles} /> </Button>
        </div>
      </Layout>

      {modalIsOpen && (
          <Output
          resultadoResposta={resultadoResposta}
          onCloseModal={() => setModalIsOpen(false)}
        />
      )}

    </>
  );
}

export default PlanActivity;
