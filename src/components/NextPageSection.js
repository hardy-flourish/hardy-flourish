import React from "react"
import css from "@emotion/css"
import tw from "tailwind.macro"
import { Link, useStaticQuery } from "gatsby"
import { RichText } from "prismic-reactjs"
import arrow from "../images/arrow-right.svg"
import has from "lodash.has"
export default function NextPageSection({ fields, primary }) {
  return (
    <section className="bg-blue-800 ">
      <div className="container">
        <div className="py-24  lg:py-32 text-white">
          <div className="row">
            <div className="col w-full md:w-1/2 lg:w-5/12  lg:offset-1-12">
              <div
                css={css`
                  p {
                    ${tw`my-8 text-base`}
                  }
                `}
              >
                <div
                  css={css`
                    * {
                      ${tw`text-3xl font-semibold`}
                    }
                    &:after {
                      content: "";
                      height: 2px;
                      ${tw` bg-gold w-48 block mt-4`}
                    }
                  `}
                >
                  {RichText.render(primary.title)}
                </div>
                {RichText.render(primary.text)}
                <Link
                  to="/services/"
                  className="bg-gold text-blue-800 uppercase text-sm py-3 px-4 inline-flex"
                >
                  Read more <img className="ml-4" src={arrow}></img>
                </Link>
              </div>
            </div>
            {has(primary, "image.url") && (
              <div className="col w-full md:w-1/2 lg:w-5/12  flex items-stretch lg:offset-1-12 mt-12 md:mt-0">
                <img className="object-cover" src={primary.image.url}></img>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
