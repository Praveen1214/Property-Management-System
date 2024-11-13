"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProperties } from "@/store/features/propertySlice";
import HomeSearch from "@/components/HomeSearch";
import PropertyCard from "@/components/PropertyCard";

export default function Home() {
  const dispatch = useAppDispatch();
  const { items: properties, status } = useAppSelector(
    (state) => state.properties
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [filteredProperties, setFilteredProperties] = useState(properties);

  // Load all properties initially
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProperties());
    }
  }, [dispatch, status]);

  // Update `filteredProperties` when `properties` changes
  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  // Function to handle filters and search from `HomeSearch`
  const handleFilter = ({ location, status, type, searchTerm }) => {
    const filtered = properties.filter((property) => {
      const locationMatch =
        location === "All Main Locations" || property.location === location;
      const statusMatch = status === "All Status" || property.status === status;
      const typeMatch = type === "All Types" || property.propertyType === type;
      const searchTermMatch = searchTerm
        ? property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.location.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      return locationMatch && statusMatch && typeMatch && searchTermMatch;
    });

    setFilteredProperties(filtered);
    setCurrentPage(1); // Reset to the first page on filter change
  };

  // Calculate total pages and the properties to display on the current page
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const displayedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with updated styling */}
      <section className="relative h-[500px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/images/hero-bg.png")',
            filter: "brightness(0.7)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl md:text-5xl text-white font-bold text-center mb-4">
            Looking To Buy or Rent a Property?
          </h1>
          <p className="text-xl text-white text-center mb-12">
            Find Your Dream Home
          </p>
          {/* Pass `handleFilter` to `HomeSearch` */}
          <HomeSearch onFilter={handleFilter} />
        </div>
      </section>

      {/* Property Listings Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {status === "loading" && <p>Loading properties...</p>}
          {status === "succeeded" && displayedProperties.length > 0 ? (
            displayedProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))
          ) : (
            <p>No properties found.</p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 gap-2">
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                ←
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                →
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
