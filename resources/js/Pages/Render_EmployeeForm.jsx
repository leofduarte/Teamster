import React, {useState} from 'react';
import Checkbox_CP from "@/Components/EmployeeForm/InputsComponents/Checkbox_cp.jsx";
import Text_CP from "@/Components/EmployeeForm/InputsComponents/Text_cp.jsx";
import Radio_CP from "@/Components/EmployeeForm/InputsComponents/Radio_cp.jsx";
import AuthenticatedLayout from "../Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import {Button} from "@/Components/ui/button.jsx";

const Render_EmployeeForm = ({ items: initialItems, auth, id }) => {
    const [items, setItems] = useState(initialItems);
    const [inputValues, setInputValues] = useState({});

    if (!items) {
        return <div>Loading...</div>;
    }
    console.log('Items:', items);

    const handleInputChange = (id, value) => {
        setInputValues(prevValues => ({
            ...prevValues,
            [id]: value,
        }));

        setItems(prevItems => prevItems.map(item => item.id === id ? { ...item, value } : item));
    };

    const parsedItems = items.map(item => {
        return {
            ...item,
            value: item.type === 'checkbox' ? false : item.value,
            options: Array.isArray(item.options) ? item.options : JSON.parse(item.options)
        };
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Employee Form</h2>}
        >
            <Head title="Render Employee Form"/>

            <div className={"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}>


                {parsedItems && parsedItems.map(item => {
                    return (
                        <div key={item.id} className="">
                            {item.type === 'text' && (
                                <div className={"py-6 px-4 my-8 bg-white rounded-lg"}>
                                    <h1 className={"text-3xl"}>
                                        {item.id}
                                    </h1>
                                    <Text_CP
                                        id={item.id}
                                        item={item}
                                        options={item.options}
                                        showButtons={false}
                                        value={inputValues[item.id] || ''}
                                        onInputChange={handleInputChange}
                                    />
                                </div>
                            )}
                            {item.type === 'checkbox' && (
                                <div className={"py-6 px-4 my-8 bg-white rounded-lg"}>
                                    <h1 className={"text-3xl"}>
                                        {item.id}
                                    </h1>
                                    <Checkbox_CP
                                        id={item.id}
                                        item={item}
                                        options={item.options}
                                        showButtons={false}
                                        onInputChange={(isChecked) => handleInputChange(item.id, isChecked ? "1" : "0")}/>
                                </div>
                            )}
                            {item.type === 'radio' && (
                                <div className={"py-6 px-4 my-8 bg-white rounded-lg"}>
                                    <h1 className={"text-3xl"}>
                                        {item.id}
                                    </h1>
                                    <Radio_CP
                                        id={item.id}
                                        item={item}
                                        options={item.options}
                                        showButtons={false}
                                        onInputChange={handleInputChange}
                                    />
                                </div>
                            )}

                        </div>
                    );
                })}
                {items.length > 0 && (
                    <div className="flex justify-end mt-8 pb-8">
                        <Button variant={"success"}>Submit</Button>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Render_EmployeeForm;
