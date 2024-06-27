import React from 'react';
import { Button } from "@/Components/ui/button"

const Plans = () => {
  return (
    <section className="pt-16" id="plans">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-5xl p-8 font-bold mb-8">Planos</h2>
        <div className="flex justify-center space-x-8">
          <div className="flex flex-col justify-between border p-12 rounded-lg shadow-lg h-96 w-64">
            <p className="text-4xl font-semibold mb-4">10€</p>
            <div className="flex-grow"></div>
            <Button className="py-4 px-6 text-lg">Escolher</Button>
          </div>

          <div className="flex flex-col justify-between border p-12 rounded-lg shadow-lg h-96 w-64">
            <p className="text-4xl font-semibold mb-4">20€</p>
            <div className="flex-grow"></div>
            <Button className="py-4 px-6 text-lg">Escolher</Button>
          </div>

          <div className="flex flex-col justify-between border p-12 rounded-lg shadow-lg h-96 w-64">
            <p className="text-4xl font-semibold mb-4">30€</p>
            <div className="flex-grow"></div>
            <Button className="py-4 px-6 text-lg">Escolher</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Plans;
