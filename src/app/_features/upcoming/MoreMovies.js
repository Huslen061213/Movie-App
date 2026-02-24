"use client";
import Moviecard from "@/app/_components/MovieCard";

import { useEffect, useState } from "react";

import LoadingSkeleton from "./LoadingSkeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function MoreMovies(props) {
  const { type } = props;
  const [movieData, setMovieData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState([false]);

  const handleNext = () => {
    setPage(page + 1);
  };
  const handleBack = () => {
    setPage(page - 1);
  };

  const getData = async () => {
    setLoading(true);
    const upComingMovieEndPoint = `${BASE_URL}/movie/${type}?language=en-US&page=${page}`;
    const response = await fetch(upComingMovieEndPoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    setTimeout(() => {
      setLoading(false);
    }, 5000);
    setMovieData(data.results);
  };
  useEffect(() => {
    getData();
  }, [page]);
  if (loading) {
    return (
      <div>
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="w-[1440px] max-w-[1440px] flex flex-col gap-8 text-black dark:text-white">
      <div className="flex justify-between px-[80px]">
        <p className="text-[24px]">{type.replaceAll("_", " ").toUpperCase()}</p>
      </div>
      <div className="grid grid-cols-5 max-w-[1440px] w-[1440px] px-[80px] gap-[32px]">
        {movieData.map((movie) => (
          <Moviecard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            rate={movie.vote_average}
            imageUrl={movie.poster_path}
          />
        ))}
      </div>
      <div className="text-black dark:text-white">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={handleBack} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" onClick={handleNext} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
