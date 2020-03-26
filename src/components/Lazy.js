import React, { useRef, useEffect } from "react"
import { animated, useSpring } from "react-spring"

export function LazyImage({ src = "", alt = "", className = "", ...rest }) {
  const [style, set] = useSpring(() => ({
    opacity: 0,
  }))
  const imageRef = useRef()
  useEffect(() => {
    typeof window !== "undefined" &&
      imageRef.current.addEventListener("load", e => {
        set({ opacity: 1 })
      })
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          imageRef.current.src = src
          observer.unobserve(imageRef.current)
        }
      },
      {
        threshold: 0,
        rootMargin: "200px",
      }
    )
    observer.observe(imageRef.current)
    return () => {}
  }, [imageRef.current])
  return (
    <animated.img
      style={style}
      className={className}
      ref={imageRef}
      alt={alt}
      {...rest}
    ></animated.img>
  )
}
