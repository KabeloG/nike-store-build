import React, { useState } from "react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import Wrapper from "../../components/Wrapper";
import ProductDetailsCarousel from "../../components/ProductDetailsCarousel";
import { sizes } from "../../constants";

import { sanityClient, urlFor } from "../../sanity";
import { addToCart } from "../../src/features/cart/cartSlice";
import toast from "react-hot-toast";

import { selectWishlist } from "../../src/features/wishlist/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../src/features/wishlist/wishlistSlice";
import { useRouter } from "next/router";

const ProductDetails = ({ shoe }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [showError, setShowError] = useState(false);
  const [wishlistClicked, setWishlistClicked] = useState(false);
  const dispatch = useDispatch();

  const getPercentage = (x, y) => {
    let diff = 100 * Math.abs((x - y) / ((x + y) / 2));

    return Math.round(diff);
  };

  const router = useRouter();

  const wishlist = useSelector(selectWishlist);

  const itemInWishlist = wishlist.find((i) => i.shoe._id === shoe._id);

  return (
    <div className="w-full md:py-20">
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-1 gap-[50px] lg:gap-[100px]">
          {/* Left column */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <ProductDetailsCarousel shoe={shoe} />
          </div>

          {/* Right column */}
          <div className="flex-[1] py-3">
            <h2 className="text-[34px] font-semibold mb-2">{shoe.title}</h2>
            <h3 className="text-lg font-semibold">{shoe.category}</h3>
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold">
                MRP: R{shoe.price.toFixed(2)}
              </h3>
              {shoe.oldPrice && (
                <h3
                  className="text-lg font-semibold line-through 
                  text-red-400 ml-8"
                >
                  R{shoe.oldPrice.toFixed(2)}
                </h3>
              )}
              {shoe.oldPrice && (
                <p className="ml-auto text-lg font-medium text-green-500">
                  {getPercentage(shoe.oldPrice, shoe.price)}% off
                </p>
              )}
            </div>

            <p className="font-medium text-black/[0.5]">incl. VAT</p>
            <p className="font-medium text-black/[0.5] mb-20">
              {`(Also includes all applicable duties)`}
            </p>

            {/* Product Size Range */}
            <div className="mb-10">
              {/* Heading */}
              <div className="flex justify-between mb-2">
                <p className="font-medium">Select Size</p>
                <p className="text-black/[0.5] cursor-pointer">Select Guide</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size, index) => {
                  return sizes.length - 1 === index ? (
                    <div
                      className="border rounded-md text-center py-3
                      font-medium bg-black/[0.1] cursor-not-allowed
                      opacity-50"
                      key={index}
                    >
                      {size}
                    </div>
                  ) : (
                    <div
                      className={`border rounded-md text-center py-3
                      font-medium hover:border-black cursor-pointer
                      ${selectedSize === size ? "border-black border-2" : ""}`}
                      key={index}
                      onClick={() => {
                        setShowError(false);
                        setSelectedSize(size);
                      }}
                    >
                      {size}
                    </div>
                  );
                })}
              </div>

              {showError && (
                <p className="text-red-500 mt-4 font-medium">
                  Please select a size
                </p>
              )}

              {/* Buttons */}
              <button
                className="w-full py-4 rounded-full bg-black text-white
                text-lg font-medium transition-all duration-300 ease-in-out 
                active:scale-95 mb-3 mt-10 hover:opacity-75"
                onClick={() => {
                  if (!selectedSize) {
                    setShowError(true);
                  } else {
                    dispatch(
                      addToCart({
                        shoe,
                        selectedSize,
                        oneQuantityPrice: shoe.price,
                        quantity: 1,
                      })
                    );
                    setShowError(false);
                    toast.success(`${shoe.title} has been added to cart`, {
                      position: "bottom-center",
                      duration: 4000,
                    });
                    setTimeout(() => {
                      router.push("/cart");
                    }, 3000);
                  }
                }}
              >
                Add to Cart
              </button>

              <button
                className="flex items-center justify-center w-full py-4 rounded-full 
              border bg-white text-black text-lg font-medium transition-all duration-300 
              ease-in-out mb-3 mt-2 hover:border-black hover:bg-black hover:text-white
              active:scale-95"
                onClick={() => {
                  setWishlistClicked(!wishlistClicked);
                  {
                    !wishlistClicked
                      ? toast(`${shoe.title} has been added to your wishlist`, {
                          duration: 4000,
                          position: "bottom-center",
                          icon: (
                            <IoMdHeart size={40} className="text-red-500" />
                          ),
                        })
                      : toast(
                          `${shoe.title} has been removed from your wishlist`,
                          {
                            duration: 4000,
                            position: "bottom-center",
                            icon: <IoMdHeartEmpty size={40} />,
                          }
                        );
                  }
                  {
                    !wishlistClicked
                      ? dispatch(addToWishlist({ shoe }))
                      : dispatch(removeFromWishlist({ shoe }));
                  }
                }}
              >
                Wishlist{" "}
                {itemInWishlist ? (
                  <IoMdHeart size={20} className="text-red-500" />
                ) : (
                  <IoMdHeartEmpty size={20} />
                )}
              </button>

              <div className="mt-5">
                <h1 className="text-lg font-bold mb-5">Product Details</h1>
                <p className="mb-5">{shoe.descriptionText.children.text}</p>
                {shoe.extraInfo?.children.map((item, index) => {
                  return index === 0 ? (
                    <h1 key={index} className="font-semibold inline-block mr-2">
                      {item.text}
                    </h1>
                  ) : (
                    <p key={index} className="inline-block">
                      {item.text}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default ProductDetails;

// defining the routes nextjs should pre-build in advance
export const getStaticPaths = async () => {
  const query = `*[_type == 'shoes'] {
    _id,
    slug {
      current
    }
  }`;

  const shoes = await sanityClient.fetch(query);

  /* gives back an array with each object containing a key "params"
  that has the actual path inside of it */
  const paths = shoes.map((item) => ({
    params: {
      slug: item.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking", // show 404 if page doesn't exist
  };
};

// use slugs from staticpaths to get content for each page
export const getStaticProps = async ({ params }) => {
  const query = `*[_type == 'shoes' && slug.current == $slug] [0] {
    _id,
    title, 
    category,
    subCategory,
    slug,
    oldPrice, 
    price, 
    mainImage,
    images,
    descriptionText [0] {
      children [0] {
        text
      }
    },
    extraInfo [0] {
      children
    }
  }`;

  const shoe = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!shoe) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      shoe,
    },
    revalidate: 60 /* after 60 seconds, update the old cached version 
                    if the content has changed */,
  };
};
