import React from 'react';
import { NavLink } from 'react-router-dom';

// COMPONENTE INATIVA

function Menu() {
  return (
    <div className="sidebar bg-white p-5">
      <div className="logo text-2xl font-bold mb-5">Teamster</div>
      <nav>
        <ul className="list-none p-0">
          <li className="mb-2">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "text-gray-800 font-bold no-underline" : "text-gray-800 no-underline")}
            >
              Dashboard
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/planear-atividade"
              className={({ isActive }) => (isActive ? "text-gray-800 font-bold no-underline" : "text-gray-800 no-underline")}
            >
              Planear Atividade
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/analise"
              className={({ isActive }) => (isActive ? "text-gray-800 font-bold no-underline" : "text-gray-800 no-underline")}
            >
              Análise
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Menu;
