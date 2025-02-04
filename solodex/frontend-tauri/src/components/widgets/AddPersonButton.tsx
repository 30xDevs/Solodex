import React, {ReactNode, useCallback, useEffect, useState} from 'react';
import { Button, Dialog, Pane, SelectField, Text, TextareaField, TextInput, TextInputField, toaster} from 'evergreen-ui'
import axios from 'axios';
import { useGraphNodeState } from '../hooks/updateGraph';

interface Node {
	id: string | number | undefined;
	name: string | null;
	x?: number;
	y?: number;
}

interface FormData {
    first_name: string | null;
    last_name: string | null;
    gender: string | null;
}

const AddPersonButton: React.FC = () => {
    const [dialogShown, setDialogShown] = useState(false); 
    const [formData, setFormData] = useState<FormData>({
        first_name: '',
        last_name: '',
        gender: 'na',
    });
    const { nodes, setNodes } = useGraphNodeState();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        const { name, value } = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/person/', formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            console.log('Form submitted', response.data);
            toaster.success(`${formData.first_name} ${formData.last_name} Created`)
            setDialogShown(false);

            // Create a new Node
            const newNode: Node = {
                id: response.data.id,
                name: formData.first_name,
            }

            // update nodes with the new node
            setNodes(prev => [...prev, newNode])
        } catch (error) {
            toaster.warning(`User creation failed: ${error}`)
        }
    }

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
        <div>
        <Dialog
            width={'80%'}
            sideOffset={5}
            hasFooter={false}
            hasHeader={false}
            isShown={dialogShown}
            onCloseComplete={() => setDialogShown(false)}
        >
            <Pane
                // display="flex"
                paddingBottom={'20px'}
                paddingTop={'20px'}
                paddingLeft={'30px'}
                paddingRight={'30px'}
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
                    <Button type="submit" appearance='primary' intent="success">
                        Create
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