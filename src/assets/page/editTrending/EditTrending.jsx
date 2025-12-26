import NavBar from "../../components/NavBar";
import style from "./EditGallery.module.css";
import pageStyle from "../addCategory/AddCategory.module.css"; // Reuse page container
import { useState, useEffect, useContext } from "react";
import Loader from "../../components/Loader";
import { context } from "../../../Store";
import { toast } from "react-toastify";

// Dummy Data (Initial)

export default function EditTrending() {
  const data = useContext(context);

  const [selectedIds, setSelectedIds] = useState(new Set());
  const [isRemoving, setIsRemoving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  useEffect(() => {
    data.getTrendingWallpapers(data.setTrendingWallpapers, setIsLoading);
  }, []);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.trendingWallpapers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(data.trendingWallpapers.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleSelection = (_id) => {
    const newSelection = new Set(selectedIds);
    if (newSelection.has(_id)) {
      newSelection.delete(_id);
    } else {
      newSelection.add(_id);
    }
    setSelectedIds(newSelection);
  };

  const selectAll = () => {
    if (selectedIds.size === currentItems.length) {
      setSelectedIds(new Set()); // Deselect All
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
    data.removeTrendingWallpapers(selectedIds, (isSuccess, message) => {
      if (isSuccess) {
        toast.success(message);
        data.setTrendingWallpapers((prev) =>
          prev.filter((w) => !selectedIds.has(w._id))
        );
        setSelectedIds(new Set());
      } else {
        toast.error(message);
      }
      setIsRemoving(false);
    });
  };

  const isAllSelected =
    selectedIds.size === currentItems.length && currentItems.length > 0;

  return (
    <div className={pageStyle.pageContainer}>
      <NavBar />
      <div className={pageStyle.mainContent}>
        {/* We use a different container structure for the gallery view */}
        <div style={{ width: "100%", maxWidth: "1200px" }}>
          <h2
            className={pageStyle.title}
            style={{ textAlign: "left", marginBottom: "20px" }}
          >
            Manage Trending
          </h2>

          {isLoading ? (
            <Loader />
          ) : (
            <div className={style.galleryContainer}>
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
                  <button
                    className={style.actionBtn}
                    onClick={inverseSelection}
                  >
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
                    {isRemoving
                      ? "Removing..."
                      : `Remove (${selectedIds.size})`}
                  </button>
                )}
              </div>

              {/* Grid */}
              <div className={style.imageGrid}>
                {currentItems.map((wall) => (
                  <div
                    key={wall._id}
                    className={`${style.imageCard} ${
                      selectedIds.has(wall._id) ? style.selected : ""
                    }`}
                    onClick={() => toggleSelection(wall._id)}
                  >
                    <div className={style.selectionOverlay}>
                      <input
                        type="checkbox"
                        className={style.checkbox}
                        checked={selectedIds.has(wall._id)}
                        onChange={() => {}} // Checked status controlled by state
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSelection(wall._id);
                        }}
                      />
                    </div>
                    <img
                      src={wall.previewUrl}
                      alt="Wallpaper"
                      className={style.cardImg}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
