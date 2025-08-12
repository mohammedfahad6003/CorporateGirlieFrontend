export interface MenuItems {
  id: number;
  title: string;
  navigation: string;
}

export const menuItems: MenuItems[] = [
  { id: 1, title: "Home", navigation: "/" },
  { id: 2, title: "Categories", navigation: "/categories" },
  { id: 3, title: "About Us", navigation: "/aboutUs" },
  { id: 4, title: "Contact Us", navigation: "/contactUs" },
];

export interface SubMenuItems {
  id: number;
  title: string;
}

export interface Menu {
  id: number;
  title: string;
  childMenus: SubMenuItems[];
}

export const subMenusItems: Menu[] = [
  {
    id: 1,
    title: "Painting",
    childMenus: [
      { id: 1, title: "Oil Painting" },
      { id: 2, title: "Watercolor Painting" },
      { id: 3, title: "Acrylic Painting" },
      { id: 4, title: "Portrait Painting" },
      { id: 5, title: "Landscape Painting" },
      { id: 6, title: "Abstract Painting" },
    ],
  },
  {
    id: 2,
    title: "Drawing",
    childMenus: [
      { id: 1, title: "Pencil Sketching" },
      { id: 2, title: "Charcoal Drawing" },
      { id: 3, title: "Ink Drawing" },
      { id: 4, title: "Figure Drawing" },
      { id: 5, title: "Architectural Drawing" },
      { id: 6, title: "Cartoon & Comic Drawing" },
    ],
  },
  {
    id: 3,
    title: "Resin Art",
    childMenus: [
      { id: 1, title: "Keychains" },
      { id: 2, title: "Flower Storage" },
      { id: 3, title: "Resin Tables" },
      { id: 4, title: "Wall Clocks" },
      { id: 5, title: "Jewelry & Accessories" },
      { id: 6, title: "Coasters" },
    ],
  },
  {
    id: 4,
    title: "Wall Hangings",
    childMenus: [
      { id: 1, title: "Personal Quote Frames" },
      { id: 2, title: "Bedroom Wall Hangings" },
      { id: 3, title: "Living Room Decor" },
      { id: 4, title: "Macrame Hangings" },
      { id: 5, title: "Tapestry Wall Art" },
      { id: 6, title: "Festive Wall Hangings" },
    ],
  },
];
