// "use client";

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import MovieDetail from './MovieDetail';
// import MovieCard from './MovieCard';
// import Navbar from './Navbar';

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// interface IMovie {
//   id: number;
//   poster_path: string;
//   title: string;
// }

// function Home() {
//   const API_URL = 'https://api.themoviedb.org/3/';
//   const [movies, setMovies] = useState<IMovie[]>([]);
//   const [searchKey, setSearchKey] = useState<string>('');
//   const [isSearching, setIsSearching] = useState<boolean>(false);

//   const fetchMovies = async (searchKey: string) => {
//     setIsSearching(!!searchKey);
//     const type = searchKey ? 'search' : 'discover';
//     const { data: { results } } = await axios.get(`${API_URL}/${type}/movie`, {
//       params: {
//         api_key: process.env.NEXT_PUBLIC_API_KEY,
//         query: searchKey,
//       },
//     });

//     setMovies(results);
//   };

//   useEffect(() => {
//     fetchMovies('');
//   }, []);

//   const renderMovies = () =>
//     movies.map((movie) => <MovieCard key={movie.id} movie={movie} />);

//   const searchMovies = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     fetchMovies(searchKey);
//   };

//   return (
//     <Router>
//       <div className="App body">
//         <Navbar searchMovies={searchMovies} setSearchKey={setSearchKey} />
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <>
//               <div>
//                 <h1>Popular</h1>
//               </div>
//                 <div className="container-movie max-center">{renderMovies()}</div>
//               </>
//             }
//           />

//           <Route path="/movie/:movieId" element={<MovieDetail />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default Home;
"use client";

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MovieDetail from './MovieDetail';
import MovieCard from './MovieCard';
import Navbar from './Navbar';
import Thumbnail from './Thumbnail';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

interface IMovie {
  id: number;
  poster_path: string;
  title: string;
}

interface RowProps {
  title: string;
  movies: IMovie[];
}

const Row: React.FC<RowProps> = ({ title, movies }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const handleClick = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-0.5 md:space-y-2">
      <h2 className="w-56 mt-6 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>

      <div className="group relative md:ml-2 overflow-hidden">
        <BiChevronLeft
          className="absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick('left')}
        />

        <div
          className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2 w-full whitespace-nowrap"
          ref={rowRef}
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>

        <BiChevronRight
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  );
};

function Home() {
  const API_URL = 'https://api.themoviedb.org/3/';
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<IMovie[]>([]);
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

  const fetchTopRatedMovies = async () => { 
    const { data: { results } } = await axios.get(`${API_URL}/movie/top_rated`, { 
      params: {
        api_key: process.env.NEXT_PUBLIC_API_KEY,
      },
    });

    setTopRatedMovies(results); 
  };

  useEffect(() => {
    fetchMovies('');
    fetchTopRatedMovies();
  }, []);

  const renderMovies = () =>
    movies.map((movie) => <MovieCard key={movie.id} movie={movie} />);

  const searchMovies = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  return (
    <Router>
      <div className="App body">
        <Navbar searchMovies={searchMovies} setSearchKey={setSearchKey} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Row title="Top Rated" movies={topRatedMovies}/>
                <div className="container-movie max-center">{renderMovies()}</div>
              </>
            }
          />

          <Route path="/movie/:movieId" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Home;
