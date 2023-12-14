import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import './App.css'
import FAQ from "./FAQ";

const MovieCard = ({ movie }) => (
    <div className="col-md-4 mb-4">
        <div className="card h-100 shadow">
            <img src="https://via.placeholder.com/150" className="card-img-top" alt="Movie Poster" />
            <div className="card-body">
                <h5 className="card-title">{movie.name}</h5>
                <p className="card-text movie-description">
                    {movie.description.length > 100 ? `${movie.description.substring(0, 100)}...` : movie.description}
                </p>
                <p className="card-text">کارگردان: {movie.director_name}</p>
                <p className="card-text">امتیاز کاربران: {movie.rate}</p>
                <Link to={`/movie/${movie.id}`} className="btn btn-primary">
                    اطلاعات بیشتر
                </Link>
            </div>
        </div>
    </div>
);

const MovieDetails = () => {
    const { id: movieId } = useParams();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Fetch all movies
        fetch('https://cinema-ticket-api.liara.run/api/v1/movies/')
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    // Find the movie with the matching ID
    const movieDetails = movies.find(movie => String(movie.id) === movieId);

    if (!movieDetails) {
        return <div>در حال بارگذاری...</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">{movieDetails.name}</h2>
            <div className="row">
                <div className="col-md-4">
                    <img src="https://via.placeholder.com/300" className="img-fluid mb-4" alt="Movie Poster" />
                </div>
                <div className="col-md-8">
                    <h5 className="mb-3">کارگردان: {movieDetails.director_name}</h5>
                    <p className="mb-3">
                        <strong>ژانرها:</strong>{' '}
                        {movieDetails.genres.map(genre => genre.name).join(', ')}
                    </p>
                    <h5 className="mb-3">بازیگران:</h5>
                    <ul className="mb-3">
                        {movieDetails.actors.map(actor => (
                            <li key={actor.id}>
                                {actor.name}
                            </li>
                        ))}
                    </ul>
                    <p className="mb-3">
                        <strong>امتیاز:</strong> {movieDetails.rate}
                    </p>
                    <h5 className="mb-3">توضیحات:</h5>
                    <p>{movieDetails.description}</p>
                </div>
            </div>
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

const NavbarComponent = () => (
    <nav dir="rtl" className="navbar navbar-expand-lg navbar-dark bg-danger shadow-sm">
        <div className="container">
            <Link className="navbar-brand" to="/">
                فهرست فیلم‌ها
            </Link>
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
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/faq">
                           سوالات متداول
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

const HeroBanner = () => (
    <div className="mb-4 hero-banner text-center text-light d-flex align-items-center justify-content-center" style={{ backgroundColor: '#343a40', height: '300px' }}>
        <h1 className="display-4">سینما تیکت</h1>
    </div>
);

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
            <HeroBanner />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<MovieList movies={movies} />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                    <Route path="/FAQ" element={<FAQ />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
