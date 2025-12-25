
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './assets/page/home/Home.jsx'
import AddWallpaper from './assets/page/addWallpaper/AddWallpaper.jsx'
import AddCategory from "./assets/page/addCategory/AddCategory.jsx"
import EditType from './assets/page/editType/EditType.jsx'
const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "addWallpaper",
        element: <AddWallpaper />
      },
      {
        path: "addCategory",
        element: <AddCategory />
      },
      {path:"editType",
      element:<EditType/>}
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={Router} />
)
