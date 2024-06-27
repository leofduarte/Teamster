import React, { useState } from 'react';
// import { FaQuestion } from "react-icons/fa";

function Medals() {
  // Estado fictício que contém as medalhas recebidas pelo utilizador
  const [medals, setMedals] = useState([
    {
      id: 1,
      title: "Primeiro Evento!",
      description: "Parabéns, recebeu o seu primeiro convite!",
      image: "/assets/images/medalha-1.png" // ADICIONAR IMAGEM
    },
    {
      id: 2,
      title: "Bem-Vindo Ao Teamster!",
      description: "Parabéns, ganhaste a tua primeira medalha.",
      image: "/assets/images/medalha-2.png" // ADICIONAR IMAGEM
    }
  ]);

  // Função para renderizar as medalhas recebidas
  const renderMedals = () => {
    return medals.map((medal) => (
      <div key={medal.id} className="bg-white p-4 rounded-lg shadow-md flex items-center">
        <div className="w-32 h-32 bg-gray-300 mr-4 rounded-lg overflow-hidden">
          <img src={medal.image} alt={medal.title} className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 font-manjari">{medal.title}</h2>
          <p>{medal.description}</p>
        </div>
      </div>
    ));
  };

  // Função para renderizar os cartões de medalhas trancadas
  const renderLockedMedals = (count) => {
    let lockedMedals = [];
    for (let i = 0; i < count; i++) {
      lockedMedals.push(
        <div key={`locked-${i}`} className="bg-gray-300 py-4 px-24 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
          {/*<FaQuestion className="text-4xl text-gray-600 mb-2" />*/}
          <p className="text-gray-700">Participa em atividades para desbloqueares mais medalhas</p>
        </div>
      );
    }
    return lockedMedals;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 joyride-medals">
      {/* Renderiza as medalhas recebidas */}
      {renderMedals()}

      {/* Lógica para exibir cartões de medalhas trancadas */}
      {medals.length === 0 && renderLockedMedals(2)}
      {medals.length === 1 && renderLockedMedals(1)}
    </div>
  );
}

export default Medals;
