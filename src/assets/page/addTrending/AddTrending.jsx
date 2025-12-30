import NavBar from "../../components/NavBar";
import WallpaperCard from "../../components/WallpaperCard";
import style from "../editTrending/EditGallery.module.css";
import pageStyle from "../addCategory/AddCategory.module.css";
import { useState, useEffect, useContext } from "react";
import Loader from "../../components/Loader";
import { context } from "../../../Store";
import { toast } from "react-toastify";

export default function AddTrending() {
  const data = useContext(context);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  useEffect(() => {
    setIsLoading(true);
    data.getNONSpecialWallpaper(
      "getNonTrending",
      data.setWallpapers,
      (isSuccess, message) => {
        console.log("data loaded");
        setIsLoading(false);
      }
    );
  }, []);
  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.wallpapers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.wallpapers.length / itemsPerPage);

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

  const handleAdd = () => {
    setIsAdding(true);
    data.addTrendingWallpapers(selectedIds, (isSuccess, message) => {
      setIsAdding(false);
      if (isSuccess) {
        toast.success(message);
        data.setWallpapers((prev) =>
          prev.filter((w) => !selectedIds.has(w._id))
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
    <div className={pageStyle.pageContainer}>
      <NavBar />
      <div className={pageStyle.mainContent}>
        <div style={{ width: "100%", maxWidth: "1200px" }}>
          <h2
            className={pageStyle.title}
            style={{ textAlign: "left", marginBottom: "20px" }}
          >
            Add to Trending
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
                    className={`${style.actionBtn} ${style.addBtn}`}
                    onClick={handleAdd}
                    disabled={isAdding}
                  >
                    {isAdding
                      ? "Adding..."
                      : `Add to Trending (${selectedIds.size})`}
                  </button>
                )}
              </div>

              {/* Grid */}
              <div className={style.imageGrid}>
                {currentItems.map((wall) => (
                  <WallpaperCard
                    key={wall._id}
                    wallpaper={wall}
                    isSelected={selectedIds.has(wall._id)}
                    onToggle={toggleSelection}
                  />
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
