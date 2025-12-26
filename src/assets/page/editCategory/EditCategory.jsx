import NavBar from "../../components/NavBar";
import style from "../addCategory/AddCategory.module.css"; // Reuse existing styles
import { useContext, useState, useRef, useEffect } from "react";
import { context } from "../../../Store";
import { toast } from "react-toastify";

export default function EditCategory() {
  const data = useContext(context);
  const [selectedCatId, setSelectedCatId] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  useEffect(() => {
    data.getCategories(data.setCategories);
  }, []);

  // Update preview when category changes
  useEffect(() => {
    if (selectedCatId) {
      const cat = data.categories.find(
        (c) => c._id === parseInt(selectedCatId)
      );
      if (cat) {
        setPreviewUrl(cat.previewUrl);
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
    let packet = {
      image,
      category: selectedCatId,
    };
    data.updateCategoryPreviewImage(packet, (isSuccess, message) => {
      if (isSuccess) {
        toast.success(message);
        setImage(null);
        setSelectedCatId("");
      } else {
        toast.error(message);
      }
      setIsUploading(false);
    });
  };

  return (
    <div className={style.pageContainer}>
      <NavBar />
      <div className={style.mainContent}>
        <div className={style.gradientBox}>
          <div className={style.innerContent}>
            <h2 className={style.title}>Edit Category Preview</h2>

            <div className={style.inputGroup}>
              <label
                style={{ color: "#aaa", marginBottom: "5px", display: "block" }}
              >
                Select Category
              </label>
              <select
                className={style.textInput}
                value={selectedCatId}
                onChange={(e) => setSelectedCatId(e.target.value)}
                disabled={isUploading}
              >
                <option value="">-- Choose a Category --</option>
                {data.categories.map((cat) => (
                  <option key={cat._id} value={cat.title}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>

            {selectedCatId && (
              <>
                <div
                  className={`${style.dropZone} ${
                    isDragOver ? style.dragOver : ""
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={triggerFileInput}
                  style={{
                    opacity: isUploading ? 0.6 : 1,
                    cursor: isUploading ? "not-allowed" : "pointer",
                  }}
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
                    <div
                      className={style.imagePreview}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className={style.previewImg}
                        style={{
                          cursor: isUploading ? "not-allowed" : "pointer",
                        }}
                        onClick={triggerFileInput}
                        title={isUploading ? "Uploading..." : "Click to Change"}
                      />
                      <p>{image ? image.name : "Current Preview Image"}</p>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          marginTop: "10px",
                        }}
                      >
                        <button
                          className={style.submitBtn}
                          style={{
                            padding: "8px 15px",
                            fontSize: "0.9rem",
                            width: "auto",
                            opacity: isUploading ? 0.5 : 1,
                          }}
                          onClick={triggerFileInput}
                          disabled={isUploading}
                        >
                          Change Image
                        </button>
                        <button
                          className={style.clearBtn}
                          disabled={isUploading}
                          style={{ opacity: isUploading ? 0.5 : 1 }}
                          onClick={(e) => {
                            if (isUploading) return;
                            e.stopPropagation();
                            // Revert to original category image
                            const cat = data.categories.find(
                              (c) => c._id === parseInt(selectedCatId)
                            );
                            setImage(null);
                            setPreviewUrl(cat ? cat.previewUrl : "");
                            if (fileInputRef.current)
                              fileInputRef.current.value = "";
                          }}
                        >
                          Revert
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className={style.uploadPlaceholder}>
                      <p>
                        {isUploading
                          ? "Uploading..."
                          : "Drag & Drop New Image or Click to Upload"}
                      </p>
                    </div>
                  )}
                </div>

                <button
                  className={style.submitBtn}
                  disabled={!image || isUploading}
                  onClick={handleUpdate}
                  style={{
                    opacity: !image || isUploading ? 0.6 : 1,
                    cursor: !image || isUploading ? "not-allowed" : "pointer",
                  }}
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
