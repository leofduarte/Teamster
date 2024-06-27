import React from 'react';

function Profile() {
  return (
    <div className="p-6 joyride-profile">
      <div className="flex justify-end items-center">
        <div className="mr-4 text-right">
          <p className="text-lg font-medium">Mariana Silva</p>
          <p><a href="/" className="underline hover:text-slate-600">Editar perfil</a></p> {/*Adicionar link que redirecione para a página de editar perfil*/} 
        </div>
        <img className="w-12 h-12 rounded-full bg-gray-200" src={"/assets/images/mariana-silva.jpg"} alt="User" />
      </div>
    </div>
  );
}

export default Profile;
