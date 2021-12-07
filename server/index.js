const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")

/**
 * Allow JSON body parsing
 */
app.use(express.json())

/**
 * Swagger UI Setup
 */
const swaggerUI = require("swagger-ui-express")
const swaggerJSDoc = require("swagger-jsdoc")
const swaggerRedirectFix = require("./middlewares/swaggerRedirectFix")
const specs = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ProgHours",
      version: "0.1.0",
      description:
        "A one-stop training tool for coaches and competitive programmers. 🔥",
    },
    servers: [
      {
        url: "/api",
      },
    ],
  },
  apis: ["./routes/*.js", "./models/*.js"],
})
app.use(
  "/docs/",
  swaggerRedirectFix,
  swaggerUI.serve,
  swaggerUI.setup(specs, { explorer: true })
)

/**
 * Setup application routes
 */
const authRoutes = require("./routes/authRoutes")
app.use("/auth", authRoutes)

app.get("/user", async (req, res) => {
  const { cookie } = req.headers
  const accessToken = cookie.split("=")[1]
  const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
  res.json(user)
})

/**
 * Listen for requests
 */
app.listen(4000, () => console.log("server listening on port 4000"))
