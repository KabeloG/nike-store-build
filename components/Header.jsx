import React, { useState, useEffect } from 'react'
import useSWR from 'swr';
import { IoMdHeart } from "react-icons/io";
import Wrapper from './Wrapper'

import Menu from './Menu'
import MobileMenu from './MobileMenu'

import Image from 'next/image'
import Link from 'next/link'
import { sanityClient } from '../sanity';

import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";

import WishListItem from "../components/WishlistItem"
import { Modal } from 'flowbite-react'

import { selectWishlist } from '../src/features/wishlist/wishlistSlice'
import { selectCartItems } from '../src/features/cart/cartSlice'
import { useSelector } from 'react-redux'

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [showCatMenu, setShowCatMenu] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [show, setShow] = useState("translate-y-0")
  const [lastScrollY, setLastScrollY] = useState(0)

  const wishlist = useSelector(selectWishlist);
  const itemsInCart = useSelector(selectCartItems);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px]")
      } else {
        setShow("shadow-sm")
      }
    } else {
      setShow("translate-y-0")
    }
    setLastScrollY(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar)

    return () => {
      window.removeEventListener("scroll", controlNavbar)
    }
  }, [lastScrollY])

  // fetch categories using Client-side data fetching with SWR

  const key = `*[_type == 'categories'] {
    _id,
    catName,
    slug {
      current
    }
  }`

  const fetcher = (key) => sanityClient.fetch(key);

  const { data, error } = useSWR(key, fetcher)

  return (
    <header id='top' className={`w-full h-[50px] md:h-[80px] bg-white 
    flex items-center justify-between z-20 sticky top-0 
    transition-transform duration-300 ${show}`}>
      <Wrapper className="h-[60px] flex items-center justify-between">
        <Link href="/">
          <Image
            src="/assets/logo.svg"
            width={40}
            height={40}
            alt="nike logo"
            className="cursor-pointer md:w-[60px]"
          />
        </Link>

        <Menu
          showCatMenu={showCatMenu}
          setShowCatMenu={setShowCatMenu}
          categories={data}
        />

        {mobileMenu && (
          <MobileMenu
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            setMobileMenu={setMobileMenu}
            categories={data}
          />
        )}

        {error && console.log('Failed to load categories')}

        <div className="flex items-center gap-2 text-black">
          {/* Icon 1 */}
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex
            justify-center items-center hover:bg-black/[0.05] cursor-pointer
            relative" 
            onClick={() => setOpenModal(!openModal)}
          >
            <IoMdHeartEmpty className="text-[22px] md:text-[24px]" />
            <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px]
            rounded-full bg-red-600 absolute top-1 left-5 md:left-7
            text-white text-[10px] md:text-[12px] flex justify-center
            items-center px-[2px] md:px-[5px]">
              {wishlist.length}
            </div>

            {openModal && (
              <Modal 
                show={openModal}
              >
                <Modal.Header>
                  <p className="flex text-xl md:text-2xl font-semibold
                  text-black gap-2"
                  >
                    Wishlist <IoMdHeart size={30} className="text-red-500" />
                  </p>
                </Modal.Header>
                <Modal.Body>
                  {wishlist.length > 0 ? (
                    <>
                     {wishlist.map((item, i) => (
                      <WishListItem item={item} key={i} />
                    ))}
                    </>
                  ) : (
                    <p>No items in your wishlist</p>
                  )}
                </Modal.Body>
              </Modal>
            )}
          </div>

          {/* Icon 2 */}
          <Link href="/cart">
            <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex
            justify-center items-center hover:bg-black/[0.05] cursor-pointer
            relative">
              <BsCart className="text-[18px] md:text-[20px]" />
                <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px]
                rounded-full bg-red-600 absolute top-1 left-5 md:left-7
                text-white text-[10px] md:text-[12px] flex justify-center
                items-center px-[2px] md:px-[5px]">{itemsInCart.length}</div>
            </div>
          </Link>

          {/* Mobile icon */}
          <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex
          justify-center items-center hover:bg-black/[0.05] cursor-pointer
          relative -mr-2 md:hidden">
            {mobileMenu ? (
              <VscChromeClose
                className="text-[16px]"
                onClick={() => setMobileMenu(false)}
              />
            ) : (
              <BiMenuAltRight
                className="text-[20px]"
                onClick={() => setMobileMenu(true)}
              />
            )}
          </div>
        </div>
      </Wrapper>
    </header>
  )
}

export default Header;


