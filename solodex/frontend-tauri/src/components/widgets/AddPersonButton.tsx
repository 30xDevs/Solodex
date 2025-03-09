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
    )

}

export default AddPersonButton;