import { useNavigate, useRoutes } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import { toast, ToastContainer } from "react-toastify"
import { QueryClient, QueryClientProvider, useQuery } from "react-query"
import { getUser } from "api/user"

// import routes
import routes from "./routes"
import "react-toastify/dist/ReactToastify.css"
import "styles/tailwind.css"
import clearAuthData from "utils/clearAuthData"

const queryClient = new QueryClient()

// const CheckUserExists = () => {
//   const navigate = useNavigate()
//   const query = useQuery("user", getUser)
//   if (query.error?.response.status !== 200) {
//     clearAuthData()
//     toast.error("Access Denied", { className: "toast" })
//   }
//   return null
// }

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  const routing = useRoutes(routes(isLoggedIn))

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <div>{routing}</div>
        <ToastContainer theme="colored" autoClose={2000} />
      </HelmetProvider>
    </QueryClientProvider>
  )
}

export default App
