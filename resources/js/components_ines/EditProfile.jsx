import React, { useState } from 'react';
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import ConfirmationPopup from './ConfirmationPopup';
// import { FaTrashAlt } from "react-icons/fa";
// import { MdOutlineEdit } from "react-icons/md";


function EditProfile() {

  // Estados iniciais para os campos de entrada -> CHAMADA À BD
  const initialProfileState = {
    name: 'André',
    nickname: 'Santos',
    department: 'Finanças',
    position: 'Contabilista'
  };

  const [showConfirmPopup, setShowConfirmPopup] = useState(false); // Variável de estado que determina a exibição do pop-up
  const [profile, setProfile] = useState(initialProfileState); // Estado para os dados do perfil
  const [isSaved, setIsSaved] = useState(false); // Estado para mostrar se as alterações foram salvas

  // Função para renderizar o pop-up
  const handleDeleteClick = () => {
    setShowConfirmPopup(true);
  };

  // Função para cancelar a ação
  const handleCancelClick = () => {
    setShowConfirmPopup(false);
  };

  // Função para confirmar a ação
  const handleConfirmClick = () => {
    setShowConfirmPopup(false);
    console.log('Conta eliminada');
    // Lógica adicional para eliminar a conta
  };

  // Função para salvar alterações
  const handleSaveChanges = () => {
    console.log('Alterações guardadas:', profile);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  // Função para descartar alterações
  const handleDiscardChanges = () => {
    setProfile(initialProfileState);
    console.log('Alterações descartadas.');
  };


  return (
    <>
      <div className="p-8 bg-white drop-shadow-md rounded-lg flex flex-col items-center">
        <div className="relative">
          <img src="../../../storage/app/public/images/andre-santos.jpg" alt="User" className="h-20 w-20 rounded-full mb-4" />
          <a href="#">
            <div className="absolute top-0 right-0 p-1 bg-[#242424] rounded-full hover:bg-gray-800 hover:text-slate-200">
              {/*<MdOutlineEdit className="text-white h-5 w-5" />*/}
            </div>
          </a>
        </div>

        <div className="w-full mb-4">
          <p className="text-left text-xs mb-2">Nome</p>
          <Input
            type="text"
            placeholder="André"
            className="w-full"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
        </div>

        <div className="w-full mb-4">
          <p className="text-left text-xs mb-2">Apelido</p>
          <Input
            type="text"
            placeholder="Santos"
            className="w-full"
            value={profile.nickname}
            onChange={(e) => setProfile({ ...profile, nickname: e.target.value })}
          />
        </div>

        <div className="w-full mb-4">
          <p className="text-left text-xs mb-2">Departamento</p>
          <Input
            type="text"
            placeholder="Finanças"
            className="w-full"
            value={profile.department}
            onChange={(e) => setProfile({ ...profile, department: e.target.value })}
          />
        </div>

        <div className="w-full mb-4">
          <p className="text-left text-xs mb-2">Cargo</p>
          <Input
            type="text"
            placeholder="Contabilista"
            className="w-full"
            value={profile.position}
            onChange={(e) => setProfile({ ...profile, position: e.target.value })}
          />
        </div>

        <a href="#" className="text-sm underline hover:text-slate-700 mt-4 mb-10 text-center">Deseja alterar a sua password?</a>

        <div className="flex justify-center w-full mb-10">
          <Button variant="outline" className="mr-4" onClick={handleDiscardChanges}>Descartar</Button>
          <Button onClick={handleSaveChanges}>Guardar Alterações</Button>
        </div>

        {isSaved && (
          <div className="text-[#56C496] text-sm mb-4">
            Alterações guardadas com sucesso!
          </div>
        )}

        <hr className="w-full mb-4 border border-slate-400" />

        <a
          className='text-sm text-[#F54468] hover:text-red-400 underline text-center mt-2 flex items-center'
          href="#"
          onClick={handleDeleteClick}>
          Eliminar conta
            {/*<FaTrashAlt className='ml-1' />*/}
        </a>

      </div>

      {/* Renderização do pop-up de eliminar conta */}
      {showConfirmPopup && (
        <ConfirmationPopup
          logo="sad"
          message="Tem a certeza que deseja eliminar a sua conta?"
          buttons={true}
          onConfirm={handleConfirmClick}
          onCancel={handleCancelClick}
        />
      )}
    </>
  );
}

export default EditProfile;
