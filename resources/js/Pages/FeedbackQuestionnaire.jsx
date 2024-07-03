import React, { useEffect, useState } from 'react';
import ModalButtons from "@/Components/EmployeeForm/ModalButtons.jsx";
import AddTextForm from "@/Components/EmployeeForm/AddTextForm.jsx";
import AddCheckboxForm from "@/Components/EmployeeForm/AddCheckboxForm.jsx";
import AddRadioForm from "@/Components/EmployeeForm/AddRadioForm.jsx";
import { Head } from "@inertiajs/react";
import { Button } from "../Components/ui/button.jsx";
import { toast } from "@/Components/ui/use-toast.js";
import { useToast } from "@/Components/ui/use-toast"
import axios from "axios";
import { Layout } from "@/Pages/Layout.jsx";
import Modal from "@/Components/Modal.jsx";
import Text_CP from "@/Components/EmployeeForm/InputsComponents/Text_cp.jsx";
import Checkbox_CP from "@/Components/EmployeeForm/InputsComponents/Checkbox_cp.jsx";
import Radio_CP from "@/Components/EmployeeForm/InputsComponents/Radio_cp.jsx";

const Questionnaire = ({newquestionnaire_id}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [items, setItems] = useState([]);
    const [questionnaire_id, setQuestionnaire_id] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [question, setQuestion] = useState(null);
    const [isWatchFormModalOpen, setIsWatchFormModalOpen] = useState(false);
    const { toast } = useToast()

    console.log(newquestionnaire_id);

    const handleInputChange = (id, value) => {
        setItems(prevItems => prevItems.map(item => item.id === id ? { ...item, value } : item));
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
            isFetched: false,
        });
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
        console.log('Form Submitted');
        try {
            const allQuestions = [...items, ...question].map(item => ({
                ...item,
                options: Array.isArray(item.options) ? item.options : [item.options],
                is_mandatory: item.is_mandatory || false,
            }));

            const response = await axios.post('/api/v1/addquestions', {
                items: allQuestions,
                questionnaire_id: newquestionnaire_id,
                is_mandatory: true,
            });

            console.log('Added Questions:', response);
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

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.post('/api/v1/getquestions', {
                    questionnaire_id: 1,
                });
                const fetchedQuestions = response.data.questions.map(question => ({
                    ...question,
                    value: question.type === 'checkbox' ? [] : '',
                    isFetched: true,
                    is_mandatory: 1,
                }));
                setQuestion(fetchedQuestions);
            } catch (error) {
                console.error('Failed to fetch questions:', error);
            }
        };

        fetchQuestions();
    }, []);


    useEffect(() => {
        console.log(items);
        console.log(question);
    }, [items, question]);

    useEffect(() => {
        if (questionnaire_id === null) {
            setErrorMessage("Please fill out this field.");
        }
    }, [questionnaire_id]);

    return (
        <div>
            <Layout sidebar={
                <div className={"flex items-center justify-center h-screen w-full"}>
                    <ModalButtons handleAddItem={handleAddItem} />
                </div>
            }>
                <Head title="Formulário de Feedback" />

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
                                             className={"my-4 p-4 min-h-fit rounded-xl gap-4 flex flex-col shadow-lg"}>
                                            {question.type === 'text' && (
                                                <Text_CP
                                                    id={question.id}
                                                    item={question}
                                                    options={question.options}
                                                    showButtons={!question.is_mandatory}
                                                    onInputChange={(e) => handleInputChange(question.id, e.target.value)}
                                                />
                                            )}
                                            {question.type === 'checkbox' && (
                                                <Checkbox_CP
                                                    id={question.id}
                                                    item={question}
                                                    options={question.options}
                                                    showButtons={!question.is_mandatory}
                                                    handleUpdateItem={handleUpdateItem}
                                                    onInputChange={(isChecked) => handleInputChange(question.id, isChecked ? "1" : "0")}
                                                />
                                            )}
                                            {question.type === 'radio' && (
                                                <Radio_CP
                                                    id={question.id}
                                                    item={question}
                                                    options={Array.isArray(question.options) ? question.options : [question.options]}
                                                    showButtons={!question.is_mandatory}
                                                    onInputChange={(itemOption) => {
                                                        const itemsArray = Array.isArray(JSON.parse(question.options)) ? JSON.parse(question.options) : [JSON.parse(question.options)];
                                                        const selectedItemObject = itemsArray.find(opt => opt.id === itemOption);
                                                        handleInputChange(question.id, {
                                                            id: selectedItemObject.id,
                                                            label: selectedItemObject.label
                                                        });
                                                    }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                    {currentItem && currentItem.type === 'text' && (
                                        <AddTextForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
                                                     currentItem={currentItem} setCurrentItem={setCurrentItem}
                                                     handleUpdateItem={handleUpdateItem} items={items}
                                                     setItems={setItems}
                                                     handleDeleteItem={handleDeleteItem}
                                                     showButtons={!question.is_mandatory}
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
                                                         showButtons={!question.is_mandatory}
                                        />
                                    )}
                                    {currentItem && currentItem.type === 'radio' && (
                                        <AddRadioForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
                                                      currentItem={currentItem} setCurrentItem={setCurrentItem}
                                                      handleUpdateItem={handleUpdateItem} items={items}
                                                      setItems={setItems}
                                                      handleDeleteItem={handleDeleteItem}
                                                      showButtons={!question.is_mandatory}
                                        />
                                    )}
                                    {((items && items.length > 0) || (question && question.length > 0)) && (
                                        <div className="mt-6 flex justify-end gap-2">
                                            <Button variant={"outline"} onClick={"teste"}>Voltar</Button>
                                            <Button variant={"outline"}
                                                    onClick={handleWatchForm}>Pré-Visualizar</Button>
                                            <Button type={"submit"}>Prosseguir</Button>
                                        </div>
                                    )}
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

                                    {items && items.map((item, index) => (
                                        <div key={index}
                                             className={"my-4 bg-white p-4 min-h-fit rounded-xl gap-4 flex flex-col shadow-lg"}>
                                            {item.type === 'text' && <Text_CP
                                                id={item.id}
                                                item={item}
                                                options={item.options}
                                                showButtons={false}
                                                onInputChange={(e) => handleInputChange(item.id, e.target.value)}
                                            />}
                                            {item.type === 'checkbox' && <Checkbox_CP
                                                id={item.id}
                                                item={item}
                                                options={item.options}
                                                showButtons={false}
                                                handleUpdateItem={handleUpdateItem}
                                                onInputChange={(isChecked) => handleInputChange(item.id, isChecked ? "1" : "0")}
                                            />}
                                            {item.type === 'radio' && <Radio_CP
                                                id={item.id}
                                                item={item}
                                                options={Array.isArray(item.options) ? item.options : [item.options]}
                                                showButtons={false}
                                                onInputChange={(itemOption) => {
                                                    const itemsArray = Array.isArray(JSON.parse(item.options)) ? JSON.parse(item.options) : [JSON.parse(item.options)];
                                                    const selectedItemObject = itemsArray.find(opt => opt.id === itemOption);
                                                    handleInputChange(item.id, {
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
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default Questionnaire;
