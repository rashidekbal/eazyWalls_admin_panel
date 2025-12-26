import { createContext, useEffect, useState } from "react";
import axios from "axios";
import {
  GET_CATEGORIES,
  GET_WALLPAPER,
  GET_WALLPAPER_NO_CATEGORY,
} from "./assets/Apis/GeneralApi.js";
import {
  ADD_CATEGORY,
  ADD_FEATURED,
  ADD_TRENDING,
  ADD_WALLPAPER,
  DELETE_WALLPAPER,
  REMOVE_FEATURED,
  REMOVE_TRENDING,
  UPDATE_CATEGORY_PREVIEW,
} from "./assets/Apis/AdminApi.js";
const api = axios.create({
  baseURL: "http://localhost:8000",
});
const axiosFormHandler = async (url, data) => {
  return axios.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const getCategories = async (setCategories) => {
  try {
    let response = await api.get(GET_CATEGORIES);
    setCategories(response.data.Data);
  } catch (error) {
    console.log("error getting the categories" + error);
  }
};
const getWallpaper = async (categoryTitle, setLoading, setWallpapers) => {
  let Url = GET_WALLPAPER + categoryTitle;
  setLoading(true);
  try {
    let response = await api.get(Url);
    setWallpapers(response.data.Data);
    setLoading(false);
  } catch (error) {
    console.log(
      "error fetching wallpaper of category: " + categoryTitle + " : " + error
    );
    setLoading(false);
  }
};
const getNONSpecialWallpaper = async (type, setWallpapers, getStatus) => {
  let Url = GET_WALLPAPER_NO_CATEGORY + type;
  try {
    let response = await api.get(Url);
    setWallpapers(response.data.Data);
    getStatus(true, "success");
  } catch (error) {
    console.log("error fetching wallpaper of no category: " + " : " + error);
    const message =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to fetch wallpaper";
    getStatus(false, message);
  }
};

const AddWallpaper = async (data, uploadStatus) => {
  let Url = ADD_WALLPAPER;
  try {
    const formData = new FormData();
    formData.append("image", data.file);
    formData.append("category", data.category);
    formData.append("tags", data.tags);
    formData.append("author", data.authorName);
    formData.append("isTrending", data.isTrending);
    formData.append("isFeatured", data.isFeatured);
    let response = await axiosFormHandler(Url, formData);
    uploadStatus(true, "Wallpaper added successfully");
  } catch (error) {
    console.log("error while uploading wallpaper :" + error);
    const message =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to upload wallpaper";
    uploadStatus(false, message);
  }
};
const AddCategories = async (data, uploadStatus) => {
  let Url = ADD_CATEGORY;
  try {
    let formData = new FormData();
    formData.append("image", data.image);
    formData.append("category", data.categoryName);
    let response = await axiosFormHandler(Url, formData);
    uploadStatus(true, "Category added successfully");
  } catch (error) {
    console.log("error while uploading category :" + error);
    const message =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to upload category";
    uploadStatus(false, message);
  }
};
const deleteWallpapers = async (data, deleteStatus) => {
  const Url = DELETE_WALLPAPER;
  let selectedIds = "";
  data.forEach((item) => {
    selectedIds += item + ",";
  });
  try {
    await api.patch(Url, { ids: selectedIds });
    deleteStatus(true, "success fully removed");
  } catch (error) {
    console.log("error removing wallpaper : " + error);
    const message =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to upload wallpaper";
    deleteStatus(false, message);
  }
};
const updateCategoryPreviewImage = async (data, updateStatus) => {
  const Url = UPDATE_CATEGORY_PREVIEW;
  try {
    let formData = new FormData();
    formData.append("image", data.image);
    formData.append("category", data.category);
    await axios.patch(Url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    updateStatus(true, "success fully updated");
  } catch (error) {
    console.log("error updating category : " + error);
    const message =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to update category";
    updateStatus(false, message);
  }
};
const removeTrendingWallpapers = async (data, updateStatus) => {
  const Url = REMOVE_TRENDING;
  let selectedIds = "";
  data.forEach((item) => {
    selectedIds += item + ",";
  });
  try {
    await api.patch(Url, { ids: selectedIds });

    updateStatus(true, "success fully removed trending wallpaper");
  } catch (error) {
    console.log("error removing trending wallpaper  : " + error);
    const message =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to remove trending wallpaper";
    updateStatus(false, message);
  }
};
const removeFeaturedWallpapers = async (data, updateStatus) => {
  const Url = REMOVE_FEATURED;
  let selectedIds = "";
  data.forEach((item) => {
    selectedIds += item + ",";
  });
  try {
    await api.patch(Url, { ids: selectedIds });

    updateStatus(true, "success fully removed featured");
  } catch (error) {
    console.log("error removing  featured wallpaper : " + error);
    const message =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to remove featured wallpaper";
    updateStatus(false, message);
  }
};
const addTrendingWallpapers = async (data, updateStatus) => {
  const Url = ADD_TRENDING;
  let selectedIds = "";
  data.forEach((item) => {
    selectedIds += item + ",";
  });
  try {
    await api.post(Url, { ids: selectedIds });

    updateStatus(true, "success fully added to trending");
  } catch (error) {
    console.log("error adding trenidng wallpaper : " + error);
    const message =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to remove wallpaper";
    updateStatus(false, message);
  }
};
const addFeaturedWallpapers = async (data, updateStatus) => {
  const Url = ADD_FEATURED;
  let selectedIds = "";
  data.forEach((item) => {
    selectedIds += item + ",";
  });
  try {
    await api.post(Url, { ids: selectedIds });

    updateStatus(true, "success fully added to featured");
  } catch (error) {
    console.log("error adding to featured wallpaper : " + error);
    const message =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to add to featured wallpaper";
    updateStatus(false, message);
  }
};
const context = createContext();
function Store({ children }) {
  const [categories, setCategories] = useState([]);
  const [wallpapers, setWallpapers] = useState([]);
  const [trendingWallpapers, setTrendingWallpapers] = useState([]);
  const [featuredWallpapers, setFeaturedWallpapers] = useState([]);

  const [stats, setStats] = useState([
    {
      trending: 0,
      previewLink:
        "https://plus.unsplash.com/premium_photo-1675802528766-9b578c7c9803?w=500&auto=format&fit=crop&q=60",
    },
    {
      featured: 0,
      previewLink:
        "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&auto=format&fit=crop&q=60",
    },
  ]);
  const getTrendingWallpapers = async (setTrendingWallpapers, setLoading) => {
    let Url = GET_WALLPAPER + "abc&type=trending";
    setLoading(true);
    try {
      let response = await api.get(Url);
      setTrendingWallpapers(response.data.Data);
      let temp = stats;
      temp[0].trending = response.data.Data.length;
      temp[0].previewLink = response.data.Data[0].previewUrl;
      setStats(temp);
      setLoading(false);
    } catch (error) {
      console.log("error while loading trending wallpapers :" + error);
      setLoading(false);
    }
  };
  const getFeaturedWallpapers = async (setFeaturedWallpapers, setLoading) => {
    let Url = GET_WALLPAPER + "abc&type=featured";
    setLoading(true);
    try {
      let response = await api.get(Url);
      setFeaturedWallpapers(response.data.Data);
      let temp = stats;
      temp[1].featured = response.data.Data.length;
      temp[1].previewLink =
        featuredWallpapers[0] && response.data.Data[0].previewUrl;
      setStats(temp);
      setLoading(false);
    } catch (error) {
      console.log("error while loading featured wallpapers :" + error);
      setLoading(false);
    }
  };
  return (
    <context.Provider
      value={{
        categories,
        setCategories,
        stats,
        getCategories,
        getWallpaper,
        wallpapers,
        setWallpapers,
        trendingWallpapers,
        setTrendingWallpapers,
        featuredWallpapers,
        setFeaturedWallpapers,
        getTrendingWallpapers,
        getFeaturedWallpapers,
        AddWallpaper,
        AddCategories,
        deleteWallpapers,
        updateCategoryPreviewImage,
        removeTrendingWallpapers,
        addFeaturedWallpapers,
        addTrendingWallpapers,
        removeFeaturedWallpapers,
        getNONSpecialWallpaper,
      }}
    >
      {children}
    </context.Provider>
  );
}
export { Store, context };
