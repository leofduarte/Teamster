import React from 'react';

function Profile({id}) {

  console.log(id);

  console.log(id.user.name);

  return (
    <div className="p-6 joyride-profile">
      <div className="flex justify-end items-center">
        <div className="mr-4 text-right">
          <p className="text-lg font-medium">{id.user.name}</p>
          <p><a href={route('profile.edit')} className="underline hover:text-slate-600">Editar perfil</a></p>
        </div>
        <img className="w-12 h-12 rounded-full bg-gray-200" src={`https://api.dicebear.com/9.x/identicon/svg?seed=${id.user.email}`} alt="User" />
      </div>
    </div>
  );
}

export default Profile;
