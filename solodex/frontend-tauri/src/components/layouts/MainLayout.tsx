import React, {ReactNode, useCallback, useEffect, useState} from 'react';
import { Button, Dialog, Pane, SelectField, Text, TextareaField, TextInput, TextInputField} from 'evergreen-ui'
import axios from 'axios';
import AddPersonButton from '../widgets/AddPersonButton';
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
    
    const verifyData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/person/');
            alert('Data in database:' + JSON.stringify(response.data));
            console.log('Data in database:', response.data);
        } catch (error) {
            alert("error")
            console.error("Error verifying data", error);
        }
    }

    return (
        
    <Pane
        display="flex"
        alignItems="center">
        
        <AddPersonButton/>
        <Button onClick={verifyData}>Verify Data</Button>
        
    </Pane>
                                                       
    );                                                             
};                                                                  
                                                              
export default MainLayout;