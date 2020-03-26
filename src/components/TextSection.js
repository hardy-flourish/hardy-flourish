import React from "react"
import { RichText } from "prismic-reactjs"
import css from "@emotion/css"
import tw from "tailwind.macro"
import bg from "../images/logo_in_the_back.png"
export default function TextSection({ fields, primary }) {
  return (
    <section
      className={`pt-24 lg:pt-40 pb-40 ${
        primary.background_color == "Blue"
          ? "bg-blue-800 text-white"
          : "bg-gray-100 text-blue-800"
      } ${primary.pull_next_section_up ? "pull-up-next-section-lg" : ""}`}
      css={css`
        &.pull-up-next-section-lg {
          ${tw`-mb-48 pb-120`}
          & + * {
            ${tw`pt-12`}
            .pull {
              ${tw`-mt-56`}
            }
          }
        }
      `}
    >
      <div className="container text-center">
        <div
          className="relative "
          css={css`
            &:after {
              ${tw`block mx-auto mt-2 mb-12 border-gold border-t-2 relative z-10`}
              content: "";
              display: block;
              width: 156px;
              height: 0;
            }
            & > * + * {
              ${tw`relative z-10`}
            }
          `}
        >
          <img
            src={bg}
            className=" pointer-events-none  absolute "
            css={css`
              left: 50%;
              top: -4rem;
              opacity: ${primary.background_color == "Blue" ? 1 : 0.2};
              transform: translateX(-50%);
            `}
          ></img>
          {RichText.render(primary.title)}
        </div>

        <div
          className="max-w-2xl mx-auto"
          css={css`
            p {
              ${tw`text-base`}
            }
          `}
        >
          {RichText.render(primary.text)}
        </div>
      </div>
    </section>
  )
}
