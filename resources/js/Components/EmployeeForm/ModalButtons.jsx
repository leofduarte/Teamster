import React from "react";
import { Button } from "../../Components/ui/button.jsx";


function ModalButtons({ handleAddItem }) {
return (
  <div className="flex flex-col place-content-center items-center space-y-8">
    <Button className={"min-w-[15rem]"} onClick={() => handleAddItem("text")}>Adicionar Pergunta Aberta</Button>
    <Button className={"min-w-[15rem]"} onClick={() => handleAddItem("checkbox")}>Adicionar Checkbox</Button>
    <Button className={"min-w-[15rem]"} onClick={() => handleAddItem("radio")}>Adicionar Escolha Múltipla</Button>
  </div>
);
}

export default ModalButtons;
