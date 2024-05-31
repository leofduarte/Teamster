import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/Components/ui/button.jsx";
import { Label } from "@/Components/ui/label.jsx";
import { Checkbox } from "@/Components/ui/checkbox.jsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip.jsx";

function Checkbox_CP({ id, item, onInputChange, onEditItem, handleDeleteItem, setNodeRef, attributes, listeners, showButtons, showGrab }) {

    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center">
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

                <div className="items-center flex space-x-2 w-full">

                    <Checkbox
                        onClick={() => {
                            onInputChange(id, !item.value);
                        }}
                        className="checkbox-styles"
                    />
                    <div>
                        <div className="gap-2 flex items-center">
                            <Label
                                htmlFor="terms1"
                                className="text-black text-xl"
                            >
                                {item.label}
                            </Label>
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
                        <div>
                            {item.description && (
                                <p className="text-black text-xs text-muted-foreground text-start">
                                    {item.description}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {showButtons && (
            <div>
                <Button className={"ml-2 py-2 px-3"} onClick={() => onEditItem(id)}>
                    <FontAwesomeIcon icon={faEdit} className={" w-4 h-4"} />
                </Button>
                <Button variant={"destructive"} className={"ml-2 py-2 px-3"} onClick={() => handleDeleteItem(id)}>
                    <FontAwesomeIcon icon={faTrash} className={" w-4 h-4"} />
                </Button>
            </div>
            )}
        </div>
    );
}

export default Checkbox_CP;
