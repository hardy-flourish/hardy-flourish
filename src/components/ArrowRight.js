import React from "react"

export default function ArrowRight(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={10}
      viewBox="0 0 25 10"
      {...props}
    >
      <g>
        <g>
          <g>
            <path
              fill="none"
              stroke="currentColor"
              strokeMiterlimit={20}
              strokeWidth={2}
              d="M0 5h18"
            />
          </g>
          <g>
            <path fill="currentColor" d="M25 5l-8 5V0z" />
          </g>
        </g>
      </g>
    </svg>
  )
}
