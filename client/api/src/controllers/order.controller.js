import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.SERVER_API_ENDPOINT}/order`,
  // baseURL: `https://54.255.209.5/order`,
  timeout: 3000,
});

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhZ25pZSIsImlhdCI6MTcxODA3MzExNCwiZXhwIjoxNzE4MDgzOTE0fQ.iUZygtZiTIR4_R3joTntN9CpXS8JxD6nRl_bUbNVa4s';

export async function createOrder({ productId,
  quantity, voucherId, paymentMethod = 0 }) {
  const form = { productId, quantity, voucherId, paymentMethod };
  const res = await instance.post("/new", form, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      // Authorization: "Bearer " + token
    },
  });
  if (res.status === 201) return res;
  else throw res;
}

export async function getOrders() {
  const res = await instance.get("/get", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      // Authorization: "Bearer " + token
    },
  });

  if (res.status == 201) return res.data.order;
}

export async function manageOrders() {
  const res = await instance.get("/manager", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      // Authorization: "Bearer " + token
    },
  });
  if (res.status == 201) return res.data.orderInfo;
}

export async function approveOrders({ orderId, isPaid, status, msgToUser }) {
  console.log({ orderId, isPaid, status, msgToUser })
  const res = await instance.put("/approve",
    { orderId, isPaid, status, msgToUser }, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
      // Authorization: "Bearer " + token
    },
  });
  return (res.status == 200)
}

