import React, { useState } from 'react';
import { SelectField, TextInputField, toaster } from 'evergreen-ui'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from 'axios';
import { GraphNode, GraphEdge } from 'reagraph';
import { Card } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface FormData {
    first_name: string | null;
    last_name: string | null;
    gender: string | null;
}

interface GraphViewProps {
    // List of nodes to be passed in from
    // parent state
    nodes: GraphNode[];
    setNodes: React.Dispatch<React.SetStateAction<GraphNode[]>>;

    // Do the same for edges
    edges: GraphEdge[];
    setEdges: React.Dispatch<React.SetStateAction<GraphEdge[]>>;
}

const AddPersonButton: React.FC<GraphViewProps> = ({nodes, setNodes, edges, setEdges}) => {
    const [dialogShown, setDialogShown] = useState(false);
    const handleOpen = () => setDialogShown(true);
    const handleClose = () => setDialogShown(false);

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

            // Create a new Node
            const newNode: GraphNode = {
                id: response.data.id,
                label: formData.first_name || undefined,
            }

            // update nodes with the new node
            if (nodes.length == 0) {
                setNodes([newNode]);
            } else {
                setNodes([...nodes, newNode]);
            }
            
        } catch (error) {
            toaster.warning(`User creation failed: ${error}`)
        }
    }

    return (
        <Box>
            <Modal
                open={dialogShown}
                onClose={handleClose}>
                <Card 
                    sx={{
                        margin: '20px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                <Container
                    sx={{
                        padding: '15px'
                    }}>
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
                        <Button 
                            type="submit" 
                            variant='contained' 
                            color='primary'>
                            Create
                        </Button>
                    </form>
                </Container>
                </Card>
                
                
            </Modal>

            <Button
                // style={buttonStyle}
                variant="contained"
                color="primary"
                onClick={handleOpen}
                sx={{
                    position: 'fixed',
                    bottom: '25px',
                    right: '25px',
                    margin: '5px',
                    width: '50px',
                    minWidth: '0',
                    height: '45px',
                    // borderRadius: '50%'
                }}>
                <AddIcon></AddIcon>
            </Button>
        </Box>
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