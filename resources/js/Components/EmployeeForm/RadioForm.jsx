import React, {useEffect, useState} from 'react';
import {Input} from "../../Components/ui/input.jsx";
import {Button} from "../../Components/ui/button.jsx";
import {RadioGroup, RadioGroupItem} from "@/Components/ui/radio-group.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import Radio_CP from "@/Components/EmployeeForm/InputsComponents/Radio_cp.jsx";

const RadioForm = ({item, onSubmit}) => {

    const [value, setValue] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if(item) {
            let temp = item
            if(!temp?.options?.length) {
                temp.options = [
                    { id: "option-1", label: "" },
                    { id: "option-2", label: "" },
                    { id: "option-3", label: "" },
                    { id: "option-4", label: "" },
                ];
            }

            console.log("temp", temp)
            setValue(temp);
        }
    }, [item]);

    const handleSubmitRadio = (event) => {
        event.preventDefault();

        if (value?.label) {
            let temp = value;
            temp.options = temp.options.filter(option => option.label !== "");
            onSubmit(temp);
        } else {
            setError("Please enter a label for the checkbox.")
        }
    };

    const addOption = (ev) => {
        ev.preventDefault();

        const newOption = {
            id: `option-${value?.options?.length + 1}`,
            label: "",
        };
        setValue((prevValue) => ({
            ...prevValue,
            options: [...prevValue?.options, newOption],
        }));
    }

    const editOption = (id, value) => {
        setValue((prevValue) => ({
            ...prevValue,
            options: prevValue.options.map((option) => {
                if (option.id === id) {
                    return {...option, label: value};
                }
                return option;
            })
        })
        );
    };

    const deleteOption = (id) => {
        setValue((prevValue) => ({
                ...prevValue,
                options: prevValue.options.filter((option) => option.id !== id)
            })
        );
    };

    return (
        <>
            <form onSubmit={handleSubmitRadio}>
                <RadioGroup defaultValue="option-one" className="text-black">
                    <Input
                        type="text"
                        id="label"
                        placeholder={"Insert question here"}
                        className="text-black"
                        onChange={e => setValue(prevValue => ({...prevValue, label: e.target.value})) }
                        value={value?.label}
                    />

                    {Array.isArray(value?.options) && value.options.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={option.id} id={option.id} />
                                <Input
                                    type="text"
                                    value={option.label}
                                    onChange={(e) => editOption(option.id, e.target.value)}
                                    placeholder="Enter option label"
                                />

                                <Button onClick={() => deleteOption(option.id)}>
                                    <FontAwesomeIcon icon={faTrashCan}/>
                                </Button>
                        </div>
                    ))}
                </RadioGroup>
                <Button type="button" onClick={addOption}>Add Option</Button>

                {error && <p className="text-red-500">{error}</p>}

                <div className={"flex justify-end"}>
                    <Button type="button" onClick={handleSubmitRadio} className={"mt-4"}>
                        Save
                    </Button>
                </div>
            </form>

            {/*PREVIEW*/}
            <div className={"mt-12"}>
                <h2 className={"text-black text-center text-xl"}>Preview</h2>
                {value && (
                    <Radio_CP
                        onEditItem={() => {}}
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

export default RadioForm;
