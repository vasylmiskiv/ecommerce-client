import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userInfo = JSON.parse(localStorage.getItem("userInfo"));

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_URL}/api`,
  prepareHeaders: (headers, meta) => {
    if (userInfo?.token && meta?.addToken) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Content-Type", "application/json");

    console.log(headers);
    return headers;
  },
});

export { baseQuery };
