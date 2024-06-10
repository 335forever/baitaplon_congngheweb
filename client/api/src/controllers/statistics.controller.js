import axios, { AxiosError } from "axios";

const instance = axios.create({
  // baseURL: `${process.env.SERVER_API_ENDPOINT}/statistic`,
  baseURL: `https://54.255.209.5/statistic`,
  timeout: 3000,
});

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhZ25pZSIsImlhdCI6MTcxODA1NTY2MiwiZXhwIjoxNzE4MDY2NDYyfQ.P84STqCw3D-vvVNoXWAZgF1kFn3u_7asG9Vi4k7cgJM';

export async function getIncome({ from, to }) {
  const response = await instance.get('/getincome', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      // Authorization: `Bearer ${ token }`,
    }
  })

  if (response.status == 200) return response.data.income;
  else throw response;
}


export async function getCustomerNumber({ from, to }) {
  const response = await instance.get('/getcustomernumber', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      // Authorization: `Bearer ${ token }`,
    }
  })

  if (response.status == 200) return response.data.customerCount;
  else throw response;
}


export async function getOrderNumber({ from, to }) {
  const response = await instance.get('/getordernumber', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      // Authorization: `Bearer ${ token }`,
    }
  })

  if (response.status == 200) return response.data.orderCount;
  else throw response;
}