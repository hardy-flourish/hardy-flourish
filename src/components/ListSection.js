import React from "react"
import { RichText } from "prismic-reactjs"
import css from "@emotion/css"
import tw from "tailwind.macro"
import bg from "../images/logo_in_the_back.png"
export default function ListSection({ fields, primary }) {
  return (
    <section
      className={`py-24 lg:y-40 ${
        primary.background_color == "Blue"
          ? "bg-blue-800 text-white"
          : "bg-gray-100 text-blue-800"
      } ${primary.pull_next_section_up ? "pull-up-next-section-sm" : ""}`}
      css={css`
        &.pull-up-next-section-sm {
          ${tw`-mb-32 pb-64 md:pb-80 lg:pb-100`}
          & + * {
            ${tw`pt-4`}
            .pull {
              ${tw`-mt-40`}
            }
          }
        }
      `}
    >
      <div className="container">
        <div
          className="relative text-center"
          css={css`
            &:after {
              ${tw`block mx-auto mt-2 border-gold border-t-2`}
              content: "";
              display: block;
              width: 156px;
              height: 0;
              position: relative;
              z-index: 1;
            }
            * {
              position: relative;
              z-index: 1;
            }
          `}
        >
          {RichText.render(primary.title)}
        </div>

        {fields.map((field, i) => (
          <div className="row my-20 items-stretch" key={i}>
            <div
              className="col w-full md:w-1/2 lg:w-5/12 relative overflow-hidden"
              css={css`
                img {
                  ${tw`md:absolute md:h-full w-full object-cover mb-12 md:mb-0`}
                }
              `}
            >
              <img src={field.image.url}></img>
            </div>
            <div className="hidden lg:block w-1/12"></div>
            <div className="col w-full md:w-1/2 lg:w-5/12">
              <div
                css={css`
                  > * {
                    margin-top: 0;
                  }
                  &:after {
                    ${tw`block mt-2 mb-8 border-gold border-t-2`}
                    content: "";
                    display: block;
                    width: 117px;
                    height: 0;
                    position: relative;
                    z-index: 1;
                  }
                `}
              >
                {RichText.render(field.title)}
              </div>
              <div
                css={css`
                  p {
                    margin-bottom: 0;
                    ${tw`text-base`}
                  }
                `}
              >
                {RichText.render(field.text)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
