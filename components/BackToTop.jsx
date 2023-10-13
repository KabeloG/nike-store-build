"use client" // purely a client component
import React, { useEffect, useState } from 'react'

const BackToTop = ({ Icon }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // if the user scrolls down, show the button
      window.scrollY > 200 ? setIsVisible(true) : setIsVisible(false)
    }
    // listen for scroll events then invoke the callback
    window.addEventListener("scroll", toggleVisibility)
    
    // clear the listener on component unmount
    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, []) 

  const scrollToTop = () => {
    isVisible &&
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }; 

  return (
    <div 
      className={`fixed bottom-5 right-2 mr-8 
    bg-red-600 h-12 w-12 rounded-md p-3 cursor-pointer
    transition-opacity ease-in-out duration-200
      ${isVisible ? "opacity-100" : "opacity-0"}`}
      onClick={scrollToTop}
    >
        <Icon className="text-[24px] text-white" />
    </div>
  )
}

export default BackToTop