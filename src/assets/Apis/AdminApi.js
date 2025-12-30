const baseUrl = "http://localhost:8000";
const ADD_WALLPAPER = baseUrl + "/api/v1/admin/wallpaper/";
const DELETE_WALLPAPER = ADD_WALLPAPER;
const ADD_CATEGORY = baseUrl + "/api/v1/admin/category/";
const UPDATE_CATEGORY_PREVIEW = ADD_CATEGORY;
const REMOVE_TRENDING = baseUrl + "/api/v1/admin/trending/remove/";
const ADD_TRENDING = baseUrl + "/api/v1/admin/trending/add/";
const REMOVE_FEATURED = baseUrl + "/api/v1/admin/featured/remove/";
const ADD_FEATURED = baseUrl + "/api/v1/admin/featured/add/";
const UPDATE_WALLPAPER = baseUrl + "/api/v1/admin/wallpaper/update";

export {
  baseUrl,
  ADD_WALLPAPER,
  ADD_CATEGORY,
  DELETE_WALLPAPER,
  UPDATE_CATEGORY_PREVIEW,
  REMOVE_TRENDING,
  ADD_TRENDING,
  REMOVE_FEATURED,
  ADD_FEATURED,
  UPDATE_WALLPAPER,
};
