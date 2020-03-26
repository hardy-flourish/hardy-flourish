import React from "react"
import { RichText } from "prismic-reactjs"
import { useStaticQuery, graphql, StaticQuery } from "gatsby"
import css from "@emotion/css"
import tw from "tailwind.macro"
import logo from "../images/logo-footer.svg"
function Footer({ data }) {
  const {
    prismic: {
      allFooters: {
        edges: [node],
      },
    },
  } = data
  const footer = node["node"]

  return (
    <>
      <div className="bg-blue-900 py-12 md:py-8">
        <div className="container text-white">
          <div className="row">
            <div className="col w-full md:w-1/4 flex items-center ">
              <img
                className="mx-auto mt-12 mb-12 md:mx-0 md:mt-0 md:mb-0"
                src={logo}
              ></img>
            </div>
            <div className="col flex-grow">
              <div
                className="row text-center md:text-left"
                css={css`
                  .title {
                    ${tw`text-xs font-semibold`}
                  }
                  ul {
                    ${tw`mb-8 md:my-3  flex md:block items-center justify-center`}
                  }
                  li {
                    ${tw`my-2 mx-4 md:mx-0`}
                    ${tw`text-xs`}
                    a {
                      text-decoration: none;

                      &:hover {
                        ${tw`text-gold`}
                      }
                    }
                  }
                `}
              >
                <div className="col w-full md:w-1/3">
                  <div className="title">Content</div>
                  <ul>
                    <li>
                      <a href="#">About</a>
                    </li>
                    <li>
                      <a href="#">Work</a>
                    </li>
                    <li>
                      <a href="#">Services</a>
                    </li>
                    <li>
                      <a href="#">Jobs</a>
                    </li>
                    <li>
                      <a href="#">Blog</a>
                    </li>
                  </ul>
                </div>
                <div className="col w-full md:w-1/3">
                  <div className="title">Follow us</div>
                  <ul>
                    <li>
                      <a href="#">Facebook</a>
                    </li>
                    <li>
                      <a href="#">Twitter</a>
                    </li>
                    <li>
                      <a href="#">Instagram</a>
                    </li>
                  </ul>
                </div>
                <div className="col w-full md:w-1/3">
                  <div className="title">Contact</div>
                  <ul>
                    <li>
                      P: <a href="#">222 333 444</a>
                    </li>
                    <li>
                      E: <a href="#">email@address.com</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              className="col hidden md:block w-1/4"
              css={css`
                p {
                  ${tw`text-sm`}
                }
              `}
            >
              {RichText.render(footer.text)}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gold">
        <div
          className="container text-white text-center text-sm py-3"
          css={css`
            p {
              ${tw`text-sm mb-0`}
            }
          `}
        >
          {RichText.render(footer.trademark)}
        </div>
      </div>
    </>
  )
}

export default function WithData() {
  return (
    <StaticQuery
      query={graphql`
        {
          prismic {
            allFooters {
              edges {
                node {
                  logo
                  text
                  trademark
                }
              }
            }
          }
        }
      `}
      render={data => <Footer data={data}></Footer>}
    ></StaticQuery>
  )
}
