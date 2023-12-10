// Navbar.tsx

import Link from 'next/link';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { SignedOut, UserButton, SignedIn, useSession } from '@clerk/nextjs';
import { checkUserRole } from '@/app/utils/userUtils';
import axios from 'axios';
import SignInPage from '@/app/sign-in/[[...sign-in]]/page';
import SignUpPage from '@/app/sign-up/[[...sign-up]]/page';

interface NavExampleProps {
  searchMovies: (e: React.FormEvent<HTMLFormElement>) => void;
  setSearchKey: (key: string) => void;
}

const Navbar: React.FC<NavExampleProps> = ({ searchMovies, setSearchKey }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [lists, setLists] = useState([]);
  const { session } = useSession();
  const userRole = checkUserRole(session);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/list', {
          params: {
            api_key: process.env.NEXT_PUBLIC_API_KEY,
          },
        });

        setLists(response.data.results);
      } catch (error) {
        console.error('Error fetching lists:', error);
      }
    };

    fetchLists();
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value);
  }

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  }

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchMovies(e);
  }

  return (
    <div className="bg-[#324376] py-4 px-4 md:px-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="text-[30px] font-medium" style={{ color: '#8B80F9' }}>CGVOLIS21</div>
        </Link>

        <form onSubmit={handleSearchSubmit} className="flex items-center space-x-4">
        <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="bg-secondary text-textColor py-2 px-4 hover:bg-textColor hover:text-white"
            >
              <option value="" disabled>Select Category</option>
              {lists.map((list: any) => (
                <option key={list.id} value={list.name}>
                  {list.name}
                </option>
              ))}
            </select>

          {userRole === 'admin' && (
            <Link href="/admin/tambah-kategori">
              <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm7 8H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" fill="#08ff5a" className="fill-000000"></path>
              </svg>
          </Link>
          )}
         

          <input
            className="bg-secondary px-4 py-2 outline-none placeholder:text-textColor"
            type="text"
            placeholder="Search a Movie..."
            onChange={handleSearchChange}
          />

          <button
            type="submit"
            className="bg-secondary text-textColor py-2 px-4 hover:bg-textColor hover:text-white"
          >
            Search
          </button>

          <div className="flex items-center space-x-4">
            <SignedOut>
              <Link href="/sign-in">
                <button className='text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-base'>
                  Login
                </button>
              </Link>
              <Link href='/sign-up'>
                <button className='text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-base'>
                  Sign Up
                </button>
              </Link>
            </SignedOut>

            <SignedIn>
              <div>
                <UserButton afterSignOutUrl='/' />
              </div>
            </SignedIn>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
