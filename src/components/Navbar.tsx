// Navbar.tsx

import Link from 'next/link';
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface NavExampleProps {
  searchMovies: (e: React.FormEvent<HTMLFormElement>) => void;
  setSearchKey: (key: string) => void;
}

const Navbar: React.FC<NavExampleProps> = ({ searchMovies, setSearchKey }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // New state for selected category

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
    <div className="bg-primary py-4 px-4 md:px-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="#">
          <div className="text-[30px] font-medium" style={{ color: '#16FF00' }}>CGVOLIS21</div>
        </Link>

        <form onSubmit={handleSearchSubmit}>
          <div className="space-x-4">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="bg-secondary text-textColor py-2 px-4 hover:bg-textColor hover:text-white"
            >
              <option value="" disabled>Select Category</option>
              <option value="rekomendasi">Rekomendasi</option>
            </select>

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
          </div>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
