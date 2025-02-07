import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MenuData, subMenuData } from '../constants'
import { BsChevronDown } from "react-icons/bs"

const Menu = ({ showCatMenu, setShowCatMenu, categories }) => {
  return (
    <ul className="hidden md:flex items-center gap-8 font-medium 
    text-black">
      {MenuData.map((item) => (
        <React.Fragment key={item.id}>
          {item.subMenu ? (
            <li 
              className="cursor-pointer flex items-center gap-2 relative"
              onMouseEnter={() => setShowCatMenu(true)}
              onMouseLeave={() => setShowCatMenu(false)}
            >
              {item.name}
              <BsChevronDown size={14} />

              {showCatMenu && (
                <ul className="bg-white absolute top-6 left-0 min-w-[250px]
                px-1 py-1 text-black shadow-lg">
                  {categories?.map((item) => (
                    <Link href={`/category/${item._id}`} key={item._id}>
                      <li className="h-12 flex justify-between
                      items-center px-3 hover:bg-black/[0.03]
                      rounded-md">
                        {item.catName}
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </li>
          ) : (
            <li className="cursor-pointer">
              <Link href={item?.url}>
                {item.name}
              </Link>
            </li>
          )}
        </React.Fragment>
      ))}
    </ul>
  )
}

export default Menu;