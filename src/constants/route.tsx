import FavoritePage from "@/pages/FavoritePage";
import HomePage from "@/pages/HomePage";

const publicRoutes = [
  {
    path: "/",
    element: <HomePage />,
  },
];

const privateRoutes = [
  {
    path: "/favorites",
    element: <FavoritePage />,
  },
];

export { publicRoutes, privateRoutes };
