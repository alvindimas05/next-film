"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FormEvent } from 'react';
import { useClerk } from '@clerk/clerk-react';


const TambahKategori = () => {
  const [categoryName, setCategoryName] = useState('');
  const router = useRouter();
  const clerk = useClerk();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Kirim permintaan API untuk membuat kategori
      const response = await axios.post(
        'https://api.themoviedb.org/3/list',
        {
          name: categoryName,
          language: 'en',
        },
        {
          params: {
            api_key: process.env.NEXT_PUBLIC_API_KEY, 
          },
        }
      );

      // Redirect ke halaman cardAdmin setelah berhasil membuat kategori
      router.push(`/HomeAdmin?listId=${response.data.id}`);
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 rounded-md p-8 w-96">
        <label htmlFor="category" className="block text-white font-medium text-md">
          Add Category:
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="category"
            name="category"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md bg-gray-800 text-white"
          />
        </div>
        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TambahKategori;

// headers: {
//   Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
//   'Content-Type': 'application/json',
// }
// axios.post('https://api.themoviedb.org/3/list',{name: categoryName,
// language: 'en',},{params: {api_key: process.env.NEXT_PUBLIC_API_KEY,},  }  );