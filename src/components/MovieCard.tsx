// MovieCard.tsx

import React from 'react';
import { Link } from 'react-router-dom';

interface IMovie {
  id: number;
  poster_path: string;
  title: string;
}

interface MovieCardProps {
  movie: IMovie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500/";

  return (
    <div className="movie-card">
      {movie.poster_path ? (
        <Link to={`/movie/${movie.id}`}>
          <img
            className="movie-cover"
            src={`${IMAGE_PATH}${movie.poster_path}`}
            alt=""
          />
        </Link>
      ) : (
        <div className="movie-placeholder">No Image Found :(</div>
      )}
      <h5 style={{ padding: '10px', color: '#16FF00' }}>
        {movie.title}
      </h5>
      {/* Add other elements using movie properties */}
    </div>
  );
};

export default MovieCard;
