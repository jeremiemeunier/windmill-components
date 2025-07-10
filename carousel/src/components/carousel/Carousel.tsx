/**
 * @param slidesNumber a number who indicated how much slide must be rended in container
 * @param slides an array of HTMLElement slides
 */

import { useEffect, useRef, useState } from "react";
import { CarouselTypes } from "./Carousel.types";

const Carousel: React.FC<CarouselTypes> = ({
  slides,
  slidesNumber = 4,
  className,
}) => {
  const carouselRef: any = useRef(null);
  const [pages] = useState<number>(Math.ceil(slides.length / slidesNumber)); // store pages size
  const [currentPage, setCurrentPage] = useState<number>(0); // store current rendered page

  useEffect(() => {
    if (carouselRef.current) {
      setCurrentPage(
        Math.ceil(
          carouselRef.current.scrollLeft / carouselRef.current.offsetWidth
        )
      );
    }
  }, [carouselRef]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: carouselRef.current.children[currentPage * slidesNumber]
          .offsetLeft,
        behavior: "smooth",
      });
    }
  }, [currentPage, carouselRef]);

  const movePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const target = event.target as HTMLButtonElement;
    const targetClass = target.classList;

    if (targetClass.contains("carousel-nav-button-next")) {
      // is the next button
      setCurrentPage(currentPage + 1);
    } else if (targetClass.contains("carousel-nav-button-prev")) {
      // is the previous button
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={`teaui carousel-container ${className}`}>
      <div className="carousel-wrapper">
        <div
          className={`teaui carousel-root items-${slidesNumber}`}
          ref={carouselRef}
        >
          {slides.map((slide, key) => (
            <div key={key} className="teaui carousel-slide">
              {slide}
            </div>
          ))}
        </div>
      </div>

      <div className="teaui carousel-nav">
        <button
          onClick={movePage}
          disabled={currentPage === 0 ? true : false}
          className="teaui carousel-nav-button carousel-nav-button-prev"
        >
          <i className="icon teaui-icon-arrow-left"></i>
        </button>
        <button
          onClick={movePage}
          disabled={currentPage === pages - 1 ? true : false}
          className="teaui carousel-nav-button carousel-nav-button-next"
        >
          <i className="icon teaui-icon-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
