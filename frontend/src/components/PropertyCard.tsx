import React from 'react';

interface PropertyCardProps {
  property: {
    title: string;
    location: string;
    price: number;
    squareFt: number;
    type: string;
    status: string;
    image: string;
  };
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
          {property.status}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{property.location}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">
            ${property.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500">
            {property.squareFt.toLocaleString()} sq ft
          </span>
        </div>
        <div className="mt-4 pt-4 border-t">
          <span className="text-sm text-gray-600">{property.type}</span>
        </div>
      </div>
    </div>
  );
};