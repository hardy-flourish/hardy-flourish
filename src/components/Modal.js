import React, { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import axios from "axios"
import { Global } from "@emotion/core"
import css from "@emotion/css"
import { MdClose } from "react-icons/md"
import { animated, useTransition } from "react-spring"

const Modal = ({ url, close, component: Component }) => {
  const elRef = useRef(null)
  const containerRef = useRef(null)
  const [start, setStart] = useState(false)
  const animation = useTransition(start, null, {
    from: {
      opacity: 0,
      transform: "translate3d(0,200px,0)",
    },
    leave: {
      opacity: 0,
      transform: "translate3d(0,200px,0)",
    },
    enter: {
      opacity: 1,
      transform: "translate3d(0,0,0)",
    },
  })

  const [content, setContent] = useState(null)
  if (!elRef.current) {
    elRef.current = document.createElement("div")
  }

  useEffect(() => {
    if (content) {
      setStart(true)
    } else {
      setStart(false)
    }
  }, [content])
  useEffect(() => {
    url &&
      axios
        .get(`http://localhost:8000/page-data/${url}/page-data.json`)
        .then(res => {
          setContent(res.data.result.data)
        })
        .catch(err => {
          console.log(err)
        })
  }, [url])
  useEffect(() => {
    function clickOutside(e) {
      if (
        document.getElementById("container-ref") &&
        !document.getElementById("container-ref").contains(e.target)
      ) {
        setStart(false)
      }
    }
    typeof window !== "undefined" &&
      window.addEventListener("click", clickOutside)
    return () => {
      typeof window !== "undefined" &&
        window.removeEventListener("click", clickOutside)
    }
  }, [])
  useEffect(() => {
    const modalRoot =
      typeof window !== "undefined" ? document.getElementById("modal") : null
    modalRoot && modalRoot.appendChild(elRef.current)
    return () => {
      modalRoot && modalRoot.removeChild(elRef.current)
    }
  }, [])

  return createPortal(
    <>
      {animation.map(({ item, key, props }) => {
        return (
          <>
            {" "}
            {item && (
              <animated.div
                style={{ opacity: props.opacity }}
                className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center z-100"
                css={css`
                  background: linear-gradient(
                    rgba(3, 25, 51, 0.4),
                    rgba(3, 25, 51, 0.4)
                  );
                `}
              >
                <animated.div
                  style={{ transform: props.transform }}
                  className="   overflow-y-auto overflow-x-auto relative"
                  css={css`
                    max-height: 100vh;
                    /* @lg */
                    @media (min-width: 1024px) {
                      max-height: 90vh;
                    }
                  `}
                >
                  <div
                    className="container px-0"
                    id="container-ref"
                    ref={containerRef}
                  >
                    <button
                      className="absolute   top-0 "
                      css={css`
                        right: 1rem;
                        z-index: 1000;
                      `}
                    >
                      <MdClose
                        className="text-white w-12 h-12 p-2"
                        onClick={() => {
                          setStart(false)
                          setTimeout(() => {
                            close()
                          }, 300)
                        }}
                      ></MdClose>
                    </button>
                    <div className="card bg-gray-100 rounded-none overflow-x-hidden w-full modal">
                      <Component data={content}></Component>
                    </div>
                  </div>
                </animated.div>
              </animated.div>
            )}
          </>
        )
      })}
    </>,
    elRef.current
  )
}

export default Modal
