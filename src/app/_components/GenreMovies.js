import { useEffect, useState } from "react";

import GenreMovieCard from "./GenreMovieCard";

const BASE_URL = "https://api.themoviedb.org/3";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";
export default function GenreMovies(props) {
  const { id } = props;

  const [movieData, setMovieData] = useState([]);

  const getData = async () => {
    // setLoading(true);
    const upcomingMovieEndPoint = `${BASE_URL}/discover/movie?language=en&with_genres=${id}&page=1`;
    const response = await fetch(upcomingMovieEndPoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("Data Genre Movies: ", data);

    setTimeout(() => {
      //   setLoading(false);
    }, 700);
    setMovieData(data.results);
  };
  useEffect(() => {
    getData();
  }, [id]);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-full px-0 xl:px-6 gap-[48px] justify-items-center">
      {movieData.map((movie) => (
        <GenreMovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          rate={movie.vote_average}
          imageUrl={movie.poster_path}
        />
      ))}
    </div>
  );
}
