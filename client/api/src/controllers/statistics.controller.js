import axios, { AxiosError } from "axios";

const instance = axios.create({
  baseURL: `${process.env.SERVER_API_ENDPOINT}/voucher`,
  timeout: 3000,
});