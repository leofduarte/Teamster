import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState, useEffect } from 'react';
import ConfirmationPopup from './ConfirmationPopup';
import activityData from '../data/activity.json'; // Dados fictícios

function Invite() {
  const [popupState, setPopupState] = useState({
    show: false,
    actionType: null
  }); // estado que determina o pop up

  const [activity, setActivity] = useState({
    title: "",
    description: "",
    date: "",
    duration: "",
    resources: "",
    meeting_point: "",
    activities: [],
    schedule: [],
    tasks: []
  }); // estado que armazena o convite


  // useEffect para buscar os dados sempre que o componente é montado
  useEffect(() => {
    
        setActivity(data); // Atualiza o estado com os dados obtidos
     
  }, []);

  const handleConfirmClick = () => {
    setPopupState({
      show: true,
      actionType: 'confirm'
    });
  };

  const handleRejectClick = () => {
    setPopupState({
      show: true,
      actionType: 'reject'
    });
  };

  const handlePresenca = () => {
    setPopupState({ show: false, actionType: null });
    console.log('Presença confirmada');
    // Adicionar lógica aqui para enviar a confirmação para a BD
  };

  const handleRejeicao = () => {
    setPopupState({ show: false, actionType: null });
    console.log('Presença rejeitada');
    // Adicionar lógica aqui para enviar a rejeição para a BD
  };

  return (
    <>
      <ScrollArea className="h-3/6 w-full rounded-md border bg-white drop-shadow-md p-6">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold mb-3 font-manjari">CONVITE <span className="uppercase">{activity.title}</span></h2>

          {/* DESCRIÇÃO */}
          <div className='my-10'>
            <h3 className="text-lg font-semibold mb-2 font-manjari">Descrição</h3>
            <p className="mb-2">{activity.description}</p>
            <div>
              <div className="flex mb-2">
                <p className="font-medium mr-2">Data:</p> 
                <p>{activity.date}</p>
              </div>
              <div className="flex mb-2">
                <p className="font-medium mr-2">Duração:</p> 
                <p>{activity.duration}</p>
              </div>
              <div className="flex mb-2">
                <p className="font-medium mr-2">Recursos:</p> 
                <p>{activity.resources}</p>
              </div>
              <div className="flex mb-2">
                <p className="font-medium mr-2">Ponto de encontro:</p> 
                <p>{activity.meeting_point}</p>
              </div>
            </div>
          </div>

          {/* ATIVIDADES */}
          <div className='mb-10'>
            <h3 className="text-lg font-semibold mb-2 font-manjari">Atividades</h3>
            <ul>
              {activity.activities.map((activity, index) => (
                <li key={index} className="mb-2">
                  <div className="flex">
                    <p className="font-medium mr-2">{activity.title}:</p>
                    <p>{activity.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* HORÁRIO / TAREFAS */}
          <div className='mb-10'>
            <div className="flex gap-20">
              <div>
                <h4 className="text-lg font-semibold mb-2 font-manjari">Horário</h4>
                {activity.schedule.map((item, index) => (
                  <div key={index} className="flex mb-2">
                    <p className="font-medium mr-2">{item.time}</p>
                    <p>{item.activity}</p>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2 font-manjari">Tarefas</h4>
                <ul>
                  {activity.tasks.map((task, index) => (
                    <li key={index} className="mb-2">{task}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* OBSERVAÇÕES */}
          <div>
            <h3 className="text-lg font-semibold mb-2 font-manjari">Alguma restrição alimentar ou Observação?</h3>
            <p className="text-sm mb-1">Escreva aqui</p>
            <textarea
              className="w-full p-2 text-sm border border-gray-300 rounded"
            ></textarea> {/*GUARDAR ESTA INFORMAÇÃO ACERCA DO UTILIZADOR CASO ESTEJA PREENCHIDA*/}
          </div>

          {/* BOTÕES */}
          <div className="mt-6">
            <Button onClick={handleConfirmClick} className="px-6">Confirmar presença</Button>
            <Button onClick={handleRejectClick} variant="outline" className="ml-8 px-6 text-red-500 border border-red-500 hover:bg-red-50 hover:text-red-500">Rejeitar convite</Button>
          </div>
        </div>
      </ScrollArea>

      {/* Renderização do pop-up */}
      {popupState.show && (
        <ConfirmationPopup
          logo={popupState.actionType === 'confirm' ? "happy" : "sad"}
          message={
            popupState.actionType === 'confirm'
              ? "A sua resposta foi enviada"
              : "Tem a certeza que deseja rejeitar o convite?"
          }
          buttons={popupState.actionType !== 'confirm'}
          onConfirm={
            popupState.actionType === 'confirm' ? handlePresenca : handleRejeicao
          }
          onCancel={() => setPopupState({ show: false, actionType: null })}
        />
      )}
    </>
  );

  //CONVITE SEM SCROLL
  // return (
  //   <>
  //     <div className='bg-white drop-shadow-md rounded-lg p-6'>
  //       <div className="px-6 py-4">
  //         <h2 className="text-2xl font-bold mb-3 font-manjari">CONVITE <span className="uppercase">{activityData.title}</span></h2>

  //         {/* DESCRIÇÃO */}
  //         <div className='my-10'>
  //           <h3 className="text-lg font-semibold mb-2 font-manjari">Descrição</h3>
  //           <p className="mb-2">{activityData.description}</p>
  //           <div>
  //             <div className="flex mb-2">
  //               <p className="font-medium mr-2">Data:</p> 
  //               <p>{activityData.date}</p>
  //             </div>
  //             <div className="flex mb-2">
  //               <p className="font-medium mr-2">Duração:</p> 
  //               <p>{activityData.duration}</p>
  //             </div>
  //             <div className="flex mb-2">
  //               <p className="font-medium mr-2">Recursos:</p> 
  //               <p>{activityData.resources}</p>
  //             </div>
  //             <div className="flex mb-2">
  //               <p className="font-medium mr-2">Ponto de encontro:</p> 
  //               <p>{activityData.meeting_point}</p>
  //             </div>
  //           </div>
  //         </div>

  //         {/* ATIVIDADES */}
  //         <div className='mb-10'>
  //           <h3 className="text-lg font-semibold mb-2 font-manjari">Atividades</h3>
  //           <ul>
  //             {activityData.activities.map((activity, index) => (
  //               <li key={index} className="mb-2">
  //                 <div className="flex">
  //                   <p className="font-medium mr-2">{activity.title}:</p>
  //                   <p>{activity.description}</p>
  //                 </div>
  //               </li>
  //             ))}
  //           </ul>
  //         </div>

  //         {/* HORÁRIO / TAREFAS */}
  //         <div className='mb-10'>
  //           <div className="flex gap-20">
  //             <div>
  //               <h4 className="text-lg font-semibold mb-2 font-manjari">Horário</h4>
  //               {activityData.schedule.map((item, index) => (
  //                 <div key={index} className="flex mb-2">
  //                   <p className="font-medium mr-2">{item.time}</p>
  //                   <p>{item.activity}</p>
  //                 </div>
  //               ))}
  //             </div>
  //             <div>
  //               <h4 className="text-lg font-semibold mb-2 font-manjari">Tarefas</h4>
  //               <ul>
  //                 {activityData.tasks.map((task, index) => (
  //                   <li key={index} className="mb-2">{task}</li>
  //                 ))}
  //               </ul>
  //             </div>
  //           </div>
  //         </div>

  //         {/* OBSERVAÇÕES */}
  //         <div>
  //           <h3 className="text-lg font-semibold mb-2 font-manjari">Alguma restrição alimentar ou Observação?</h3>
  //           <p className="text-sm mb-1">Escreva aqui</p>
  //           <textarea
  //             className="w-full p-2 text-sm border border-gray-300 rounded"
  //           ></textarea>
  //         </div>

  //         {/* BOTÕES */}
  //         <div className="mt-6">
  //           <Button onClick={handleConfirmClick} className="px-6">Confirmar presença</Button>
  //           <Button onClick={handleRejectClick} variant="outline" className="ml-8 px-6 text-red-500 border border-red-500 hover:bg-red-50 hover:text-red-500">Rejeitar convite</Button>
  //         </div>

  //       </div>
  //     </div>

  //     {/* Renderização do pop-up */}
  //     {popupState.show && (
  //       <ConfirmationPopup
  //         logo={popupState.actionType === 'confirm' ? "happy" : "sad"}
  //         message={
  //           popupState.actionType === 'confirm'
  //             ? "A sua resposta foi enviada"
  //             : "Tem a certeza que deseja rejeitar o convite?"
  //         }
  //         buttons={popupState.actionType === 'confirm' ? false : true}
  //         onConfirm={
  //           popupState.actionType === 'confirm' ? handlePresenca : handleRejeicao
  //         }
  //         onCancel={() => setPopupState({ show: false, actionType: null })}
  //       />
  //     )}
  //   </>
  // );
}

export default Invite;
