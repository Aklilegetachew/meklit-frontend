
import axios from "axios"

const api = axios.create({
  baseURL: "https://meklit-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
})

export default api
