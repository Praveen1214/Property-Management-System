import { useState } from "react";

const HomeSearch = ({ onFilter }) => {
  const [location, setLocation] = useState("All Main Locations");
  const [status, setStatus] = useState("All Status");
  const [type, setType] = useState("All Types");
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilter = () => {
    onFilter({ location, status, type, searchTerm });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleFilter();
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-2">
      <div className="flex flex-col space-y-2">
        {showSearch ? (
          <form onSubmit={handleSearchSubmit} className="flex gap-2 relative">
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md flex items-center justify-center"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => {
                setShowSearch(false);
                setSearchTerm("");
                handleFilter(); // Clear filter on cancel
              }}
              className="bg-gray-500 text-white px-4 py-3 rounded-md flex items-center justify-center"
            >
              Cancel
            </button>
          </form>
        ) : (
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
              onClick={handleFilter}
              className="bg-blue-600 text-white px-6 py-3 rounded-md flex items-center justify-center"
            >
              Filter
            </button>
            <button
              onClick={() => setShowSearch(true)}
              className="bg-blue-600 text-white px-4 py-3 rounded-md flex items-center justify-center"
              title="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 50 50"
                fill="currentColor"
              >
                <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeSearch;
