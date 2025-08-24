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
  { id: 1, title: "Festive Edition - SALE!", navigation: "/festive-edition" },
  { id: 2, title: "Limited Edition - SALE!", navigation: "/limited-edition" },
  { id: 3, title: "New Launches", navigation: "/new-launches" },
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
    title: "Drawing",
    navigation: "/drawing",
    childMenus: [
      { id: 1, title: "Pencil Sketching", navigation: "/drawing/pencil" },
      { id: 2, title: "Charcoal Drawing", navigation: "/drawing/charcoal" },
      { id: 3, title: "Ink Drawing", navigation: "/drawing/ink" },
      { id: 4, title: "Figure Drawing", navigation: "/drawing/figure" },
      {
        id: 5,
        title: "Architectural Drawing",
        navigation: "/drawing/architecture",
      },
      { id: 6, title: "Cartoon & Comic Drawing", navigation: "/drawing/comic" },
    ],
  },
  {
    id: 6,
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
    id: 7,
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
    id: 8,
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
  { id: 9, title: "Contact Us", navigation: "/contactus" },
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
