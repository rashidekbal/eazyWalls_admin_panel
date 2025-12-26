import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import style from "./Home.module.css";
import { useContext, useEffect, useState } from "react";
import { context } from "../../../Store";

export default function Home() {
  const data = useContext(context);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // Dummy Data
  useEffect(() => {
    data.getCategories(data.setCategories);
    data.getTrendingWallpapers(data.setTrendingWallpapers, setIsLoading);
    data.getFeaturedWallpapers(data.setFeaturedWallpapers, setIsLoading);
  }, []);

  return (
    <div className={style.pageContainer}>
      <NavBar />
      <div className={style.dashboardContent}>
        {/* Sidebar */}
        <div className={style.sidebar}>
          <h2 className={style.sectionTitle}>Categories</h2>
          <div className={style.categoryList}>
            {data.categories.map((cat) => (
              <Link
                key={cat._id}
                to={`/category/${cat.title}`}
                className={
                  style.categoryLink
                } /* Added class for potential styling cleanup */
                style={{ textDecoration: "none" }}
              >
                <div
                  className={style.categoryPill}
                  style={{ backgroundImage: `url(${cat.previewUrl})` }}
                >
                  <div className={style.overlay}>
                    <div className={style.catInfo}>
                      <span className={style.catName}>{cat.title}</span>
                      <span className={style.catCount}>
                        {cat.wallpaperCount} Wallpapers
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Content - Stats */}
        <div className={style.mainStats}>
          <h2 className={style.sectionTitle}>Overview</h2>
          <div className={style.statsGrid}>
            <div
              className={`${style.statCard} ${style.trending}`}
              onClick={() => navigate("/edit-trending")}
            >
              <div
                className={style.statInner}
                style={{
                  background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)),url('${data.stats[0].previewLink}')`,
                }}
              >
                <h3>Trending</h3>
                <p className={style.statValue}>
                  {data.stats.length > 0 && data.stats[0].trending}
                </p>
                <p className={style.statLabel}>Active Wallpapers</p>
              </div>
            </div>

            <div
              className={`${style.statCard} ${style.featured}`}
              onClick={() => navigate("/edit-featured")}
            >
              <div
                className={style.statInner}
                style={{
                  background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)),url('${data.stats[1].previewLink}')`,
                }}
              >
                <h3>Featured</h3>
                <p className={style.statValue}>
                  {data.stats.length > 0 && data.stats[1].featured}
                </p>
                <p className={style.statLabel}>Curated Picks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
