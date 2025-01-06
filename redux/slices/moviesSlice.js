import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

// Отримання списку фільмів
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
    const response = await axios.get('/movies');
    return response.data;
});

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        items: [],
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchMovies.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default moviesSlice.reducer;
