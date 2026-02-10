"use client";
import { useEffect, useState } from "react";
import Footer from "../_features/Footer";
import Header from "../_features/Header";
import Moviecard from "./MovieCard";
import { useRouter } from "next/router";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";
export default function MoreLikeThis({ id }) {
  const [movieData, setMovieData] = useState([]);
  const getData = async () => {
    // setLoading(true);
    const upComingMovieEndPoint = `${BASE_URL}/movie/${id}/similar?language=en-US&page=1`;
    const response = await fetch(upComingMovieEndPoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    // setTimeout(() => {
    //   setLoading(false);
    // }, 5000);
    setMovieData(data.results);
    console.log("morelikethis", movieData);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {/* <Header /> */}
      <p>More Like This</p>

      <div className="grid grid-cols-5 max-w-[1440px] w-[1440px] px-[80px] gap-[32px]">
        {movieData.slice(0, 5).map((movie) => (
          <Moviecard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            rate={movie.vote_average}
            imageUrl={movie.poster_path}
          />
        ))}
      </div>

      {/* <Footer /> */}
    </div>
  );
}
