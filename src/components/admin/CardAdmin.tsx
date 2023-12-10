// card-admin.tsx
import React from 'react';
import Link from 'next/link';
import axios from 'axios';

interface IMovie {
    id: number;
    poster_path: string;
    title: string;
  }

interface CardAdminProps {
  movie: IMovie;
}

const CardAdmin: React.FC<CardAdminProps> = ({ movie }) => {
  const handleAddToList = async () => {
    try {
      // Ganti dengan endpoint dan konfigurasi yang sesuai dari API Anda
      const response = await axios.post(
        `https://api.themoviedb.org/3/list/{list_id}/add_item`, 
        {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
          media_id: movie.id,
        }
      );

      // Tambahkan logika tambahan sesuai kebutuhan, misalnya memberi umpan balik kepada pengguna
      console.log('Added to list:', response.data);
    } catch (error) {
      console.error('Error adding to list:', error);
    }
  };

  return (
    <div className="movie-card">
      <Link href={`/movie/${movie.id}`}>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      </Link>
      <div>
        <h1>{movie.title}</h1>
        <button onClick={handleAddToList}>Add to List</button>
      </div>
    </div>
  );
};

export default CardAdmin;
