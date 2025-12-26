import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import style from "./Home.module.css";
import { useContext, useEffect, useState } from "react";
import { context } from "../../../Store";

export default function Home() {
  const data = useContext(context);
  const [isLoading, setIsLoading] = useState(false);
  // Dummy Data
  const [stats, setStats] = useState([]);
  useEffect(() => {
    data.getCategories(data.setCategories);
    data.getTrendingWallpapers(data.setTrendingWallpapers, setIsLoading);
    data.getFeaturedWallpapers(data.setFeaturedWallpapers, setIsLoading);
    setStats(data.stats);
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
            <div className={`${style.statCard} ${style.trending}`}>
              <div className={style.statInner}>
                <h3>Trending</h3>
                <p className={style.statValue}>
                  {stats.length > 0 && stats[0].trending}
                </p>
                <p className={style.statLabel}>Active Wallpapers</p>
              </div>
            </div>

            <div className={`${style.statCard} ${style.featured}`}>
              <div className={style.statInner}>
                <h3>Featured</h3>
                <p className={style.statValue}>
                  {stats.length > 0 && stats[1].featured}
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
