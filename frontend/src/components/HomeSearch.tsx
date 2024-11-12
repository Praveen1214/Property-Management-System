import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { searchProperties } from '@/store/features/propertySlice';

const HomeSearch = () => {
  const dispatch = useAppDispatch();
  const [location, setLocation] = useState('All Main Locations');
  const [status, setStatus] = useState('All Status');
  const [type, setType] = useState('All Types');

  const handleSearch = () => {
    const filters: { location?: string; status?: string; type?: string } = {};
  
    if (location !== 'All Main Locations') filters.location = location;
    if (status !== 'All Status') filters.status = status;
    if (type !== 'All Types') filters.type = type;
  
    console.log("Filters:", filters); // Add this line to debug the filters
    dispatch(searchProperties(filters));
  };
  
  

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-2">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex-1">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 border rounded-md"
          >
            <option>All Main Locations</option>
            <option>Colombo</option>
            <option>Kandy</option>
            <option>Galle</option>
          </select>
        </div>
        <div className="flex-1">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-3 border rounded-md"
          >
            <option>All Status</option>
            <option>For Sale</option>
            <option>For Rent</option>
          </select>
        </div>
        <div className="flex-1">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-3 border rounded-md"
          >
            <option>All Types</option>
            <option>Single Family</option>
            <option>Villa</option>
          </select>
        </div>
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-3 rounded-md flex items-center justify-center"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default HomeSearch;
