
import { Outlet } from 'react-router-dom'
import style from "./App.module.css"

function App() {
  return (
    <div className={style.mainFrame}>
      <Outlet />
    </div>
  )
}

export default App
