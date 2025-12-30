import style from "./WallpaperCard.module.css";
import { useNavigate } from "react-router-dom";

export default function WallpaperCard({
  wallpaper,
  isSelected,
  onToggle,
  className,
}) {
  const navigate = useNavigate();

  return (
    <div
      className={`${style.card} ${isSelected ? style.selected : ""} ${
        className || ""
      }`}
      onClick={() => onToggle(wallpaper._id)}
    >
      <div className={style.selectionOverlay}>
        <input
          type="checkbox"
          className={style.checkbox}
          checked={isSelected}
          onChange={() => {}}
          onClick={(e) => {
            e.stopPropagation();
            onToggle(wallpaper._id);
          }}
        />
      </div>

      {/* Edit Button Overlay */}
      <div
        className={style.editOverlay}
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/edit-wallpaper/${wallpaper._id}`, { state: wallpaper });
        }}
      >
        ✏️
      </div>

      <img
        src={wallpaper.previewUrl}
        alt="Wallpaper"
        className={style.cardImg}
        loading="lazy"
      />
    </div>
  );
}
