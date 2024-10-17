import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: [],
};

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const { id, value } = action.payload;
            state.list.push({ id, value });
        },
        incrementItem: (state, action) => {
            const item = state.list.find(item => item.id === action.payload);
            if (item) {
                item.value += 1;
            }
        }, 
        decrementItem: (state, action) => {
            const item = state.list.find(item => item.id === action.payload);
            if (item && item.value > 0) {
                item.value -= 1;
            }
        },
        removeItem: (state, action) => {
            state.list = state.list.filter(item => item.id !== action.payload);
        }
    }
});

export const { addItem, incrementItem, decrementItem, removeItem } = todoSlice.actions;
export default todoSlice.reducer;
