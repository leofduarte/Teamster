import React, { useState } from 'react';
import ModalButtons from "@/Components/EmployeeForm/ModalButtons.jsx";
import AddTextForm from "@/Components/EmployeeForm/AddTextForm.jsx";
import AddCheckboxForm from "@/Components/EmployeeForm/AddCheckboxForm.jsx";
import AddRadioForm from "@/Components/EmployeeForm/AddRadioForm.jsx";
import {Head, router} from "@inertiajs/react";
import AuthenticatedLayout from "../Layouts/AuthenticatedLayout.jsx";
import {Button} from "../Components/ui/button.jsx";

const EmployeeForm = ({auth, errors, message}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [items, setItems] = useState([]);

    const handleInputChange = (id, newValue) => {
        setItems((prevItems) => {
            return prevItems.map((item) => {
                if (item.id === id) {
                    return { ...item, value: newValue };
                } else {
                    return item;
                }
            });
        });
    };

    const handleAddItem = (type) => {
        const id = Math.random().toString(36).substr(2, 9);
        setCurrentItem({
            id,
            type,
            label: "",
            value: "",
            placeholder: "",
            tooltip: "",
            description: "",
        });
        setIsModalOpen(true);
    };

    const handleDeleteItem = (id) => {
        setItems((items) => items.filter((item) => item.id !== id));
    };

    const handleUpdateItem = (updatedItem) => {
        setCurrentItem(updatedItem);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(items)
        router.post('/items', {
            items: items,
        })
    };

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Employee Form</h2>}
            >
                <Head title="Employee Form" />

        <div className="flex justify-between mt-8 max-w-7xl min-h-[80vh] mx-auto">
            <div className={"w-full border-gray-700 border-e"}>
                {currentItem && (
                    <>
                        <form onSubmit={handleSubmit}>
                            {currentItem.type === 'text' && (
                                <AddTextForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
                                             currentItem={currentItem} setCurrentItem={setCurrentItem}
                                             handleUpdateItem={handleUpdateItem} items={items} setItems={setItems}
                                             handleDeleteItem={handleDeleteItem} showButtons={false}
                                />
                            )}
                            {currentItem.type === 'checkbox' && (
                                <AddCheckboxForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
                                                 currentItem={currentItem} setCurrentItem={setCurrentItem}
                                                 handleUpdateItem={handleUpdateItem} items={items} setItems={setItems}
                                                 handleDeleteItem={handleDeleteItem} handleInputChange={handleInputChange} showButtons={false}
                                />
                            )}
                            {currentItem.type === 'radio' && (
                                <AddRadioForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
                                              currentItem={currentItem} setCurrentItem={setCurrentItem}
                                              handleUpdateItem={handleUpdateItem} items={items} setItems={setItems}
                                              handleDeleteItem={handleDeleteItem} showButtons={false}
                                />
                            )}
                            {items.length > 0 && (
                            <div className="flex justify-end mt-16 mr-6">
                                <Button variant={"success"} onClick={handleSubmit}>Submit</Button>
                            </div>
                            )}
                        </form>
                    </>
                )}

                {message && (
                <p>{message}</p>
                )}

            </div>
            <ModalButtons handleAddItem={handleAddItem}/>
        </div>
            </AuthenticatedLayout>
            </>

    );
}

export default EmployeeForm;
