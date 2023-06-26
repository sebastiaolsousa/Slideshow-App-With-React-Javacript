import React, { useState, useRef, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import '../components styles/slideshow.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Slideshow = () => {
    const slideImages = [
        require("../images/cute-cat-1.jpg"),
        require("../images/cute-cat-2.jpg")    
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);
    const intervalRef = useRef(null);
  
    useEffect(() => {
      intervalRef.current = setInterval(() => {
        const nextIndex = (currentIndex + 1) % slideImages.length;
        setCurrentIndex(nextIndex);
      }, 5000);
  
      return () => {
        clearInterval(intervalRef.current);
      };
    }, [currentIndex, slideImages.length]);
  
    const handlePrevSlide = () => {
      const prevIndex = (currentIndex - 1 + slideImages.length) % slideImages.length;
      setCurrentIndex(prevIndex);
      carouselRef.current.select(prevIndex);
    };
  
    const handleNextSlide = () => {
      const nextIndex = (currentIndex + 1) % slideImages.length;
      setCurrentIndex(nextIndex);
      carouselRef.current.select(nextIndex);
    };
  
    const handleSlideChange = (index) => {
      setCurrentIndex(index);
    };
  
    return (
      <div>
        <h1>Slideshow App</h1>
        <div className="carousel-wrapper">
          <Carousel
            showThumbs={false}
            showStatus={false}
            autoPlay={true}
            selectedItem={currentIndex}
            onChange={handleSlideChange}
            ref={carouselRef}
          >
            {slideImages.map((slide, index) => (
                <div key={index} className="slide">
                    <img src={slide} alt={`Slide ${index}`} />
                </div>
            ))}
          </Carousel>
        </div>
      </div>
    );
  };

export default Slideshow;