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
  description: string;
}

export interface Menus {
  id: number;
  title: string;
  navigation: string;
  description?: string;
  childMenus?: ChildMenu[];
}

export const menuForDesktopItems: Menus[] = [
  {
    id: 1,
    title: "Festive Edition - SALE!",
    navigation: "/category/festive-edition",
    description:
      "Celebrate the season of joy with our Festive Edition – a vibrant mix of art, drawings, resin pieces, home décor, and crafts to brighten your celebrations",
  },
  {
    id: 2,
    title: "Limited Edition - SALE!",
    navigation: "/category/limited-edition",
    description:
      "Discover our Limited Edition – a rare collection of art, unique drawings, resin creations, and handcrafted décor pieces, designed to bring exclusivity and elegance to your space.",
  },
  {
    id: 3,
    title: "Latest Drops",
    navigation: "/category/newly-launched",
    description:
      "Explore our Latest Drops – a fresh curation of art, contemporary drawings, resin accents, and handcrafted décor. Each piece is newly introduced to bring modern charm and creative flair into your collection.",
  },
  {
    id: 4,
    title: "Painting",
    navigation: "/painting",
    childMenus: [
      {
        id: 1,
        title: "Oil Painting",
        navigation: "/painting/oil",
        description:
          "Classic oil paintings with rich textures and timeless beauty for art enthusiasts.",
      },
      {
        id: 2,
        title: "Watercolor Painting",
        navigation: "/painting/watercolor",
        description:
          "Delicate watercolor art with soft tones and expressive brushwork.",
      },
      {
        id: 3,
        title: "Acrylic Painting",
        navigation: "/painting/acrylic",
        description:
          "Bold and vibrant acrylic paintings that bring contemporary energy to your walls.",
      },
      {
        id: 4,
        title: "Portrait Painting",
        navigation: "/painting/portrait",
        description:
          "Personalized and artistic portraits capturing unique emotions and expressions.",
      },
      {
        id: 5,
        title: "Landscape Painting",
        navigation: "/painting/landscape",
        description:
          "Scenic landscape art that transports you to serene and picturesque views.",
      },
      {
        id: 6,
        title: "Abstract Painting",
        navigation: "/painting/abstract",
        description:
          "Modern abstract art with imaginative forms and vibrant compositions.",
      },
    ],
  },
  {
    id: 5,
    title: "Resin Art",
    navigation: "/resin-art",
    childMenus: [
      {
        id: 1,
        title: "Keychains",
        navigation: "/resin-art/keychains",
        description:
          "Stylish resin keychains crafted with unique patterns and colors.",
      },
      {
        id: 2,
        title: "Flower Preservation",
        navigation: "/resin-art/flowers",
        description:
          "Beautifully preserved flowers in resin, keeping memories timeless.",
      },
      {
        id: 3,
        title: "Resin Tables",
        navigation: "/resin-art/tables",
        description:
          "Elegant resin tables blending function with artistic design.",
      },
      {
        id: 4,
        title: "Wall Clocks",
        navigation: "/resin-art/clocks",
        description:
          "Artistic resin wall clocks that add a modern touch to your home.",
      },
      {
        id: 5,
        title: "Jewelry & Accessories",
        navigation: "/resin-art/jewelry",
        description:
          "Handcrafted resin jewelry and accessories for a bold fashion statement.",
      },
      {
        id: 6,
        title: "Coasters",
        navigation: "/resin-art/coasters",
        description:
          "Durable and artistic resin coasters for your stylish tabletops.",
      },
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
        description:
          "Customized frames with your favorite quotes to inspire and decorate.",
      },
      {
        id: 2,
        title: "Bedroom Wall Hangings",
        navigation: "/home-decor/bedroom",
        description:
          "Decorative wall hangings that bring warmth and style to your bedroom.",
      },
      {
        id: 3,
        title: "Living Room Decor",
        navigation: "/home-decor/living-room",
        description:
          "Chic and creative décor to elevate the ambiance of your living room.",
      },
      {
        id: 4,
        title: "Macrame Hangings",
        navigation: "/home-decor/macrame",
        description:
          "Handwoven macrame art for a cozy and bohemian touch to any space.",
      },
      {
        id: 5,
        title: "Tapestry Wall Art",
        navigation: "/home-decor/tapestry",
        description:
          "Intricate tapestry designs to bring color and culture to your walls.",
      },
      {
        id: 6,
        title: "Festive Wall Hangings",
        navigation: "/home-decor/festive",
        description:
          "Joyful and decorative wall hangings perfect for seasonal celebrations.",
      },
    ],
  },
  {
    id: 7,
    title: "Crafts",
    navigation: "/craft",
    childMenus: [
      {
        id: 1,
        title: "Paper Craft",
        navigation: "/craft/paper",
        description:
          "Creative paper crafts with intricate designs and handmade charm.",
      },
      {
        id: 2,
        title: "Clay Modeling",
        navigation: "/craft/clay",
        description:
          "Expressive clay models shaped with artistic detail and care.",
      },
      {
        id: 3,
        title: "Handmade Jewelry",
        navigation: "/craft/jewelry",
        description:
          "Unique handmade jewelry crafted from creative materials and designs.",
      },
      {
        id: 4,
        title: "Wood Art",
        navigation: "/craft/wood",
        description:
          "Elegant wooden art pieces showcasing natural beauty and craftsmanship.",
      },
      {
        id: 5,
        title: "Fabric Art",
        navigation: "/craft/fabric",
        description:
          "Colorful and textured fabric art adding creativity to your décor.",
      },
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
