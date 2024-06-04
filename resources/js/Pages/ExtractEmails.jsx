import React, {useEffect, useState} from "react";
import * as XLSX from 'xlsx';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import {Input} from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/Components/ui/select";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialog, AlertDialogAction, AlertDialogCancel
} from "@/Components/ui/alert-dialog.jsx";
import { Button } from "@/Components/ui/button"
import {Toaster} from "@/Components/ui/toaster.jsx";
import { ToastAction } from "@/Components/ui/toast.jsx"
import { useToast } from "@/Components/ui/use-toast"
import axios from 'axios';

function ExtractEmails({auth}) {
    const [column, setColumn] = useState('');
    const [minRow, setMinRow] = useState("");
    const [maxRow, setMaxRow] = useState("");
    const [columnData, setColumnData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [fileData, setFileData] = useState(null);
    const [errorMessages, setErrorMessages] = useState({
        fileUploadError: "",
        columnError: "",
        minRowError: "",
        maxRowError: "",
        validateEmailsError: "",
        storeEmailsError: ""
    });
    const [sheetNames, setSheetNames] = useState([]);
    const [sheetName, setSheetName] = useState("");
    const [uniqueEmails, setUniqueEmails] = useState([]);
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const { toast } = useToast();

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setFileData(new Uint8Array(e.target.result));

            const workbook = XLSX.read(new Uint8Array(e.target.result), {type: 'array'});
            setSheetNames(workbook.SheetNames);

            // If the file only has one sheet, select it automatically
            if (workbook.SheetNames.length === 1) {
                setSheetName(workbook.SheetNames[0]);
            }
        };
        reader.readAsArrayBuffer(file);
    };

    useEffect(() => {
        if (fileData && column) {
            const workbook = XLSX.read(fileData, {type: 'array'});
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet, {header: 1, raw: false});

            const columnData = jsonData.map(row => row[column.charCodeAt(0) - 65]);
            const nonEmptyRows = columnData.filter(cell => cell !== undefined);

            setMinRow("1");
            setMaxRow(nonEmptyRows.length.toString());
        }
    }, [fileData, column]);

    useEffect(() => {
        if (fileData && column && minRow && maxRow && sheetName) {
            const workbook = XLSX.read(fileData, {type: 'array'});
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet, {header: 'A', raw: false});

            const columnDataFromFile = {};

            jsonData.forEach((rowData, rowIndex) => {
                if (rowIndex + 1 < Number(minRow) || rowIndex + 1 > Number(maxRow)) return;
                Object.keys(rowData).forEach(columnLetter => {
                    if (!columnDataFromFile[columnLetter]) {
                        columnDataFromFile[columnLetter] = [];
                    }
                    if (rowData[columnLetter] !== '') {
                        columnDataFromFile[columnLetter].push(rowData[columnLetter]);
                    }
                });
            });

            setColumnData(columnDataFromFile);
            const filtered = columnDataFromFile[column] || [];
            setFilteredData(filtered);
            setErrorMessages(prevState => ({
                ...prevState,
                columnError: ""
            }));

            console.log(filtered);
            console.log(filteredData);
        }

        if (column === "") {
            setErrorMessages({
                fileUploadError: "",
                columnError: "",
                minRowError: "",
                maxRowError: "",
                validateEmailsError: ""
            });
            return;
        }

        if (!fileData && column !== '') {
            setErrorMessages(prevState => ({
                ...prevState,
                fileUploadError: 'Please upload a file before entering a column.'
            }));
        }
    }, [column, fileData, minRow, maxRow, sheetName]);

    const handleDelete = (indexToDelete) => {
        const newFilteredData = [...filteredData];
        newFilteredData.splice(indexToDelete, 1);
        setFilteredData(newFilteredData);

        if (indexToDelete === 0) {
            setMinRow(newFilteredData.length > 0 ? "1" : "");
        } else if (indexToDelete === filteredData.length - 1) {
            setMaxRow(newFilteredData.length > 0 ? newFilteredData.length.toString() : "");
        }
    }

    const handleValidateEmails = async () => {
        try {
            const response = await axios.post('/api/v1/validate-emails', {
                emails: filteredData.map(email => ({email})),
                removeDuplicates: false, // Initially set to false
            });

            console.log(response.data);

            setErrorMessages(prevState => ({
                ...prevState,
                validateEmailsError: ""
            }));

            if (response.data.message.includes("Duplicate")) {
                setOpenAlertDialog(true);
            }

        } catch (error) {
            console.error(error.response.data);

            if (error.response.data.message) {
                setErrorMessages(prevState => ({
                    ...prevState,
                    validateEmailsError: error.response.data.message
                }));

                if (error.response.data.message.includes("Duplicate")) {
                    setOpenAlertDialog(true);
                }
            }
        }
    };

    const handleRemoveDuplicates = async () => {
        setOpenAlertDialog(false);
        try {
            const response = await axios.post('/api/v1/validate-emails', {
                emails: filteredData.map(email => ({email})),
                removeDuplicates: true,
            });

            console.log(response.data);
            setErrorMessages(prevState => ({
                ...prevState,
                validateEmailsError: ""
            }));

            setUniqueEmails(response.data.emails);


        } catch (error) {
            console.error(error.response.data);

            if (error.response.data.message) {
                setErrorMessages(prevState => ({
                    ...prevState,
                    validateEmailsError: error.response.data.message
                }));
            }
        }
    };

    const handleAddEmailsToTeam = async () => {
        try {
            const response = await axios.post('/api/v1/store-unique-emails', {
                emails: uniqueEmails,
            });

            console.log(response.data);
            setErrorMessages(prevState => ({
                ...prevState,
                storeEmailsError: ""
            }));

            const { newEmails, existingEmails } = response.data;

            const newEmailsString = newEmails.join(', ');
            const existingEmailsString = existingEmails.join(', ');

            toast({
                variant: "success",
                title: "Success!",
                description: `New emails added: ${newEmailsString}. Already existing emails: ${existingEmailsString}`,
            });

        } catch (error) {
            console.error(error.response.data);
            setErrorMessages(prevState => ({
                ...prevState,
                storeEmailsError: error.response.data.message
            }));
            toast({
                variant: "destructive",
                title: "Error!",
                description: error.response.data.message,
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Extract Emails</h2>}
        >
            <Head title="Extract Emails"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Input type="file" onChange={handleFileUpload}/>

                            {sheetNames.length > 1 && (
                                <Select onValueChange={value => setSheetName(value)}>
                                    <SelectTrigger className="w-[180px] mt-1">
                                        <SelectValue placeholder="Select a Sheet" defaultValue={sheetName}/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup label="Sheet Names">
                                            <SelectLabel>Sheets</SelectLabel>
                                            {sheetNames.map((name, index) => (
                                                <SelectItem key={index} value={name}>
                                                    {name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}

                            <Input type="text" className={"my-1"} placeholder="Enter column letter" value={column}
                                   onChange={e => setColumn(e.target.value.toUpperCase())}/>

                            {column !== '' && (
                                <div className={"flex gap-1"}>
                                    <Input type="number" placeholder="Enter min row number" value={minRow}
                                           onChange={e => setMinRow(e.target.value)}/>
                                    <Input type="number" placeholder="Enter max row number" value={maxRow}
                                           onChange={e => setMaxRow(e.target.value)}/>
                                </div>
                            )}

                            {errorMessages.fileUploadError &&
                                <p className="text-red-500 mt-2">{errorMessages.fileUploadError}</p>}
                            {errorMessages.columnError &&
                                <p className="text-red-500 mt-2">{errorMessages.columnError}</p>}
                            {errorMessages.minRowError &&
                                <p className="text-red-500 mt-2">{errorMessages.minRowError}</p>}
                            {errorMessages.maxRowError &&
                                <p className="text-red-500 mt-2">{errorMessages.maxRowError}</p>}
                            {errorMessages.validateEmailsError &&
                                <p className="text-red-500 mt-2">{errorMessages.validateEmailsError}</p>}

                            {column !== '' && (
                                filteredData.length > 0 ? (
                                    <div className={"mt-4 flex flex-col"}>
                                        <p className="mb-2 text-lg">Extracted:</p>
                                        <div className="flex flex-row flex-wrap">
                                            {filteredData.map((item, index) => (
                                                <div key={index} className={"m-1"}>
                                                    <p className="w-fit rounded-full bg-blue-300 px-4 py-2 text-black">{item}
                                                        <span className={"ml-2 cursor-pointer"}
                                                              onClick={() => handleDelete(index)}><FontAwesomeIcon
                                                            icon={faXmark}/></span>
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    !errorMessages.columnError &&
                                    <div className={"mt-4 flex flex-col"}>
                                        <p className="text-lg text-gray-800">No data found</p>
                                    </div>
                                )
                            )}

                            <div className={"mt-4 flex justify-end"}>
                                <div className={"flex-col"}>
                                    <Button
                                        variant={""}
                                        className={``}
                                        onClick={handleValidateEmails}
                                        disabled={!column || !fileData || !sheetName}
                                    >
                                        Validate Emails
                                    </Button>
                                </div>
                            </div>

                            {uniqueEmails.length > 0 && (
                                <div className={"mt-4 flex flex-col"}>
                                    <p className="mb-2 text-lg">Unique Emails Extracted:</p>
                                    <div className="flex flex-row flex-wrap">
                                        {uniqueEmails.map((item, index) => (
                                            <div key={index} className={"m-1"}>
                                                <p className="w-fit rounded-full bg-green-300 px-4 py-2 text-black">{item.email}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={"mt-4 flex justify-end"}>
                                        <div className={"flex-col"}>
                                            <Button
                                                variant={"secondary"}
                                                onClick={handleAddEmailsToTeam}
                                            >
                                                Add Emails to Team
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Delete Duplicate Emails </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            <p className={"mb-2"}>
                                                We have detected duplicate emails in your list. Would you like us to
                                                remove
                                                them for you?
                                            </p>
                                            <p>
                                                Having duplicate emails can result in sending invites and notifications
                                                multiple times to the same email address, corresponding to the number of
                                                times it appears in the list.
                                            </p>
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel variant={"outline"}
                                                           onClick={() => setOpenAlertDialog(false)}>No</AlertDialogCancel>
                                        <AlertDialogAction variant={""}
                                                           onClick={handleRemoveDuplicates}>Yes</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default ExtractEmails;
