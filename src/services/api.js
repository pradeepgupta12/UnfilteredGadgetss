// services/api.js
// Central API layer – swap data files for real endpoints here

import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || ''

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// Interceptors
api.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err)
)

export default api
