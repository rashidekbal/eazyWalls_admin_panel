import { Outlet } from "react-router-dom";
import style from "./App.module.css";
import { Store } from "./Store";

function App() {
  return (
    <div className={style.mainFrame}>
      <Store>
        <Outlet />
      </Store>
    </div>
  );
}

export default App;
