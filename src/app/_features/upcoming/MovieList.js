"use client";
import Moviecard from "@/app/_components/MovieCard";
import { ArrowRight } from "@/app/_icons/ArrowRight";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSkeleton from "./LoadingSkeleton";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function MovieList(props) {
  const router = useRouter();

  const { type } = props;
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState([false]);
  const getData = async () => {
    setLoading(true);
    const upComingMovieEndPoint = `${BASE_URL}/movie/${type}?language=en-US&page=1`;
    const response = await fetch(upComingMovieEndPoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    

    const data = await response.json();
    

    setTimeout(() => {
      setLoading(false);
    }, 700);
    setMovieData(data.results);
  };
  useEffect(() => {
    getData();
  }, []);
  if (loading) {
    return (
      <div>
        <LoadingSkeleton />
      </div>
    );
  }
  const HandleSeeMoreButton = () => {
    router.push(`/movies/${type}`);
  };
  
  return (
    <div className="w-[1440px] max-w-[1440px] flex flex-col gap-8">
      <div className="flex justify-between px-[80px]">
        <p className="text-[24px]">{type}</p>
        <button
          className="flex items-center gap-2 text-[14px]"
          onClick={HandleSeeMoreButton}
        >
          See more <ArrowRight />
        </button>
      </div>
      <div className="grid grid-cols-5 max-w-[1440px] w-[1440px] px-[80px] gap-[32px]">
        {movieData.slice(0, 10).map((movie) => (
          <Moviecard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            rate={movie.vote_average}
            imageUrl={movie.poster_path}
          />
        ))}
      </div>
    </div>
  );
}
