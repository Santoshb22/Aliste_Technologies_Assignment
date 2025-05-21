import React from 'react';
import { Link } from 'react-router-dom';
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';

function Header() {
  const cartItems = useSelector(store => store.cart.items);

  return (
    <header className="w-full flex justify-between items-center px-6 py-4 bg-white shadow-md sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        Shopy
      </Link>

      <Link to="/cart" className="relative flex items-center justify-center text-red-600 font-semibold gap-1">
        <IoCartOutline className="w-6 h-6 text-gray-700" />
        <span>{cartItems.length}</span>
      </Link>
    </header>
  );
}

export default Header;
