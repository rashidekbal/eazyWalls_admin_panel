import { baseUrl } from "./AdminApi.js";

const GET_CATEGORIES = baseUrl + "/api/v1/category";
const GET_WALLPAPER = baseUrl + "/api/v1/wallpaper/?category=";

export { GET_CATEGORIES, GET_WALLPAPER };
