import React from "react";
import { sanityClient, urlFor } from "../sanity";

const contact = ({ slugs }) => {
  return (
    <div>
      {slugs.map((item) => (
        <p>{item.subCategory}</p>
      ))}
    </div>
  );
};

export default contact;

export const getServerSideProps = async () => {
  const query = `*[_type == 'shoes'] {
      _id,
      subCategory
    }`;

  const slugs = await sanityClient.fetch(query);

  return {
    props: {
      slugs,
    },
  };
};
