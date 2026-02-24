"use client";

import Genre from "@/app/_components/Genre";
import GenreDetails from "@/app/_components/GenreDetails";
import GenreMovies from "@/app/_components/GenreMovies";
import Footer from "@/app/_features/Footer";
import Header from "@/app/_features/Header";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black">
      <Header />

      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-[#09090B] dark:text-white">
          Search filter
        </h1>

        <div className="flex flex-col xl:flex-row gap-8">
          <div className="w-full xl:w-auto xl:flex-shrink-0">
            <GenreDetails />
          </div>
          <div className="hidden xl:block w-px bg-gray-200 dark:bg-gray-800 self-stretch"></div>

          <div className="flex-1 min-w-0">
            <GenreMovies id={id} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
