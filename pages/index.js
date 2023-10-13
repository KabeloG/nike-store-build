import { Wrapper, HeroBanner, ProductCard, BackToTop } from "../components";
import { sanityClient, urlFor } from "../sanity";

export default function Home({ shoes }) {
  console.table(shoes);
  return (
    <main>
      <HeroBanner />

      <Wrapper>
        {/* Heading and paragraph */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <h2
            className="text-[28px] md:text-[34px] mb-5 font-semibold 
            leading-tight"
          >
            Cushioning for your Miles
          </h2>
          <p className="text-base md:text-xl">
            A lightweight Nike ZoomX midsole is combined with increased stack
            heights to help provide cushioning during extended stretches of
            running.
          </p>
        </div>

        {/* Products grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 
            px-5 md:px-0"
        >
          {shoes?.map((shoe) => (
            <ProductCard key={shoe.shoeNumber} shoe={shoe} />
          ))}
        </div>
      </Wrapper>
    </main>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == 'shoes'] | order(shoeNumber) {
    _id,
    shoeNumber, 
    title, 
    category,
    subCategory -> {
      slug {
        current
      }
    },
    slug,
    oldPrice, 
    price, 
    mainImage,
    images,
    descriptionText [0] {
      children [0] {
        text
      }
    }
  }`;

  const shoes = await sanityClient.fetch(query);

  return {
    props: {
      shoes,
    },
  };
};
