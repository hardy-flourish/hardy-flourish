import React from "react"
import Layout from "../../components/Layout"
import Header from "../../components/Header"
import { graphql, Link } from "gatsby"
import { RichText } from "prismic-reactjs"
import css from "@emotion/css"
import tw from "tailwind.macro"

import placeholderbg from "../images/contemporary-man-chilling-at-workplace-Y5SU68F@2x.png"
import placeholder from "../images/man-working-in-co-creative-space-PC7B6GU.png"
import FooterSection from "../../components/NextPageSection"
import { LazyImage } from "../../components/Lazy"

export default function WorkPage({ data }) {
  const { page } = data.prismic

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
              {RichText.render(page.hero)}
            </div>
          </div>
        </div>
      </div>
      <section className="bg-blue-800  pt-24">
        <div className="container  -mt-56">
          {" "}
          <div className="row items-stretch">
            {page.services.map(({ logo = "", title = "", text = "" }, i) => (
              <div className="col w-full md:w-1/2 lg:w-1/3 my-4 rounded-lg">
                <div
                  className="card h-full p-8 bg-blue-700 flex items-center justify-center"
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
                  <div className="text-center text-white">
                    {" "}
                    <img className=" w-auto h-24 mx-auto" src={logo.url}></img>
                    {RichText.render(title)}
                    {RichText.render(text)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <FooterSection title="Our Jobs"></FooterSection>
          <div className="  py-32 text-white">
            <div className="row">
              <div className="col w-full lg:w-7/12">
                <div
                  className="lg:px-20"
                  css={css`
                    h3 {
                      &:after {
                        content: "";
                        height: 2px;
                        ${tw` bg-gold w-48 block mt-4`}
                      }
                    }
                    p {
                      ${tw`my-8 text-base`}
                    }
                  `}
                >
                  <h3
                    className="font-semibold"
                    css={css`
                      &:after {
                        content: "";
                        height: 2px;
                        ${tw` bg-gold w-48 block mt-4`}
                      }
                    `}
                  >
                    Our Jobs
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
              <div className="col  lg:w-5/12">
                <LazyImage className="w-full" src={placeholder}></LazyImage>
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
      page: services_page(uid: "services", lang: "en-gb") {
        hero
        services {
          logo
          text
          title
        }
        footerText
        footerImage
        footerLink {
          ... on PRISMIC_Services_page {
            _meta {
              uid
            }
          }
          ... on PRISMIC_Homepage {
            footerText
            _meta {
              uid
            }
          }
          ... on PRISMIC_Work_page {
            _meta {
              uid
            }
          }
          ... on PRISMIC_Blog {
            footerText
            _meta {
              uid
            }
          }
          ... on PRISMIC__ExternalLink {
            url
          }
          ... on PRISMIC__FileLink {
            _linkType
            url
          }
          ... on PRISMIC__ImageLink {
            _linkType
            url
          }
        }
      }
    }
  }
`
