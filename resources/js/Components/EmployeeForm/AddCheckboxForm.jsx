import React, {useEffect, useState, useRef} from 'react';
import Modal from 'react-modal';
import {Input} from "../../Components/ui/input.jsx";
import {Textarea} from "../../Components/ui/textarea.jsx";
import {DndContext, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import SortItem from "./SortItem.jsx";
import {Button} from "../../Components/ui/button.jsx";
import Checkbox_CP from "@/Components/EmployeeForm/InputsComponents/Checkbox_cp.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWandMagicSparkles} from "@fortawesome/free-solid-svg-icons";
import { Separator } from "@/Components/ui/separator"

const AddCheckboxForm = ({
                             isModalOpen,
                             setIsModalOpen,
                             currentItem,
                             setCurrentItem,
                             handleUpdateItem,
                             items,
                             setItems
                         }) => {
    const [error, setError] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [askAPI, setAskAPI] = useState("");
    const [responseAPI, setResponseAPI] = useState("");

    const handleSubmitAPI = async (event) => {
        event.preventDefault();

            const response = await axios.post('/api/v1/checkbox', {
                askAPI: askAPI,
            });
            console.log(response.data);
            setCurrentItem({...currentItem, tooltip: response.data.tooltip, description: response.data.description, label: response.data.label});
            setCurrentItem.description = response.data.description;
            setCurrentItem.label = response.data.label;
            setCurrentItem.tooltip = response.data.tooltip;
        setResponseAPI(response.data);
    };

    const handleSubmitCheck = (event) => {
        event.preventDefault();
        if (currentItem.label) {
            const existingItemIndex = items.findIndex(item => item.id === currentItem.id);
            if (existingItemIndex !== -1) {
                // The item already exists in the array, update it
                setItems(prevItems => {
                    return prevItems.map((item, index) => {
                        if (index === existingItemIndex) {
                            // This is the item we want to update
                            return currentItem;
                        } else {
                            // This is not the item we want to update, leave it as is
                            return item;
                        }
                    });
                });
            } else {
                // The item doesn't exist in the array, add it
                setItems(prevItems => [...prevItems, currentItem]);
            }
            setIsModalOpen(false);
        } else {
            setError("Please enter a label for the checkbox.")
        }
    };

    const handleEditItem = (id) => {
        const itemToEdit = items.find((item) => item.id === id);
        setCurrentItem(itemToEdit);
        setIsModalOpen(true);
    };

    const handleDragEnd = (event) => {
        const {active, over} = event;

        if (active && over && active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item && item.id === active.id);
                const newIndex = items.findIndex((item) => item && item.id === over.id);

                const newItems = arrayMove(items, oldIndex, newIndex);
                console.log(newItems);
                return newItems;
            });
        }
    };

    const handleDeleteItem = (id) => {
        setItems((items) => items.filter((item) => item.id !== id));
    };


    const handleInputChange = (id, value) => {
        setItems((items) =>
            items.map((item) =>
                item && item.id === id ? {...item, value} : item
            )
        );
    };

    const pointerSensor = useSensor(PointerSensor, {
        activationConstraint: {
            delay: 250,
            tolerance: 5,
        },
    });

    const sensors = useSensors(pointerSensor);

    useEffect(() => {
        console.log(items)
    }, [items]);

    useEffect(() => {
        console.log(currentItem)
    }, [currentItem]);

    return (
        <>
            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                <SortableContext items={items.filter(Boolean).map(item => item.id)}
                                 strategy={verticalListSortingStrategy}>
                    {items.map((item, index) => item && (
                        <SortItem key={item.id} id={item.id} item={item} onInputChange={handleInputChange}
                                  onEditItem={handleEditItem} handleDeleteItem={handleDeleteItem}/>))}
                </SortableContext>
            </DndContext>

            <Modal
                isOpen={isModalOpen}
                ariaHideApp={false}
                onRequestClose={() => setIsModalOpen(false)}
                appElement={document.getElementById('root')}
            >
                <h2 className="text-center text-xl text-black">Configure Input</h2>

                <div className="relative flex items-center">
                    <div className={"gap-2"}>
                        <Button
                            onClick={() => setShowInput(prevShowInput => !prevShowInput)}
                            className="z-10 transition-all duration-300 ease-in-out flex items-center"
                            variant="generate"
                            style={{width: showInput ? '40px' : 'auto'}}
                        >
                            <FontAwesomeIcon className="text-white" icon={faWandMagicSparkles}/>
                            <span
                                className={`text-white overflow-hidden transition-all duration-300 ease-in-out ${showInput ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                                                          Generate
                                                    </span>
                        </Button>
                    </div>
                    <div
                        className={`absolute left-0 flex items-center transition-all duration-300 ease-in-out ${
                            showInput ? 'translate-x-[44px] opacity-100' : 'translate-x-0 opacity-0 pointer-events-none'
                        }`}
                    >
                        <Input
                            type="text"
                            name="askAPI"
                            id="askAPI"
                            value={askAPI}
                            placeholder="Enter a description of the question you need, and our AI will help you!"
                            onChange={(e) => setAskAPI(e.target.value)}
                            className="w-full mr-2"
                        />
                        <Button variant="outline" onClick={() => handleSubmitAPI(currentItem)}>
                            Ask
                        </Button>
                    </div>
                </div>

                <Separator className={"my-8"}/>

                <form onSubmit={handleSubmitCheck}>
                    <label className={"text-black"}>
                        Label:
                        <Input type="text" value={currentItem.label} onChange={(e) =>
                            setCurrentItem({...currentItem, label: e.target.value})
                        }/>
                    </label>
                    <label className="text-black">
                        Tooltip:
                        <Input className="block text-black"
                               type="text"
                               value={currentItem.tooltip}
                               onChange={(e) =>
                                   setCurrentItem({...currentItem, tooltip: e.target.value})
                               }
                        />
                    </label>
                    <label className="text-black">
                        Description:
                        <Textarea
                            className="block text-black"
                            value={currentItem.description}
                            onChange={(e) =>
                                setCurrentItem({
                                    ...currentItem,
                                    description: e.target.value,
                                })
                            }
                        />
                    </label>
                    {error && <p className="text-red-500">{error}</p>}

                    <div className={"flex justify-end"}>
                        <Button type="button" onClick={handleSubmitCheck} className={"mt-4"}>
                            Submit
                        </Button>
                    </div>
                </form>

                {/*PREVIEW*/}
                <div className={"mt-12"}>
                    <h2 className={"text-black text-center text-xl"}>Preview</h2>
                    {currentItem && currentItem.label && (
                        <Checkbox_CP
                            showButtons={false}
                            handleDeleteItem={handleDeleteItem}
                            item={currentItem} id={currentItem.id}
                            onInputChange={handleInputChange}
                            setNodeRef={() => {
                            }}
                            attributes={{}}
                            listeners={{}}
                            handle={() => {
                            }}
                        />
                    )}
                </div>
            </Modal>
        </>
    );
};

export default AddCheckboxForm;
