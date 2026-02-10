"use client";

import { Badge } from "@/components/ui/badge";
import { YelllowStarIcon } from "../_icons/YellowStarIcon";
import MoreLikeThis from "./MoreLikeThis";
import { useEffect, useState } from "react";
import { Loader2, Play, X } from "lucide-react";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/original";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function Details({ id }) {
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        
        const movieRes = await fetch(`${BASE_URL}/movie/${id}?language=en-US`, {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        });
        const movieData = await movieRes.json();

        
        const creditsRes = await fetch(
          `${BASE_URL}/movie/${id}/credits?language=en-US`,
          {
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
          },
        );
        const creditsData = await creditsRes.json();

        
        const videosRes = await fetch(
          `${BASE_URL}/movie/${id}/videos?language=en-US`,
          {
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
          },
        );
        const videosData = await videosRes.json();

        setMovie(movieData);
        setCredits(creditsData);
        setVideos(videosData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMovieData();
  }, [id]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  if (!movie) return <div className="text-center p-10">Movie not found</div>;

  
  const director = credits?.crew?.find(
    (person) => person.job === "Director",
  )?.name;
  const writers = credits?.crew
    ?.filter((person) => ["Screenplay", "Writer", "Story"].includes(person.job))
    .map((w) => w.name)
    .join(" · ");
  const stars = credits?.cast
    ?.slice(0, 3)
    .map((c) => c.name)
    .join(" · ");

  
  const trailer =
    videos?.results?.find(
      (video) =>
        video.type === "Trailer" &&
        video.site === "YouTube" &&
        video.official === true,
    ) ||
    videos?.results?.find(
      (video) => video.type === "Teaser" && video.site === "YouTube",
    );

  const formatDuration = (minutes) => {
    const mins = Math.floor(minutes / 60);
    const secs = minutes % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <div className="flex flex-col items-center py-10 px-4 gap-8">
        
        <div className="flex w-full max-w-[1080px] justify-between items-end">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <p className="text-sm text-gray-600">
              {movie.release_date?.replaceAll("-", ".")} ·{" "}
              {movie.adult ? "R" : "PG"} · {Math.floor(movie.runtime / 60)}h{" "}
              {movie.runtime % 60}m
            </p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-xs font-semibold text-gray-500 uppercase">
              Rating
            </p>
            <div className="flex items-center gap-1">
              <YelllowStarIcon />
              <div className="flex items-baseline">
                <span className="text-xl font-bold">
                  {movie.vote_average?.toFixed(1)}
                </span>
                <span className="text-gray-400 text-sm">/10</span>
              </div>
            </div>
            <p className="text-xs text-gray-400">
              {(movie.vote_count / 1000).toFixed(0)}k
            </p>
          </div>
        </div>

        
        <div className="flex gap-8 w-full max-w-[1080px] h-[430px]">
         
          <div
            className="w-[290px] h-full bg-cover bg-center rounded-lg shadow-lg"
            style={{
              backgroundImage: `url(${IMAGE_BASE}${movie.poster_path})`,
            }}
          />
          
          <div
            className="flex-1 h-full bg-cover bg-center rounded-lg relative group overflow-hidden cursor-pointer"
            style={{
              backgroundImage: `url(${IMAGE_BASE}${movie.backdrop_path})`,
            }}
            onClick={() => trailer && setShowTrailer(true)}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 transition-transform group-hover:scale-110">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Play className="fill-black ml-1" />
                </div>
                <span className="text-white font-semibold text-sm">
                  {trailer
                    ? `Play trailer ${formatDuration(trailer.size || 155)}`
                    : "No trailer available"}
                </span>
              </div>
            </div>
          </div>
        </div>

       
        <div className="w-full max-w-[1080px] flex flex-col gap-6">
          <div className="flex gap-2">
            {movie.genres?.map((genre) => (
              <Badge
                key={genre.id}
                variant="outline"
                className="rounded-full px-4 py-1 border-gray-300"
              >
                {genre.name}
              </Badge>
            ))}
          </div>

          <p className="text-lg leading-relaxed">{movie.overview}</p>

          <div className="flex flex-col gap-4 border-t pt-6">
            <div className="flex gap-4 border-b pb-4">
              <span className="font-bold w-24">Director</span>
              <span className="text-blue-600">{director || "N/A"}</span>
            </div>
            <div className="flex gap-4 border-b pb-4">
              <span className="font-bold w-24">Writers</span>
              <span className="text-blue-600">{writers || "N/A"}</span>
            </div>
            <div className="flex gap-4 border-b pb-4">
              <span className="font-bold w-24">Stars</span>
              <span className="text-blue-600">{stars || "N/A"}</span>
            </div>
          </div>
        </div>

        
        <div className="w-full max-w-[1080px]">
          <MoreLikeThis id={id} />
        </div>
      </div>

    
      {showTrailer && trailer && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowTrailer(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
