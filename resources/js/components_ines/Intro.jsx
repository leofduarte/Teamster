import React from 'react';
import { Button } from "@/Components/ui/button"
import bgImage from '../../../storage/app/public/images/bg-image.svg'

const Intro = () => {
  return (
    <section
    className="min-h-screen m-12 bg-cover bg-center bg-no-repeat rounded-lg flex flex-col justify-center items-center text-center"
    style={{ backgroundImage: `url(${bgImage})` }}
    id="intro"
    >
      <h1 className="text-8xl font-semibold mb-4">Turn Your Teams</h1>
      <h1 className="text-8xl font-semibold mb-4">Better</h1>
      <h1 className="text-8xl font-semibold mb-4">Together</h1>
      <Button className="px-10 py-6 text-lg mt-6" >Começar</Button>
      </section>
  );
};

export default Intro;
