import style from "./WallpaperCard.module.css";

export default function WallpaperCard({
  wallpaper,
  isSelected,
  onToggle,
  className,
}) {
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
      <img
        src={wallpaper.previewUrl}
        alt="Wallpaper"
        className={style.cardImg}
        loading="lazy"
      />
    </div>
  );
}
