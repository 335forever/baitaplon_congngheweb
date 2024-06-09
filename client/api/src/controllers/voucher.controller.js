import axios, { AxiosError } from "axios";

const instance = axios.create({
  baseURL: `http://54.255.209.5/voucher`,
  timeout: 3000,
});

export async function getVouchers(shopId) {
  const response = await instance.get("/find", {
    params: {
      shopId
    }
  });

  if (response.status === 200) {
    return response.data['vouchers'];
  } else {
    throw new AxiosError(response.data.message, response.data.status);
  }
}

export async function createVoucher({ discountPercent, expired, minprice, maxdiscount, quantity }) {
  const response = await instance.post("/new", {
    "discountPercent": discountPercent,
    "expired": expired,
    "minPrice": minprice,
    "maxDiscount": maxdiscount,
    "quantity": quantity
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhZ25pZSIsImlhdCI6MTcxNzk0Mjk5MSwiZXhwIjoxNzE3OTUzNzkxfQ.HVLLckb56jp5_HzMVqb48VErRWCtbVIWH659lNrX-VY`
    },
    withCredentials: false
  });

  if (response.status == 201) {
    return true;
  } else {
    throw new AxiosError(response.data.message, response.data.status);
  }
}