// to create a slice -> redux;
import { createSlice } from "@reduxjs/toolkit";
const MoviesSlice = createSlice({
    name: "moviesSlice",
    // intinal state value
    initialState: {
        movies: null,
        error: false,
        loading: true,
    },
    // functions to update your state 
    reducers: {
        movieLoading: (state, action) => {
            state.error = false;
            state.loading = action.payload;
        },
        movieError: (state) => {
            state.error = true;
            state.loading = false
        },
        movieData: (state, action) => {
            state.loading = false;
            state.error = false;
            state.movies = action.payload;
        }
    }

});

export default MoviesSlice;