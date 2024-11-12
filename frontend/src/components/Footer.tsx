"use client";

export default function Footer() {
  return (
    <footer className="bg-white py-8 shadow-md">
      <hr className="my-6 border-gray-300" />
        
        {/* Copyright text */}
        <div className="text-center text-sm text-gray-700 mb-4 sm:mb-0 mx-10 lg:mx-0">
          Copyright &copy; 2024&nbsp;
          <a href="https://msclubsliit.org" className="hover:underline">
            Refcoins
          </a>
          . All Rights Reserved.
        </div>
    </footer>
  );
}
