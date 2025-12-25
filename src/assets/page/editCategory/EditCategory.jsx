import NavBar from "../../components/NavBar";
import style from "../addCategory/AddCategory.module.css"; // Reuse existing styles
import { useState, useRef, useEffect } from "react";

const dummyCategories = [
  { id: 1, name: "Nature", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&auto=format&fit=crop&q=60" },
  { id: 2, name: "Abstract", image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&auto=format&fit=crop&q=60" },
  { id: 3, name: "Cars", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&auto=format&fit=crop&q=60" },
  { id: 4, name: "Anime", image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&auto=format&fit=crop&q=60" },
  { id: 5, name: "Space", image: "https://plus.unsplash.com/premium_photo-1675802528766-9b578c7c9803?w=500&auto=format&fit=crop&q=60" },
];

export default function EditCategory() {
  const [selectedCatId, setSelectedCatId] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Update preview when category changes
  useEffect(() => {
    if (selectedCatId) {
      const cat = dummyCategories.find(c => c.id === parseInt(selectedCatId));
      if (cat) {
        setPreviewUrl(cat.image);
        setImage(null); // Reset new upload
      }
    } else {
      setPreviewUrl("");
      setImage(null);
    }
  }, [selectedCatId]);

  const handleDragOver = (e) => {
    if (isUploading) return;
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    if (isUploading) return;
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    if (isUploading) return;
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    if (!isUploading) {
        fileInputRef.current.click();
    }
  };

  const handleUpdate = () => {
    if (!image) return;
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
        setIsUploading(false);
        alert("Category updated successfully!");
        // Logic to actually update data would go here
    }, 2000);
  };

  return (
    <div className={style.pageContainer}>
      <NavBar />
      <div className={style.mainContent}>
        <div className={style.gradientBox}>
          <div className={style.innerContent}>
            <h2 className={style.title}>Edit Category Preview</h2>
            
            <div className={style.inputGroup}>
                <label style={{color: '#aaa', marginBottom: '5px', display: 'block'}}>Select Category</label>
                <select 
                    className={style.textInput} 
                    value={selectedCatId}
                    onChange={(e) => setSelectedCatId(e.target.value)}
                    disabled={isUploading}
                >
                    <option value="">-- Choose a Category --</option>
                    {dummyCategories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            {selectedCatId && (
                <>
                    <div 
                    className={`${style.dropZone} ${isDragOver ? style.dragOver : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={triggerFileInput}
                    style={{opacity: isUploading ? 0.6 : 1, cursor: isUploading ? 'not-allowed' : 'pointer'}}
                    >
                    <input 
                        type="file" 
                        hidden 
                        ref={fileInputRef} 
                        onChange={handleFileSelect} 
                        accept="image/*"
                        disabled={isUploading}
                    />
                    {previewUrl ? (
                        <div className={style.imagePreview} onClick={(e) => e.stopPropagation()}>
                            <img 
                                src={previewUrl} 
                                alt="Preview" 
                                className={style.previewImg} 
                                style={{cursor: isUploading ? 'not-allowed' : 'pointer'}}
                                onClick={triggerFileInput}
                                title={isUploading ? "Uploading..." : "Click to Change"}
                            />
                            <p>{image ? image.name : "Current Preview Image"}</p>
                            <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
                                <button 
                                    className={style.submitBtn} 
                                    style={{padding: '8px 15px', fontSize: '0.9rem', width: 'auto', opacity: isUploading ? 0.5 : 1}}
                                    onClick={triggerFileInput}
                                    disabled={isUploading}
                                >
                                    Change Image
                                </button>
                                <button 
                                    className={style.clearBtn} 
                                    disabled={isUploading}
                                    style={{opacity: isUploading ? 0.5 : 1}}
                                    onClick={(e) => {
                                        if (isUploading) return;
                                        e.stopPropagation();
                                        // Revert to original category image
                                        const cat = dummyCategories.find(c => c.id === parseInt(selectedCatId));
                                        setImage(null);
                                        setPreviewUrl(cat ? cat.image : "");
                                        if (fileInputRef.current) fileInputRef.current.value = "";
                                    }}
                                >
                                    Revert
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={style.uploadPlaceholder}>
                        <p>{isUploading ? "Uploading..." : "Drag & Drop New Image or Click to Upload"}</p>
                        </div>
                    )}
                    </div>

                    <button 
                        className={style.submitBtn} 
                        disabled={!image || isUploading}
                        onClick={handleUpdate}
                        style={{opacity: (!image || isUploading) ? 0.6 : 1, cursor: (!image || isUploading) ? 'not-allowed' : 'pointer'}}
                    >
                        {isUploading ? "Uploading..." : "Update Preview Image"}
                    </button>
                </>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
