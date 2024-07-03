import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGripVertical, faTrash, faEdit} from "@fortawesome/free-solid-svg-icons";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import {Button} from "@/Components/ui/button.jsx";
import {Label} from "@/Components/ui/label.jsx";
import {Input} from "@/Components/ui/input.jsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/Components/ui/tooltip.jsx";

function Text_CP({
                     id,
                     item,
                     value,
                     onInputChange,
                     onEditItem,
                     handleDeleteItem,
                     setNodeRef,
                     attributes,
                     listeners,
                     showButtons,
                     showGrab
                 }) {
    const handleChange = (e) => {
        onInputChange(id, e.target.value);
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex w-full items-center">
                    <div className="flex-grow">
                        <div className="flex">
                            {showGrab && (
                                <button type="button" className="mr-6 cursor-grab">
                                    <FontAwesomeIcon
                                        ref={setNodeRef}
                                        {...attributes}
                                        {...listeners}
                                        className="cursor-grab text-xl text-black"
                                        icon={faGripVertical}
                                    />
                                </button>
                            )}
                            <div className="flex w-full items-center">
                                <div className={"flex-col w-full"}>
                                    <div className={"flex items-center w-full gap-2 "}>
                                        <Label className="text-xl text-black">{item.label}</Label>
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
                                    <Input
                                        type={item.type}
                                        value={value}
                                        onChange={handleChange}
                                        placeholder={item.placeholder}
                                        className="w-full text-black"
                                    />
                                    {item.description && (
                                        <p className="mt-1 cursor-auto text-start text-xs text-black ms-2">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {showButtons && (
                                <div className="flex items-center justify-end">
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
        </>
    );
}

export default Text_CP;
