import axios from "axios";

export async function getCategories() {
  const response = await axios
    .get(process.env.SEARCH_API_ENDPOINT, {
      action: "getproductcategory",
      headers: { "Content-Type": "application/json" },
    });
    return JSON.parse(response.data || []);
}
