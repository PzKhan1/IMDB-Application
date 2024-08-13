import React, { useContext, useEffect, useState } from 'react'
import genreids from "../utilities/generes";
import { MovieContext } from '../context/MovieContext';
function WatchList() {
    /*****************state variables******/
    const { watchList, setWatchList,removeFromWatchList } = useContext(MovieContext);

    const [search, setSearch] = useState("");
    const [genreList, setGenreList] = useState(["All Genres", "Thriller", "Horror"]);
    const [currGenre, setCurrGenre] = useState("All Genres");

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleFilter = (genre) => {
        setCurrGenre(genre);
    };
    /***useEffect to fetch data from local storage*/
    useEffect(() => {
        let moviesFromLocalStorage = localStorage.getItem('movies')
        if (!moviesFromLocalStorage) {
            return
        }
        setWatchList(JSON.parse(moviesFromLocalStorage))
    }, [])

    /***useEffect to filter valid genres*/
    useEffect(() => {
        let temp = watchList.map((movie) => {
            return genreids[movie.genre_ids[0]];
        });
        temp = new Set(temp);
        console.log(temp);
        setGenreList(["All Genres", ...temp]);

        //  console.log([...temp])
    }, [watchList]);

    /***********************handler function for sorting**********************/
    const handleAscnedingRatings = () => {
        const sortedAscending = watchList.sort((movieObjA, movieObjB) => {
            return movieObjA.vote_average - movieObjB.vote_average;
        });
        setWatchList([...sortedAscending]);
    };
    const handleDescendingRatings = () => {
        const sortedDescending = watchList.sort((movieObjA, movieObjB) => {
            return movieObjB.vote_average - movieObjA.vote_average;
        });

        setWatchList([...sortedDescending]);
    };

   

    return (
        <>

            <div className="flex justify-center m-4">
                {genreList.map((genre) => {
                    return (
                        <div
                            onClick={() => handleFilter(genre)}
                            className={
                                currGenre == genre
                                    ? "mx-4 flex justify-center items-center bg-blue-400 h-[3rem] w-[9rem] text-white font-bold border rounded-xl"
                                    : "flex justify-center items-center h-[3rem] w-[9rem] bg-gray-400/50 rounded-xl text-white font-bold mx-4"
                            }
                        >
                            {genre}
                        </div>
                    );
                })}
            </div>
            {/* search filed */}
            <div className="flex justify-center my-10">
                <input
                    placeholder="Search Movies"
                    className="h-[3rem] w-[18rem] bg-gray-200 px-4 outline-none border border-slate-600"
                    type="text"
                    onChange={handleSearch}
                    value={search}
                />
            </div>
            {/* {watch list table} */}
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-6 py-4 font-medium text-gray-900">Name</th>
                            <th>
                                <div className="flex">
                                    <div>
                                        <i
                                            onClick={handleAscnedingRatings}
                                            className="fa-solid fa-arrow-up"
                                        ></i>{" "}
                                        Ratings
                                        {" "}
                                        <i
                                            onClick={handleDescendingRatings}
                                            className="fa-solid fa-arrow-down"
                                        ></i>
                                    </div>
                                </div>
                            </th>
                            <th>
                                <div className="flex">
                                    <div>Popularity</div>
                                </div>
                            </th>
                            <th>
                                <div className="flex">
                                    <div>Genre</div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {watchList.
                            filter((movie) => {
                                if (currGenre == "All Genres") {
                                    return true;
                                } else {
                                    return genreids[movie.genre_ids[0]] == currGenre; // Drama;
                                }
                            })
                            .filter((movie) =>
                                movie.title.toLowerCase().includes(search.toLowerCase())
                            )
                            .map((movie) => (
                                <tr className="hover:bg-gray-50" key={movie.id}>
                                    <td className="flex items-center px-6 py-4 font-normal text-gray-900">
                                        <img className="h-[6rem] w-[10rem] object-fit" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="" />
                                        <div className="font-medium text-gray-700 text-sm">{movie.title}</div>
                                    </td>
                                    <td className="pl-6 py-4">
                                        {movie.vote_average}
                                    </td>
                                    <td className="pl-6 py-4">
                                        {movie.popularity}
                                    </td>
                                    <td className="pl-2 py-4">
                                        {genreids[movie.genre_ids[0]]}
                                    </td>
                                    <td onClick={() => removeFromWatchList(movie)} className="text-red-500">Delete</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>

    );
}

export default WatchList;