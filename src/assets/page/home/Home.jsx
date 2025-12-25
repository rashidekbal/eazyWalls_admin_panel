import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import style from "./Home.module.css";

export default function Home() {
  // Dummy Data
  const categories = [
    { id: 1, name: "Nature", count: 120, image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&auto=format&fit=crop&q=60" },
    { id: 2, name: "Abstract", count: 85, image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&auto=format&fit=crop&q=60" },
    { id: 3, name: "Cars", count: 45, image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&auto=format&fit=crop&q=60" },
    { id: 4, name: "Anime", count: 200, image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&auto=format&fit=crop&q=60" },
    { id: 5, name: "Space", count: 60, image: "https://plus.unsplash.com/premium_photo-1675802528766-9b578c7c9803?w=500&auto=format&fit=crop&q=60" },
  ];

  const stats = {
    trending: 15,
    featured: 8
  };

  return (
    <div className={style.pageContainer}>
      <NavBar />
      <div className={style.dashboardContent}>
        
        {/* Sidebar */}
        <div className={style.sidebar}>
          <h2 className={style.sectionTitle}>Categories</h2>
          <div className={style.categoryList}>
            {categories.map((cat) => (
              <Link 
                key={cat.id} 
                to={`/category/${cat.name}`}
                className={style.categoryLink} /* Added class for potential styling cleanup */
                style={{textDecoration: 'none'}}
              >
                <div className={style.categoryPill} style={{backgroundImage: `url(${cat.image})`}}>
                  <div className={style.overlay}>
                    <div className={style.catInfo}>
                      <span className={style.catName}>{cat.name}</span>
                      <span className={style.catCount}>{cat.count} Wallpapers</span>
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
                <p className={style.statValue}>{stats.trending}</p>
                <p className={style.statLabel}>Active Wallpapers</p>
              </div>
            </div>

            <div className={`${style.statCard} ${style.featured}`}>
              <div className={style.statInner}>
                <h3>Featured</h3>
                <p className={style.statValue}>{stats.featured}</p>
                <p className={style.statLabel}>Curated Picks</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
