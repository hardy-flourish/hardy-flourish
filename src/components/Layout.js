import React from "react"
import Header from "./Header"
import Footer from "./Footer"

export default function Layout({ children }) {
  return (
    <div className="overflow-hidden flex flex-col min-h-screen">
      <main className="flex-grow bg-gray-100">{children}</main>
      <Footer></Footer>
    </div>
  )
}
