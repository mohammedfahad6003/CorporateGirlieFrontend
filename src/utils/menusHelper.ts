import { menuForDesktopItems } from "./commonJson";

interface MenuInfo {
  title: string;
  description?: string;
  navigation: string;
}

export function getChildMenuInfo(
  category: string,
  parentRoute?: string
): MenuInfo | null {
  for (const menu of menuForDesktopItems) {
    if (parentRoute && menu.navigation === parentRoute && menu.childMenus) {
      const child = menu.childMenus.find((c) =>
        c.navigation.endsWith(category)
      );
      if (child) {
        return {
          title: child.title,
          description: child.description,
          navigation: child.navigation,
        };
      }
    }

    if (!parentRoute && menu.navigation.endsWith(category)) {
      return {
        title: menu.title,
        description: menu.description,
        navigation: menu.navigation,
      };
    }
  }

  return null;
}

export function getParentMenuInfo(
  category: string,
): MenuInfo | null {
  for (const menu of menuForDesktopItems) {
    if (menu.navigation.endsWith(category)) {
      return {
        title: menu.title,
        description: menu.description,
        navigation: menu.navigation,
      };
    }
  }

  return null;
}
