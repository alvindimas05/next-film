// DetailAdmin.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Genres from '../Genres';

interface IMovie {
    poster_path: string;
    title: string;
    genres: [{ name: string; id: string }];
    original_language: string;
    release_date: string;
    runtime: string;
    vote_average: string;
    overview: string;
    videos: { results: [{ type: string; key: string }] };
}

const DetailAdmin: React.FC = () => {
    const API_URL = 'https://api.themoviedb.org/3/';
    const { movieId } = useParams();
    const [movie, setMovie] = useState<IMovie>();

    useEffect(() => {
        const fetchMovieData = async () => {
            const response = await axios.get(`${API_URL}/movie/${movieId}`, {
                params: {
                    api_key: process.env.NEXT_PUBLIC_API_KEY,
                },
            });
            setMovie(response.data);
        };


        fetchMovieData();
    }, [movieId]);

    const addToMyList = () => {
        // Implementasikan logika untuk menambahkan film ke daftar Anda di sini
        console.log('Added to My List:', movie?.title);
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <button onClick={goBack}>
                <FaArrowLeft size={30} style={{ color: '#16FF00' }} className="ml-60" />
            </button>
            <div className="flex flex-col md:flex-row justify-start items-center">
                <img
                    className="w-[400px] h-full object-contain md:mr-8 rounded-lg"
                    src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                    alt={movie?.title}
                />
                <div className="space-y-6">
                    <div className="uppercase -translate-y-3 text-[26px] md:text-[34px] font-medium pr-4 text-white">
                        {movie?.title}
                    </div>

                    <div className="flex gap-4 flex-wrap">
                        {movie?.genres?.map((genre, index) => (
                            <Genres
                                key={genre?.id}
                                index={index}
                                length={movie?.genres?.length}
                                name={genre?.name}
                            />
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                        <div>Language: {movie?.original_language?.toUpperCase()}</div>
                        <div>Release: {movie?.release_date}</div>
                        <div>Runtime: {movie?.runtime} MIN.</div>
                        <div>Rating: {movie?.vote_average} ⭐</div>
                    </div>

                    <div className="pt-14 space-y-2 pr-4">
                        <div>OVERVIEW:</div>
                        <div className="lg:line-clamp-4">{movie?.overview}</div>
                    </div>
                </div>

                <div className="inline-block pt-6 cursor-pointer" onClick={addToMyList}>
                    <div className="flex gap-2 items-center bg-white text-black px-4 py-2 mb-6 hover:bg-[#b4b4b4]">
                        Add to List
                    </div>
                </div>
            </div>
        </div>
    );
};

function goBack() {
    window.history.back();
}

export default DetailAdmin;


