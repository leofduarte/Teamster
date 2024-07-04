import React from 'react';
import Logo from '../../../storage/app/public/logos/logo-teamster.svg'
import {InertiaLink} from "@inertiajs/inertia-react";
import {faRightToBracket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Navbar = () => {

  return (
    <nav className="bg-white shadow top-0 w-full z-50">
      <div className="mx-1 p-2 flex justify-between items-center">
        <img src={Logo} className="w-60" alt="Logo Teamster" />
          <a href="#about" className="font-manjari font-semibold text-xl">SOBRE NÓS</a>
          <a href="#features" className="font-manjari font-semibold text-xl">VANTAGENS</a>
          <a href="#plans" className="font-manjari font-semibold text-xl">PLANOS</a>

          <InertiaLink className={"me-8 text-xl"} href={`/plannerorparticipant`}>
              <FontAwesomeIcon icon={faRightToBracket} className={"me-2"}/>
              Entrar
          </InertiaLink>
      </div>
    </nav>
  );
};

export default Navbar;
