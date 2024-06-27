import React, { useState, useEffect } from 'react';
import ConfirmationPopup from '../components_ines/ConfirmationPopup.jsx';
// import { Link } from 'react-router-dom';

function ParticipantProfileSettings() {
  const [showConfirmPopup, setShowConfirmPopup] = useState(false); // Estado para controlar a exibição do pop-up de confirmação
  const [userName, setUserName] = useState(''); // Estado para armazenar o nome do utilizador
    const [getUrl, setGetUrl] = useState(false);

    // Função fictícia que simula a verificação se o utilizador está logado
  const checkUserLoggedIn = () => {
    // Supondo que o utilizador está logado e obtendo o nome do utilizador
    return 'André Santos'; // Nome fictício do utilizador
  };

  // useEffect que simula a obtenção do nome do utilizador quando o componente é montado
  useEffect(() => {
    const name = checkUserLoggedIn(); // Chamada fictícia para obter o nome do utilizador
    setUserName(name); // Atualiza o estado com o nome do utilizador
    console.log(`Utilizador logado: ${name}`);

      if (window.location.href === "/participantprofile") {
            setGetUrl(true);
        }
  }, []);

  const handleLogoutClick = () => {
    setShowConfirmPopup(true); // Exibe o pop-up de confirmação
  };

  const handleCancelClick = () => {
    setShowConfirmPopup(false); // Oculta o pop-up de confirmação
  };

  const handleConfirmClick = () => { // Confirma o logout
    setShowConfirmPopup(false); // Oculta o pop-up de confirmação
    console.log('Logout confirmado');
    // Adicionar lógica de logout aqui
    // Exemplo fictício de logout
    setUserName(''); // Limpa o nome do utilizador após o logout
  };

  return (
    <>
      <div className="relative bg-white drop-shadow-md rounded-lg p-5 flex items-center joyride-profile">
        <img src="/assets/images/andre-santos.jpg" alt="User" className="h-12 w-12 rounded-full mr-4" />
        <div>
          <p className="text-lg font-medium">{userName}</p>
          <div className="mt-1 text-sm">

              {getUrl && (
              <a href="/participantprofile" className="underline hover:text-slate-600">Editar perfil</a>
                )}
            <a
              href="#"
              onClick={handleLogoutClick}
              className="underline text-[#F54468] hover:text-red-400 ml-16"
            >
              Logout
            </a>
          </div>
        </div>
      </div>

      {/* Renderização do pop-up de logout */}
      {showConfirmPopup && (
        <ConfirmationPopup
          logo="happy"
          message="Deseja terminar sessão?"
          buttons={true}
          onConfirm={handleConfirmClick}
          onCancel={handleCancelClick}
        />
      )}
    </>
  );
}

export default ParticipantProfileSettings;
