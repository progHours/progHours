import { useEffect } from "react"
import { toast } from "react-toastify"
import { Navigate, RouteObject } from "react-router-dom"

/**
 * Auth pages
 */
import Login from "@/pages/auth/Login"
import Register from "@/pages/auth/Register"

/**
 * Dashboard pages
 */
import DashboardHome from "@/pages/dashboard/Home"
import TrackingSheet from "@/pages/dashboard/Tracking"
import LeaderboardPage from "@/pages/leaderboard"

/**
 * Profile page
 */
import Profile from "@/pages/profile"

/**
 * Settings page
 */
import AccountSettings from "@/pages/settings/AccountSettings"
import ProfileSettings from "@/pages/settings/ProfileSettings"

const AccessDenied = (): JSX.Element => {
  /**
   * Show the Access denied toast and redirect users to /login
   */
  useEffect(() => {
    toast.error("Access denied", {
      className: "toast",
    })
  }, [])
  return <Navigate to="/login" />
}

const routes = (isLoggedIn: boolean): RouteObject[] => [
  {
    path: "/",
    element: isLoggedIn ? <Navigate to="/dashboard" /> : <Login />,
  },
  {
    path: "/login",
    element: isLoggedIn ? <Navigate to="/dashboard" /> : <Login />,
  },
  {
    path: "/register",
    element: isLoggedIn ? <Navigate to="/dashboard" /> : <Register />,
  },
  {
    path: "/dashboard",
    element: isLoggedIn ? <DashboardHome /> : <AccessDenied />,
  },
  {
    path: "/submissions",
    element: isLoggedIn ? <TrackingSheet /> : <AccessDenied />,
  },
  {
    path: "/settings",
    element: isLoggedIn ? (
      <Navigate to="/settings/profile" />
    ) : (
      <AccessDenied />
    ),
  },
  {
    path: "/settings/profile",
    element: <ProfileSettings />,
  },
  {
    path: "/settings/account",
    element: <AccountSettings />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/leaderboard",
    element: <LeaderboardPage />,
  },
]

export default routes