import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { sliderData } from "../data/SliderData";
import { Link } from "react-router-dom";
import classes from "./Slider.module.css";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderLength = sliderData.length;

  const slideIntervalRef = useRef(null);

  const autoScroll = true;
  let intervalTime = 5000;

  const nextSlide = useCallback(() => {
    setCurrentSlide(currentSlide === sliderLength - 1 ? 0 : currentSlide + 1);
  }, [currentSlide, sliderLength]);

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? sliderLength - 1 : currentSlide - 1);
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      const auto = () => {
        slideIntervalRef.current = setInterval(nextSlide, intervalTime);
      };
      auto();
    }
    return () => clearInterval(slideIntervalRef.current);
  }, [currentSlide, autoScroll, intervalTime, nextSlide]);

  return (
    <div className={classes.slider}>
      <FaCircleArrowLeft
        className={`${classes.arrow} ${classes.prev}`}
        onClick={prevSlide}
      />
      <FaCircleArrowRight
        className={`${classes.arrow} ${classes.next}`}
        onClick={nextSlide}
      />

      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;
        return (
          <div
            key={index}
            className={`${
              index === currentSlide
                ? `${classes.slide} ${classes.current}`
                : classes.slide
            }`}
          >
            {index === currentSlide && (
              <>
                <img src={image} alt="Images" />
                <div className={classes.sliderContentContainer}>
                  <div
                    className={
                      heading === "Gadgets"
                        ? classes.sliderExcepts
                        : classes.sliderContent
                    }
                  >
                    <h2>{heading}</h2>
                    <p>{desc}</p>
                    <hr />

                    <Link className={classes.sliderbtn} to="/product">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
