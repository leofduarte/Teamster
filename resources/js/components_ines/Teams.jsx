import teams from '../data/teams.json';
import React, { useState, useEffect } from 'react';
// import { FaPlus } from "react-icons/fa6";
// import { IoClose } from "react-icons/io5";
import { ScrollArea, ScrollBar } from "../Components/ui/scroll-area.jsx";
import { Button } from "../Components/ui/button.jsx";
import rejeitar from '../../../storage/app/public/logos/rejeitar.svg'


function Teams({ onSelectTeam, selectedTeamId }) {
  const [showAll, setShowAll] = useState(false); // Estado para controlar a visibilidade de todas as equipas
  const [teamData, setTeamData] = useState(teams); // Estado que contém os dados das equipas -> dados recebidos da bd
  const [showConfirm, setShowConfirm] = useState(false); // Estado para controlar a exibição do modal de confirmação
  const [memberToRemove, setMemberToRemove] = useState(null); // Estado para armazenar o membro que será removido -> tem-se de fazer alteração direta na bd
  const visibleTeams = showAll ? teamData : teamData.slice(0, 1); // Variável que determina quais equipas serão exibidas (todas ou apenas a primeira), em função da var de estado 'showAll'

  useEffect(() => {
    // Simulação da busca de dados à BD
    const fetchTeams = async () => {

      //Fazer a chamda aqui

      // Simulando a resposta da BD com os dados do arquivo JSON
      setTeamData(teams);
    };

    fetchTeams();
  }, []);


  // Função que seleciona / desseleciona a equipa consoante o team id associado
  // Ativa a callback function
  const handleSelectTeam = (teamId) => {
    if (selectedTeamId === teamId) {
      onSelectTeam(null);
    } else {
      onSelectTeam(teamId);
    }
  };

  // fazer lógica direta com a bd -> use effect para atualizar a página e o array da team data da bd
  const handleRemoveMember = (teamId, memberId) => {

    // ! isto é uma lógica provisória sem relação com bd !
    const updatedTeams = teamData.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          members: team.members.filter(member => member.id !== memberId)
        };
      }
      return team;
    });
    setTeamData(updatedTeams); //atualiza a equipa
    setShowConfirm(false); // fecha o modal
  };

  const handleAddMember = (teamId) => {
    // Lógica para adicionar um elemento
  };

  const handleAddTeam = () => {
    // Lógica para adicionar uma equipa
  };

  return (
    <>
      {teamData.length > 0 ? (
        <>
          <div className="flex items-center justify-between mt-12 mb-3">
            <h2 className="font-manjari font-semibold text-2xl">EQUIPAS</h2>
            <button
              className="text-[#808080] hover:text-slate-600 px-4 py-2 rounded-md underline"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Ver Menos' : 'Ver Tudo'}
            </button>
          </div>

          {visibleTeams.map((team) => (
            <button
              key={team.id}
              onClick={() => handleSelectTeam(team.id)}
              className="w-full text-left"
            >
              <ScrollArea
                className={`w-full rounded-lg shadow-md bg-white border mb-5 px-6 pt-4 pb-7 border-2 ${
                  selectedTeamId === team.id ? 'border-current' : 'border-transparent'
                } hover:border-current`}
              >
                <p className="mb-5 flex items-center">
                  <span className="font-manjari mt-2 text-xl font-semibold">{team.title}</span>
                  <span className="ml-3">{team.department}</span>
                </p>

                <div className="overflow-x-auto">
                  <div className="flex gap-7 max-w-[700px]">
                    {team.members.map((member) => (
                      <div key={member.id} className="flex flex-col items-center">
                        <div className="relative group cursor-pointer">
                          <div className="rounded-full border-solid border-2 border-gray-300 w-16 h-16 flex items-center justify-center">
                            <img
                              className="rounded-full w-full h-full object-cover"
                              src={`/assets/images/${member.photo}`}
                              alt={member.name}
                            />
                          </div>
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span
                              className="text-white text-4xl"
                              onClick={() => {
                                setMemberToRemove({ teamId: team.id, memberId: member.id });
                                setShowConfirm(true);
                              }}
                            >
                              {/*<IoClose />*/}
                            </span>
                          </div>
                        </div>
                        <p className="mt-2 text-center">{member.name}</p>
                      </div>
                    ))}
                    <div
                      className="bg-transparent text-[#D9D9D9] text-5xl p-2 border-solid border-4 border-gray-300 hover:bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center cursor-pointer"
                    >
                      <button
                        onClick={handleAddMember}
                      >
                      <span className="flex items-center justify-center text-[#D9D9D9] w-8 h-8">
                          {/*<FaPlus />*/}
                      </span>
                      </button>
                    </div>
                  </div>
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </button>
          ))}

            <button
            className="w-full p-3 mb-5 bg-[#D9D9D9] hover:bg-gray-300 text-white rounded-md cursor-pointer flex items-center justify-center gap-2"
            onClick={handleAddTeam}
            >
              <span className="text-3xl leading-none align-middle flex items-center justify-center">
                  {/*<FaPlus />*/}
              </span>
              <span className="text-lg align-middle">Adicionar Equipa</span>
            </button>

        </>
      ) : (
        <>
        <div className="flex mt-12 mb-3 items-center justify-between">
            <h2 className="font-manjari font-semibold text-2xl">EQUIPAS</h2>
            <button
              className="text-[#808080] hover:text-slate-600 px-4 py-2 rounded-md underline"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Ver Menos' : 'Ver Tudo'}
            </button>
        </div>
          <button
            className="w-full p-3 mb-5 bg-[#D9D9D9] hover:bg-gray-300 text-white rounded-md cursor-pointer flex items-center justify-center gap-2"
            onClick={handleAddTeam}
          >
            <span className="text-3xl leading-none align-middle flex items-center justify-center"><FaPlus /></span>
            <span className="text-lg align-middle">Adicionar Equipa</span>
          </button>
        </>
      )}


      {/* MODAL DE CONFIRMAÇÃO */} {/*quando se juntar projetos pode-se chamar a componente de modal e passar a msg e o logo como props*/}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white px-16 py-4 rounded-lg shadow-lg">

          <div className="flex items-center justify-center my-4">
              <img src={rejeitar} alt="Sad Logo" className="h-20 w-20 mr-2" />
          </div>

            <p>Tem a certeza que deseja remover {teamData.find(t => t.id === memberToRemove.teamId)?.members.find(m => m.id === memberToRemove.memberId)?.name} da equipa?</p>

            <div className="my-4 flex justify-center gap-6">
              <Button
                className="px-6"
                onClick={() => setShowConfirm(false)}
              >
                Não
              </Button>
              <Button
                variant="outline"
                className="px-6"
                onClick={() => handleRemoveMember(memberToRemove.teamId, memberToRemove.memberId)}
              >
                Sim
              </Button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default Teams;
