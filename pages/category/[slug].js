import React from "react";
import Image from "next/image";
import { Wrapper, ProductCard } from "../../components";
import { sanityClient, urlFor } from "../../sanity";

const Category = ({ shoes }) => {
  return (
    <div className="w-full md:py-20">
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <h1
            className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight 
          first-letter:uppercase"
          >
            {shoes[0].subCategory.catName}
          </h1>
        </div>

        {/* Products grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 
            px-5 md:px-0"
        >
          {shoes.map((item) => (
            <ProductCard shoe={item} key={item._id} />
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default Category;

// defining the routes nextjs should pre-build in advance
export const getStaticPaths = async () => {
  const query = `*[_type == 'categories'] {
    _id,
    catName,
    slug {
      current
    }
  }`;

  const shoes = await sanityClient.fetch(query);

  /* gives back an array with each object containing a key "params"
  that has the actual path inside of it */
  const paths = shoes.map((item) => ({
    params: {
      slug: item._id,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

// use slugs from staticpaths to get content for each page
export const getStaticProps = async ({ params }) => {
  const query = `*[_type == 'shoes' && references($slug)] {
    _id,
    title, 
    category,
    subCategory -> {
      _id,
      catName,
      slug {
        current
      }
    },
    slug,
    oldPrice, 
    price, 
    mainImage,
  }`;

  const shoes = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!shoes) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      shoes,
    },
    revalidate: 60,
  };
};
