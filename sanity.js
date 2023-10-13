import { createClient } from "next-sanity";
import createImageURLBuilder from "@sanity/image-url";

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2021-10-21",
  useCdn: process.env.NODE_ENV === "production",
};

// Set up the client for fetching data in the getProps page function
export const sanityClient = createClient(config);

// Set up a helper function for generating Image URLs
export const urlFor = (source) => createImageURLBuilder(config).image(source);
