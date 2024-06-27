import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/Components/ui/button.jsx";
import { Label } from "@/Components/ui/label.jsx";
import { Checkbox } from "@/Components/ui/checkbox.jsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip.jsx";

function Checkbox_CP({ id, item, onInputChange, onEditItem, handleDeleteItem, setNodeRef, attributes, listeners, showButtons, showGrab }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                {showGrab && (
                <button className="mr-6 cursor-grab">
                    <FontAwesomeIcon
                        ref={setNodeRef}
                        {...attributes}
                        {...listeners}
                        className="cursor-grab text-xl text-black"
                        icon={faGripVertical}
                    />
                </button>
                )}

                <div className="flex w-full items-center space-x-2">

                    <Checkbox
                        onClick={() => {
                            onInputChange(id, !item.value);
                        }}
                        className="checkbox-styles"
                    />
                    <div>
                        <div className="flex items-center gap-2">
                            <Label
                                htmlFor="terms1"
                                className="text-xl text-black"
                            >
                                {item.label}
                            </Label>
                            {item.tooltip && (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <FontAwesomeIcon
                                                className="cursor-pointer text-black"
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
                                <p className="text-start text-xs text-black text-muted-foreground">
                                    {item.description}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {showButtons && (
            <div className={"flex"}>
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
