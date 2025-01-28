import React, {ReactNode, useCallback, useEffect, useState} from 'react';
import { Button, Dialog, Pane, SelectField, Text, TextareaField, TextInput, TextInputField} from 'evergreen-ui'
import axios from 'axios';
// import './Layout.css'; // Assuming you have a CSS file for styling

interface MainLayoutProps {
    children: ReactNode;
}

interface FormData {
    first_name: string | null;
    last_name: string | null;
    gender: string | null;
    description: string | null;
    aspirations: string | null;
}
                                                                       
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const [dialogShown, setDialogShown] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        first_name: '',
        last_name: '',
        gender: 'na',
        description: '',
        aspirations: ''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        const { name, value } = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }
   
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(event)
        console.log(formData)

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/person/', formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            console.log('Form submitted', response.data);
        } catch (error) {
            console.error("Error submitting form", error);
        }

        setDialogShown(false)
    }
    

    // const closeModal = useCallback(() => setModalIsOpen(false), [setModalIsOpen]);

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

    return (
        
    <Pane
        display="flex"
        alignItems="center">
        
        <Dialog
            isShown={dialogShown}
            title="Internal scrolling"
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
                    <TextareaField 
                        label="Description"
                        name="description"
                        onChange={handleChange}
                        value={formData?.description || ''}></TextareaField>
                    <TextareaField 
                        label="Aspirations"
                        name="aspirations"
                        onChange={handleChange}
                        value={formData?.aspirations || ''}></TextareaField>
                    <Button type="submit" appearance='primary' intent="success">
                        Create
                    </Button>
                </form>
            </Pane>
        </Dialog>


        <Button
            style={buttonStyle}
            onClick={() => setDialogShown(true)}
        >+</Button>
        
    </Pane>
                                                       
    );                                                             
};                                                                  
                                                              
export default MainLayout;