import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { RiMenu4Line } from "react-icons/ri";
import "../../App.css";

const Navbar = () => {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const [isScrolledToTop, setIsScrolledToTop] = useState(true);
  const [logoSrc, setLogoSrc] = useState("./logoSuitmedia.png");
  const prevScrollY = useRef(0);
  const [activeMenuItem, setActiveMenuItem] = useState("Ideas");
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setIsScrolledToTop(scrollY === 0);
    setLogoSrc(scrollY === 0 ? "./logoSuitmedia.png" : "./logo-white.png");

    if (scrollY > prevScrollY.current && isHeaderVisible) {
      // Scroll ke bawah dan header terlihat, maka sembunyikan header
      setIsHeaderVisible(false);
    } else if (scrollY < prevScrollY.current && !isHeaderVisible) {
      // Scroll ke atas dan header disembunyikan, maka tampilkan header
      setIsHeaderVisible(true);
    }

    prevScrollY.current = scrollY;
  };

  const handleToggleMenu = () => {
    setIsMobileMenuVisible(!isMobileMenuVisible);
  };

  // Add event listener for scroll on mount
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // Add event listener for scroll on mount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 hide-on-scroll ${
          isScrolledToTop
            ? "bg-transparent"
            : "bg-[#FF6600] bg-opacity-70 backdrop-blur-md shadow-md"
        }`}
      >
        <div className="w-full px-4 md:py-3 py-3 lg:px-16 flex items-center justify-between text-white">
          <Link to="/" className="navbar-brand">
            <div className="md:w-36 w-28">
              <img src={logoSrc} alt="logo" />
            </div>
          </Link>
          <div className="lg:hidden relative">
            {/* Tombol toggle untuk tampilan mobile */}
            <button
              onClick={handleToggleMenu}
              className="text-white focus:outline-none"
            >
              <RiMenu4Line
                size={40}
                className={`duration-200 transition-all ${
                  isMobileMenuVisible ? "rotate-90" : ""
                }`}
              />
            </button>
          </div>
          <ul
            className={`navbar-nav lg:flex lg:gap-10 max-sm:flex-col ${
              isMobileMenuVisible
                ? "flex-col flex md:flex-row max-sm:bg-[#FF6600] max-sm:mt-3 max-sm:px-4 max-sm:py-2 rounded-md max-sm:absolute max-sm:top-16 max-sm:right-6"
                : "hidden"
            }`}
          >
            <Link
              to="/"
              className="nav-link"
              onClick={() => setActiveMenuItem("Work")}
            >
              Work
            </Link>
            <Link
              to="#"
              className="nav-link"
              onClick={() => setActiveMenuItem("About")}
            >
              About
            </Link>
            <Link
              to="#"
              className="nav-link"
              onClick={() => setActiveMenuItem("Services")}
            >
              Services
            </Link>
            <Link
              to="#"
              className={`nav-link ${
                activeMenuItem === "Ideas" ? "active" : ""
              }`}
              onClick={() => setActiveMenuItem("Ideas")}
            >
              Ideas
            </Link>
            <Link
              to="#"
              className={`nav-link ${
                activeMenuItem === "Careers" ? "active" : ""
              }`}
              onClick={() => setActiveMenuItem("Careers")}
            >
              Careers
            </Link>
            <Link
              to="#"
              className="nav-link"
              onClick={() => setActiveMenuItem("Contact")}
            >
              Contact
            </Link>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
