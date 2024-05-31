import React, {useEffect, useState, useRef} from 'react';
import Modal from 'react-modal';
import {Input} from "../../Components/ui/input.jsx";
import {Textarea} from "../../Components/ui/textarea.jsx";
import {DndContext, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import SortItem from "./SortItem.jsx";
import {Button} from "../../Components/ui/button.jsx";
import Checkbox_CP from "@/Components/EmployeeForm/InputsComponents/Checkbox_cp.jsx";

const AddCheckboxForm = ({ isModalOpen, setIsModalOpen, currentItem, setCurrentItem, handleUpdateItem, items, setItems }) => {
const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (currentItem.label) {
            handleUpdateItem({ ...currentItem });
            setItems(prevItems => [...prevItems, currentItem]);
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
        const { active, over } = event;

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
                item && item.id === id ? { ...item, value } : item
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

    return (
        <div>
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext items={items.filter(Boolean).map(item => item.id)} strategy={verticalListSortingStrategy}>
        {items.map((item, index) => item && (
                <SortItem key={item.id} id={item.id} item={item} onInputChange={handleInputChange} onEditItem={handleEditItem}    handleDeleteItem={handleDeleteItem}/>  ))}
        </SortableContext>
        </DndContext>

        <Modal
            isOpen={isModalOpen}
            ariaHideApp={false}
            onRequestClose={() => setIsModalOpen(false)}
            appElement={document.getElementById('root')}
        >
            <form onSubmit={handleSubmit}>
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
                    <Button type="button" onClick={handleSubmit} className={"mt-4"}>
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
                             setNodeRef={() => {}}
                             attributes={{}}
                             listeners={{}}
                             handle={() => {}}
                />
            )}
            </div>
        </Modal>
            </div>
    );
};

export default AddCheckboxForm;
