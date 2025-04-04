import React, {useState} from 'react';
import ModalButtons from "@/Components/EmployeeForm/ModalButtons.jsx";
import AddTextForm from "@/Components/EmployeeForm/AddTextForm.jsx";
import AddCheckboxForm from "@/Components/EmployeeForm/AddCheckboxForm.jsx";
import AddRadioForm from "@/Components/EmployeeForm/AddRadioForm.jsx";
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "../Layouts/AuthenticatedLayout.jsx";
import {Button} from "../Components/ui/button.jsx";
import {toast} from "@/Components/ui/use-toast.js";
import axios from "axios";

const EmployeeForm = ({auth, errors, message}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [items, setItems] = useState([]);


    const handleInputChange = (id, newValue) => {
        setItems((prevItems) => {
            return prevItems.map((item) => {
                if (item.id === id) {
                    return {...item, value: newValue};
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(items)

        try {
            const response = await axios.post('/api/v1/items', {
                items: items,
            })
            console.log(response);

            toast({
                variant: "success",
                title: "Success!",
                description: `${response.data.message}`,
            });
        } catch (error) {
            console.error(error);
            toast({
                variant: "desctructive",
                title: "Error!",
                description: `${error.response.data.message}`,
            });
        }
    };

    return (
        <div>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Employee Form</h2>}
            >
                <Head title="Employee Form" />

                <div className="py-12 ">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 flex justify-end items-center">
                                {currentItem ? (
                                    <>
                                        <form onSubmit={handleSubmit} className={"flex-grow"}>
                                            {currentItem.type === 'text' && (
                                                <AddTextForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
                                                             currentItem={currentItem} setCurrentItem={setCurrentItem}
                                                             handleUpdateItem={handleUpdateItem} items={items}
                                                             setItems={setItems}
                                                             handleDeleteItem={handleDeleteItem} showButtons={false}
                                                />
                                            )}
                                            {currentItem.type === 'checkbox' && (
                                                <AddCheckboxForm isModalOpen={isModalOpen}
                                                                 setIsModalOpen={setIsModalOpen}
                                                                 currentItem={currentItem}
                                                                 setCurrentItem={setCurrentItem}
                                                                 handleUpdateItem={handleUpdateItem} items={items}
                                                                 setItems={setItems}
                                                                 handleDeleteItem={handleDeleteItem}
                                                                 handleInputChange={handleInputChange}
                                                                 showButtons={false}
                                                />
                                            )}
                                            {currentItem.type === 'radio' && (
                                                <AddRadioForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
                                                              currentItem={currentItem} setCurrentItem={setCurrentItem}
                                                              handleUpdateItem={handleUpdateItem} items={items}
                                                              setItems={setItems}
                                                              handleDeleteItem={handleDeleteItem} showButtons={false}
                                                />
                                            )}
                                        </form>
                                    </>
                                ) : (
                                    <div className="flex-grow">
                                    <p className="text-gray-500">Click on the buttons at the end to add items to the form</p>
                                    </div>
                                    )}
                                <div className={"border-l border-black"}>
                                <ModalButtons handleAddItem={handleAddItem}/>
                                </div>
                            </div>
                        </div>
                        {items.length > 0 && (
                            <div className="mt-16 mr-6 flex justify-end">
                                <Button onClick={handleSubmit}>Submit</Button>
                            </div>
                        )}
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}

export default EmployeeForm;
