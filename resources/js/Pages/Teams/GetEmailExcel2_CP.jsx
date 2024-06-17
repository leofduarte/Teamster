import React, {useEffect, useState} from "react";
import * as XLSX from 'xlsx';
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
import {Button} from "@/Components/ui/button"
import axios from 'axios';

const GetEmailExcel = ({setEmails}) => {
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

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setFileData(new Uint8Array(e.target.result));

            const workbook = XLSX.read(new Uint8Array(e.target.result), {type: 'array'});
            setSheetNames(workbook.SheetNames);

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
                removeDuplicates: false,
            });

            console.log(response.data);

            setErrorMessages(prevState => ({
                ...prevState,
                validateEmailsError: ""
            }));

            setUniqueEmails(response.data.emails);
            setEmails(response.data.emails);


            if (response.data.message.includes("Duplicate")) {
                setOpenAlertDialog(true);
            }

            handleAddEmailsToTeam();



            // After file upload
            console.log('File data:', fileData);

// After sheet name is set
            console.log('Sheet name:', sheetName);

// After column letter is set
            console.log('Column letter:', column);

// After min and max row numbers are set
            console.log('Min row:', minRow);
            console.log('Max row:', maxRow);

// After emails are extracted
            console.log('Filtered data:', filteredData);

// After emails are validated
            console.log('Response from /api/v1/validate-emails:', response.data);

// After unique emails are set
            console.log('Unique emails:', uniqueEmails);



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
            setEmails(response.data.emails);



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
        const uniqueEmailsArray = uniqueEmails.map(item => item.email);
        setEmails(prevEmails => [...prevEmails, ...uniqueEmailsArray]);
        console.log(uniqueEmails);
    };

    return (
                    <div className={"flex flex-col gap-2"}>
                        <Input type="file" onChange={handleFileUpload} className={"cursor-pointer"}/>

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

                        {sheetNames.length > 0 && (
                        <Input type="text" className={"my-1"} placeholder="Enter column letter" value={column}
                               onChange={e => setColumn(e.target.value.toUpperCase())}/>
                        )}

                        {column !== '' && (
                            <div className={"flex gap-1"}>
                                <Input type="number" min="1" placeholder="Enter min row number" value={minRow}
                                       onChange={e => setMinRow(e.target.value)}/>
                                <Input type="number" min="1" placeholder="Enter max row number" value={maxRow}
                                       onChange={e => setMaxRow(e.target.value)}/>
                            </div>
                        )}

                        {errorMessages.fileUploadError &&
                            <p className="text-red-500 text-xs italic">{errorMessages.fileUploadError}</p>}
                        {errorMessages.columnError &&
                            <p className="text-red-500 text-xs italic">{errorMessages.columnError}</p>}
                        {errorMessages.minRowError &&
                            <p className="text-red-500 text-xs italic">{errorMessages.minRowError}</p>}
                        {errorMessages.maxRowError &&
                            <p className="text-red-500 text-xs italic">{errorMessages.maxRowError}</p>}


                        {column !== '' && (
                            filteredData.length > 0 ? (
                                <div className={"mt-4 flex flex-col"}>
                                    <p className="mb-2 text-sm">Extracted:</p>
                                    <div className="flex flex-row flex-wrap">
                                        {filteredData.map((item, index) => (
                                            <div key={index} className={"m-1"}>
                                                <p className="w-fit rounded-full bg-blue-300 px-4 py-2 text-black text-xs">{item}
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

                        {sheetNames.length > 0 && (
                        <div className={"mt-4 flex justify-end"}>
                            <div className={"flex-col"}>
                                <Button
                                    type="button"
                                    onClick={handleValidateEmails}
                                    disabled={!column || !fileData || !sheetName}
                                >
                                    Validate Emails
                                </Button>
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
    );
}

export default GetEmailExcel;
