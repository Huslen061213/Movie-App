"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Play, Loader2, X } from "lucide-react";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/original";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function HeroSection() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const [trailerKey, setTrailerKey] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${BASE_URL}/movie/now_playing?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) throw new Error("Failed to fetch movies");

      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

 
  const handlePlayTrailer = async (movieId) => {
    try {
      const res = await fetch(
        `${BASE_URL}/movie/${movieId}/videos?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        },
      );
      const data = await res.json();
      const trailer = data.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube",
      );

      if (trailer) {
        setTrailerKey(trailer.key);
        setIsModalOpen(true);
      } else {
        alert("Уучлаарай, трэйлер олдсонгүй.");
      }
    } catch (err) {
      console.error("Error fetching trailer:", err);
    }
  };

  if (loading) {
    return (
      <div className="w-screen h-[600px] flex items-center justify-center bg-black overflow-hidden -mx-[50vw] left-[50%] right-[50%] relative">
        <Loader2 className="w-12 h-12 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden -mx-[50vw] left-[50%] right-[50%]">
      <Carousel className="w-full h-full" opts={{ align: "start", loop: true }}>
        <CarouselContent className="h-screen">
          {movies.map((movie) => (
            <CarouselItem key={movie.id} className="basis-full h-full">
              <div className="relative w-full h-full">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: movie.backdrop_path
                      ? `url(${IMAGE_BASE}${movie.backdrop_path})`
                      : "none",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
                </div>

                <div className="relative h-full flex items-center">
                  <div className="container mx-auto px-10 max-w-3xl">
                    <p className="text-white/70 mb-2 font-medium">
                      Now Playing
                    </p>
                    <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
                      {movie.title}
                    </h1>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-yellow-400 text-xl">★</span>
                      <span className="text-white text-xl font-semibold">
                        {movie.vote_average?.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-white/90 text-base mb-6 line-clamp-3">
                      {movie.overview}
                    </p>

                    
                    <button
                      onClick={() => handlePlayTrailer(movie.id)}
                      className="flex items-center gap-3 bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all active:scale-95"
                    >
                      <Play className="w-5 h-5" fill="currentColor" />
                      Watch Trailer
                    </button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-6 top-1/2 bg-black/40 text-white hover:bg-black border-none" />
        <CarouselNext className="absolute right-6 top-1/2 bg-black/40 text-white hover:bg-black border-none" />
      </Carousel>

     
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
          >
            <X size={48} />
          </button>
          <div className="w-full max-w-5xl aspect-video px-4 shadow-2xl">
            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Movie Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
