"use client";

import Header from "@/app/_features/Header";
import Footer from "@/app/_features/Footer";
import MoreMovies from "@/app/_features/upcoming/MoreMovies";

import { useParams } from "next/navigation";

export default function Page() {
  const { type } = useParams();

  return (
    <div className="flex flex-col gap-y-[76px] items-center">
      <div className="flex flex-col items-center gap-y-[52px]">
        <Header />
        <MoreMovies type={type} />
      </div>
      <Footer />
    </div>
  );
}
