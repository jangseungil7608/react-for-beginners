import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Movie() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const getMovies = async () => {
        try { const response = await fetch('https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year'); 
            if (!response.ok) { 
                throw new Error('Network response was not ok'); 
            } 
            const result = await response.json(); 
            setMovies(result.data.movies); 
        } catch (error) { 
            setError(error); 
        } finally { 
            setLoading(false); 
        }
    };
    useEffect(() => {
        getMovies();
    },[]);

    return (
        <div>
            {loading ? <h1>Loading...</h1> : (
                <div>
                    {movies.map((movie) =>
                        <MovieDetail 
                        key={movie.id}
                        id={movie.id}
                        coverImg={movie.medium_cover_image}
                        title={movie.title}
                        summary={movie.summary}
                        genres={movie.genres}
                        />
                    
                   //<MovieDetails movie={movie} />
                    )}
                </div>
            )}
            {error ? <h1>ERROR!!!</h1> : null}
        </div>
    );
}

function MovieDetail({id, coverImg, title, summary, genres}) {
    return (
        <div>
                <img src={coverImg} />
                <h2><Link to={`${process.env.PUBLIC_URL}/movie/${id}`}>{title}</Link></h2>
                <p>{summary}</p>
                <ul>
                    {genres.map((g) =>(
                        <li key={g}>{g}</li>
                    ))}
                </ul>
                <hr />
        </div>
        );
}

MovieDetail.propTypes = {
    id:PropTypes.number.isRequired,
    coverImg:PropTypes.string.isRequired,
    title:PropTypes.string.isRequired,
    summary:PropTypes.string.isRequired,
    genres:PropTypes.arrayOf(PropTypes.string).isRequired,
};

/*
function MovieDetails({movie}) {
    return (
        <div>
                <img src={movie.medium_cover_image} />
                <h2>{movie.title}</h2>
                <p>{movie.summary}</p>
                <ul>
                    {movie.genres.map((g) =>(
                        <li key={g}>{g}</li>
                    ))}
                </ul>
                <hr />
        </div>
        );
}
*/

export default Movie;