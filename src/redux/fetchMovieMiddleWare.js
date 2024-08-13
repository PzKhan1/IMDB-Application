
import MoviesSlice from "./movieSlice";
const actions = MoviesSlice.actions;
// 1 to send data to middleWare
const fetchMiddleWare = (params) => {
    // 2. you automatically get the dispatch
    return async function (dispatch) {
        console.log(params);
        try {
            dispatch(actions.movieLoading(true));
            const resp = await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=3aec63790d50f3b9fc2efb4c15a8cf99&language=en-US&page=1")
            const moviesObj = await resp.json();
            dispatch(actions.movieData(moviesObj.results));
        } catch (err) {
            dispatch(actions.movieError());
        } finally {
            dispatch(actions.movieLoading(false));
        }
    }
}
export default fetchMiddleWare;
