import React, { useState } from "react";
import axios from "axios";
import { Button } from "../Components/ui/button";
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


function ActivityPlanningForm(auth, errors, message) {
  // const [hobbies, setHobbies] = useState([]);
  // const [likes, setLikes] = useState([]);
  // const [idades, setIdades] = useState([]);
  // const [restricoes, setRestricoes] = useState([]);
  // const [idadeInput, setIdadeInput] = useState(0);
  // const [hobbyInput, setHobbyInput] = useState('');
  // const [likeInput, setLikeInput] = useState('');
  // const [restricoesInput, setRestricoesInput] = useState('');

  // infos que o organizador / admin preenche
  const cidade = "Aveiro";
  const objetivo = "fomentar a comunicação, união, espirito de equipa e motivação";
  const tipologia = "equipa de contabilidade";
  const numparticipantes = 14;
  const duracao = "max 8 horas";
  const orcamento = 50;
  const idades = [20, 30, 40, 50];
  const hobbies = ["tenis", "música", "atividades ao ar livre", "leitura"];
  const likes = ["fotografia", "jogos de tabuleiro", "boxe", "xadrez"];
  const restricoes = ["alergias a frutos secos", "alergias a glúten"];
  const [prompt, setPrompt] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const data = {
    objetivo: objetivo,
    tipologia: tipologia,
    numparticipantes: numparticipantes,
    duracao: duracao,
    orcamento: orcamento,
    hobbies: hobbies,
    likes: likes,
    cidade: cidade,
    idades: idades,
    restricoes: restricoes,
  };

  const handleAction = () => {
	console.log("action");
	setIsDialogOpen(true);
  };

  const handleConfirm =  async () => {
	console.log("confirm")
	setIsDialogOpen(false);

	try {
        const response = await axios.post(
          "http://localhost:3000/api-v1/activity-planning",
          data
        );
        console.log(response.data.content[0].text);
        setPrompt(response.data.content[0].text);
      } catch (error) {
        console.error(error);
      }
  };

  const handleCancel = () => {
	console.log("cancel");
	setIsDialogOpen(false);
  };

    // setLikes([...likes, likeInput]);
    // setHobbies([...hobbies, hobbyInput]);
    // setIdades([...idades, idadeInput]);
    // setRestricoes([...restricoes, restricoesInput]);

  return (
    <>
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Activity Planning</h2>}
        >
            <Head title="Activity Planning" />

      <div className="text-black">
        <h1 className="text-2xl">Planeamento de Atividades</h1>
        <p>
          Esta página serve para planear as atividade, por parte do gestor/ recursos humanos/ etc
        </p>

        {/* <input className="block m-2 p-2" type="number" placeholder="Idade" value={idadeInput} onChange={e => setIdadeInput(e.target.value)}/> */}
        {/* <input className="block m-2 p-2" type="text" placeholder="Interesses" value={likeInput} onChange={e => setLikeInput(e.target.value)} />
		<input className="block m-2 p-2" type="text" placeholder="Passatempos" value={hobbyInput} onChange={e => setHobbyInput(e.target.value)} />
		<input className="block m-2 p-2" type="text" placeholder="Restrições" value={restricoesInput} onChange={e => setRestricoesInput(e.target.value)} /> */}

        {/* <h2 className="text-2xl text-black">Idades:</h2>
		<ul>
			{idades.map((hobby, index) => (
				<li key={index}>{hobby}</li>
			))}
		</ul>

		<h2 className="text-2xl text-black">Passatempos:</h2>
		<ul>
			{hobbies.map((hobby, index) => (
				<li key={index}>{hobby}</li>
			))}
		</ul>

		<h2 className="text-2xl text-black">Interesses:</h2>
		<ul>
			{likes.map((like, index) => (
				<li key={index}>{like}</li>
			))}
		</ul>

		<h2 className="text-2xl text-black">Restrições:</h2>
		<ul>
			{restricoes.map((like, index) => (
				<li key={index}>{like}</li>
			))}
		</ul>
		*/}


<AlertDialog isOpen={isDialogOpen}>
  <AlertDialogTrigger asChild><Button onClick={handleAction}>Add Activity</Button></AlertDialogTrigger>
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

{prompt && <pre className="text-black">{prompt}</pre>}
      </div>
    </AuthenticatedLayout>
    </>
  );
}

export default ActivityPlanningForm;
