import React from 'react';
import { Button } from "@/Components/ui/button";

function ConfirmationPopup({ logo, message, buttons = true, onConfirm, onCancel }) {

  // Função para lidar com o clique no fundo do pop-up
  const handleBackgroundClick = (e) => {
      if (!buttons) {
        onCancel(); // Fecha o pop-up se os botões não estiverem presentes
      }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center text-center z-50 bg-black bg-opacity-50"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white px-16 py-4 rounded-lg shadow-lg">
        {logo && (
          <div className="flex items-center justify-center my-4">
            {logo === 'happy' && (
              <img src="../../../storage/app/public/logos/confirmar.svg" alt="Happy Logo" className="h-16 w-16 mr-2" />
            )}
            {logo === 'sad' && (
              <img src="../../../storage/app/public/logos/rejeitar.svg" alt="Sad Logo" className="h-20 w-20 mr-2" />
            )}
          </div>
        )}
        <p className='mb-8'>{message}</p>
        {buttons && (
          <div className="my-4 flex justify-center gap-6">
            <Button
              className="px-6"
              onClick={onCancel}
            >
              Não
            </Button>
            <Button
              variant="outline"
              className="px-6"
              onClick={onConfirm}
            >
              Sim
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ConfirmationPopup;
