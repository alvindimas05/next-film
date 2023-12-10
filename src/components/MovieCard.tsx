// MovieCard.tsx

import React from 'react';
import Link from 'next/link';

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
        <Link href={`/movie/${movie.id}`}>
          <img
            className="rounded-xl"
            src={`${IMAGE_PATH}${movie.poster_path}`}
            alt=""
          />
        </Link>
      ) : (
        <div className="movie-placeholder">No Image Found :(</div>
      )}
      <h1 className='font-bold md:2xl:' style={{ paddingTop: '10px', color: '#86FCF4' }}>
        {movie.title}
      </h1>
    </div>
  );
};

export default MovieCard;
