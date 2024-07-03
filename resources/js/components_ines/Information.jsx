import React, { useState, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import axios from "axios"; // Make sure to import axios

const Information = ({ onNext, onPrev, id }) => {
    const [name, setName] = useState("");
    console.log("id:", id);

    // Function to save the name in the database
    const saveName = async () => {
        if (!isFormValid()) {
            console.error("Form is not valid");
            return;
        }

        if (!id) {
            console.error("ID is undefined");
            return;
        }

        try {
            const response = await axios.post(
                `/api/v1/saveParticipantsInfo/${id}`,
                {
                    name: name.trim(),
                }
            );
            console.log("Name saved:", response.data);
            onNext(); // Call onNext after successful save
        } catch (error) {
            console.error("Failed to save name:", error);
        }
    };

    // Function to check if the form is valid
    const isFormValid = () => {
        return name.trim() !== "";
    };

    return (
        <>
            <h2 className="text-3xl font-bold mb-8">
                Questionário de interesses
            </h2>
            <div className="p-8 w-full max-w-2xl">
                <div className="flex flex-col gap-8 mb-20">
                    <div className="flex-1">
                        <label className="block text-sm mb-2">Nome</label>
                        <Input
                            variant="activity"
                            type="text"
                            className="mt-1 p-2 w-full border rounded"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex justify-between">
                    <Button variant="outline" className="px-6" onClick={onPrev}>
                        Voltar
                    </Button>
                    <Button
                        className="px-6"
                        onClick={saveName}
                        disabled={!isFormValid()}
                    >
                        Prosseguir
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Information;
