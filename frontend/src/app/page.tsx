'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProperties } from '@/store/features/propertySlice';
import HomeSearch from '@/components/HomeSearch';
import PropertyCard from '@/components/PropertyCard';

export default function Home() {
  const dispatch = useAppDispatch();
  const { items: properties, status } = useAppSelector((state) => state.properties);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProperties());
    }
  }, [dispatch, status]);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with updated styling */}
      <section className="relative h-[500px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url("/images/hero-bg.png")', // Update this path to match your image
            filter: 'brightness(0.7)'
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl md:text-5xl text-white font-bold text-center mb-4">
            Looking To Buy or Rent a Property?
          </h1>
          <p className="text-xl text-white text-center mb-12">
            Find Your Dream Home
          </p>
          <HomeSearch />
        </div>
      </section>

      {/* Property Listings Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {status === 'loading' && <p>Loading properties...</p>}
          {status === 'succeeded' && properties.length > 0 ? (
            properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))
          ) : (
            <p>No properties found.</p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 gap-2">
          <span className="text-sm text-gray-600">Total {properties.length} items</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                className={`px-3 py-1 rounded ${
                  page === 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {page}
              </button>
            ))}
            <button className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200">
              →
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
