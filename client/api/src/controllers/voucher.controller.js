import axios, { AxiosError } from "axios";

const instance = axios.create({
  baseURL: `${process.env.SERVER_API_ENDPOINT}/voucher`,
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
  const response = await instance.post("/new",
    {
      "discountPercent": discountPercent,
      "expired": expired,
      "minPrice": minprice,
      "maxDiscount": maxdiscount,
      "quantity": quantity
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
    }
  );

  if (response.status == 201) {
    return true;
  } else {
    throw new AxiosError(response.data.message, response.data.status);
  }
}

export async function deleteVoucher(voucherId) {
  const response = await instance.delete('/remove', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    },
    data: {
      voucherId: voucherId
    }
  });

  if (response.status == 200) {
    return true;
  } else {
    throw new AxiosError(response.data.message, response.data.status);
  }
}

export async function updateVoucher(voucher) {
  const response = await instance.put('/update',
    {
      ...voucher
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    }
  )

  if (response.status == 200) {
    return true;
  } else {
    throw new AxiosError(response.data.message, response.data.status);
  }
}
