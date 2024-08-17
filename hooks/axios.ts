import axios from "axios";

const headers = {};
const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers,
});

export const httpForm = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers:{},
});
export default http;