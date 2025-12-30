import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./assets/page/home/Home.jsx";
import AddWallpaper from "./assets/page/addWallpaper/AddWallpaper.jsx";
import AddCategory from "./assets/page/addCategory/AddCategory.jsx";
import EditTrending from "./assets/page/editTrending/EditTrending.jsx";
import EditFeatured from "./assets/page/editFeatured/EditFeatured.jsx";
import AddTrending from "./assets/page/addTrending/AddTrending.jsx";
import AddFeatured from "./assets/page/addFeatured/AddFeatured.jsx";

import CategoryView from "./assets/page/categoryView/CategoryView.jsx";
import EditCategory from "./assets/page/editCategory/EditCategory.jsx";
import EditWallpaper from "./assets/page/editWallpaper/EditWallpaper.jsx";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "addWallpaper",
        element: <AddWallpaper />,
      },
      {
        path: "addCategory",
        element: <AddCategory />,
      },
      {
        path: "edit-trending",
        element: <EditTrending />,
      },
      {
        path: "edit-featured",
        element: <EditFeatured />,
      },
      {
        path: "add-trending",
        element: <AddTrending />,
      },
      {
        path: "add-featured",
        element: <AddFeatured />,
      },
      {
        path: "category/:categoryName",
        element: <CategoryView />,
      },
      {
        path: "edit-category",
        element: <EditCategory />,
      },
      {
        path: "edit-wallpaper/:id",
        element: <EditWallpaper />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={Router} />
);
