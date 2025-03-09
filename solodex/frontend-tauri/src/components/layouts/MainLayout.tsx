import React, { useState } from 'react';
import { Button, Dialog, Pane, SelectField, Text, TextareaField, TextInput, TextInputField} from 'evergreen-ui'
import { GraphCanvas, GraphCanvasRef, GraphEdge, GraphNode } from 'reagraph';
import AddPersonButton from '../widgets/AddPersonButton';
import GraphView from '../organisms/GraphView';
import { Container, Grid2 } from '@mui/material';
import SearchButton from '../widgets/SearchButton';
                                                                       
const MainLayout: React.FC = () => {

    // Set up the graph Node and Edge state here so
    // it can be accessed and changed anywhere.
    const [ nodes, setNodes ] = useState<GraphNode[]>([]);
    const [ edges, setEdges ] = useState<GraphEdge[]>([]);


    return (
    
        <Container>
            <GraphView
                nodes={nodes}
                setNodes={setNodes}
                edges={edges}
                setEdges={setEdges}>
            </GraphView>
            <Grid2>
                <AddPersonButton
                    nodes={nodes}
                    setNodes={setNodes}
                    edges={edges}
                    setEdges={setEdges}>
                </AddPersonButton>
                <SearchButton/>
            </Grid2>
            
        </Container>                                         
    );                                                             
};                                                                  
                                                              
export default MainLayout;