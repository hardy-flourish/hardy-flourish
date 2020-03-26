import React, { useState, useEffect } from "react"

export default function useFluid(image, { w }) {
  const [fluid, setFluid] = useState({ ...image.fluid })
  useEffect(() => {
    var url = ""
    if (image.url.match(/w=[0-9]+/)) {
      url = image.url.replace(/w=[0-9]+/, `&w=${w}`)
    } else {
      url = image.url + `&w=${w}`
    }

    setFluid({
      ...image.fluid,
      src: url,
      srcSet: `${url} 1000w`,
    })
  }, [image.url])
  return fluid
}
