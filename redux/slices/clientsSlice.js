import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

// Отримання всіх клієнтів
export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
    const response = await axios.get('/clients');
    return response.data;
});

// Додавання нового клієнта
export const createClient = createAsyncThunk('clients/createClient', async (clientData) => {
    const response = await axios.post('/clients', clientData);
    return response.data;
});

const clientsSlice = createSlice({
    name: 'clients',
    initialState: {
        items: [],
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchClients.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchClients.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchClients.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(createClient.fulfilled, (state, action) => {
                state.items.push(action.payload);
            });
    },
});

export default clientsSlice.reducer;
