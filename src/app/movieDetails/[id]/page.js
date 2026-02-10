"use client";
import Details from "@/app/_components/Details";
import Footer from "@/app/_features/Footer";
import Header from "@/app/_features/Header";

import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function MovieDetails() {
  const BASE_URL = "https://api.themoviedb.org/3";
  const { id } = useParams();
  const ACCESS_TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjI5ZmNiMGRmZTNkMzc2MWFmOWM0YjFjYmEyZTg1NiIsIm5iZiI6MTc1OTcxMTIyNy43OTAwMDAyLCJzdWIiOiI2OGUzMGZmYjFlN2Y3MjAxYjI5Y2FiYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.M0DQ3rCdsWnMw8U-8g5yGXx-Ga00Jp3p11eRyiSxCuY";
  const getData = async () => {
    // setLoading(true);

    const upcomingMovieEndPoint = `${BASE_URL} /movie/${id}?language=en-US`;
    const response = await fetch(upcomingMovieEndPoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("Data Movie Details: ", data);

    setTimeout(() => {
      //   setLoading(false);
    }, 700);
    setMovieData(data.results);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Header />
      <Details id={id} />
      <Footer />
    </div>
  );
}
