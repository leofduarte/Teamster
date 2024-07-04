import React from 'react';
import icon1 from "../../../storage/app/public/icons/icon-1.svg";
import icon2 from "../../../storage/app/public/icons/icon-2.svg";
import icon3 from "../../../storage/app/public/icons/icon-3.svg";
import icon4 from "../../../storage/app/public/icons/icon-4.svg";


const Features = () => {
  return (
    <section className="py-16" id="features">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-5xl p-8 font-bold mb-8">Vantagens do Teamster</h2>

        <div className="flex flex-wrap justify-center">

          <div className="w-full md:w-1/2 px-4 mb-8">
            <div className="p-6">
              <img src={icon1} alt="Todos Juntos" className="w-24 h-24 mx-auto mb-4" />
              <h3 className="text-3xl font-semibold mb-2">Todos Juntos</h3>
              <p>
                Para o planeamento de todas as atividades levamos em consideração os
                impedimentos de todas as pessoas (alergias, intolerância e até mesmo o medo de nadar).
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 px-4 mb-8">
            <div className="p-6">
              <img src={icon2} alt="Personalização" className="w-24 h-24 mx-auto mb-4" />
              <h3 className="text-3xl font-semibold mb-2">Personalização</h3>
              <p>
                No Teamster assume o controlo - caso não goste de um pormenor
                pode alterá-lo e ajustar à sua maneira.
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 px-4 mb-8">
            <div className="p-6">
              <img src={icon3} alt="Melhoria com Feedback" className="w-24 h-24 mx-auto mb-4" />
              <h3 className="text-3xl font-semibold mb-2">Melhoria com Feedback</h3>
              <p>
                Após cada atividade o Teamster recolhe feedback dos participantes
                para saber onde pode melhorar.
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 px-4 mb-8">
            <div className="p-6">
              <img src={icon4} alt="Pro/ Menino e Pra/ Menina" className="w-24 h-24 mx-auto mb-4" />
              <h3 className="text-3xl font-semibold mb-2">Pro/ Menino e Pra/ Menina</h3>
              <p>
                As atividades do Teamster foram feitas para agradar a todos,
                sendo planeadas tendo em conta os gostos e preferências de cada um.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Features;
