import NavBar from "../../components/NavBar";
import style from "./AddCategory.module.css";
import { useState, useRef } from "react";

export default function AddCategory() {
  const [image, setImage] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImage(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={style.pageContainer}>
      <NavBar currenLoaction="addCategory" />
      <div className={style.mainContent}>
        <div className={style.gradientBox}>
          <div className={style.innerContent}>
            <h2 className={style.title}>Add New Category</h2>
            
            <div 
              className={`${style.dropZone} ${isDragOver ? style.dragOver : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerFileInput}
            >
              <input 
                type="file" 
                hidden 
                ref={fileInputRef} 
                onChange={handleFileSelect} 
                accept="image/*"
              />
              {image ? (
                <div className={style.imagePreview} onClick={(e) => e.stopPropagation()}>
                  <img src={URL.createObjectURL(image)} alt="Preview" className={style.previewImg} />
                  <p>{image.name}</p>
                  <button 
                    className={style.clearBtn} 
                    onClick={(e) => {
                      e.stopPropagation();
                      setImage(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                  >
                    Clear Image
                  </button>
                </div>
              ) : (
                <div className={style.uploadPlaceholder}>
                  <p>Drag & Drop Image or Click to Upload</p>
                </div>
              )}
            </div>

            <div className={style.inputGroup}>
              <input
                type="text"
                className={style.textInput}
                placeholder="Enter category name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>

            <button className={style.submitBtn}>
              Create Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
