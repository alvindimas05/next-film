"use client";

// home-admin.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import CardAdmin from './CardAdmin';
import DetailAdmin from './DetailAdmin';

interface IMovie {
  id: number;
  poster_path: string;
  title: string;
}

const HomeAdmin: React.FC = () => {
  const API_URL = 'https://api.themoviedb.org/3/';
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [searchKey, setSearchKey] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const fetchMovies = async (searchKey: string) => {
    setIsSearching(!!searchKey);
    const type = searchKey ? 'search' : 'discover';
    const { data: { results } } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: process.env.NEXT_PUBLIC_API_KEY,
        query: searchKey,
      },
    });

    setMovies(results);
  };

  useEffect(() => {
    fetchMovies('');
  }, []);

  const searchMovies = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };


  return (
    <div className="App body">
      <Navbar searchMovies={searchMovies} setSearchKey={setSearchKey} />
    </div>
  );
};

export default HomeAdmin;
