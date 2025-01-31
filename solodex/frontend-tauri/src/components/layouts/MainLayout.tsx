import React, {ReactNode, useCallback, useEffect, useState} from 'react';
import { Button, Dialog, Pane, SelectField, Text, TextareaField, TextInput, TextInputField} from 'evergreen-ui'
import axios from 'axios';
import AddPersonButton from '../widgets/AddPersonButton';
import GraphView from '../organisms/GraphView';
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
                                                                       
const MainLayout: React.FC = () => {

    return (
        
    <Pane
        height='100vh'
        width='100vw'
        display="flex"
        flexDirection="column"
        alignItems="stretch">
        <Pane>
            <GraphView/>
        </Pane>
        <Pane>
            <AddPersonButton/>
        </Pane>   
    </Pane>
                                                       
    );                                                             
};                                                                  
                                                              
export default MainLayout;