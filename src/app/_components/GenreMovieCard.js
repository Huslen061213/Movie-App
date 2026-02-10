import { useRouter } from "next/navigation";
import { Star } from "../_icons/Star";

export default function GenreMovieCard({ rate, title, imageUrl, id }) {
  const router = useRouter();

  const HandleMovieDetails = () => {
    router.push(`/movieDetails/${id}`);
  };

  const image = `https://image.tmdb.org/t/p/original${imageUrl}`;
  return (
    <div
      onClick={HandleMovieDetails}
      className="h-[331px] w-[165px] flex flex-col overflow-hidden rounded-lg "
    >
      <div className="rounded-lg">
        <div
          style={{
            backgroundImage: `url('${image}')`,
          }}
          className=" w-[165px] h-[250px] bg-cover bg-center "
        ></div>
        <div className="flex flex-col p-[8px] bg-gray-100 w-[165px] h-[90px]">
          <div className="flex items-center">
            <Star />
            <div className="flex ">
              <p>{rate}</p>
              <p className="text-gray-500">/10</p>
            </div>
          </div>
          <p>{title}</p>
        </div>
      </div>
    </div>
  );
}
