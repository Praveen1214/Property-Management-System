'use client'
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, fetchProperties } from '@/store/features/propertySlice';
import type { AppDispatch, RootState } from '@/store';

export const HomeSearch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.property.filters);

  const handleSearch = () => {
    dispatch(fetchProperties());
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-2">
      <div className="flex flex-col md:flex-row gap-2">
        <select
          className="flex-1 p-3 border rounded-md"
          value={filters.location}
          onChange={(e) => dispatch(setFilters({ location: e.target.value }))}
        >
          <option value="">All Main Locations</option>
          <option value="New York">New York</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
          <option value="Houston">Houston</option>
          <option value="Phoenix">Phoenix</option>
          <option value="Philadelphia">Philadelphia</option>
          <option value="San Antonio">San Antonio</option>
        </select>
        
        <select
          className="flex-1 p-3 border rounded-md"
          value={filters.status}
          onChange={(e) => dispatch(setFilters({ status: e.target.value }))}
        >
          <option value="">All Status</option>
          <option value="For Sale">For Sale</option>
          <option value="For Rent">For Rent</option>
        </select>

        <select
          className="flex-1 p-3 border rounded-md"
          value={filters.type}
          onChange={(e) => dispatch(setFilters({ type: e.target.value }))}
        >
          <option value="">All Types</option>
          <option value="Single Family">Single Family</option>
          <option value="Apartment">Apartment</option>
          <option value="Condo">Condo</option>
        </select>

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-3 rounded-md"
        >
          Search
        </button>
      </div>
    </div>
  );
};