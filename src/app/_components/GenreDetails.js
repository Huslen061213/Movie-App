"use client";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";

export default function GenreDetails() {
  const [genre, setGenre] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getData = async () => {
    setLoading(true);
    const upComingMovieEndPoint = `${BASE_URL}/genre/movie/list?language=en`;
    const response = await fetch(upComingMovieEndPoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setGenre(data.genres);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleRouter = (id) => {
    router.push(`/genres/${id}`);
  };

  return (
    <div className="flex flex-col p-5 w-full xl:w-[387px] max-w-full">
      <div>
        <p className="text-[24px] font-semibold font-sans">Genres</p>
        <p className="text-[16px] font-sans">See lists of movies by genre</p>
      </div>
      <div>
        <Separator className="my-4" />
      </div>
      {/* <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full max-w-[537px]"> */}
      <div className="flex flex-wrap gap-2 w-full max-w-[387px]">
        {genre.map((genre, index) => {
          return (
            <Badge
              key={index}
              className={
                "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-[#09090B] dark:text-white gap-2 flex felx-col text-[12px] font-sans font-semibold"
              }
              onClick={() => handleRouter(genre.id)}
            >
              {genre.name}
              <ArrowRight />
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
