import React, { useRef, useEffect, useState } from "react"
import css from "@emotion/css"
import { Global } from "@emotion/core"
import tw from "tailwind.macro"
import { Link, useStaticQuery } from "gatsby"
import openIcon from "../images/mobile_icon.svg"
import closeIcon from "../images/close_icon.svg"
import { LazyImage } from "./Lazy"
import logo from "../images/logo.png"

import { animated, config, useSpring, useTrail, useChain } from "react-spring"
const links = [
  {
    label: "About",
    to: "/about/",
  },
  {
    label: "Work",
    to: "/work/",
  },
  {
    label: "Services",
    to: "/services/",
  },
  {
    label: "Jobs",
    to: "/jobs/",
  },
  {
    label: "Blog",
    to: "/blog/",
  },
]

function Header({ transparent }) {
  const [inView, setInView] = useState(true)
  const [open, setOpen] = useState(false)
  const trigger = useRef()

  const transparentClass = inView ? "lg:bg-transparent" : ""

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true)
      } else {
        setInView(false)
      }
    })
    trigger.current && observer.observe(trigger.current)
    return () => {
      trigger.current && observer.unobserve(trigger.current)
    }
  }, [trigger.current])
  return (
    <>
      <div className="fixed  w-full top-0 z-100  ">
        {" "}
        <div
          className={` flex items-center transition duration-300 ease-in-out bg-blue-800   ${transparent &&
            transparentClass}`}
        >
          <div className="container w-full">
            <div className="flex  justify-between items-center">
              <span
                className="inline lg:hidden"
                css={css`
                  width: 23px;
                `}
              ></span>
              <Link
                to="/"
                className="  bg-blue-800 text-white flex items-center"
                css={css`
                  height: 85px;
                  /* @lg */
                  @media (min-width: 1024px) {
                    height: 110px;
                    width: 217px;
                  }
                  justify-content: ${transparent ? "center" : "flex-start"};
                `}
              >
                <img
                  className="w-auto"
                  css={css`
                    height: 60%;
                  `}
                  src={logo}
                ></img>
              </Link>
              <span className="inline lg:hidden">
                {!open && (
                  <button
                    css={css`
                      width: 23px;
                    `}
                    onClick={() => {
                      setOpen(true)
                    }}
                  >
                    <img src={openIcon}></img>
                  </button>
                )}
                {open && (
                  <button
                    css={css`
                      width: 23px;
                    `}
                    onClick={() => {
                      setOpen(false)
                    }}
                  >
                    <img src={closeIcon}></img>
                  </button>
                )}
              </span>
              <nav className="hidden lg:block self-center">
                {links.map((item, i) => (
                  <Link
                    className="text-white ml-10 text-xl"
                    key={i}
                    to={item.to}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div
        css={css`
          position: relative;
          height: 1px;
          top: 115px;
        `}
        ref={trigger}
      ></div>
      {links && (
        <Sidebar isOpen={open} setMenuIsOpen={setOpen} links={links}></Sidebar>
      )}
    </>
  )
}

export default Header

function Sidebar({ isOpen, setMenuIsOpen, links }) {
  const wrapperRef = useRef()
  const linksRef = useRef()
  const [init, setInit] = useState(false)
  useEffect(() => {
    typeof window !== "undefined" &&
      setTimeout(() => {
        setInit(true)
      }, 1000)
    return () => {}
  }, [])
  const wrapperAnimation = useSpring({
    ref: wrapperRef,
    config: config.slow,
    from: {
      opacity: isOpen ? 0 : 1,
      x: isOpen ? 100 : 0,
    },
    to: {
      opacity: !isOpen ? 0 : 1,
      x: !isOpen ? 100 : 0,
    },
  })

  const trail = useTrail(links.length, {
    ref: linksRef,
    config: config.slow,
    from: {
      opacity: isOpen ? 0 : 1,
      x: isOpen ? 100 : 0,
    },
    to: {
      opacity: !isOpen ? 0 : 1,
      x: !isOpen ? 100 : 0,
    },
  })

  const AnimatedLink = animated(Link)
  useChain([wrapperRef, linksRef], [0, 0.3])

  return (
    <>
      <Global
        styles={css`
          body {
            ${isOpen ? "overflow: hidden;" : ""}
          }
        `}
      ></Global>
      {init && (
        <animated.div
          style={{
            ...wrapperAnimation,
            transform: wrapperAnimation.x.interpolate(
              x => `translate3d(${x}%,0,0)`
            ),
          }}
          css={css`
            ${tw`fixed lg:hidden flex flex-col justify-center  items-center w-full    bg-blue-800`}
            top: 85px;
            z-index: 1000;
            height: calc(100vh - 85px);
          `}
        >
          {trail.length > 0 &&
            trail.map(({ x, ...animation }, index) => (
              <AnimatedLink
                key={index}
                className="text-white mb-8 md:mb-12 text-xl"
                onClick={() => {
                  setMenuIsOpen(false)
                }}
                style={{
                  ...animation,
                  transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
                }}
                to={links[index].to}
              >
                {links[index].label}
              </AnimatedLink>
            ))}
        </animated.div>
      )}
    </>
  )
}
