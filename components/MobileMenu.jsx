import React from 'react'
import Link from 'next/link'
import { MenuData, subMenuData } from '../constants'
import { BsChevronDown } from "react-icons/bs"

const MobileMenu = ({ showCatMenu, setShowCatMenu, setMobileMenu, categories }) => {
  return (
    <ul className="flex flex-col md:hidden font-bold absolute top-[50px]
    left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black">
      {MenuData.map((item) => (
        <React.Fragment key={item.id}>
          {item.subMenu ? (
            <li 
              className="cursor-pointer py-4 px-5 border-b flex flex-col 
              relative"
              onClick={() => setShowCatMenu(!showCatMenu)}
            >
              <div className="flex justify-between items-center">
                {item.name}
                <BsChevronDown size={14} />
              </div>

              {showCatMenu && (
                <ul className="bg-black/[0.05] text-black -mx-5 mt-4 -mb-4">
                  {categories?.map((item) => (
                    <Link 
                      href={`/category/${item._id}`}
                      key={item._id} 
                      onClick={() => {
                        setShowCatMenu(false)
                        setMobileMenu(false)
                    }}
                    >
                      <li className="py-4 px-8 border-t flex justify-between">
                        {item.catName}
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </li>
          ) : (
            <li className="py-4 px-5 border-b">
              <Link href={item?.url} onClick={() => setMobileMenu(false)}>
                {item.name}
              </Link>
            </li>
          )}
        </React.Fragment>
      ))}
    </ul>
  )
}

export default MobileMenu