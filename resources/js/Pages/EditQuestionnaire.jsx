import React, {useEffect, useState} from 'react';
import ModalButtons from "@/Components/EmployeeForm/ModalButtons.jsx";
import AddTextForm from "@/Components/EmployeeForm/AddTextForm.jsx";
import AddCheckboxForm from "@/Components/EmployeeForm/AddCheckboxForm.jsx";
import AddRadioForm from "@/Components/EmployeeForm/AddRadioForm.jsx";
import {Head} from "@inertiajs/react";
import {Button} from "../Components/ui/button.jsx";
import {Input} from "@/Components/ui/input.jsx";
import {Layout} from "@/Pages/Layout.jsx";
import Modal from "@/Components/Modal.jsx";
import Text_CP from "@/Components/EmployeeForm/InputsComponents/Text_cp.jsx";
import Checkbox_CP from "@/Components/EmployeeForm/InputsComponents/Checkbox_cp.jsx";
import Radio_CP from "@/Components/EmployeeForm/InputsComponents/Radio_cp.jsx";
import {toast} from "@/Components/ui/use-toast.js";

const EditQuestionnaire = ({questionnaire, questions}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [items, setItems] = useState([]);
    const [questionnaire_id, setQuestionnaire_id] = useState(questionnaire.id);
    const [errorMessage, setErrorMessage] = useState(null);
    const [question, setQuestion] = useState([]);
    const [isWatchFormModalOpen, setIsWatchFormModalOpen] = useState(false);

    const handleInputChange = (id, value) => {
        setItems(prevItems => prevItems.map(item => item.id === id ? {...item, value} : item));
    };

    const handleAddItem = (type) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newItem = {
            id,
            type,
            label: "",
            value: "",
            placeholder: "",
            tooltip: "",
            description: "",
            isFetched: false,
        };
        setItems(prevItems => {
            if (prevItems.some(item => item.id === id)) {
                return prevItems;
            }
            return [...prevItems, newItem];
        });
        setCurrentItem(newItem);
        setIsModalOpen(true);
    };

    const handleDeleteItem = (id) => {
        setItems((items) => items.filter((item) => item.id !== id));
    };

    const handleUpdateItem = (updatedItem) => {
        setItems(prevItems => {
            const index = prevItems.findIndex(item => item.id === updatedItem.id);
            if (index !== -1) {
                return [...prevItems.slice(0, index), updatedItem, ...prevItems.slice(index + 1)];
            }
            return prevItems;
        });
        setIsModalOpen(false);
    };

    const handleSubmitFormToDB = async (e) => {
        e.preventDefault();
        try {
            const allQuestions = [...items, ...question].map(item => ({
                ...item,
                options: Array.isArray(item.options) ? item.options : [item.options],
                is_mandatory: item.is_mandatory || false,
            }));
            const response = await axios.post('/api/v1/add-update-questions', {
                items: allQuestions,
                questionnaire_id: questionnaire_id,
                is_mandatory: true,
            });
            toast({
                variant: "success",
                title: "Success!",
                description: `${response.data.message}`,
            });
        } catch (error) {
            if (error.response.status === 422 || error.response.status === 400) {
                setErrorMessage("Please fill out the Input.");
                toast({
                    variant: "destructive",
                    title: "Error!",
                    description: `An error occurred while adding the questionnaire. ${errorMessage}`,
                });
            }
            console.error(error);
        }
    };

    const handleWatchForm = () => {
        setIsWatchFormModalOpen(true);
    };

    const handleEditItem = (id) => {
        const itemToEdit = items.find((item) => item.id === id) || questions.find((question) => question.id === id);
        if (itemToEdit) {
            setCurrentItem(itemToEdit);
            setIsModalOpen(true);
        } else {
            console.error(`Item with id ${id} not found in items or questions array`);
        }
    };

    const goBack = () => {
        window.history.back();
    };

    useEffect(() => {
        if (questions) {
            const mandatoryQuestions = questions.filter(question => question.is_mandatory);
            const nonMandatoryQuestions = questions.filter(question => !question.is_mandatory);
            setItems(nonMandatoryQuestions);
            setQuestion(mandatoryQuestions);
        }
    }, [questions]);

    useEffect(() => {
        if (questionnaire_id === null) {
            setErrorMessage("Please fill out this field.");
        }
    }, [questionnaire_id]);

    console.log("items", items);
    console.log("question", question);

    return (
        <div>
            <Layout sidebar={
                <div className={"flex items-center justify-center h-screen w-full"}>
                    <ModalButtons handleAddItem={handleAddItem}/>
                </div>
            }>
                <Head title="Formulário de Feedback"/>

                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 pt-12">
                    <div className="overflow-hidden">
                        <div className="p-6 text-gray-900">
                            <h1 className={"text-3xl font-bold text-black"}>
                                Formulário de Feedback
                            </h1>
                            <div className={"my-6 flex flex-col justify-between"}>
                                <h2 className={"text-2xl font-serif uppercase"}>Está na hora de analisar resultados</h2>
                                <p className={"text-gray-500"}>
                                    Pergunte aos seus colaboradores o que pensam sobre a atividade
                                </p>

                                <form onSubmit={handleSubmitFormToDB} className={"flex-grow"}>
                                    {question && question.map((question, index) => (
                                        <div key={index}
                                             className={"my-4 bg-white p-4 min-h-fit rounded-xl gap-4 flex flex-col shadow-lg"}>
                                            {question.type === 'text' && (
                                                <Text_CP
                                                    id={question.id}
                                                    item={question}
                                                    options={question.options}
                                                    showGrab={!question.is_mandatory}
                                                    showButtons={!question.is_mandatory}
                                                    onInputChange={(e) => handleInputChange(question.id, e.target.value)}
                                                    onEditItem={handleEditItem}
                                                    handleDeleteItem={handleDeleteItem}
                                                />
                                            )}
                                            {question.type === 'checkbox' && (
                                                <Checkbox_CP
                                                    id={question.id}
                                                    item={question}
                                                    showGrab={!question.is_mandatory}
                                                    options={question.options}
                                                    showButtons={!question.is_mandatory}
                                                    handleUpdateItem={handleUpdateItem}
                                                    onInputChange={(isChecked) => handleInputChange(question.id, isChecked ? "1" : "0")}
                                                    onEditItem={handleEditItem}
                                                    handleDeleteItem={handleDeleteItem}
                                                />
                                            )}
                                            {question.type === 'radio' && (
                                                <Radio_CP
                                                    id={question.id}
                                                    item={question}
                                                    options={Array.isArray(question.options) ? question.options : [question.options]}
                                                    showGrab={!question.is_mandatory}
                                                    showButtons={!question.is_mandatory}
                                                    onInputChange={(itemOption) => {
                                                        const itemsArray = Array.isArray(JSON.parse(question.options)) ? JSON.parse(question.options) : [JSON.parse(question.options)];
                                                        const selectedItemObject = itemsArray.find(opt => opt.id === itemOption);
                                                        handleInputChange(question.id, {
                                                            id: selectedItemObject.id,
                                                            label: selectedItemObject.label
                                                        });
                                                    }}
                                                    onEditItem={handleEditItem}
                                                    handleDeleteItem={handleDeleteItem}
                                                />
                                            )}
                                        </div>
                                    ))}

                                    <p>aqui vai ser o items</p>

                                    {currentItem && (
                                        <div>
                                            {currentItem.type === 'text' && (
                                                <AddTextForm isModalOpen={isModalOpen}
                                                             setIsModalOpen={setIsModalOpen}
                                                             currentItem={currentItem}
                                                             setCurrentItem={setCurrentItem}
                                                             handleUpdateItem={handleUpdateItem}
                                                             items={items}
                                                             setItems={setItems}
                                                             handleDeleteItem={handleDeleteItem}
                                                             showButtons={false}
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
                                        </div>
                                    )}
                                    <p>fim item</p>

{/*{items && (
<>
{currentItem && currentItem.type === 'text' && (
<AddTextForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
currentItem={currentItem} setCurrentItem={setCurrentItem}
handleUpdateItem={handleUpdateItem} items={items}
setItems={setItems}
handleDeleteItem={handleDeleteItem} showButtons={false}
/>
)}
{currentItem && currentItem.type === 'checkbox' && (
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
{currentItem && currentItem.type === 'radio' && (
<AddRadioForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
currentItem={currentItem} setCurrentItem={setCurrentItem}
handleUpdateItem={handleUpdateItem} items={items}
setItems={setItems}
handleDeleteItem={handleDeleteItem} showButtons={false}
/>
)}
{currentItem && (
<div> { currentItem.type }</div>
)}

</>
)}*/}
                                </form>
                            </div>

                            <Modal show={isWatchFormModalOpen} onClose={() => setIsWatchFormModalOpen(false)}
                                   closeable={false}>
                                <div className="p-4 min-h-full bg-[#F8F7FC]">
                                    <h2 className={"text-2xl font-bold mb-4"}>
                                        Pré-Visualização do Formulário
                                    </h2>
                                    {question && question.map((question, index) => (
                                        <div key={index}
                                             className={"my-4 bg-white p-4 min-h-fit rounded-xl gap-4 flex flex-col shadow-lg"}>
                                            {question.type === 'text' && <Text_CP
                                                id={question.id}
                                                item={question}
                                                options={question.options}
                                                showButtons={false}
                                                onInputChange={(e) => handleInputChange(question.id, e.target.value)}
                                            />}
                                            {question.type === 'checkbox' && <Checkbox_CP
                                                id={question.id}
                                                item={question}
                                                options={question.options}
                                                showButtons={false}
                                                handleUpdateItem={handleUpdateItem}
                                                onInputChange={(isChecked) => handleInputChange(question.id, isChecked ? "1" : "0")}
                                            />}
                                            {question.type === 'radio' && <Radio_CP
                                                id={question.id}
                                                item={question}
                                                options={Array.isArray(question.options) ? question.options : [question.options]}
                                                showButtons={false}
                                                onInputChange={(itemOption) => {
                                                    const itemsArray = Array.isArray(JSON.parse(question.options)) ? JSON.parse(question.options) : [JSON.parse(question.options)];
                                                    const selectedItemObject = itemsArray.find(opt => opt.id === itemOption);
                                                    handleInputChange(question.id, {
                                                        id: selectedItemObject.id,
                                                        label: selectedItemObject.label
                                                    });
                                                }}
                                            />}
                                        </div>
                                    ))}

                                    <div className="flex justify-end">
                                        <Button variant={"destructive"}
                                                onClick={() => setIsWatchFormModalOpen(false)}>Fechar</Button>
                                    </div>
                                </div>
                            </Modal>

                            {((items && items.length > 0) || (question && question.length > 0)) && (
                                <div className="mt-6 flex justify-end gap-2">
                                    <Button variant={"outline"} onClick={() => {
                                        goBack();
                                        console.log("Button clicked")
                                    }}>Voltar</Button>
                                    <Button variant={"outline"} onClick={handleWatchForm}>Pré-Visualizar</Button>
                                    <Button onClick={handleSubmitFormToDB}>Prosseguir</Button>
                                </div>
                            )}

                            <Input variant={"outline"} className={" w-1/5"} type={"number"} label={"Questionnaire ID"}
                                   onChange={(e) => setQuestionnaire_id(e.target.value)} value={questionnaire_id}
                            />
                            {errorMessage && (
                                <p className="text-red-500 text-xs italic">{errorMessage}</p>
                            )}
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default EditQuestionnaire;
