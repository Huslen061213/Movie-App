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
  const searchContainerRef = useRef(null);

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

  return (
    <div className="flex justify-center py-4 bg-white dark:bg-black border-b border-gray-100">
      <div className="flex w-full max-w-[1200px] justify-between items-center px-4">
        <Link
          href="/"
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <FilmIcon />
          <MovieIcon />
        </Link>

        <div className="flex gap-4 items-center">
          <div className="flex border border-gray-200 rounded-md px-3 py-1.5 items-center gap-1 hover:bg-gray-50 cursor-pointer">
            <ChevronDown />
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none font-medium">
                Genre
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Genre />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div ref={searchContainerRef} className="relative">
            <div className="flex flex-row border border-gray-300 rounded-md gap-2 px-3 w-[379px] h-[40px] items-center focus-within:ring-2 focus-within:ring-blue-100">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => searchValue.length > 0 && setIsOpen(true)}
                className="outline-none w-full bg-transparent text-sm"
              />
            </div>

            {isOpen && searchResults.length > 0 && (
              <div className="absolute top-[45px] left-0 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
                {searchResults.map((movie) => (
                  <div
                    key={movie.id}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b last:border-none transition-colors"
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
                      <span className="text-sm font-semibold truncate">
                        {movie.title}
                      </span>
                      <span className="text-xs text-gray-500">
                        {movie.release_date?.split("-")[0]}
                      </span>
                    </div>
                  </div>
                ))}
                <div
                  className="p-2 text-center text-xs text-blue-500 hover:underline cursor-pointer bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  See all results
                </div>
              </div>
            )}
          </div>
        </div>

        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <MoonIcon />
        </button>
      </div>
    </div>
  );
}
