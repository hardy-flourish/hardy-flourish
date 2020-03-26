import React from "react"
import { StaticQuery, graphql } from "gatsby"
import css from "@emotion/css"
import tw from "tailwind.macro"
import { RichText } from "prismic-reactjs"
import ArrowRight from "./ArrowRight"
function BlogPosts({
  data: {
    prismic: {
      allBlog_posts: { edges },
    },
  },
}) {
  return (
    <div className="bg-blue-800">
      <div className="container pull">
        <div className="row">
          {edges &&
            edges.map(({ node }, i) => {
              return (
                <div key={i} className="col w-full md:w-1/2 lg:w-1/3">
                  <div
                    className="card  bg-blue-700   items-center justify-center overflow-hidden"
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
                    <img
                      className=" w-full h-48 object-cover mx-auto"
                      src={node.image.url}
                    ></img>
                    <div
                      className=" text-white p-8"
                      css={css`
                        h3::after {
                          content: "";
                          ${tw`bg-gold block w-full  mt-4`}
                          height: 2px;
                        }
                        p {
                          ${tw`mb-0`}
                        }
                      `}
                    >
                      <div className="opacity-50 text-xs font-semibold uppercase tracking-wide">
                        {node.date}
                      </div>
                      <h3 className="mt-2 text-xl font-semibold w-full">
                        {node.title[0].text}
                      </h3>
                      {RichText.render(node.content.slice(0, 1))}
                      <div className="text-right pt-8">
                        <button className="font-normal text-gold  inline-flex items-center">
                          Read More <ArrowRight className="ml-4"></ArrowRight>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default function WithData() {
  return (
    <StaticQuery
      query={graphql`
        {
          prismic {
            allBlog_posts(first: 9) {
              edges {
                node {
                  image
                  date

                  title
                  content
                }
              }
            }
          }
        }
      `}
      render={data => <BlogPosts data={data}></BlogPosts>}
    />
  )
}
