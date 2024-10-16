import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { TextField, Button, Typography, Container, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';

const TodoList = () => {
    const [number, setNumber] = useState('');
    const [list, setList] = useState([]);

    const handleAdd = () => {
        if (number !== '') {
            setList((prevList) => [
                ...prevList,
                { id: Date.now(), value: Number(number) }
            ]);
            setNumber('');
        }
    };

    const handleIncrement = (id) => {
        setList((prevList) => 
            prevList.map((item) => 
                item.id === id ? { ...item, value: item.value + 1 } : item
            )
        );
    };

    const handleDecrement = (id) => {
        setList((prevList) => 
            prevList.map((item) => 
                item.id === id && item.value > 0 ? { ...item, value: item.value - 1 } : item
            )
        );
    };

    const handleRemove = (id) => {
        setList((prevList) => prevList.filter((item) => item.id !== id));
    };

    return (
        <Box align="center">
            <Typography variant="h2" color="initial" margin={6}>TODO LIST</Typography>
            <Container>
                <TextField 
                    id="outlined-basic" 
                    type='number' 
                    label="Enter a number" 
                    variant="filled" 
                    value={number} 
                    onChange={(e) => setNumber(e.target.value)} 
                />
                <Button 
                    variant="contained" 
                    color="success"  
                    style={{ fontSize: '20px', padding: '10px', marginLeft: '12px' }} 
                    onClick={handleAdd}
                >
                    Add
                </Button>    
            </Container>

            {/* List of items */}
            <List style={{ marginTop: '20px', width: '100%', maxWidth: '360px' }}>
                {list.map((item) => (
                    <ListItem key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
                        <ListItemText primary={item.value} style={{fontSize:'35px'}} />
                        <IconButton onClick={() => handleIncrement(item.id)} color="primary">
                            <Add />
                        </IconButton>
                        <IconButton onClick={() => handleDecrement(item.id)} color="secondary">
                            <Remove />
                        </IconButton>
                        <IconButton onClick={() => handleRemove(item.id)} color="error">
                            <Delete />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default TodoList;
