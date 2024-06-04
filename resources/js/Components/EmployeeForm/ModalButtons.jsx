import React from "react";
import { Button } from "../../Components/ui/button.jsx";


function ModalButtons({ handleAddItem }) {
return (
  <div className="flex flex-col place-content-center items-center space-y-2 ms-8">
    <Button onClick={() => handleAddItem("text")}>Add Text Input</Button>
    <Button onClick={() => handleAddItem("checkbox")}>Add Checkbox Input</Button>
    <Button onClick={() => handleAddItem("radio")}>Add Radio Input</Button>
  </div>
);
}

export default ModalButtons;
