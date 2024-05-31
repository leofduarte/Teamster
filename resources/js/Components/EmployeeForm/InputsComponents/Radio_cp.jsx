import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGripVertical, faTrash, faEdit, faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/Components/ui/button.jsx";
import { Label } from "@/Components/ui/label.jsx";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";

function Radio_CP({ id, item, onInputChange, onEditItem, handleDeleteItem, setNodeRef, attributes, listeners, showButtons, showGrab }) {
    const handleOptionChange = (value) => {
        console.log('Option value:', value);
        const selectedOption = item.options.find(opt => opt.id === value);
        if (selectedOption) {
            onInputChange(id, { id: selectedOption.id, label: selectedOption.label });
        }
    };

    return (
    <div className="flex items-center justify-between">
        <div className="flex items-center justify-between w-full">
            {showGrab && (
                <button className="cursor-grab mr-6">
                    <FontAwesomeIcon
                        ref={setNodeRef}
                        {...attributes}
                        {...listeners}
                        className="text-black cursor-grab text-xl"
                        icon={faGripVertical}
                    />
                </button>
            )}

            <div className="flex justify-between items-center w-full">
                <div className="flex-grow flex items-center">
                    <div className="flex-col">
                        <Label className="text-black text-xl">{item.label}</Label>

                        <RadioGroup defaultValue="option-one" className="text-black"
                            onClick={(event) => handleOptionChange(event.target.value)}
                        >
                            {item.options.map((option) => (
                                <div key={option.id} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option.id} id={option.id}/>
                                    <label htmlFor={option.id}>{option.label}</label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                </div>
                {showButtons && (
                    <div className="flex">
                        <Button className={"ml-2 py-2 px-3"} onClick={() => onEditItem(id)}>
                            <FontAwesomeIcon icon={faEdit} className={" w-4 h-4"}/>
                        </Button>
                        <Button variant={"destructive"} className={"ml-2 py-2 px-3"}
                                onClick={() => handleDeleteItem(id)}>
                            <FontAwesomeIcon icon={faTrash} className={" w-4 h-4"}/>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    </div>
);
}

export default Radio_CP;
