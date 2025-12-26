import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { GET_CATEGORIES, GET_WALLPAPER } from "./assets/Apis/GeneralApi.js";
import { ADD_WALLPAPER } from "./assets/Apis/AdminApi.js";
const api = axios.create({
  baseURL: "http://localhost:8000",
});
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
const getTrendingWallpapers = async (setTrendingWallpapers, setLoading) => {
  let Url = GET_WALLPAPER + "abc&type=trending";
  setLoading(true);
  try {
    let response = await api.get(Url);
    setTrendingWallpapers(response.data.Data);
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
    setLoading(false);
  } catch (error) {
    console.log("error while loading featured wallpapers :" + error);
    setLoading(false);
  }
};
const AddWallpaper = async (data, setUploading) => {
  setUploading(true);
  let Url = ADD_WALLPAPER;
  try {
    const formData = new FormData();
    formData.append("image", data.file);
    formData.append("category", data.category);
    formData.append("tags", data.tags);
    formData.append("author", data.authorName);
    formData.append("isTrending", data.isTrending);
    formData.append("isFeatured", data.isFeatured);
    let response = await axios.post(Url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setUploading(false);
  } catch (error) {
    console.log("error while uploading wallpaper :" + error);
    setUploading(false);
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
  useEffect(() => {
    setStats([
      {
        trending: trendingWallpapers.length,
        previewLink: trendingWallpapers[0] && trendingWallpapers[0].previewUrl,
      },
      {
        featured: featuredWallpapers.length,
        previewLink: featuredWallpapers[0] && featuredWallpapers[0].previewUrl,
      },
    ]);
  }, [trendingWallpapers, featuredWallpapers]);

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
      }}
    >
      {children}
    </context.Provider>
  );
}
export { Store, context };
