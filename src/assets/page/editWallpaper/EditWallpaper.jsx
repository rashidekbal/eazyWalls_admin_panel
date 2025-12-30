import { useState, useContext, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { context } from "../../../Store";
import NavBar from "../../components/NavBar";
import style from "./EditWallpaper.module.css";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

export default function EditWallpaper() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const data = useContext(context);

  const [wallpaper, setWallpaper] = useState(location.state || null);
  const [loading, setLoading] = useState(!location.state);

  // Form State
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [author, setAuthor] = useState("");
  const [isTrending, setIsTrending] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load Categories
    if (data.categories.length === 0) {
      data.getCategories(data.setCategories);
    }
  }, []);

  useEffect(() => {
    if (wallpaper) {
      setCategory(wallpaper.category || "");
      setTags(
        Array.isArray(wallpaper.tags)
          ? wallpaper.tags.join(", ")
          : wallpaper.tags || ""
      );
      setAuthor(wallpaper.author || "");
      setIsTrending(wallpaper.isTrending || false);
      setIsFeatured(wallpaper.isFeatured || false);
      setLoading(false);
    } else {
      // Fallback: fetch wallpaper if not passed in state (simple find from loaded wallpapers for now to save complexity, or could add getById API)
      const found =
        data.wallpapers.find((w) => w._id === id) ||
        data.trendingWallpapers.find((w) => w._id === id) ||
        data.featuredWallpapers.find((w) => w._id === id);
      if (found) {
        setWallpaper(found);
      } else {
        // Ideally fetch specific wallpaper from API here if not found in cache
        toast.error("Wallpaper not found locally. Please navigate from list.");
        setLoading(false);
      }
    }
  }, [id, wallpaper, data.wallpapers]);

  const handleSave = () => {
    setIsSaving(true);
    const updatedData = {
      id: wallpaper._id,
      category,
      tags,
      author,
      isTrending: isTrending,
      isFeatured: isFeatured,
    };

    data.updateWallpaper(updatedData, (success, message) => {
      setIsSaving(false);
      if (success) {
        toast.success(message);
        // Optionally update local state context to reflect changes immediately without refetch
        // But for now, navigating back is safe
        // navigate(-1); // Or stay on page
      } else {
        toast.error(message);
      }
    });
  };

  if (loading)
    return (
      <div className={style.pageContainer}>
        <Loader />
      </div>
    );
  if (!wallpaper)
    return (
      <div className={style.pageContainer}>
        <NavBar />
        <h2 style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
          Wallpaper not found
        </h2>
      </div>
    );

  return (
    <div className={style.pageContainer}>
      <NavBar />
      <div className={style.mainContent}>
        <div className={style.editContainer}>
          {/* Left: Preview */}
          <div className={style.previewSection}>
            <img
              src={wallpaper.previewUrl}
              alt="Preview"
              className={style.previewImage}
            />
          </div>

          {/* Right: Form */}
          <div className={style.formSection}>
            <h2 className={style.title}>Edit Wallpaper</h2>

            <div className={style.formGroup}>
              <label className={style.label}>Category</label>
              <select
                className={style.select}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>
                  Select Category
                </option>
                {data.categories.map((c) => (
                  <option key={c._id} value={c.title}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div className={style.formGroup}>
              <label className={style.label}>Tags (comma separated)</label>
              <input
                type="text"
                className={style.input}
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="nature, dark, amoled"
              />
            </div>

            <div className={style.formGroup}>
              <label className={style.label}>Author</label>
              <input
                type="text"
                className={style.input}
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Photographer Name"
              />
            </div>

            <div className={style.checkboxGroup}>
              <div className={style.checkboxItem}>
                <input
                  type="checkbox"
                  id="trending"
                  checked={isTrending}
                  onChange={(e) => setIsTrending(e.target.checked)}
                  className={style.checkbox}
                />
                <label htmlFor="trending" className={style.label}>
                  Trending
                </label>
              </div>
              <div className={style.checkboxItem}>
                <input
                  type="checkbox"
                  id="featured"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className={style.checkbox}
                />
                <label htmlFor="featured" className={style.label}>
                  Featured
                </label>
              </div>
            </div>

            <button
              className={style.saveBtn}
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
