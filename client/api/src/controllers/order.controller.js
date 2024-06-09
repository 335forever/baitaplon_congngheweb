import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.SERVER_API_ENDPOINT}/order`,
  timeout: 3000,
});

export async function createOrder({ productId,
  quantity, voucherId, paymentMethod = 0 }) {
  const form = { productId, quantity, voucherId, paymentMethod };
  const res = await instance.post("/new", form, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  if (res.status === 201) return res;
  else throw res;
}

export async function getOrders() {
  const res = await instance.get("/get", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
  if (res.status == 200) return res.data.order;
}

export async function manageOrders() {
    const res = await instance.get("/manager", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
    if (res.status == 201) return res.data.orderInfo;
  }
