import React from "react";
import logo from "../../../public/build/assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

function Layout(props) {
  const atividadeData = JSON.parse(localStorage.getItem("atividadeData")) || [];
  const atividades = atividadeData.map((atividade, index) => {
    const nome = atividade[0] || "atividade sem nome";
    return (
      <div key={index} className="mb-2 pb-2 border-b-2 border-gray-300 hover:border-black w-[80%]">
        <button className="hover:border-black">
        <p>
          {nome} <FontAwesomeIcon icon={faAngleRight} className="ml-6" />
        </p>
        </button>
      </div>
    );
  });

  return (
    <div className="flex h-screen">
      {/* Left Bar */}
      <div
        className="flex h-full w-[17%] bg-white text-stone-700"
        role="navigation"
      >
        <div className="w-full flex flex-col">
          <div className="self-center content-center h-[10%]">
            <img src={logo} className="h-20" alt="Logo" />
          </div>
          <ul className="content-center">
            <div className="h-1/2 ">
              <div className="py-2 border-e-4 border-solid border-white hover:border-gray-800">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full text-left cursor-pointer ms-5"
                >
                  Dashboard
                </button>
              </div>
              <div className="py-2 border-e-4 border-solid border-white hover:border-gray-800">
                <button className="w-full text-left cursor-pointer ms-5">
                  Planear Atividade
                </button>
              </div>
              <div className="py-2 border-e-4 border-solid border-white hover:border-gray-800">
                <button className="w-full text-left cursor-pointer ms-5">
                  Análise
                </button>
              </div>
            </div>
          </ul>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 w-screen h-screen py-6 px-10 bg-[#F8F7FC]">
        {props.children}
      </div>

      {/* Right Bar */}
      <div className="flex h-full w-[20%] bg-white">
        <div className="w-full flex flex-col">
          <div className="text-center flex flex-col items-center">
            <h2 className="text-3xl font-serif mb-3">+ Atividades</h2>

            {atividades.length > 0 ? (
              atividades
            ) : (
              <p className="text-gray-500">Nenhuma atividade encontrada</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export { Layout };
