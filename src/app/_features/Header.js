"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link"; // Энийг нэмнэ
import Genre from "../_components/Genre";
import { ChevronDown } from "../_icons/ChevronDown";
import { FilmIcon } from "../_icons/FilmIcon";
import { MoonIcon } from "../_icons/MoonIcon";
import { MovieIcon } from "../_icons/MovieIcon";
import { SearchIcon } from "../_icons/SearchIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function Header() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;

    document.documentElement.classList.toggle("dark", shouldUseDark);
    setIsDarkMode(shouldUseDark);
  }, []);

  useEffect(() => {
    const searchMovies = async () => {
      if (searchValue.trim().length === 0) {
        setSearchResults([]);
        return;
      }

      try {
        const res = await fetch(
          `${BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
              "Content-Type": "application/json",
            },
          },
        );
        const data = await res.json();
        setSearchResults(data.results?.slice(0, 5) || []);
        setIsOpen(true);
      } catch (err) {
        console.error("Search failed:", err);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      searchMovies();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDarkMode = () => {
    const nextThemeIsDark = !isDarkMode;
    setIsDarkMode(nextThemeIsDark);
    document.documentElement.classList.toggle("dark", nextThemeIsDark);
    localStorage.setItem("theme", nextThemeIsDark ? "dark" : "light");
  };

  return (
    <div className="flex justify-center py-4 bg-white dark:bg-black text-black dark:text-white border-b border-gray-100 dark:border-gray-800">
      <div className="flex w-full max-w-[1200px] justify-between items-center px-4">
        <Link
          href="/"
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <FilmIcon />
          <MovieIcon />
        </Link>

        <div className="flex gap-4 items-center">
          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md px-3 py-1.5 justify-center gap-1 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer">
            <ChevronDown className="text-black dark:text-white" />
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-center outline-none font-medium cursor-pointer">
                Genre
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Genre />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div ref={searchContainerRef} className="relative">
            <div className="flex flex-row border border-gray-300 dark:border-gray-700 rounded-md gap-2 px-3 w-[379px] h-[40px] items-center focus-within:ring-2 focus-within:ring-blue-100 dark:bg-gray-900">
              <SearchIcon className="text-black dark:text-white" />
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => searchValue.length > 0 && setIsOpen(true)}
                className="outline-none w-full bg-transparent text-sm text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>

            {isOpen && searchResults.length > 0 && (
              <div className="absolute top-[45px] left-0 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
                {searchResults.map((movie) => (
                  <div
                    key={movie.id}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border-b border-gray-200 dark:border-gray-700 last:border-none transition-colors"
                  >
                    <div className="w-10 h-14 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                          alt={movie.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <FilmIcon />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-sm font-semibold truncate text-black dark:text-white">
                        {movie.title}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {movie.release_date?.split("-")[0]}
                      </span>
                    </div>
                  </div>
                ))}
                <div
                  className="p-2 text-center text-xs text-blue-500 hover:underline cursor-pointer bg-gray-50 dark:bg-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  See all results
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={toggleDarkMode}
          className="p-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors cursor-pointer"
          aria-label="Toggle dark mode"
        >
          <MoonIcon className="text-black dark:text-white" />
        </button>
      </div>
    </div>
  );
}
