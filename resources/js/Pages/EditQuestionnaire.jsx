import React, {useEffect, useState, useCallback} from 'react';
import ModalButtons from "@/Components/EmployeeForm/ModalButtons.jsx";
import {Head} from "@inertiajs/react";
import {Button} from "../Components/ui/button.jsx";
import {Input} from "@/Components/ui/input.jsx";
import {Layout} from "@/Pages/Layout.jsx";
import Text_CP from "@/Components/EmployeeForm/InputsComponents/Text_cp.jsx";
import Checkbox_CP from "@/Components/EmployeeForm/InputsComponents/Checkbox_cp.jsx";
import Radio_CP from "@/Components/EmployeeForm/InputsComponents/Radio_cp.jsx";
import {toast} from "@/Components/ui/use-toast.js";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import SortItem from "@/Components/EmployeeForm/SortItem.jsx";
import {DndContext, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWandMagicSparkles} from "@fortawesome/free-solid-svg-icons";
import {Separator} from "@/Components/ui/separator.jsx";
import Modal from "../Components/Modal.jsx";
import CheckboxForm from "@/Components/EmployeeForm/CheckboxForm.jsx";
import TextForm from "@/Components/EmployeeForm/TextForm.jsx";
import RadioForm from "@/Components/EmployeeForm/RadioForm.jsx";


const EditQuestionnaire = ({questionnaire, questions}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [items, setItems] = useState([]);
    const [questionnaire_id, setQuestionnaire_id] = useState(questionnaire.id);
    const [errorMessage, setErrorMessage] = useState(null);
    const [question, setQuestion] = useState([]);
    const [isWatchFormModalOpen, setIsWatchFormModalOpen] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [askAPI, setAskAPI] = useState("");
    const [responseAPI, setResponseAPI] = useState("");
    const [options, setOptions] = useState(currentItem?.options || [
        {id: "option-1", label: ""},
        {id: "option-2", label: ""},
        {id: "option-3", label: ""},
        {id: "option-4", label: ""},
    ]);

    const handleInputChange = (id, value) => {
        setItems(prevItems => prevItems.map(item => item.id === id ? {...item, value} : item));
    };

    const handleAddItem = (type) => {
        const id = Math.random().toString(36).substr(2, 9);

        setIsModalOpen(true);

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
        setCurrentItem(newItem);

        /*setItems(prevItems => {
            if (prevItems.some(item => item.id === id)) {
                return prevItems;
            }
            return [...prevItems, newItem];
        });*/
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
                options: item?.options?.length ? item.options : [],
                is_mandatory: !!item?.is_mandatory,
            }));

            console.log(allQuestions.filter(e => !e.is_mandatory));

            const response = await axios.post('/api/v1/addquestions', {
                items: allQuestions.filter(e => !e.is_mandatory),
                questionnaire_id: questionnaire_id,
            });
            toast({
                variant: "success",
                title: "Success!",
                description: `${response.data.message}`,
            });
        } catch (error) {
            console.log(error)
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
        console.log("Watch form clicked")
        console.log(isWatchFormModalOpen);
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

    useEffect(() => {
        console.log("currentItem", currentItem)
    }, [currentItem]);


    const pointerSensor = useSensor(PointerSensor, {
        activationConstraint: {
            delay: 250,
            tolerance: 5,
        },
    });

    const sensors = useSensors(pointerSensor);

    const handleDragEnd = (event) => {
        const {active, over} = event;

        if (active && over && active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item && item.id === active.id);
                const newIndex = items.findIndex((item) => item && item.id === over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    const handleSubmitAPI = async (item) => {
        if (!item) return null;

        const response = await axios.post(`/api/v1/${item.type}`, {askAPI: askAPI});

        if (item.type === "text") {
            setCurrentItem({
                ...currentItem,
                tooltip: response.data.tooltip,
                placeholder: response.data.placeholder,
                description: response.data.description,
                label: response.data.label
            });
        } else if (item.type === "checkbox") {
            setCurrentItem({
                ...currentItem,
                tooltip: response.data.tooltip,
                description: response.data.description,
                label: response.data.label
            });
        } else if (item.type === "radio") {
            const mappedOptions = Array.isArray(response.data.options) ? response.data.options.map((option, index) => ({
                id: `option-${index + 1}`,
                label: option
            })) : [];
            setCurrentItem({...currentItem, label: response.data.label || '', options: mappedOptions});
            setOptions(mappedOptions);
            // setLabel(response.data.label || '');
        }
        setResponseAPI(response.data);
    };

    const handleModalSubmit = (value) => {
        console.log("handleModalSubmit", value);

        const existingItemIndex = items.findIndex(item => item.id === value.id);
        if (existingItemIndex !== -1) {
            setItems(prevItems => {
                return prevItems.map((item, index) => {
                    if (index === existingItemIndex) {
                        // This is the item we want to update
                        return value;
                    } else {
                        // This is not the item we want to update, leave it as is
                        return item;
                    }
                });
            });
        } else {
            setItems(prevItems => [...prevItems, value]);
        }
        setIsModalOpen(false);
        setCurrentItem(null);
    }


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

                                    {/* NEW */}
                                    {items && items.length ?
                                        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                                            <SortableContext items={items.filter(Boolean).map(item => item.id)}
                                                             strategy={verticalListSortingStrategy}>
                                                {items.map((item) => item && (
                                                    <SortItem
                                                        key={item.id}
                                                        id={item.id}
                                                        item={item}
                                                        className={"m-4"}
                                                        onInputChange={handleInputChange}
                                                        onEditItem={handleEditItem}
                                                        handleDeleteItem={handleDeleteItem}
                                                    />
                                                ))}
                                            </SortableContext>
                                        </DndContext>
                                        : undefined
                                    }

                                    <Modal
                                        ariaHideApp={false}
                                        isOpen={isModalOpen}
                                        onRequestClose={() => setIsModalOpen(false)}
                                        appElement={document.getElementById('root')}>

                                        <h2 className="text-center text-xl text-black">Configure Input</h2>

                                        <div className="relative flex items-center">
                                            <div className={"flex gap-2"}>
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


                                        {currentItem &&
                                            <>
                                                {currentItem.type === "text" &&
                                                    <TextForm item={currentItem} onSubmit={handleModalSubmit}/>}
                                                {currentItem.type === "checkbox" &&
                                                    <CheckboxForm item={currentItem} onSubmit={handleModalSubmit}/>}
                                                {currentItem.type === "radio" &&
                                                    <RadioForm item={currentItem} onSubmit={handleModalSubmit}/>}
                                            </>
                                        }
                                    </Modal>

                                </form>
                            </div>

                            {((items && items.length > 0) || (question && question.length > 0)) && (
                                <div className="mt-6 flex justify-end gap-2">
                                    <Button variant={"outline"} onClick={() => {
                                        goBack();
                                        console.log("Button clicked")
                                    }}>Voltar</Button>
                                    <Button type="button" variant={"outline"}
                                            onClick={handleWatchForm}>Pré-Visualizar</Button>
                                    <Button type="button" onClick={handleSubmitFormToDB}>Guardar</Button>
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
