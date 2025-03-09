import React, { useState } from 'react';
import { SelectField, TextInputField, toaster } from 'evergreen-ui'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const SearchButton: React.FC = () => {

    return (
        <Box>
            <Button
                sx={{
                    position: 'flex',
                    bottom: '25px',
                    margin: '5px',
                    right: '25px',
                    width: '50px',
                    minWidth: '0',
                    height: '45px',
                    // borderRadius: '50%'
                }}>

            </Button>
        </Box>
        
    )
    
}

export default SearchButton;