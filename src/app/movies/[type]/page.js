"use client";

import Header from "@/app/_features/Header";
import Footer from "@/app/_features/Footer";
import MoreMovies from "@/app/_features/upcoming/MoreMovies";

import { useParams } from "next/navigation";

export default function Page() {
  const { type } = useParams();

  return (
    <div>
      <Header />
      <div className="flex justify-center">
        <MoreMovies type={type} />
      </div>
      <Footer />
    </div>
  );
}
