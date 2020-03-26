import React from "react"
import Layout from "../components/Layout"
import Header from "../components/Header"
import css from "@emotion/css"
import tw from "tailwind.macro"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import get from "lodash.get"
import HeroSection from "../components/HeroSection"
import TextSection from "../components/TextSection"
import ListSection from "../components/ListSection"
import WorkSamples from "../components/WorkSamples"
import BlogPosts from "../components/BlogPosts"
import ServicesSection from "../components/ServicesSection"
import NextPageSection from "../components/NextPageSection"
export default function Page({
  data: {
    prismic: { page },
  },
}) {
  console.log(page)

  return (
    <Layout>
      {page.body &&
        page.body.map(({ type, fields, primary }, i) => {
          switch (type) {
            case "hero_":
              return (
                <HeroSection
                  key={i}
                  fields={fields}
                  primary={primary}
                  headerStyle={page.header_style}
                ></HeroSection>
              )
            case "text":
              return (
                <TextSection key={i} {...{ fields, primary }}></TextSection>
              )
            case "list_section":
              return (
                <ListSection key={i} {...{ fields, primary }}></ListSection>
              )
            case "work_samples_grid":
              return (
                <WorkSamples key={i} {...{ fields, primary }}></WorkSamples>
              )
            case "blog_posts":
              return <BlogPosts key={i} {...{ fields, primary }}></BlogPosts>
            case "services_grid":
              return (
                <ServicesSection
                  key={i}
                  {...{ fields, primary }}
                ></ServicesSection>
              )
            case "next_page_section":
              return (
                <NextPageSection
                  key={i}
                  {...{ fields, primary }}
                ></NextPageSection>
              )
            default:
              return null
          }
        })}
    </Layout>
  )
}
export const query = graphql`
  query($uid: String!) {
    prismic {
      page(lang: "en-gb", uid: $uid) {
        header_style
        body {
          ... on PRISMIC_PageBodyWork_samples_grid {
            type
            label
            primary {
              background_color
              variant
            }
            fields {
              work {
                ... on PRISMIC_Work {
                  image
                }
              }
            }
          }
          ... on PRISMIC_PageBodyServices_grid {
            type
            primary {
              background_color
              variant
            }
            fields {
              service {
                ... on PRISMIC_Service {
                  icon
                  title
                  description
                }
              }
            }
          }
          ... on PRISMIC_PageBodyHero_ {
            type
            fields {
              label
              title
              text
              button
              button_label
            }
            primary {
              variant
              pull_next_section_up
              background_image
            }
          }
          ... on PRISMIC_PageBodyText {
            type
            primary {
              background_color
              pull_next_section_up
              title
              text
            }
          }
          ... on PRISMIC_PageBodyBlog_posts {
            type
            primary {
              posts_per_page
            }
          }
          ... on PRISMIC_PageBodyList_section {
            type
            fields {
              image
              title
              text
            }
            primary {
              title
              background_color
              pull_next_section_up
            }
          }
          ... on PRISMIC_PageBodyNext_page_section {
            type
            primary {
              title
              text
              image
            }
          }
        }
        meta_description
        meta_title
        social_media_image
      }
    }
  }
`
