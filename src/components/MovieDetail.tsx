"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import { BsPlayFill } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import ReactPlayer from 'react-player';
import Genres from './Genres';

const MovieDetail = ({ movieId }: { movieId: string }) => {
  interface IMovie {
    poster_path: string;
    title: string;
    genres: [
      {
        name: string;
        id: string;
      }
    ];
    original_language: string;
    release_date: string;
    runtime: string;
    vote_average: string;
    overview: string;
    videos: { results: [{ type: string; key: string }] };
  }

  const API_URL = 'https://api.themoviedb.org/3/';
  const [movie, setMovie] = useState<IMovie>();
  const [trailer, setTrailer] = useState<string>('');
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      const response = await axios.get(`${API_URL}/movie/${movieId}`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
        },
      });
      setMovie(response.data);
    };

    const fetchVideos = async () => {
      const response = await axios.get(`${API_URL}/movie/${movieId}/videos`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
        },
      });
      const trailerKey = response.data.results[0]?.key || '';
      setTrailer(`https://www.youtube.com/watch?v=${trailerKey}`);
    };

    fetchMovieData();
    fetchVideos();
  }, [movieId]);

  return (
    (movie && trailer &&
      <div className="flex justify-center items-center min-h-screen">
        <button onClick={goBack}>
          <FaArrowLeft size={30} style={{ color: '#16FF00' }} className="ml-60" />
        </button>
        <div className="container mx-auto px-4 pt-3 overflow-auto">
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

              <div
                className="inline-block pt-6 cursor-pointer"
                onClick={() => setShowPlayer(true)}
              >
                <div className="flex gap-2 items-center bg-white text-black px-4 py-2 mb-6 hover:bg-[#b4b4b4]">
                  <BsPlayFill size={24} />
                  Watch Trailer
                </div>
              </div>
            </div>
          </div>

          <div
            className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ${showPlayer ? 'opacity-100 z-50' : 'opacity-0 -z-10'
              }`}
          >
            <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-3.5">
              <span className="font-semibold">Playing Trailer</span>
              <div
                className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0F0F0F] "
                onClick={() => setShowPlayer(false)}
              >
                <IoMdClose className="h-5" />
              </div>
            </div>
            <div className="relative pt-[56.25%]">
              <ReactPlayer
                url={trailer}
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: '0', left: '0' }}
                controls={true}
                playing={showPlayer}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
}

function goBack() {
  window.history.back();
}

export default MovieDetail;
