import Footer from "@/app/_features/Footer";
import MovieList from "./_features/upcoming/MovieList";

import Genre from "./_components/Genre";
import Header from "./_features/Header";
import HeroSection from "./_features/home/HeroSection";

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center ">
      <div className="w-[1440px] max-w-[1440px] flex flex-col gap-[52px]">
        <Header />
        <HeroSection />
        <MovieList type="popular" />
        <MovieList type="top_rated" />
        <MovieList type="upcoming" />
        <Footer />
      </div>
    </div>
  );
}
