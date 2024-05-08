import './App.css';
import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com/?apikey=7dc7f662';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    searchMovies(searchTerm);
  }, []);

  const searchMovies = async title => {
    const res = await fetch(`${API_URL}&s=${title}`);
    const data = await res.json();
    setMovies(data.Search);
  };

  return (
    <div className='app'>
      <h1>MovieLand</h1>

      <div className='search'>
        <input
          className='input'
          type='text'
          placeholder='Search the movies'
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
            searchMovies(e.target.value);
          }}
        />
      </div>

      {movies?.length > 0 ? (
        <div className='container'>
          {movies.map(movie => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
