import axios from "axios";
import React, { useEffect, useState } from "react";
function Banner() {
    const [bannerImage, setBannerImage] = useState("https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68");
    const [title, setTitle] = useState("Placeholder movie");
    useEffect(() => {
        
        axios
            .get(
                `https://api.themoviedb.org/3/trending/movie/day?api_key=3aec63790d50f3b9fc2efb4c15a8cf99&language=en-US&page=1`
            )
            .then(function (res) {
                
                let firstMovie=res.data.results[0];
                let firstMovieTitle=firstMovie.title;
                let firstMoviePoster = firstMovie["backdrop_path"];
                setTitle(firstMovieTitle);
                 
                setBannerImage(`https://image.tmdb.org/t/p/original/${firstMoviePoster}`)
            });
    }, []);
    return (
        <div
            className="h-[20vh] md:h-[75vh] bg-cover bg-center flex items-end"
            style={{
                backgroundImage:
                    `url(${bannerImage} )`,
            }}
        >
            <div className="text-white w-full text-center text-2xl">
                {title}
            </div>
        </div>
    );
}
export default Banner;
