import axios from "axios"

const getUser = () => {
  return axios.get("/api/user").then((res) => res.data)
}
export { getUser }
