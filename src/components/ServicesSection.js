import React from "react"
import { RichText } from "prismic-reactjs"
import css from "@emotion/css"
import tw from "tailwind.macro"
import bg from "../images/logo_in_the_back.png"
import Slider from "./Slider"
import useMeasure from "react-use-measure"
export default function ServicesSection({
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
        className="container pull"
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
          <div className="px-3 md:px-40 lg:px-0">
            {" "}
            <Slider
              {...{
                slidesToShow: 3,
                responsive: [
                  {
                    centerMode: true,
                    breakpoint: 1100,
                    settings: {
                      slidesToShow: 1,
                      arrows: false,
                    },
                  },
                ],
              }}
            >
              {fields &&
                fields.map(({ service }, i) => {
                  return (
                    <div key={i} className="px-2">
                      <Card service={service}></Card>
                    </div>
                  )
                })}
            </Slider>
          </div>
        ) : (
          <div className="row items-stretch">
            {fields &&
              fields.map(({ service }, i) => {
                return (
                  <div
                    key={i}
                    className="col h-full w-full md:w-1/2 lg:w-1/3 my-4 rounded-lg"
                  >
                    <Card service={service}></Card>
                  </div>
                )
              })}
          </div>
        )}
      </div>
      s
    </section>
  )
}

function Card({ service }) {
  return (
    <div
      className="card p-8 bg-blue-700 flex items-center justify-center"
      css={css`
        h4 {
          ${tw`text-xl`}
          &::after {
            content: "";
            ${tw`bg-gold block mx-auto mt-4`}
            height: 2px;
            width: 70%;
          }
        }
        p {
          ${tw`text-sm`}
        }
      `}
    >
      {" "}
      <div className="text-center text-white">
        <img className=" w-auto h-24 mx-auto" src={service.icon.url}></img>
        {RichText.render(service.title)}
        {RichText.render(service.description)}
      </div>
    </div>
  )
}
