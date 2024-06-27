import React, { useState, useEffect } from 'react';
import { Progress } from "@/Components/ui/progress";
import Nivel1 from "../../../storage/app/public/images/nivel-1.jpeg"

function Level() {

  const [level, setLevel] = useState(1); // Estado para o nível do utilizador, inicialmente definido para 1
  const [progress, setProgress] = useState(0); // Estado para o progresso do utilizador
  const [medals, setMedals] = useState(0); // Estado para o número de medalhas do utilizador

  // useEffect para simular a chamada à "base de dados" ao montar o componente
  useEffect(() => {
    // Simula uma chamada à bd
    const fetchData = () => {

      // Dados fictícios que seriam retornados pela "base de dados"
      const userData = {
        level: 1, // Nível do utilizador
        progress: 40, // Progresso do utilizador em %
        medals: 2 // Número de medalhas do utilizador
      };

      // Atualiza os estados com os dados fictícios
      setLevel(userData.level);
      setProgress(userData.progress);
      setMedals(userData.medals);
    };

    // Chama a função fetchData para obter os dados
    fetchData();

    // Opcional: função de limpeza que pode ser usada para limpar recursos ou cancelar operações assíncronas
    return () => {
      console.log('Componente Level desmontado.');
    };
  }, []);

  return (
    <div className="p-8 bg-white drop-shadow-md rounded-lg flex flex-col col-span-2 items-center joyride-level">

      <h2 className="text-2xl font-bold mb-4 font-manjari">NÍVEL {level}</h2>

      <div className="w-full max-w-sm h-72 bg-gray-200 mb-6 overflow-hidden rounded-lg">
        <img src={Nivel1} alt={`Nível ${level}`} className="w-full h-full object-cover" />
      </div>

      <div className="w-full max-w-md mb-4">
        <Progress className="w-full border border-black" value={progress} />
      </div>

      <p className="text-lg font-medium">Tens {medals} Medalhas!</p>
    </div>
  );
}

export default Level;
