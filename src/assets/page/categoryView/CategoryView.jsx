import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import style from "./CategoryView.module.css";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";

// Generate Dummy Data with Random Heights (External to component to simulate DB)
const initialWallpapers = Array.from({ length: 250 }).map((_, i) => ({
  id: `cat-wall-${i}`,
  height: Math.floor(Math.random() * (600 - 300 + 1)) + 300,
  url: `https://picsum.photos/seed/${i * 123}/300/${Math.floor(Math.random() * (600 - 300 + 1)) + 300}`
}));

export default function CategoryView() {
  const { categoryName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("masonry"); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  
  // Data State
  const [wallpapers, setWallpapers] = useState(initialWallpapers); // Using state now
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    // Simulate Fetching Data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [categoryName]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = wallpapers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(wallpapers.length / itemsPerPage);

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
      setSelectedIds(new Set(currentItems.map(w => w.id)));
    }
  };

  const inverseSelection = () => {
    const newSelection = new Set();
    currentItems.forEach(w => {
      if (!selectedIds.has(w.id)) {
        newSelection.add(w.id);
      }
    });
    setSelectedIds(newSelection);
  };

  const handleRemove = () => {
    setIsRemoving(true);
    // Simulate Server Request
    setTimeout(() => {
      setWallpapers(prev => prev.filter(w => !selectedIds.has(w.id)));
      setSelectedIds(new Set());
      setIsRemoving(false);
    }, 2000);
  };

  const isAllSelected = selectedIds.size === currentItems.length && currentItems.length > 0;

  return (
    <div className={style.pageContainer}>
      <NavBar />
      
      <header className={style.header}>
        <div className={style.headerContent}>
          <div>
            <h1 className={style.title}>{categoryName}</h1>
            <p className={style.subtitle}>Viewing all wallpapers in {categoryName}</p>
          </div>
          
          <div className={style.toggleGroup}>
            <button 
              className={`${style.toggleBtn} ${viewMode === 'masonry' ? style.active : ''}`}
              onClick={() => setViewMode('masonry')}
            >
              Staggered
            </button>
            <button 
              className={`${style.toggleBtn} ${viewMode === 'grid' ? style.active : ''}`}
              onClick={() => setViewMode('grid')}
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
                  <button className={style.actionBtn} onClick={inverseSelection}>Inverse Selection</button>
                  <button className={style.actionBtn} onClick={() => setSelectedIds(new Set())}>Deselect All</button>
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

             <div className={viewMode === 'masonry' ? style.masonryGrid : style.regularGrid}>
               {currentItems.map((img) => (
                 <div 
                    key={img.id} 
                    className={`${style.masonryItem} ${selectedIds.has(img.id) ? style.selected : ''}`}
                    onClick={() => toggleSelection(img.id)}
                 >
                   <div className={style.selectionOverlay}>
                     <input 
                        type="checkbox" 
                        className={style.checkbox}
                        checked={selectedIds.has(img.id)}
                        onChange={() => {}} 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSelection(img.id);
                        }}
                     />
                   </div>
                   <img 
                      src={img.url} 
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
                            className={`${style.pageBtn} ${currentPage === i + 1 ? style.activePageBtn : ''}`}
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
