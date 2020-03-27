import React from "react"
import Layout from "../components/Layout"
import useFluid from "../components/useFluid"
import BackgroundImage from "gatsby-background-image"
import css from "@emotion/css"
import tw from "tailwind.macro"
import { RichText } from "prismic-reactjs"
import Header from "../components/Header"
export default function BlogPost({ data }) {
  return (
    <Layout>
      <div
        css={css`
          padding-top: 85px;
          /* @lg */
          @media (min-width: 1024px) {
            padding-top: 110px;
          }
        `}
      >
        <PostContent data={data}>
          <Header></Header>
        </PostContent>
      </div>
    </Layout>
  )
}

export function PostContent({
  children,
  data: {
    prismic: { blog_post: data },
  },
}) {
  const bg = useFluid(data.image, { w: 1900 })

  return (
    <div
      css={css`
        .title * {
          ${tw`my-0`}
        }
        .modal & {
          .container {
            ${tw`lg:px-12`}
          }
        }
      `}
    >
      {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
      <BackgroundImage
        fluid={[
          "linear-gradient(rgba(3, 25, 51, 0.4),rgba(3, 25, 51, 0.4))",
          bg,
        ]}
      >
        {children}
        <div className="container py-20 lg:py-40 text-white ">
          <div>{data.date}</div>
          <div className="title">{RichText.render(data.title)}</div>
        </div>
      </BackgroundImage>
      <div className="container py-20">{RichText.render(data.content)}</div>
    </div>
  )
}

export const query = graphql`
  query($uid: String!) {
    prismic {
      blog_post(lang: "en-gb", uid: $uid) {
        image
        date
        title
        content
      }
    }
  }
`
