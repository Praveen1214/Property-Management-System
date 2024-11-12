// src/app/page.tsx
import React from "react";
import { HomeSearch } from "../components/HomeSearch";
import { PropertyCard } from "../components/PropertyCard";

// Sample data - this would come from your MongoDB database in the future
const sampleProperties = [
  {
    id: 1,
    title: "Single Home at Florida ft. Pinecrest",
    location: "Pinecrest, Miami-Dade County, Florida",
    price: 580000,
    squareFt: 3500,
    type: "Single Family",
    status: "For Sale",
    image: "/api/placeholder/400/300",
  },
  {
    id: 2,
    title: "Villa in Coral Gables",
    location: "Coral Gables, FL 33134, USA",
    price: 825000,
    squareFt: 3000,
    type: "Single Family",
    status: "For Sale",
    image: "/api/placeholder/400/300",
  },
  {
    id: 3,
    title: "Home in Merrick Way",
    location: "Merrick Way, Miami, FL, USA",
    price: 640000,
    squareFt: 4000,
    type: "Single Family",
    status: "For Sale",
    image: "/api/placeholder/400/300",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("/images/hero-bg.png")', // Update this path to match your image
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl md:text-5xl text-white font-bold text-center mb-4">
            Looking To Buy or Rent a Property?
          </h1>
          <p className="text-xl text-white text-center mb-8">
            Find Your Dream Home
          </p>
          <HomeSearch />
        </div>
      </section>

      {/* Property Listings */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 gap-2">
          <span className="text-sm text-gray-600">Total 50 items</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                className={`px-3 py-1 rounded ${
                  page === 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {page}
              </button>
            ))}
            <button className="px-3 py-1 rounded bg-gray-100 text-gray-600">
              →
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
