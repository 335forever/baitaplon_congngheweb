import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.SERVER_API_ENDPOINT}/cart`,
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

export async function getCart(onReject, onResolve) {
  try {
    const res = await instance.get("/get", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    if (res.status == 200) onResolve(res);
    else onReject(res);
  } catch (err) {
    onReject(err);
  }
}

export async function updateCart({ productId, quantity }, onResolve, onReject) {
  try {
    const form = { productId, quantity };
    const res = await instance.put("/update", form, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if ([200, 201].indexOf(res.status) != -1) onResolve(res);
    else onReject(res);
  } catch (err) {
    onReject(err);
  }
}
