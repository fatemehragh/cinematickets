import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";

const MovieCard = ({ movie }) => (
    <div className="col-md-4 mb-4">
        <div className="card">
            <img src="https://via.placeholder.com/150" className="card-img-top" alt="Movie Poster" />
            <div className="card-body">
                <h5 className="card-title">{movie.name}</h5>
                <p className="card-text">{movie.description}</p>
                <p className="card-text">Director: {movie.director_name}</p>
                <p className="card-text">Rating: {movie.rate}</p>
                <Link to={`/movie/${movie.id}`} className="btn btn-primary">More Info</Link>
            </div>
        </div>
    </div>
);

const MovieDetails = ({ match }) => {
    const { id: movieId } = useParams();
    // Fetch movie details using the movieId (you can implement this part as needed)

    return (
        <div>
            <h2>Movie Details</h2>
            {/* Display movie details here */}
        </div>
    );
};
const MovieList = ({ movies }) => (
    <div className="row">
        {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
        ))}
    </div>
);
const NavbarComponent = () => {
    return (
        <nav dir="rtl" className="navbar navbar-expand-lg navbar-dark bg-danger shadow-sm">
            <div className="container">
                <Link className="navbar-brand" to="/">فهرست فیلم‌ها</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="تغییر ناوبری"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto"> {/* mr-auto to align links to the right */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/">همه فیلم‌ها</Link>
                        </li>
                        {/* Translate and add more Persian menu items as needed */}
                    </ul>
                </div>
            </div>
        </nav>    );
};

const App = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Replace the API URL below with your actual API URL
        fetch('https://cinema-ticket-api.liara.run/api/v1/movies/')
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <BrowserRouter>
            <NavbarComponent />
            <div className="mb-4 hero-banner text-center text-light d-flex align-items-center justify-content-center" style={{ backgroundColor: 'gray', height: '300px' }}>
                <h1>سینما تیکت</h1>
            </div>
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<MovieList movies={movies} />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
