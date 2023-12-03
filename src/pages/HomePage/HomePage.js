import React from "react";
import Carousel from "../../components/Carousel/Carousel";
import Movies from "../../features/Movies/Movies";
import Cinema from "../../features/Cinema/Cinema";
import ToolMovie from "../../features/ToolMovies/ToolMovies";
export default function HomePage() {
  return (
    <main>
      {/* Banner */}
      <section className="carousel">
        <div className="carousel-content">
          <Carousel></Carousel>
        </div>
      </section>

      {/* Movies */}
      <section id="movies" className="movies">
        <div className="container">
          {/* Search */}
          <div className="bg-[#f1f1f1] rounded-md py-3 my-2 mt-5 grid place-items-center grid-cols-3 w-full">
            <ToolMovie></ToolMovie>
          </div>
          {/* All Movies */}
          <div className="movies-content rounded-sm mx-auto max-w-2xl px-0 lg:max-w-7xl">
            <Movies></Movies>
          </div>
        </div>
      </section>

      {/* Cinema */}
      <section id="cinema" className="cinema">
        <div className="container my-[2rem] py-[1rem] bg-[#f3f4fa] rounded-md">
          <h3 className="text-left text-[2rem] mb-5">Rạp Chiếu Phim</h3>
          <Cinema></Cinema>
        </div>
      </section>
    </main>
  );
}
