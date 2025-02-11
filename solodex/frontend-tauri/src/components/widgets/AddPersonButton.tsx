/*
* Description: This snippet is a React component that creates a button
*  that opens a dialog box to add a new person. 
*/

import React, {ReactNode, useCallback, useEffect, useState} from 'react';
import { Button, Dialog, Pane, SelectField, Text, TextareaField, TextInput, TextInputField, toaster} from 'evergreen-ui'
import axios from 'axios';



// Interfaces. An interface defines properties an object should have and types
// think of it as a class with only properties and no methods.
interface AddPersonButtonProps {
    children: ReactNode;
}

interface FormData {
    first_name: string | null;
    last_name: string | null;
    gender: string | null;
}

interface AdditionalFormData {
    description: string | null;
    occupation: string | null;
    age: number | null;
}

// Functional Component. A functional component is a Javascript function that
// returns a React element (JSX). 
const AddPersonButton: React.FC = () => {

    // useState is a React hook that allows you to have state variables in functional components
    const [dialogShown, setDialogShown] = useState(false); 
    const [formData, setFormData] = useState<FormData>({
        first_name: '',
        last_name: '',
        gender: 'na',
    });

    // Adding state variables in the additionalDialogShown and additionalFormData
    const [additionalDialogShown, setAdditionalDialogShown] = useState(false);
    const [additionalFormData, setAdditionalFormData] = useState<AdditionalFormData>({
        description: '',
        occupation: '',
        age: null,
    });



    /**
     * handleChange is a function that updates the state variable formData, caching the user input in the form.
     * ...prev is a spread operator that copies the previous state of the form data
     * 
     * @param {React.ChangeEvent} event - the previous state of the form data
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        const { name, value } = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    /**
     * handleAdditionalChange is a function that updates the state variable additionalFormData, caching the user input in the form.
     * ...prev is a spread operator that copies the previous state of the form data
     * 
     * @param {React.ChangeEvent} event - the previous state of the form data
     */
    const handleAdditionalChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = event.target as HTMLInputElement | HTMLTextAreaElement;
        setAdditionalFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    /**
     * handleSubmit is a function that sends a POST request to the backend API to create a new person.
     * It uses the axios library to make the request. It is an asynchronous function that waits for the response.
     * 
     * @param {React.FormEvent} event - the form submission event
     */
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevents the default form submission behavior which is to reload the page.

        try {
            // Attempt to send a POST request to the backend API
            const response = await axios.post('http://127.0.0.1:8000/api/person/', formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            console.log('Form submitted', response.data);
            toaster.success(`${formData.first_name} ${formData.last_name} Created`)
            setDialogShown(false);
        } catch (error) {
            toaster.warning(`User creation failed: ${error}`)
        }
    }

    /**
     * handleAdditionalSubmit is an async function that sends a POST request to the backend API to create a Description object
     * that will be places in the DB.
     * It uses the axios library to make the request. It is an asynchronous function that waits for the response.
     * 
     * @param {React.FormEvent} event - the form submission event
     */
    const handleAdditionalSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Hit the process_description api endpoint

        try {
            // Attempt to send a POST request to the backend API
            const response = await axios.post('http://127.0.0.1:8000/api/process_description/', additionalFormData.description, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            console.log('Form submitted', response.data);
            toaster.success(`Description Parsed & Created!`)
        } catch {
            toaster.notify("Description not created!")
        }

        // Cache the additional data in the form
        setFormData((prev) => ({
            ...prev,
            ...additionalFormData
        }));
        setAdditionalDialogShown(false);
    };

    // Check if additional data is provided with a boolean
    const isAdditionalDataProvided = additionalFormData.description || additionalFormData.age;

    // Styling for the button
    const buttonStyle: React.CSSProperties = {
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        marginBottom: '5px',
        width: '50px',
        height: '50px',
        backgroundColor: 'rgb(0, 0, 0)',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        fontSize: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        transition: 'background-color 0.3s',
    };

    // Styling for the addDescriptionButton. Will be white unless additional data is provided
    // to the additionalFormData object.
    const addDescriptionButtonStyle: React.CSSProperties = {
        backgroundColor: isAdditionalDataProvided ? 'green' : 'initial',
        color: isAdditionalDataProvided ? 'white' : 'initial',
    };

    return (
        <div>
        <Dialog
            isShown={dialogShown}
            title="Add New Person"
            onCloseComplete={() => setDialogShown(false)}
        >
            <Pane
                display="flex"
                alignItems="center">
                <form onSubmit={handleSubmit}>
                    <TextInputField 
                        label="First Name"
                        name="first_name"
                        value={formData?.first_name || ''}
                        onChange={handleChange}
                        placeholder='John'/>
                    <TextInputField 
                        label="Last Name"
                        name="last_name"
                        value={formData?.last_name || ''}
                        onChange={handleChange}
                        placeholder='Doe'/>
                    <SelectField 
                        label="Gender"
                        name="gender"
                        value={formData?.gender || 'na'}
                        onChange={handleChange}>
                        <option value="male">
                            Male
                        </option>
                        <option value="female">
                            Female
                        </option>
                        <option value="na" selected>
                            N/A
                        </option>
                    </SelectField>

                    {/* Button to add a description (brings up additionalDataForm) */}
                    <Button 
                        type='button' 
                        onClick={() => setAdditionalDialogShown(true)}
                        style={addDescriptionButtonStyle}
                    >
                        Add Description
                    </Button>
                    <Button type="submit" appearance='primary' intent="success">
                        Create
                    </Button>
                </form>
            </Pane>
        </Dialog>

        {/* Dialog for the Additional Information (Description + More) */}
        <Dialog
            isShown={additionalDialogShown} // This boolean variable governs if the new dialog (for description) is shown or not
            title="Add Additional Information"
            onCloseComplete={() => setAdditionalDialogShown(false)}
        >
            <Pane
                display="flex"
                alignItems="center">
                <form onSubmit={handleAdditionalSubmit}>
                    <TextareaField 
                        label="Description"
                        name="description"
                        value={additionalFormData?.description || ''}
                        onChange={handleAdditionalChange}
                        placeholder='Enter description'/>
                    <TextInputField
                        label="Occupation"
                        name="occupation"
                        value={additionalFormData?.occupation || ''}
                        onChange={handleAdditionalChange}
                        placeholder='Enter occupation'/>
                    <TextInputField 
                        label="Age"
                        name="age"
                        type="number"
                        value={additionalFormData?.age || ''}
                        onChange={handleAdditionalChange}
                        placeholder='Enter age'/>
                    <Button type="submit" appearance='primary' intent="success">
                        Save
                    </Button>
                </form>
            </Pane>
        </Dialog>

        <Button
            style={buttonStyle}
            onClick={() => setDialogShown(true)}>
        +
        </Button>
        </div>
    )

}

export default AddPersonButton;