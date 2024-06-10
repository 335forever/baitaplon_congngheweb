import axios, { AxiosError } from "axios";

const instance = axios.create({
  baseURL: `https://54.255.209.5/product`,
  timeout: 3000,
});

export async function getAllCategory() {
  const response = await instance.get("/get/categories");

  if (response.status === 200) return response.data["categories"];
  else throw new AxiosError(response.data.message, response.data.status);
}