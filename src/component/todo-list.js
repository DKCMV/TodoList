// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import { TextField, Button, Typography, Container, List, ListItem, ListItemText, IconButton } from '@mui/material';
// import { Add, Remove, Delete } from '@mui/icons-material';

// const TodoList = () => {
//     const [number, setNumber] = useState('');
//     const [list, setList] = useState([]);

//     const handleAdd = () => {
//         if (number !== '') {
//             setList((prevList) => [
//                 ...prevList,
//                 { id: Date.now(), value: Number(number) }
//             ]);
//             setNumber('');
//         }
//     };

//     const handleIncrement = (id) => {
//         setList((prevList) => 
//             prevList.map((item) => 
//                 item.id === id ? { ...item, value: item.value + 1 } : item
//             )
//         );
//     };

//     const handleDecrement = (id) => {
//         setList((prevList) => 
//             prevList.map((item) => 
//                 item.id === id && item.value > 0 ? { ...item, value: item.value - 1 } : item
//             )
//         );
//     };

//     const handleRemove = (id) => {
//         setList((prevList) => prevList.filter((item) => item.id !== id));
//     };

//     return (
//         <Box align="center">
//             <Typography variant="h2" color="initial" margin={6}>TODO LIST</Typography>
//             <Container>
//                 <TextField 
//                     id="outlined-basic" 
//                     type='number' 
//                     label="Enter a number" 
//                     variant="filled" 
//                     value={number} 
//                     onChange={(e) => setNumber(e.target.value)} 
//                 />
//                 <Button 
//                     variant="contained" 
//                     color="success"  
//                     style={{ fontSize: '20px', padding: '10px', marginLeft: '12px' }} 
//                     onClick={handleAdd}
//                 >
//                     Add
//                 </Button>    
//             </Container>

//             {/* List of items */}
//             <List style={{ marginTop: '20px', width: '100%', maxWidth: '360px' }}>
//                 {list.map((item) => (
//                     <ListItem key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
//                         <ListItemText primary={item.value} style={{fontSize:'35px'}} />
//                         <IconButton onClick={() => handleIncrement(item.id)} color="primary">
//                             <Add />
//                         </IconButton>
                        
//                         <IconButton onClick={() => handleDecrement(item.id)} color="secondary">
//                             <Remove />
//                         </IconButton>
//                         <IconButton onClick={() => handleRemove(item.id)} color="error">
//                             <Delete />
//                         </IconButton>
//                     </ListItem>
//                 ))}
//             </List>
//         </Box>
//     );
// };

// export default TodoList;


import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import { TextField, Button, Typography, Container, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { addItem, incrementItem, decrementItem, removeItem } from '../component/slice.js';

const TodoList = () => {
    const [number, setNumber] = useState('');
    const list = useSelector((state) => state.todo.list);
    const dispatch = useDispatch();

    const handleAdd = () => {
        const value = Number(number);
        if (number !== '' && !isNaN(value) && !list.some(item => item.value === value)) {
            dispatch(addItem({ id: Date.now(), value }));
            setNumber('');
        }
    };

    const handleIncrement = (id) => {
        dispatch(incrementItem(id));
    };

    const handleDecrement = (id) => {
        dispatch(decrementItem(id));
    };

    const handleRemove = (id) => {
        dispatch(removeItem(id));
    };

    return (
        <Box align="center">
            <Typography variant="h2" margin={6}>TODO LIST</Typography>
            <Container>
                <TextField 
                    type='number' 
                    label="Enter a number" 
                    variant="filled" 
                    value={number} 
                    onChange={(e) => setNumber(e.target.value)} 
                />
                <Button 
                    variant="contained" 
                    color="success"  
                    sx={{ fontSize: 20, padding: 1, marginLeft: 1 }} 
                    onClick={handleAdd}
                >
                    Add
                </Button>    
            </Container>

            <List sx={{ marginTop: 2, width: '100%', maxWidth: 360 }}>
                {list.map((item) => (
                    <ListItem key={item.id} sx={{ display: 'flex', alignItems: 'center' }}>
                        <ListItemText primary={item.value} sx={{ fontSize: 35 }} />
                        <IconButton onClick={() => handleIncrement(item.id)} color="primary">
                            <Add />
                        </IconButton>
                        
                        <IconButton 
                            onClick={() => handleDecrement(item.id)} 
                            color="secondary" 
                            disabled={item.value === 0}
                        >
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
