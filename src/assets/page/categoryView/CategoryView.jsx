import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NavBar from "../../components/NavBar";
import style from "./CategoryView.module.css";
import { useState, useEffect, useContext } from "react";
import Loader from "../../components/Loader";
import { context } from "../../../Store";
export default function CategoryView() {
  const data = useContext(context);
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  const [selectedIds, setSelectedIds] = useState(new Set());
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    data.getWallpaper(categoryName, setIsLoading, data.setWallpapers);
  }, []);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.wallpapers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.wallpapers.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // --- Selection Logic ---
  const toggleSelection = (id) => {
    const newSelection = new Set(selectedIds);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedIds(newSelection);
  };

  const selectAll = () => {
    if (selectedIds.size === currentItems.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(currentItems.map((w) => w._id)));
    }
  };

  const inverseSelection = () => {
    const newSelection = new Set();
    currentItems.forEach((w) => {
      if (!selectedIds.has(w._id)) {
        newSelection.add(w._id);
      }
    });
    setSelectedIds(newSelection);
  };

  const handleRemove = () => {
    setIsRemoving(true);
    data.deleteWallpapers(selectedIds, (status, message) => {
      setIsRemoving(false);
      if (status) {
        toast.success(message);
        data.setWallpapers((prev) =>
          prev.filter((w) => !selectedIds.has(w._id)),
        );
        setSelectedIds(new Set());
      } else {
        toast.error(message);
      }
    });
  };

  const isAllSelected =
    selectedIds.size === currentItems.length && currentItems.length > 0;

  return (
    <div className={style.pageContainer}>
      <NavBar />

      <header className={style.header}>
        <div className={style.headerContent}>
          <div>
            <h1 className={style.title}>{categoryName}</h1>
            <p className={style.subtitle}>
              Viewing all wallpapers in {categoryName}
            </p>
          </div>

          <div className={style.toggleGroup}>
            <button
              className={style.deleteBtn}
              style={{
                backgroundColor: "#ff4444",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                marginRight: "10px",
                cursor: "pointer",
              }}
              onClick={() => {
                if (
                  window.confirm(
                    `Are you sure you want to delete the category "${categoryName}"? This action cannot be undone.`,
                  )
                ) {
                  data.deleteCategory(categoryName, (success, msg) => {
                    if (success) {
                      toast.success(msg);
                      navigate("/");
                    } else {
                      toast.error(msg);
                    }
                  });
                }
              }}
            >
              Delete Category
            </button>
            <button
              className={`${style.toggleBtn} ${
                viewMode === "masonry" ? style.active : ""
              }`}
              onClick={() => setViewMode("masonry")}
            >
              Staggered
            </button>
            <button
              className={`${style.toggleBtn} ${
                viewMode === "grid" ? style.active : ""
              }`}
              onClick={() => setViewMode("grid")}
            >
              Grid
            </button>
          </div>
        </div>
      </header>

      <div className={style.galleryContainer}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {/* Toolbar */}
            <div className={style.toolbar}>
              <div className={style.toolbarGroup}>
                <input
                  type="checkbox"
                  className={style.checkbox}
                  checked={isAllSelected}
                  onChange={selectAll}
                />
                <span>Select All</span>
              </div>

              <div className={style.toolbarGroup}>
                <button className={style.actionBtn} onClick={inverseSelection}>
                  Inverse Selection
                </button>
                <button
                  className={style.actionBtn}
                  onClick={() => setSelectedIds(new Set())}
                >
                  Deselect All
                </button>
              </div>

              {selectedIds.size > 0 && (
                <button
                  className={`${style.actionBtn} ${style.removeBtn}`}
                  onClick={handleRemove}
                  disabled={isRemoving}
                >
                  {isRemoving ? "Removing..." : `Remove (${selectedIds.size})`}
                </button>
              )}
            </div>

            <div
              className={
                viewMode === "masonry" ? style.masonryGrid : style.regularGrid
              }
            >
              {currentItems.map((img) => (
                <div
                  key={img._id}
                  className={`${style.masonryItem} ${
                    selectedIds.has(img._id) ? style.selected : ""
                  }`}
                  onClick={() => toggleSelection(img._id)}
                >
                  <div className={style.selectionOverlay}>
                    <input
                      type="checkbox"
                      className={style.checkbox}
                      checked={selectedIds.has(img._id)}
                      onChange={() => {}}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelection(img._id);
                      }}
                    />
                  </div>

                  {/* Edit Button Overlay */}
                  <div
                    className={style.editOverlay}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/edit-wallpaper/${img._id}`, {
                        state: { ...img, category: categoryName },
                      });
                    }}
                  >
                    ✏️
                  </div>

                  <img
                    src={img.previewUrl}
                    alt="Wallpaper"
                    className={style.img}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className={style.paginationContainer}>
                <button
                  className={style.pageBtn}
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    className={`${style.pageBtn} ${
                      currentPage === i + 1 ? style.activePageBtn : ""
                    }`}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  className={style.pageBtn}
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
