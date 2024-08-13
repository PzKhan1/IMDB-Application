import React, { useEffect, useState } from "react";

export const MovieContext = React.createContext();

export default function MovieContextWrapper({ children }) {
    //     watchList to reprsent the watchList 
    const [watchList, setWatchList] = useState([]);

    const addToWatchList = (movieObj) => {
        let updatedWatchlist = [...watchList, movieObj];
        setWatchList(updatedWatchlist);
        localStorage.setItem('movies', JSON.stringify(updatedWatchlist))


    };
    const removeFromWatchList = (movieObj) => {
        let filtredMovies = watchList.filter((movie) => {
            return movie.id != movieObj.id
        })
        setWatchList(filtredMovies)
        localStorage.setItem('movies', JSON.stringify(filtredMovies))
    };
    useEffect(() => {
        let moviesFromLocalStorage = localStorage.getItem('movies')
        if (!moviesFromLocalStorage) {
            return
        }
        console.log('movies from local storage', moviesFromLocalStorage)
        setWatchList(JSON.parse(moviesFromLocalStorage))
    }, [])


    return <MovieContext.Provider value={{ addToWatchList, removeFromWatchList, watchList, setWatchList }}>
        {children} </MovieContext.Provider>;
}