import React from "react"
import Layout from "../components/Layout"
import useFluid from "../components/useFluid"
import BackgroundImage from "gatsby-background-image"
import css from "@emotion/css"
import tw from "tailwind.macro"
import { RichText } from "prismic-reactjs"
import Header from "../components/Header"
export default function Work({ data }) {
  return (
    <Layout>
      <div
        css={css`
          padding-top: 30px;
          /* @lg */
          @media (min-width: 1024px) {
            padding-top: 100px;
          }
        `}
      >
        <WorkContent data={data}>
          <Header></Header>
        </WorkContent>
      </div>
    </Layout>
  )
}

export function WorkContent({
  children,
  data: {
    prismic: { work: data },
  },
}) {
  return (
    <div
      css={css`
        .title * {
          ${tw`my-0 text-2xl lg:text-3xl`}
        }
        .modal & {
          .container {
            ${tw`lg:px-12`}
          }
        }
      `}
    >
      {children}

      <div className="bg-blue-800">
        <div className="container py-20 lg:py-32 text-center text-white ">
          <img className="w-40 mx-auto mb-12" src={data.image.url}></img>
          <div className="title">{RichText.render(data.title)}</div>
        </div>
      </div>

      {data.full_text && (
        <div className="container py-12">{RichText.render(data.full_text)}</div>
      )}
    </div>
  )
}

export const query = graphql`
  query($uid: String!) {
    prismic {
      work(lang: "en-gb", uid: $uid) {
        _meta {
          uid
        }
        full_text
        title
        image
      }
    }
  }
`
