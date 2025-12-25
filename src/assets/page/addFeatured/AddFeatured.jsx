import NavBar from "../../components/NavBar";
import style from "../editTrending/EditGallery.module.css";
import pageStyle from "../addCategory/AddCategory.module.css"; 
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";

// Dummy Data
// Dummy Data
const initialWallpapers = Array.from({ length: 250 }).map((_, i) => ({
  id: `new-feat-${i}`,
  url: `https://picsum.photos/seed/${i + 600}/200/300`
}));

export default function AddFeatured() {
  const [wallpapers, setWallpapers] = useState(initialWallpapers);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  useEffect(() => {
    // Simulate Fetching Data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = wallpapers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(wallpapers.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  const handleAdd = () => {
    setIsAdding(true);
    // Simulate Server Request
    setTimeout(() => {
      setWallpapers(prev => prev.filter(w => !selectedIds.has(w.id)));
      setSelectedIds(new Set());
      setIsAdding(false);
    }, 2000);
  };

  const isAllSelected = selectedIds.size === currentItems.length && currentItems.length > 0;

  return (
    <div className={pageStyle.pageContainer}>
      <NavBar />
      <div className={pageStyle.mainContent}>
        
        <div style={{width: "100%", maxWidth: "1200px"}}>
           <h2 className={pageStyle.title} style={{textAlign:"left", marginBottom:"20px"}}>Add to Featured</h2>
           
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
                    <button className={style.actionBtn} onClick={inverseSelection}>Inverse Selection</button>
                    <button className={style.actionBtn} onClick={() => setSelectedIds(new Set())}>Deselect All</button>
                  </div>

                  {selectedIds.size > 0 && (
                    <button 
                      className={`${style.actionBtn} ${style.addBtn}`}
                      onClick={handleAdd}
                      disabled={isAdding}
                    >
                      {isAdding ? "Adding..." : `Add to Featured (${selectedIds.size})`}
                    </button>
                  )}
               </div>

               {/* Grid */}
               <div className={style.imageGrid}>
                 {currentItems.map((wall) => (
                   <div 
                      key={wall.id} 
                      className={`${style.imageCard} ${selectedIds.has(wall.id) ? style.selected : ''}`}
                      onClick={() => toggleSelection(wall.id)}
                   >
                     <div className={style.selectionOverlay}>
                       <input 
                          type="checkbox" 
                          className={style.checkbox}
                          checked={selectedIds.has(wall.id)}
                          onChange={() => {}}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSelection(wall.id);
                          }}
                       />
                     </div>
                     <img src={wall.url} alt="Wallpaper" className={style.cardImg} loading="lazy" />
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
             </div>
           )}
        </div>

      </div>
    </div>
  );
}
