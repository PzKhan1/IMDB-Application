import { configureStore } from '@reduxjs/toolkit';
import movieSlice from './movieSlice'; // Fix the import statement to use the correct casing
import PaginationSlice from './paginationSlice';
// adding async middlewares
const store = configureStore({
    reducer: {
        MoviesSlice: movieSlice.reducer, // Fix the reducer key to use the correct casing
        PaginationSlice: PaginationSlice.reducer
    }
})
export default store;