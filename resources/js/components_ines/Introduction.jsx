import React from 'react';
import { Button } from "@/components/ui/button"; 

const Introduction = ({ onNext }) => {
  return (
    <>
      <h2 className="text-3xl font-bold mb-8">Questionário de interesses</h2>
      <div className="w-full max-w-2xl">
        <div className='bg-white p-8 mb-8 rounded-lg drop-shadow-md'>
        <p className="mb-4">Caro utilizador, </p>
        <p className="mb-4">O Teamster é uma aplicação de teambuilding que utiliza Inteligência Artificial para oferecer atividades personalizadas. Solicitamos o preenchimento de um questionário sobre os seus interesses para personalizar a sua experiência. O questionário varia em duração: mínimo de 1 minuto, média entre 3 a 5 minutos, e completo de 6 a 8 minutos.</p>
        <p className="mb-4">Por favor note que a precisão das atividades recomendadas é proporcional à quantidade de perguntas respondidas. Garantimos a anonimização das suas respostas para proteger a sua privacidade.</p>
        </div>
      <div className="flex justify-end">
        <Button className="px-6" onClick={onNext}>
          Prosseguir
        </Button>
      </div>
      </div>
    </>
  );
};

export default Introduction;
