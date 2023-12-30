import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import { BrowserRouter, Routes, Route, Link, useParams,useNavigate } from "react-router-dom";
import './App.css'
import FAQ from "./FAQ";
import Contact from './Contact-us';


const MovieCard = ({ movie, onMovieClick }) => (
    <div className="col-md-4 mb-4" onClick={() => onMovieClick(movie.id)}>
        <div className="card h-100 shadow">
            <img src="https://via.placeholder.com/150" className="card-img-top" alt="Movie Poster" />
            <div className="card-body">
                <h5 className="card-title">{movie.name}</h5>
                <p className="card-text movie-description">
                    {movie.description.length > 100 ? `${movie.description.substring(0, 100)}...` : movie.description}
                </p>
                <p className="card-text">کارگردان: {movie.director_name}</p>
                <p className="card-text">امتیاز کاربران: {movie.rate}</p>
                <p className="card-text">سینما: {movie.cinemas.length > 0 ? movie.cinemas[0].name : 'نامشخص'}</p>
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
        fetch('https://cinema-ticket-api.liara.run/api/v1/movies/')
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

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
                    <p className="mb-3"><strong>سینما:</strong> {movieDetails.cinemas.length > 0 ? movieDetails.cinemas.map(cinema => cinema.name).join(', ') : 'نامشخص'}</p>
                    <h5 className="mb-3">توضیحات:</h5>
                    <p>{movieDetails.description}</p>
                </div>
            </div>
        </div>
    );
};

const MovieList = ({ movies, onMovieClick,searchTerm }) => {
    const [genres, setGenres] = useState([]);
    const [cinemas, setCinemas] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedCinemas, setSelectedCinemas] = useState([]);

    useEffect(() => {
        // Fetch genres
        fetch('https://cinema-ticket-api.liara.run/api/v1/genres/')
            .then(response => response.json())
            .then(data => setGenres(data))
            .catch(error => console.error('Error fetching genres:', error));

        // Fetch cinemas
        fetch('https://cinema-ticket-api.liara.run/api/v1/cinemas/')
            .then(response => response.json())
            .then(data => setCinemas(data))
            .catch(error => console.error('Error fetching cinemas:', error));
    }, []);

    const handleGenreFilter = (selectedOptions) => {
        setSelectedGenres(selectedOptions);
    };

    const handleCinemaFilter = (selectedOptions) => {
        setSelectedCinemas(selectedOptions);
    };

    const resetFilters = () => {
        setSelectedGenres([]);
        setSelectedCinemas([]);
    };

    const filteredMovies = movies.filter((movie) =>
        movie.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!selectedGenres.length || movie.genres.some(genre => selectedGenres.map(option => option.value).includes(genre.name))) &&
        (!selectedCinemas.length || movie.cinemas.some(cinema => selectedCinemas.map(option => option.value).includes(cinema.name)))
    );

    // Options for genres dropdown
    const genreOptions = genres.map(genre => ({ label: genre.name, value: genre.name }));

    // Options for cinemas dropdown
    const cinemaOptions = cinemas.map(cinema => ({ label: cinema.name, value: cinema.name }));

    return (
        <div>
            <div className="mb-3">
                <button className="btn btn-light mx-2" onClick={() => resetFilters()}>
                    حذف فیلترها
                </button>
                <Select
                    isMulti
                    className="mx-2"
                    placeholder="فیلتر بر اساس ژانر"
                    value={selectedGenres}
                    options={genreOptions}
                    onChange={handleGenreFilter}
                />
                <Select
                    isMulti
                    className="mx-2"
                    placeholder="فیلتر بر اساس سینما"
                    value={selectedCinemas}
                    options={cinemaOptions}
                    onChange={handleCinemaFilter}
                />
            </div>
            <div className="row">
                {filteredMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} onMovieClick={onMovieClick} />
                ))}
            </div>
        </div>
    );
};

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
            <Link className="nav-link" to="/Contact-us">
                تماس با ما
            </Link>
        </div>
    </nav>
);

const HeroBanner = () => (
    <div className="mb-4 hero-banner text-center text-light d-flex align-items-center justify-content-center" style={{ backgroundColor: '#343a40', height: '300px' }}>
        <h1 className="display-4">سینما تیکت</h1>
    </div>
);
const Footer = () => (
    <footer className="bg-dark text-light text-center py-3">
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <h5>لینک‌های مفید</h5>
                    <ul className="list-unstyled">
                        <li><Link to="/">صفحه اصلی</Link></li>
                        <li><Link to="/faq">سوالات متداول</Link></li>
                        <li><Link to="/Contact-us">تماس با ما</Link></li>
                    </ul>
                </div>
                <div className="col-md-4">
                    <h5>حقوق این سایت</h5>
                    <p>&copy; 2023 Cinema Ticket. تمامی حقوق محفوظ است.</p>
                </div>
            </div>
        </div>
    </footer>
);
const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://cinema-ticket-api.liara.run/api/v1/movies/')
            .then((response) => response.json())
            .then((data) => setMovies(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const filteredMovies = movies.filter((movie) =>
        movie.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleMovieClick = (movieId) => {
        navigate(`/movie/${movieId}`);
    };

    return (
        <>
            {/* ... (rest of the component remains unchanged) */}
            <div className="container mt-4">
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="جستجو در نام فیلم"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <Routes>
                    <Route
                        path="/"
                        element={<MovieList movies={filteredMovies} onMovieClick={handleMovieClick} searchTerm={searchTerm} />}
                    />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                    <Route path="/FAQ" element={<FAQ />} />
                    <Route path="/Contact-us" element={<Contact />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
};

export default App;
