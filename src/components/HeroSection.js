import React from "react"
import Layout from "../components/Layout"
import Header from "../components/Header"
import css from "@emotion/css"
import tw from "tailwind.macro"
import BackgroundImage from "gatsby-background-image"
import Image from "gatsby-image"
import { RichText } from "prismic-reactjs"
import Slider from "./Slider"

import get from "lodash.get"
import useFluid from "./useFluid"

export default function HeroSection({
  fields,
  primary: {
    background_imageSharp,
    background_image,
    pull_next_section_up,
    variant,
  },
  headerStyle,
}) {
  const bgImageFluid = useFluid(background_image, {
    w: "2000",
  })

  const showAllAsASlider = variant
  return (
    <div
      className={`${
        pull_next_section_up ? "pull-up-next-section" : ""
      } relative`}
      css={css`
        .slick-slide {
          user-select: text;
        }
        .slick-prev {
          left: 20%;
          z-index: 50;
          /* @md */
          @media (min-width: 768px) {
            left: 70px;
          }
        }
        .slick-next {
          right: 20%;
          z-index: 50;
          /* @md */
          @media (min-width: 768px) {
            right: 70px;
          }
        }
      `}
    >
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <Image
          className="w-full h-full z-0"
          objectFit="cover"
          fluid={bgImageFluid}
        ></Image>
        <div
          className="absolute top-0 left-0 w-full h-full  z-0"
          css={css`
            background: linear-gradient(
              rgba(3, 25, 51, 0.4),
              rgba(3, 25, 51, 0.4)
            );
          `}
        ></div>
      </div>
      <Header transparent={!headerStyle}></Header>
      <Slider>
        {fields &&
          fields
            .slice(0, showAllAsASlider ? fields.length : 1)
            .map((field, i) => {
              return (
                <section key={i}>
                  <div
                    className={`container text-white pt-64  -mb-16 ${
                      pull_next_section_up ? "pb-80" : "pb-64"
                    }`}
                  >
                    <div className="row">
                      <div
                        className="col w-full md:w-3/4 lg:w-1/2"
                        css={css`
                          p {
                            ${tw`text-base lg:text-2xl `}
                          }
                        `}
                      >
                        <div className="text-gold uppercase text-xs">
                          {field.label}
                        </div>

                        <div
                          css={css`
                            ${tw`text-5xl font-semibold `}
                            > * {
                              ${tw`mt-4`}
                            }
                          `}
                        >
                          {RichText.render(field.title)}
                        </div>
                        {RichText.render(field.text)}
                        {field.button && (
                          <button className="bg-gold text-blue-800 uppercase text-xl py-4 px-8 font-medium mt-12">
                            {field.button_label}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              )
            })}
      </Slider>
    </div>
  )
}
