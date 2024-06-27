import React, { useState, useEffect } from 'react';
import teamData from '../data/team.json';
import { ScrollArea } from "@/Components/ui/scroll-area";
import Image1 from '../../../storage/app/public/images/rui-jorge.jpg';
import Image2 from '../../../storage/app/public/images/andre-santos.jpg';
import Image3 from '../../../storage/app/public/images/ricardo-guedes.jpg';
import Image4 from '../../../storage/app/public/images/rita-sampaio.jpg';
import Image5 from '../../../storage/app/public/images/marta-pereira.jpg';
import Image6 from '../../../storage/app/public/images/ana-silva.jpg';
import Image7 from '../../../storage/app/public/images/tiago-fernandes.jpg';

const images = [Image1, Image2, Image3, Image4, Image5, Image6, Image7];

function Team() {
  const [team, setTeam] = useState([]); // Estado para armazenar os dados da equipa
  const loggedInUser = "André Santos"; // Nome do utilizador logado

  // Simulação de uma chamada à base de dados para obter os dados da equipa
  const fetchTeamData = () => {
      setTeam(teamData); // Atualiza o estado com os dados da equipa
  };

  // useEffect para chamar a função de simulação quando o componente é montado
  useEffect(() => {
    fetchTeamData();
  }, []);

  // Função para filtrar e remover o utilizador logado da lista da equipa
  const filterMembers = (members) => {
    return members.filter(member => member.name !== loggedInUser);
  };

  return (
    <div className="bg-white drop-shadow-md rounded-lg text-center p-5 joyride-team">
      <h2 className="text-2xl font-bold mb-3 font-manjari">A SUA EQUIPA</h2>
      <div className="flex items-center justify-center flex-col">
        {team.map((team) => (
          <div key={team.id} className="w-full max-w-md mb-5">
            <div className="mb-3">
              <p className="font-manjari mt-2 text-xl font-semibold text-left">{team.title}</p>
            </div>
            <ScrollArea className="h-72 w-full rounded-md border overflow-y-auto">
              {filterMembers(team.members).map((member) => (
                <div key={member.id} className="flex items-center mb-4 px-3">
                  <div className="relative group cursor-pointer flex-shrink-0 mr-3">
                      <div
                          className="rounded-full border-solid border-2 border-gray-300 w-10 h-10 flex items-center justify-center">
                          <img
                              className="rounded-full w-full h-full object-cover"
                              src={`../../../storage/app/public/images/${member.image}`}
                              alt={member.name}
                          />
                      </div>
                  </div>
                    <p className="text-left">{member.name}</p>
                </div>
              ))}
            </ScrollArea>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;
