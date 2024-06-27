import React from 'react';
import Logo from "../../../storage/app/public/logos/logo.svg"
import image1 from "../../../storage/app/public/images/image-1.png"
import image2 from "../../../storage/app/public/images/image-2.png"
import image3 from "../../../storage/app/public/images/image-3.png"


const AboutUs = () => {
  return (
    <section id="about">

      <h1 className="text-7xl font-bold mb-4">Sobre Nós</h1>

      <div className="flex flex-col items-center md:flex-row md:justify-around mx-12 my-24">
        <p className="text-2xl mb-2 md:w-1/3 text-center md:text-center">
          Com o Teamster consegue planear atividades de teambuilding ajustadas para melhorar a sua equipa
        </p>
        <img src={Logo} alt="Teamster Logo" className="mx-auto w-96 h-96 mb-4"/>
        <p className="text-2xl mb-2 md:w-1/3 text-center md:text-center">
          Vai conseguir melhorar o ambiente de trabalho e obter os melhores resultados
        </p>
      </div>

      <div className="text-center my-8">
        <h2 className="text-5xl p-8 font-bold">Com o Teamster Vai Poder</h2>
      </div>

      <div className="mb-12">

        <div className="flex flex-col md:flex-row my-12 justify-end">
          <div className="md:w-1/2 mt-2 flex flex-col items-start md:items-end text-center md:text-right pr-8 order-1">
            <h3 className="text-5xl font-semibold mb-4">Descobrir os temas de interesse</h3>
            <p className="text-lg">
              Um dos primeiros passos no Teamster é convidar os colaboradores enviando-lhes um questionário cujas respostas serão úteis para conhecer mais sobre os gostos das equipas para planear atividades pensadas nelas.
            </p>
          </div>
          <div className="md:w-auto flex justify-start order-2">
            <img src={image1} alt="Descobrir temas de interesse" className="w-96 h-auto rounded-lg"/>
          </div>
        </div>


        <div className="flex flex-col md:flex-row my-12 justify-end">
          <div className="md:w-1/2 flex justify-start order-1">
            <img src={image2} alt="Descobrir temas de interesse" className="w-96 h-auto rounded-lg"/>
          </div>
          <div className="md:w-auto mt-2 flex flex-col items-start text-center md:text-left pr-8 order-2">
            <h3 className="text-5xl font-semibold mb-4">Obter atividades personalizadas com IA</h3>
            <p className="text-lg">
            O Teamster utiliza a Inteligência Artificial para recomendar as melhores atividades baseadas no tipo de equipa e nos problemas da mesma.
            </p>
          </div>
        </div>


        <div className="flex flex-col md:flex-row my-12 justify-end">
          <div className="md:w-1/2 mt-2 flex flex-col items-start md:items-end text-center md:text-right pr-8 order-1">
            <h3 className="text-5xl font-semibold mb-4">Receber uma análise detalhada</h3>
            <p className="text-lg">
            Com o Teamster poderá ter acesso a gráficos com estatísticas sobre a equipa.
            </p>
          </div>
          <div className="md:w-auto flex justify-start order-2">
            <img src={image3} alt="Descobrir temas de interesse" className="w-96 h-auto rounded-lg"/>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
