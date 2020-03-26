import React from "react"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import PrevArrowSrc from "../images/slider-arrow-left.svg"
import NextArrowSrc from "../images/slider-arrow-right.svg"
import css from "@emotion/css"
import { Global } from "@emotion/core"
const SliderComp = React.forwardRef(({ children, ...rest }, ref) => {
  return (
    <div
      css={css`
        .slick-slide div > * {
          outline: none;
        }
        .slick-prev,
        .slick-next {
          width: 48px;
          height: 48px;
        }
        .slick-prev {
          left: -70px;
        }
        .slick-next {
          right: -70px;
        }
      `}
    >
      <Slider ref={ref} prevArrow={prevArrow} nextArrow={nextArrow} {...rest}>
        {children}
      </Slider>
    </div>
  )
})

export default SliderComp

const prevArrow = <img className="w-12 h-12" src={PrevArrowSrc}></img>
const nextArrow = <img className="w-12 h-12" src={NextArrowSrc}></img>
