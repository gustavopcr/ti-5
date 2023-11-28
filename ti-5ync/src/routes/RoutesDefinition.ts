import { RouteObject } from "react-router-dom";
import { Favorites, Images, Onboarding, Recent, Root, Shared, File, Media } from "../pages";

export const RoutesDefinition: RouteObject[] = [
  {
    path: "/",
    Component: Root,
  },
  {
    path: "/favorites",
    Component: Favorites,
  },
  {
    path: "/images",
    Component: Images,
  },
  {
    path: "/onboarding",
    Component: Onboarding,
  },
  {
    path: "/recent",
    Component: Recent,
  },
  {
    path: "/shared",
    Component: Shared,
  },
  {
    path: "/file",
    Component: File,
  },
  {
    path: "/media",
    Component: Media,
  }
];
