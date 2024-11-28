import { useEffect, useState } from "react";
import Movie from "../components/Movie"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
//import styles from "./Details.module.css";

function Details() {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState({});
    const [error, setError] = useState(null);
    const getMovie = async () => {
        try { const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`); 
            if (!response.ok) { 
                throw new Error('Network response was not ok'); 
            } 
            const result = await response.json(); 
            setMovie(result.data.movie); 
        } catch (error) { 
            setError(error); 
        } finally { 
            setLoading(false); 
        }
    };
    useEffect(() => {
        getMovie();
    },[id]);
    return (
        <div style={{ 
            backgroundImage: `url(${movie.background_image})`,  
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh'
            }}>
            <h1>Details</h1>
            <h2>{movie.title}</h2>
            <img src={movie.medium_cover_image} alt={movie.title} />
            <ul>
                <li>year : {movie.year} </li>
                <li>rating : {movie.rating}</li>    
                <li>runtime : {movie.runtime}</li> 
                {movie.genres && movie.genres.map((g, index) =>(
                        <li key={index}>{g}</li>
                    ))}
            </ul>
            <Link to={process.env.PUBLIC_URL + "/"}>Home</Link>
            {error && <h1>ERROR!!!</h1>}
        </div>
    );
}

export default Details