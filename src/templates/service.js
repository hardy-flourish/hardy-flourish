import React from "react"
import Layout from "../components/Layout"
import useFluid from "../components/useFluid"
import BackgroundImage from "gatsby-background-image"
import css from "@emotion/css"
import tw from "tailwind.macro"
import { RichText } from "prismic-reactjs"
import Header from "../components/Header"
export default function Service({ data }) {
  return (
    <Layout>
      <div
        css={css`
          padding-top: 20px;
          /* @lg */
          @media (min-width: 1024px) {
            padding-top: 100px;
          }
        `}
      >
        <ServiceContent data={data}>
          <Header></Header>
        </ServiceContent>
      </div>
    </Layout>
  )
}

export function ServiceContent({
  children,
  data: {
    prismic: { service: data },
  },
}) {
  console.log(data)

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
          <img className="w-40 mx-auto" src={data.icon.url}></img>
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
      service(lang: "en-gb", uid: $uid) {
        _meta {
          uid
        }
        full_text
        title
        icon
        description
      }
    }
  }
`
