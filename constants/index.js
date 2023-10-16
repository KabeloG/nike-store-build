export const MenuData = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About", url: "/" },
  { id: 3, name: "Categories", subMenu: true },
  { id: 4, name: "Contact", url: "/" },
];

export const subMenuData = [
  { id: 1, name: "Jordan", slug: "/jordan", doc_count: 11 },
  { id: 2, name: "Sneakers", slug: "/jordan", doc_count: 8 },
  {
    id: 3,
    name: "Running shoes",
    doc_count: 64,
    slug: "/jordan",
  },
  {
    id: 4,
    name: "Basketball shoes",
    doc_count: 107,
    slug: "/jordan",
  },
];

export const sizes = [
  "UK 6",
  "UK 6.5",
  "UK 7",
  "UK 7.5",
  "UK 8",
  "UK 8.5",
  "UK 9",
  "UK 9.5",
  "UK 10",
  "UK 10.5",
  "UK 11",
  "UK 11.5",
];

export const sizesDropdown = [
  { value: 6, size: "UK 6" },
  { value: 6.5, size: "UK 6.5" },
  { value: 7, size: "UK 7" },
  { value: 7.5, size: "UK 7.5" },
  { value: 8, size: "UK 8" },
  { value: 8.5, size: "UK 8.5" },
  { value: 9, size: "UK 9" },
  { value: 9.5, size: "UK 9.5" },
  { value: 10, size: "UK 10" },
  { value: 10.5, size: "UK 10.5" },
  { value: 11, size: "UK 11" },
  { value: 11, size: "UK 11.5", enabled: false },
];
