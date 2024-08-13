import React, { useContext, useEffect, useState } from "react";
import Pagination from "./Pagination";
import MovieCard from "./MovieCard";
import axios from "axios";
import { MovieContext } from "../context/MovieContext";
import fetchMiddleWare from "../redux/fetchMovieMiddleWare";
import { useSelector, useDispatch } from "react-redux";
import PaginationSlice from "../redux/paginationSlice";
const paginationActions = PaginationSlice.actions;

function Movies() {
    const { error, loading, movies } = useSelector((state) => {
        return state.MoviesSlice
    });
    const { pageNo } = useSelector((state) => {return state.PaginationSlice});
    console.log(pageNo);
    const dispatch = useDispatch();
    //     we will be using this static list of movies then we will replace it with actual  data fetching logic 
    // const [movies, setMovies] = useState([]);
    const { watchList, addToWatchList, removeFromWatchList } = useContext(MovieContext);
    /************ pagination code**************/
    //     this state variable will be used to represent pagination
    useEffect(function () {
        dispatch(fetchMiddleWare(pageNo));
    }, [pageNo]);

    const handleNext = () => {
        dispatch(paginationActions.handleNext());
    }
    const handlePrevious = () => {
        dispatch(paginationActions.handlePrevious());
    }

    /*****************************rendering logic********************************/
    if (loading) {
        return <h1>Loading...</h1>
    }
    if (error) {
        return <h1>Something went wrong</h1>
    }

    return (
        <div>
            {/* movie list */}
            <div className="text-2xl font-bold text-center m-5">
                <h1>Trending Movies</h1>
            </div>
            <div className="flex justify-evenly flex-wrap gap-8 ">
                {movies.map((movieObj) => {
                    return <MovieCard key={movieObj.id}
                        addToWatchList={addToWatchList}
                        removeFromWatchList={removeFromWatchList}
                        watchList={watchList}
                        movieObj={movieObj} />
                })}
            </div>
            {/* pagination */}
            <Pagination
                nextPageFn={handleNext}
                previosuPageFn={handlePrevious}
                pageNumber={pageNo}
            />
        </div>
    );
}

export default Movies;