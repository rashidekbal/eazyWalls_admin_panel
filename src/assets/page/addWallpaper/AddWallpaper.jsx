import NavBar from "../../components/NavBar";
import style from "./AddWallpaper.module.css";
import { useState, useRef } from "react";

export default function AddWallpaper() {
  const [image, setImage] = useState(null);
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [isTrending, setIsTrending] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Drag & Drop Handlers
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

  // Tag Handlers
  const handleTagInput = (e) => {
    const val = e.target.value;
    if (val.endsWith(",")) {
      const newTag = val.slice(0, -1).trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    } else {
      setTagInput(val);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className={style.pageContainer}>
      <NavBar />
      <div className={style.mainContent}>
        <div className={style.gradientBox}>
          <div className={style.innerContent}>
            <h2 className={style.title}>Add New Wallpaper</h2>
            
            {/* Image Upload Section */}
            <div 
              className={`${style.dropZone} ${isDragOver ? style.dragOver : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
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

            {/* Inputs Section */}
            <div className={style.formGroup}>
              <input
                type="text"
                className={style.textInput}
                placeholder="Enter Author Name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                style={{marginBottom: '15px'}}
              />

              <select 
                className={style.selectInput}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>Select Category</option>
                <option value="Nature">Nature</option>
                <option value="Abstract">Abstract</option>
                <option value="Cars">Cars</option>
                <option value="Anime">Anime</option>
              </select>

              <div className={style.tagInputContainer}>
                <div className={style.tagsList}>
                  {tags.map((tag, index) => (
                    <span key={index} className={style.tagPill}>
                      {tag}
                      <button onClick={() => removeTag(tag)} className={style.removeTagBtn}>×</button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  className={style.textInput}
                  placeholder="Type tag and press comma"
                  value={tagInput}
                  onChange={handleTagInput}
                />
              </div>

              <div className={style.checkboxGroup}>
                <label className={style.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    checked={isTrending}
                    onChange={(e) => setIsTrending(e.target.checked)}
                  />
                  Trending
                </label>
                <label className={style.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                  />
                  Featured
                </label>
              </div>
            </div>

            <button className={style.submitBtn}>
              Add Wallpaper
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
