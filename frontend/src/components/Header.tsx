// src/components/Header.tsx
import React from 'react';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-gray-800">
          Real Estate
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <Link
            href="/add-property"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Property
          </Link>
        </nav>
      </div>
    </header>
  );
};

