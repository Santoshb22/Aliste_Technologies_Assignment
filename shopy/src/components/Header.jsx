import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoCartOutline } from "react-icons/io5";

function Header() {
      const [totalCartItem, setTotalCartItem] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setTotalCartItem(cartItems.length);
  }, [location]);

  return (
    <header className="w-full flex justify-between items-center px-6 py-4 bg-white shadow-md sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-blue-600">
        Shopy
      </Link>

      {/* Cart Icon */}
      <Link to="/cart" className="relative flex items-center justify-center text-red-600 font-semibold gap-1">
        <IoCartOutline className="w-6 h-6 text-gray-700" />
        <span>{totalCartItem}</span>
      </Link>
    </header>
  );
}

export default Header;
