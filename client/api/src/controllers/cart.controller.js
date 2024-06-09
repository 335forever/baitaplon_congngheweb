import axios from "axios";

const instance = axios.create({
  baseURL: `http://54.255.209.5/cart`,
  timeout: 3000,
});

export async function addProductToCart({ productId, quantity }) {
  const form = { productId, quantity };
  const res = await instance.post("/add", form, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  if ([200, 201].indexOf(res.status) != -1) return res;
  else throw res;
}

export async function getCart() {
  const res = await instance.get("/get", {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
  if (res.status == 200) return res.data.cart;
}

export async function updateCart({ productId, quantity }) {
  const form = { productId, quantity };
  const res = await instance.put("/update", form, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  if ([200].indexOf(res.status) != -1) return res;
  else throw res;
}
