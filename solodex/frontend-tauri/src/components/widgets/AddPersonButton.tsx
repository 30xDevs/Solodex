import React, { useState } from 'react';
import { SelectField, TextInputField, TextareaField, toaster } from 'evergreen-ui';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from 'axios';
import { GraphNode, GraphEdge } from 'reagraph';
import { Card } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST

interface FormData {
    first_name: string | null;
    last_name: string | null;
    gender: string | null;
    information: string | null;
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


/**
 * Button to add a person to the backend database.
 * Provides a form for entering person information
 * and information
 * 
 * @component
 * @param {GraphNode[]} nodes - The state of nodes
 * @param {React.Dispatch<React.SetStateAction<GraphNode[]>>} setNodes - the setter for `nodes`
 * @param  {GraphEdge[]} edges - The state of edges
 * @param {React.Dispatch<React.SetStateAction<GraphEdge[]>>} setEdges - the setter for `edges`
 * @returns {React.FC<GraphViewProps>} The rendered component
 */
const AddPersonButton: React.FC<GraphViewProps> = ({nodes, setNodes, edges, setEdges}) => {
    const [dialogShown, setDialogShown] = useState(false);
    const handleOpen = () => setDialogShown(true);
    const handleClose = () => setDialogShown(false);

    // When a state is made in react, we make the state (formData) and the setter (setFormData)
    const [formData, setFormData] = useState<FormData>({
        first_name: '',
        last_name: '',
        gender: 'na',
        information: ''
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
     * handleSubmit is a function that sends a POST request to the backend API to create a new person.
     * It uses the axios library to make the request. It is an asynchronous function that waits for the response.
     * 
     * @param {React.FormEvent} event - the form submission event
     */
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevents the default form submission behavior which is to reload the page.

        try {
            // Attempt to send a POST request to the backend API
            const response = await axios.post(`${SERVER_HOST}/api/person/`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Form submitted', response.data);
            toaster.success(`${formData.first_name} ${formData.last_name} Created`);
            setDialogShown(false);

            // Create a new Node from the submitted data
            const newNode: GraphNode = {
                id: response.data.id,
                label: formData.first_name || undefined,
            };


            // Update nodes with the new node.
            setNodes([...nodes, newNode]);
            
        } catch (error) {
            toaster.warning(`User creation failed: ${error}`)
        };
    };

    return (
        <Box>
            {/* `Modal` is the form that is brought up when the user adds a new 
            person from the main screen */}
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
                        <TextareaField
                            label="Information"
                            name="information"
                            value={formData?.information || ''}
                            onChange={handleChange}>
                        </TextareaField>
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
    )
};

export default AddPersonButton;