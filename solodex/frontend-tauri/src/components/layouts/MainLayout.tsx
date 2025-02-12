import React from 'react';
import { Button, Dialog, Pane, SelectField, Text, TextareaField, TextInput, TextInputField} from 'evergreen-ui'
import AddPersonButton from '../widgets/AddPersonButton';
import GraphView from '../organisms/GraphView';
                                                                       
const MainLayout: React.FC = () => {

    // Set up the graph Node and Edge state here so
    // it can be accessed and changed anywhere.
    // const [ nodes, setNodes ] = useState<GraphNode[]>([]);
    // const [ edges, setEdges ] = useState<GraphEdge[]>([]);

    return (
    
    // <GraphProvider>
    //     <Pane
    //     height='100vh'
    //     width='100vw'
    //     display="flex"
    //     flexDirection="column"
    //     alignItems="stretch">
    //         <Pane>
    //             <GraphView/>
    //             <AddPersonButton/>
    //         </Pane>
    //     </Pane>
    // </GraphProvider>
    
    <Pane
        height='100vh'
        width='100vw'
        display="flex"
        flexDirection="column"
        alignItems="stretch">
        <Pane>
            <GraphView/>
            <AddPersonButton/>
        </Pane>
    </Pane>
                                                       
    );                                                             
};                                                                  
                                                              
export default MainLayout;