import React from "react"
import Layout from "../components/Layout"
import Header from "../components/Header"
import { graphql, Link } from "gatsby"
import { RichText } from "prismic-reactjs"
import css from "@emotion/css"
import tw from "tailwind.macro"

import placeholderbg from "../images/startup-owners-in-creative-interior-PKQXM6J.png"
import placeholder from "../images/contemporary-man-chilling-at-workplace-Y5SU68F.png"
import { LazyImage } from "../components/Lazy"

export default function WorkPage({ data }) {
  const [{ node: work }] = data.prismic.allWork_pages.edges

  return (
    <Layout>
      <div
        css={css`
          background: linear-gradient(
              rgba(3, 25, 51, 0.4),
              rgba(3, 25, 51, 0.4)
            ),
            url(${placeholderbg}) no-repeat;
          background-size: cover;
        `}
      >
        <Header transparent></Header>

        <div className="container text-white pt-40 pb-64 -mb-16 ">
          <div className="row">
            <div
              className="col w-full md:w-3/4 lg:w-1/2"
              css={css`
                h1 {
                  ${tw`text-5xl font-semibold `}
                }
                p {
                }
              `}
            >
              <div className="text-gold uppercase text-xs">{work.label}</div>
              {RichText.render(work.hero)}
            </div>
          </div>
        </div>
      </div>
      <section className="bg-blue-800  pt-24">
        <div className="container  -mt-36">
          {" "}
          <div className="row items-stretch">
            {work.case_studies.map(({ logo }, i) => (
              <div className="col h-full w-full md:w-1/2 lg:w-1/3 my-4 rounded-lg">
                <div className="card p-8 bg-blue-700 flex items-center justify-center">
                  <img src={logo.url}></img>
                </div>
              </div>
            ))}
          </div>
          <div className="  py-32 text-white">
            <div className="row">
              <div className="col w-full lg:w-1/2">
                <div className="lg:px-20">
                  <h3
                    className="font-semibold"
                    css={css`
                      &:after {
                        content: "";
                        height: 2px;
                        ${tw` bg-gold w-48 block mt-4 `}
                      }
                    `}
                  >
                    Our Services
                  </h3>
                  <p className="my-8 text-base">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Esse rem maxime dolores aliquid eaque natus, aut libero
                    consequuntur accusantium ipsam? Placeat incidunt quibusdam
                    magni repudiandae omnis nisi, atque quia excepturi?
                  </p>
                  <Link
                    to="/services/"
                    className="bg-gold text-blue-800 uppercase text-sm py-3 px-4"
                  >
                    Read more ->
                  </Link>
                </div>
              </div>
              <div className="col lg:w-1/2">
                <LazyImage src={placeholder}></LazyImage>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
export const query = graphql`
  {
    prismic {
      allWork_pages {
        edges {
          node {
            label
            hero
            case_studies {
              logo
            }
          }
        }
      }
    }
  }
`
