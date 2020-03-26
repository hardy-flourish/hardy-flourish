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
  /**

  base64: "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAANABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAQBAgMF/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/2gAMAwEAAhADEAAAAee2rvLBQP/EABsQAQACAgMAAAAAAAAAAAAAAAECAwATESMx/9oACAEBAAEFAnzUuSdeVnLXNJ3Xdn//xAAWEQEBAQAAAAAAAAAAAAAAAAAAASH/2gAIAQMBAT8BjH//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAECAQE/AT//xAAcEAACAQUBAAAAAAAAAAAAAAAAARECEBIiMUH/2gAIAQEABj8CUC18Ma+nYhWeqP/EABsQAQACAwEBAAAAAAAAAAAAAAEAESExQVHB/9oACAEBAAE/IT0ZNQEStobe+xWApNkZqyDDL9nQ5//aAAwDAQACAAMAAAAQIB//xAAWEQEBAQAAAAAAAAAAAAAAAAAAEXH/2gAIAQMBAT8Qhp//xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAIAQIBAT8QrK//xAAdEAEBAAMAAgMAAAAAAAAAAAABEQAhMUFRcYGh/9oACAEBAAE/EIxCbtd8/cUqDPE8+Fw12VGj95VoQAthzDVdO/Yx2yDq3fnP/9k="
aspectRatio: 1.5037593984962405
src: "/static/5fb91958832ed4b51316b40e2fabbe9f/14b42/1fa637dd-37d5-4bba-8412-9412d22dc9c4_young-man-and-girl-sitting-at-the-restaurant-and-9GHJQZN.jpg"
srcSet: "/static/5fb91958832ed4b51316b40e2fabbe9f/f836f/1fa637dd-37d5-4bba-8412-9412d22dc9c4_young-man-and-girl-sitting-at-the-restaurant-and-9GHJQZN.jpg 200w,↵/static/5fb91958832ed4b51316b40e2fabbe9f/2244e/1fa637dd-37d5-4bba-8412-9412d22dc9c4_young-man-and-girl-sitting-at-the-restaurant-and-9GHJQZN.jpg 400w,↵/static/5fb91958832ed4b51316b40e2fabbe9f/14b42/1fa637dd-37d5-4bba-8412-9412d22dc9c4_young-man-and-girl-sitting-at-the-restaurant-and-9GHJQZN.jpg 800w,↵/static/5fb91958832ed4b51316b40e2fabbe9f/47498/1fa637dd-37d5-4bba-8412-9412d22dc9c4_young-man-and-girl-sitting-at-the-restaurant-and-9GHJQZN.jpg 1200w,↵/static/5fb91958832ed4b51316b40e2fabbe9f/0e329/1fa637dd-37d5-4bba-8412-9412d22dc9c4_young-man-and-girl-sitting-at-the-restaurant-and-9GHJQZN.jpg 1600w,↵/static/5fb91958832ed4b51316b40e2fabbe9f/af56c/1fa637dd-37d5-4bba-8412-9412d22dc9c4_young-man-and-girl-sitting-at-the-restaurant-and-9GHJQZN.jpg 2880w"
sizes: "(max-width: 800px) 100vw, 800px"


 */
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
          fields.map((field, i) => {
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
