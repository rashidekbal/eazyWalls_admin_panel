import { NavLink } from "react-router-dom"
import style from "./css/NavBar.module.css"
export default function NavBar({ currenLoaction }) {
    return (<div className={style.main}>
        <ul>
            <li>
                <NavLink to="/" className={`${style.link} ${currenLoaction === "home" && style.selected}`}>Home</NavLink>
            </li>
            <li>
                <NavLink to="/addWallpaper" className={`${style.link} ${currenLoaction === "addWallpaper" && style.selected}`}>Add wallpaper</NavLink>
            </li>
            <li >
                <NavLink to="/addCategory" className={`${style.link}  ${currenLoaction === "addCategory" && style.selected}`}>Add category</NavLink>
            </li>
            <li >
                <NavLink to="/editType" className={`${style.link} ${currenLoaction === "editType" && style.selected}`}>Edit type</NavLink>
            </li>
        </ul>
    </div>)
}