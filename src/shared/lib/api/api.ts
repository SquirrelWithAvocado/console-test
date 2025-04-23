import axios, { AxiosInstance } from "axios"

const BASE_URL = 'http://127.0.0.1:23456';
const CONNECTION_TIMEOUT = 5000;

export function createAPI(): AxiosInstance {
    const api = axios.create({
      baseURL: BASE_URL,
      timeout: CONNECTION_TIMEOUT
    });
  
    return api;
  }