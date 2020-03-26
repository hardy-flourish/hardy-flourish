const path = require(`path`)
const axios = require("axios")
const moment = require("moment")
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const template = path.resolve("./src/templates/page.js")
  const { data } = await graphql(
    `
      {
        prismic {
          allPages {
            edges {
              node {
                _meta {
                  uid
                }
              }
            }
          }
        }
      }
    `
  )
  data.prismic.allPages.edges.forEach(({ node }) => {
    createPage({
      path: node._meta.uid == "homepage" ? "/" : `/${node._meta.uid}/`,
      component: template,
      context: {
        uid: node._meta.uid,
      },
    })
  })
}

var fs = require("fs")
var dir = "./.cache/caches/gatsby-source-prismic-graphql"

exports.onPreBootstrap = () => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}
const getBase64 = async url => {
  const result = await axios.get(url, { responseType: "arraybuffer" })
  const data = Buffer.from(result.data).toString("base64")

  return `data:image/jpeg;base64,${data}`
}

const createImageFluidObject = async image => {
  const { dimensions, maxWidth = 1980, url } = image
  var baseUrl = url
  if (url.match(/w=[0-9]+/)) {
    baseUrl = url.replace(/w=[0-9]+/, "w=30")
  } else {
    baseUrl = url + "&w=30"
  }
  const base64 = await getBase64(baseUrl)
  return {
    base64,
    src: url,
    aspectRatio: dimensions.width / dimensions.height,
    sizes: `(max-width: ${maxWidth}px) 100vw, ${maxWidth}px`,
    srcSet:
      "/static/5fb91958832ed4b51316b40e2fabbe9f/f836f/1fa637dd-37d5-4bba-8412-9412d22dc9c4_young-man-and-girl-sitting-at-the-restaurant-and-9GHJQZN.jpg 200w, /static/5fb91958832ed4b51316b40e2fabbe9f/2244e/1fa637dd-37d5-4bba-8412-9412d22dc9c4_young-man-and-girl-sitting-at-the-restaurant-and-9GHJQZN.jpg 400w, /static/5fb91958832ed4b51316b40e2fabbe9f/14b42/1fa637dd-37d5-4bba-8412-9412d22dc9c4_young-man-and-girl-sitting-at-the-restaurant-and-9GHJQZN.jpg 800w, /static/5fb91958832ed4b51316b40e2fabbe9f/47498/1fa637dd-37d5-4bba-8412-9412d22dc9c4_young-man-and-girl-sitting-at-the-restaurant-and-9GHJQZN.jpg 1200w, /static/5fb91958832ed4b51316b40e2fabbe9f/0e329/1fa637dd-37d5-4bba-8412-9412d22dc9c4_young-man-and-girl-sitting-at-the-restaurant-and-9GHJQZN.jpg 1600w, /static/5fb91958832ed4b51316b40e2fabbe9f/af56c/1fa637dd-37d5-4bba-8412-9412d22dc9c4_young-man-and-girl-sitting-at-the-restaurant-and-9GHJQZN.jpg 2880w",
  }
}

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    PRISMIC_PageBodyHero_Primary: {
      background_image: {
        resolve(source, args, context, info) {
          return createImageFluidObject(source.background_image, "100").then(
            ({ base64, aspectRatio }) => {
              return {
                ...source.background_image,
                fluid: {
                  base64,
                  aspectRatio,
                },
              }
            }
          )
        },
      },
    },
    PRISMIC_Blog_post: {
      date: {
        type: "PRISMIC_Date",
        resolve: resolveDate("date", "DD MMM YYYY"),
      },
    },
  }
  createResolvers(resolvers)
}

function resolveDate(field, format = "LL") {
  return (source, args, context, info) => {
    const date = source[field] ? source[field] : null

    const formated = date ? moment(date).format(format) : null

    return formated
  }
}
