import React, { useState } from 'react';
import {Input} from "../../Components/ui/input.jsx";
import {Textarea} from "../../Components/ui/textarea.jsx";
import {Button} from "../../Components/ui/button.jsx";
import Checkbox_CP from "@/Components/EmployeeForm/InputsComponents/Checkbox_cp.jsx";

const CheckboxForm = ({ item,  onSubmit }) => {

    const [value, setValue] = useState(item);
    const [error, setError] = useState("");

    const handleSubmitCheck = (event) => {
        event.preventDefault();

        if(value?.label) {
            onSubmit(value);
        } else {
            setError("Please enter a label for the checkbox.")
        }
    };

    return (
        <>
                <form onSubmit={handleSubmitCheck}>
                    <label className={"text-black"}>
                        Label:
                        <Input type="text" value={value.label} onChange={(e) =>
                            setValue({...value, label: e.target.value})
                        }/>
                    </label>
                    <label className="text-black">
                        Tooltip:
                        <Input className="block text-black"
                               type="text"
                               value={value.tooltip}
                               onChange={(e) =>
                                   setValue({...value, tooltip: e.target.value})
                               }
                        />
                    </label>
                    <label className="text-black">
                        Description:
                        <Textarea
                            className="block text-black"
                            value={value.description}
                            onChange={(e) =>
                                setValue({
                                    ...value,
                                    description: e.target.value,
                                })
                            }
                        />
                    </label>
                    {error && <p className="text-red-500">{error}</p>}

                    <div className={"flex justify-end"}>
                        <Button type="button" onClick={handleSubmitCheck} className={"mt-4"}>
                            Save
                        </Button>
                    </div>
                </form>

                {/*PREVIEW*/}
                <div className={"mt-12"}>
                    <h2 className={"text-black text-center text-xl"}>Preview</h2>
                    {value && (
                        <Checkbox_CP
                            showButtons={false}
                            item={value}
                            id={value.id}
                            onInputChange={() => {}}
                            setNodeRef={() => {}}
                            attributes={{}}
                            listeners={{}}
                            handle={() => {}}
                        />
                    )}
                </div>
        </>
    );
};

export default CheckboxForm;
