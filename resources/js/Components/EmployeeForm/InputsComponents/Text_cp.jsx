import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/Components/ui/button.jsx";
import { Label } from "@/Components/ui/label.jsx";
import { Input } from "@/Components/ui/input.jsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip.jsx";

function Text_CP({ id, item, value, onInputChange, onEditItem, handleDeleteItem, setNodeRef, attributes, listeners, showButtons, showGrab }) {

    const handleChange = (e) => {
        onInputChange(id, e.target.value);
    }

   return (
    <div className="flex items-center justify-between">
        <div className="flex items-center w-full">
            <div className="flex-grow">
                <div className="flex">
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
                    <div className="flex items-center w-full">
                        <div className={"flex-col w-full"}>
                             <div className={"flex items-center w-full gap-2 "}>
                        <Label className="text-black text-xl">{item.label}</Label>
                        {item.tooltip && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <FontAwesomeIcon
                                            className="text-black cursor-pointer"
                                            icon={faCircleInfo}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>{item.tooltip}</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </div>
                    <Input
                        type={item.type}
                        value={value}
                        onChange={handleChange}
                        placeholder={item.placeholder}
                        className="text-black w-full"
                    />
                        {item.description && (
                            <p className="text-black text-xs mt-1 ms-2 text-start cursor-auto">
                                {item.description}
                            </p>
                        )}
                        </div>
                    </div>
                    {showButtons && (
                        <div className="flex justify-end items-center">
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
</div>
);
}

export default Text_CP;
