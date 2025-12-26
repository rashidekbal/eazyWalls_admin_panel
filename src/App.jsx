import { Outlet } from "react-router-dom";
import style from "./App.module.css";
import { Store } from "./Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className={style.mainFrame}>
      <Store>
        <Outlet />
        <ToastContainer theme="dark" position="bottom-right" />
      </Store>
    </div>
  );
}

export default App;
