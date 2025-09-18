import {
  faArrowDownWideShort,
  faArrowUpShortWide,
  faIndianRupeeSign,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

export interface ChildMenu {
  id: number;
  title: string;
  navigation: string;
}

export interface Menus {
  id: number;
  title: string;
  navigation: string;
  childMenus?: ChildMenu[];
}

export const menuForDesktopItems: Menus[] = [
  {
    id: 1,
    title: "Festive Edition - SALE!",
    navigation: "/category/festive-edition",
  },
  {
    id: 2,
    title: "Limited Edition - SALE!",
    navigation: "/category/limited-edition",
  },
  { id: 3, title: "Latest Drops", navigation: "/category/newly-launched" },
  {
    id: 4,
    title: "Painting",
    navigation: "/painting",
    childMenus: [
      { id: 1, title: "Oil Painting", navigation: "/painting/oil" },
      {
        id: 2,
        title: "Watercolor Painting",
        navigation: "/painting/watercolor",
      },
      { id: 3, title: "Acrylic Painting", navigation: "/painting/acrylic" },
      { id: 4, title: "Portrait Painting", navigation: "/painting/portrait" },
      { id: 5, title: "Landscape Painting", navigation: "/painting/landscape" },
      { id: 6, title: "Abstract Painting", navigation: "/painting/abstract" },
    ],
  },
  {
    id: 5,
    title: "Resin Art",
    navigation: "/resin-art",
    childMenus: [
      { id: 1, title: "Keychains", navigation: "/resin-art/keychains" },
      { id: 2, title: "Flower Preservation", navigation: "/resin-art/flowers" },
      { id: 3, title: "Resin Tables", navigation: "/resin-art/tables" },
      { id: 4, title: "Wall Clocks", navigation: "/resin-art/clocks" },
      {
        id: 5,
        title: "Jewelry & Accessories",
        navigation: "/resin-art/jewelry",
      },
      { id: 6, title: "Coasters", navigation: "/resin-art/coasters" },
    ],
  },
  {
    id: 6,
    title: "Home Decor",
    navigation: "/home-decor",
    childMenus: [
      {
        id: 1,
        title: "Personal Quote Frames",
        navigation: "/home-decor/frames",
      },
      {
        id: 2,
        title: "Bedroom Wall Hangings",
        navigation: "/home-decor/bedroom",
      },
      {
        id: 3,
        title: "Living Room Decor",
        navigation: "/home-decor/living-room",
      },
      { id: 4, title: "Macrame Hangings", navigation: "/home-decor/macrame" },
      { id: 5, title: "Tapestry Wall Art", navigation: "/home-decor/tapestry" },
      {
        id: 6,
        title: "Festive Wall Hangings",
        navigation: "/home-decor/festive",
      },
    ],
  },
  {
    id: 7,
    title: "Crafts",
    navigation: "/crafts",
    childMenus: [
      { id: 1, title: "Paper Craft", navigation: "/crafts/paper" },
      { id: 2, title: "Clay Modeling", navigation: "/crafts/clay" },
      { id: 3, title: "Handmade Jewelry", navigation: "/crafts/jewelry" },
      { id: 4, title: "Wood Art", navigation: "/crafts/wood" },
      { id: 5, title: "Fabric Art", navigation: "/crafts/fabric" },
    ],
  },
  { id: 8, title: "Contact Us", navigation: "/contact-us" },
];

export const DummySearchValues = [
  { id: 1, label: "Apple", value: "apple" },
  { id: 2, label: "Banana", value: "banana" },
  { id: 3, label: "Cherry", value: "cherry" },
  { id: 4, label: "Dragonfruit", value: "dragonfruit" },
  { id: 5, label: "Elderberry", value: "elderberry" },
  { id: 6, label: "Fig", value: "fig" },
  { id: 7, label: "Grapes", value: "grapes" },
  { id: 8, label: "Honeydew", value: "honeydew" },
  { id: 9, label: "Mango", value: "mango" },
  { id: 10, label: "Pineapple", value: "pineapple" },
];

export const LandingPageContent = [
  {
    id: 1,
    imageLink: "/unsplashImage1.jpg",
    imageDescription:
      "Step into a Dreamy Garden of Floral Tea cups, each skillfully handpainted.",
    imageTitle: "Arts & Crafts",
    imageButton: "Explore",
    imageNavigation: "/arts&crafts",
  },
  {
    id: 2,
    imageLink: "/unsplashImage2.jpg",
    imageDescription:
      "Discover stunning portraits and modern artwork that bring stories to life.",
    imageTitle: "Paintings",
    imageButton: "Shop Now",
    imageNavigation: "/paintings",
  },
  {
    id: 3,
    imageLink: "/unsplashImage3.jpg",
    imageDescription:
      "Dive into the world of resin art, where creativity meets glossy perfection.",
    imageTitle: "Resin Art",
    imageButton: "Browse",
    imageNavigation: "/resin-art",
  },
  {
    id: 4,
    imageLink: "/unsplashImage4.jpg",
    imageDescription:
      "Enhance your living space with unique and artistic home décor pieces.",
    imageTitle: "Home Décor",
    imageButton: "Discover",
    imageNavigation: "/home-decor",
  },
];

export const categories =
  menuForDesktopItems
    ?.filter((item) => item?.childMenus?.length)
    ?.map((item) => item.title) ?? [];

export const sortOptions = [
  { label: "Best Selling", icon: faStar },
  { label: "Below 1000", icon: faIndianRupeeSign },
  { label: "Low to High", icon: faArrowUpShortWide },
  { label: "High to Low", icon: faArrowDownWideShort },
];

export const products = [
  {
    id: 1,
    title: "Cool Sneakers",
    price: "₹2,499",
    image: "/unsplashImage1.jpg",
  },
  {
    id: 2,
    title: "Stylish Jacket",
    price: "₹3,999",
    image: "/unsplashImage2.jpg",
  },
  {
    id: 3,
    title: "Casual Shirt",
    price: "₹1,299",
    image: "/unsplashImage3.jpg",
  },
  {
    id: 4,
    title: "Smart Watch",
    price: "₹5,499",
    image: "/unsplashImage4.jpg",
  },
  {
    id: 5,
    title: "Classic Jeans",
    price: "₹1,999",
    image: "/unsplashImage1.jpg",
  },
  {
    id: 6,
    title: "Leather Wallet",
    price: "₹999",
    image: "/unsplashImage2.jpg",
  },
  {
    id: 7,
    title: "Trendy Backpack",
    price: "₹2,799",
    image: "/unsplashImage3.jpg",
  },
  {
    id: 8,
    title: "Wireless Earbuds",
    price: "₹4,299",
    image: "/unsplashImage4.jpg",
  },
];
