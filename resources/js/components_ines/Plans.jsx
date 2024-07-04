import React from 'react';
import { Button } from "@/Components/ui/button.jsx";
// import { FaCheckCircle } from "react-icons/fa";

const Plans = () => {

const planos =
[
  { title: "STARTER PACK", price: "10€", features: ["1 Equipa", "Dashboard básica"] },
  { title: "STANDART PACK", price: "20€", features: ["5 Equipas", "Dashboard básica", "Desconto com parcerias"] },
  { title: "ADVANCED PACK", price: "30€", features: ["Equipas ilimitadas", "Dashboard avançada", "Desconto com parcerias", "Asssitência telefónica"]}
]

  return (
    <section className="pt-16" id="plans">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-5xl p-8 font-bold mb-8">Planos</h2>
        <div className="flex justify-center space-x-8">
          {planos.map((plan, index) => (
            <div key={index} className="flex flex-col justify-between border p-8 rounded-lg shadow-lg h-auto w-80 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <h2 className='font-manjari font-semibold text-xl mb-4'>{plan.title}</h2>
              <div className='mb-8 flex justify-center items-center space-x-2'>
                <p className="text-4xl font-semibold">{plan.price}</p>
                <p className="text-sm">p/mês</p>
              </div>
              <div className="flex-grow text-left">
                {plan.features.map((feature, i) => (
                  <p key={i} className="flex items-center mb-2">
                    {/*<FaCheckCircle className="mr-2" />*/}
                    {feature}
                  </p>
                ))}
              </div>
              <Button className="py-4 px-6 text-lg mt-20">Escolher</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans;
