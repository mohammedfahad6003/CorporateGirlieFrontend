export interface MenuItems {
    id: number,
    title: string,
    navigation: string,
}
export const menuItems: MenuItems[] = [
  { id: 1, title: "Home", navigation: "/" },
  { id: 2, title: "About", navigation: "/about" },
  { id: 3, title: "Contact Us", navigation: "/contact-us" },
  { id: 4, title: "Wishlist", navigation: "/wishlist" }
];
