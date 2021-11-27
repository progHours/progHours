import AuthContainer from "components/AuthContainer"
import { Helmet } from "react-helmet-async"
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { toast } from "react-toastify"

const loginSchema = Yup.object().shape({
  uid: Yup.string()
    .trim()
    .required("University ID is required")
    .length(7, "Invalid University ID"),
  password: Yup.string().trim().required("Password is required"),
})

const Login = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      uid: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        await axios.post("/api/auth/login", values)
        localStorage.setItem("isLoggedIn", 1)
        localStorage.setItem("role", 0)
        navigate("/dashboard")
        toast("Successfully logged in")
      } catch (error) {
        const { data } = error.response
        console.log(data)
        toast.error(data.message, { className: "toast" })
      }
    },
  })
  const hasError = (field) => formik.touched[field] && formik.errors[field]
  return (
    <AuthContainer>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="space-y-3">
        <h2>Login to Account</h2>
        <p>
          Don't have an account?
          <Link to="/register" className="ml-1 text-primary">
            Register
          </Link>
        </p>
      </div>
      <form onSubmit={formik.handleSubmit} className="mt-8 space-y-4">
        <div className="form-group">
          <input
            id="uid"
            type="text"
            placeholder=" "
            {...formik.getFieldProps("uid")}
          />
          <label htmlFor="uid">University ID</label>
          {hasError("uid") && (
            <div className="error-message">{formik.errors.uid}</div>
          )}
        </div>
        <div className="form-group">
          <input
            id="password"
            type="password"
            placeholder=" "
            {...formik.getFieldProps("password")}
          />
          <label htmlFor="password">Password</label>
          {hasError("password") && (
            <div className="error-message">{formik.errors.password}</div>
          )}
        </div>
        <div>
          <button type="submit" className="block mt-6 btn-primary">
            Login
          </button>
        </div>
      </form>
    </AuthContainer>
  )
}

export default Login
