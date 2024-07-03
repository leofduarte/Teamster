import React from 'react';
import Logo from '../../../storage/app/public/logos/logo-teamster.svg'
import {InertiaLink} from "@inertiajs/inertia-react";

const Navbar = () => {
    const goToRegister = () => {
    window.location.href = '/register'
  }

  return (
    <nav className="bg-white shadow top-0 w-full z-50">
      <div className="mx-1 p-2 flex justify-between items-center">
        <img src={Logo} className="w-60" alt="Logo Teamster" />
          <a href="#about" className="font-manjari font-semibold text-xl">SOBRE NÓS</a>
          <a href="#features" className="font-manjari font-semibold text-xl">VANTAGENS</a>
          <a href="#plans" className="font-manjari font-semibold text-xl">PLANOS</a>

          <InertiaLink className={""} href={`/register`}>
                       Registar-me
          </InertiaLink>
      </div>
    </nav>
  );
};

export default Navbar;
