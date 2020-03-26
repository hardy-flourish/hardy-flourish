module.exports = {
  siteMetadata: {
    title: `Starter`,
    description: `Gatsby project starter for the workfow I use.`,
    author: `@matemislov`,
  },
  plugins: [
    `gatsby-plugin-emotion`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: false,
        develop: false,
        tailwind: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-webfonts",
      options: {
        fonts: {
          google: [
            {
              family: "Work Sans",
              variants: ["400", "500", "600"],
              //subsets: ['latin']
              //text: 'Hello'
              fontDisplay: "swap",
              //strategy: 'selfHosted' // 'base64' || 'cdn'
            },
          ],
        },
      },
    },
    {
      resolve: "gatsby-source-prismic-graphql",
      options: {
        repositoryName: "handf", // required
        defaultLang: "en-us", // optional, but recommended
        accessToken:
          "MC5YbXpfTGhFQUFDRUFBWVZC.aO-_ve-_vRbvv71977-9Oe-_ve-_ve-_ve-_ve-_vWPvv73vv71SVgxQRO-_ve-_ve-_vVrvv71977-9VDnvv70R",
      },
    },
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `gatsby-starter-default`,
    //     short_name: `starter`,
    //     start_url: `/`,
    //     background_color: `#663399`,
    //     theme_color: `#663399`,
    //     display: `minimal-ui`,
    //     icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
