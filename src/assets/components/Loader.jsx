import style from "./css/Loader.module.css";

export default function Loader() {
  return (
    <div className={style.loaderContainer}>
      <div className={style.spinner}></div>
    </div>
  );
}
