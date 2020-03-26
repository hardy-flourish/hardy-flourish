import React from "react"
import { RichText } from "prismic-reactjs"
import css from "@emotion/css"
import tw from "tailwind.macro"
import bg from "../images/logo_in_the_back.png"
import Slider from "./Slider"
import useMeasure from "react-use-measure"
export default function WorkSamplesSection({
  fields,
  primary,
  primary: { variant: isSlider, background_color },
}) {
  return (
    <section
      css={css`
        ${background_color == "Blue" ? tw`bg-blue-800` : tw`bg-gray-100`};
      `}
    >
      <div
        className="container pull "
        css={css`
          .slick-list {
            overflow: visible;
            /* @lg */
            @media (min-width: 1100px) {
              overflow-x: hidden;
            }
            padding-bottom: 15px;
            padding-top: 15px;
          }
          .slick-prev {
            left: -80px;
            z-index: 50;
          }
          .slick-next {
            right: -80px;
            z-index: 50;
          }
        `}
      >
        {" "}
        {isSlider ? (
          <div className="px-12 sm:px-24 lg:py-0">
            <Slider
              {...{
                slidesToShow: 4,
                responsive: [
                  {
                    centerMode: false,
                    breakpoint: 1100,
                    settings: {
                      slidesToShow: 2,
                      arrows: false,
                    },
                  },
                  {
                    centerMode: true,
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 1,
                      arrows: false,
                    },
                  },
                ],
              }}
            >
              {fields &&
                fields.map((field, i) => {
                  return (
                    <div key={i} className="px-2">
                      <Card image={field.work.image}></Card>
                    </div>
                  )
                })}
            </Slider>
          </div>
        ) : (
          <div className="row items-stretch">
            {fields &&
              fields.map((field, i) => {
                return (
                  <div
                    key={i}
                    className="col h-full w-full md:w-1/2 lg:w-1/3 my-4 rounded-lg"
                  >
                    <Card image={field.work.image}></Card>
                  </div>
                )
              })}
          </div>
        )}
      </div>
    </section>
  )
}

function Card({ image }) {
  const [ref, { width }] = useMeasure()
  return (
    <div
      ref={ref}
      style={{ height: width + "px" }}
      className="card p-8 bg-blue-700 flex items-center justify-center"
    >
      <img src={image.url}></img>
    </div>
  )
}
